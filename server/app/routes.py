from app import app, client, CHANNEL_ID
from fastapi import File, UploadFile, Form
import discord
import io

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post("/upload")
async def upload_file(
    file: UploadFile = Form(...), 
    chunkId: int = Form(...), 
    userId: str = Form(...), 
    fileName: str = Form(...)
):
    # To read the file, you can use file.file.read()
    file_content = await file.read()
    channel = client.get_channel(CHANNEL_ID)

    # Send discord the attachment
    sent_message = await channel.send(file=discord.File(fp=io.BytesIO(file_content), filename=fileName))

    # Now you can print or log the form data
    print(f"File name: {file.filename}")
    print(f"User ID: {userId}")
    print(f"Chunk ID: {chunkId}")
    print(f"Original file name: {fileName}")
    print(f"Message ID: {sent_message.id}")

    msg = await channel.fetch_message(sent_message.id)

    print(msg.attachments[0].url)
    print(msg.attachments[0].filename)

    return {"success": True}
