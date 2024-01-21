from app import app, client, CHANNEL_ID, session
from fastapi import File, UploadFile, Form, HTTPException, status, Depends
import discord
import io
from app.utils import get_hashed_password, verify_password, create_access_token
from .db import User, FileChunk, File, Folder
from .deps import get_current_user
from sqlalchemy import and_
import requests
from config import Config
import os
from fastapi.responses import FileResponse
from starlette.background import BackgroundTask

from .schemas import UserData, SystemUser

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post("/api/upload")
async def upload_file(
    file: UploadFile = Form(...), 
    chunkId: int = Form(...), 
    fileName: str = Form(...),
    folderID: int = Form(...),
    fileSize: float = Form(...),
    user: User = Depends(get_current_user)
):
    # To read the file, you can use file.file.read()
    file_content = await file.read()
    channel = client.get_channel(CHANNEL_ID)

    # Send discord the attachment
    sent_message = await channel.send(file=discord.File(fp=io.BytesIO(file_content), filename=fileName))

    # Check if file exist
    if session.query(File).filter(and_(File.name == fileName, File.folder_id == folderID)).first() is None:
        new_file = File(
            name=fileName,
            size=fileSize,
            folder_id=folderID
        )
        session.add(new_file)
        session.commit()

    new_file_chunk = FileChunk(
         chunk_id = chunkId,
         channel_id = str(CHANNEL_ID),
         file_name = fileName,
         folder_id = folderID,
         message_id = sent_message.id
    )

    session.add(new_file_chunk)
    session.commit()

    return {"success": True}

######## User login and Sign up ############

@app.post('/api/register', summary="Create new user")
async def create_user(data : UserData):
    user = session.query(User).filter(User.username == data.username).first()
    if user is not None:
            raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with this email already exist"
        )

    # Add to database
    new_user = User(
         username=data.username,
         password=get_hashed_password(data.password)
    )
    session.add(new_user)
    session.commit()
    new_folder_id = session.query(Folder).count()
    new_folder = Folder(
         id = new_folder_id + 1,
         parent_folder_id = None,
         name="MyDrive",
         user_id=data.username
    )
    session.add(new_folder)
    session.commit()
    return {
          "access_token" : create_access_token(new_user.username),
          "success" : True 
     }

@app.post('/api/login', summary="Create access token")
async def login(data: UserData):
     user = session.query(User).filter(User.username == data.username).first()
     if user is None:
          raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect email or password"
        )
     
     if not verify_password(data.password, user.password):
          raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect email or password"
        )
     
     return {
          "access_token" : create_access_token(user.username),
          "success" : True 
     }

@app.get('/api/verify_token', summary="Verify Token")
async def verify_token(user: SystemUser = Depends(get_current_user)):
    if user:
        return {"success" : True}

######## Create and Edit ############

@app.post('/api/create_folder', summary="Create access token")
def create_folder(parent_folder_id: int, name: str, user: SystemUser = Depends(get_current_user)):
    new_id = session.query(Folder).order_by(Folder.id.desc()).first().id + 1
    new_folder = Folder(
        id = new_id,
        parent_folder_id = parent_folder_id,
        name = name,
        user_id = user.username
    )
    session.add(new_folder)
    session.commit()

    return {"success" : True}

######## get structures ############

@app.get('/api/download')
async def download_file(name: str, folder_id: int, user: SystemUser = Depends(get_current_user)):
    file_chunks = session.query(FileChunk).filter(and_(FileChunk.file_name == name, FileChunk.folder_id == folder_id)).order_by(FileChunk.chunk_id).all()
    urls = []
    for chunk in file_chunks:
        channel = client.get_channel(int(chunk.channel_id))
        msg = await channel.fetch_message(chunk.message_id)
        urls.append(msg.attachments[0].url)
    
    # Download file into the disk
    for url in urls:
        response = requests.get(url)
        with open(os.path.join(Config.TEMP_FOLDER, name), 'ab') as f:
            f.write(response.content)

    # Upload file to client
    return FileResponse(path=os.path.join(Config.TEMP_FOLDER, name), 
                        filename=name,
                      background=BackgroundTask(os.remove, os.path.join(Config.TEMP_FOLDER, name)))

@app.get("/api/sub_folders", summary="Get Subfolders within a folder")
async def get_subfolder(folder_id: int, user: SystemUser = Depends(get_current_user)):
    folders = session.query(Folder).filter(Folder.parent_folder_id == folder_id).all()
    folders_list = []
    for sub_folder in folders:
        folders_list.append(
                {"id" : sub_folder.id,
                "name" : sub_folder.name}
        )
    return {"sub_folder" : folders_list}
     
@app.get("/api/get_files", summary="Get files name within a folder")
async def get_file(folder_id: int, user: SystemUser = Depends(get_current_user)):
    files = session.query(File).filter(File.folder_id == folder_id).all()
    file_name = []
    for file in files:
        file_name.append(file.name)
    return {"files" : file_name}

@app.get("/api/root_folder", summary="Get Folder ID of the root folder")
async def get_root_id(user: SystemUser = Depends(get_current_user)):
    root_folder = session.query(Folder).filter(and_(Folder.parent_folder_id == None , Folder.user_id == user.username)).first()
    return {"id" : root_folder.id, "name" : root_folder.name}