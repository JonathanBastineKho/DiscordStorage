from jose import jwt
from config import Config
from pydantic import ValidationError
from fastapi import HTTPException, status, Header
from datetime import datetime
from jose import JWTError

from app import session
from .db import User

from app.schemas import TokenPayload, SystemUser

async def get_current_user(Authorization: str = Header(None)):
    try:
        payload = jwt.decode(
            Authorization, Config.JWT_SECRET_KEY, algorithms=[Config.ALGORITHM]
        )

        token_data = TokenPayload(**payload)

        if datetime.fromtimestamp(token_data.exp) < datetime.now():
            raise HTTPException(
                status_code = status.HTTP_401_UNAUTHORIZED,
                detail="Token expired",
                headers={"WWW-Authenticate": "Bearer"},
            )

    except(JWTError, ValidationError):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    user = session.query(User).filter(User.username == token_data.sub)
    
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Could not find user",
        )
    
    return SystemUser(username=token_data.sub)