from pydantic import BaseModel

class UserData(BaseModel):
    username: str
    password: str

class TokenPayload(BaseModel):
    sub: str
    exp: int

class SystemUser(BaseModel):
    username : str

class FolderIn(BaseModel):
    parent_folder_id: int
    name: str
    