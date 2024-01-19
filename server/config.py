import os
from dotenv import load_dotenv

basedir = os.path.abspath(os.path.dirname(__file__))
load_dotenv(os.path.join(basedir, '.env'))
class Config:
    DISCORD_TOKEN = os.environ.get('DISCORD_TOKEN')
    DATABASE_URL = os.environ.get('DATABASE_URL')