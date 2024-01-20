import os
from dotenv import load_dotenv

basedir = os.path.abspath(os.path.dirname(__file__))
load_dotenv(os.path.join(basedir, '.env'))
class Config:
    DISCORD_TOKEN = os.environ.get('DISCORD_TOKEN')
    DATABASE_URL = os.environ.get('DATABASE_URL')
    ACCESS_TOKEN_EXPIRE_MINUTES = 2880
    ALGORITHM = "HS256"
    TEMP_FOLDER = "temp"
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY') or 'default_secret_key'