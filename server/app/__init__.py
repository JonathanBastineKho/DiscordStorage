from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from config import Config
import discord
import asyncio
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Discord
CHANNEL_ID = 1197549842851975322
intents = discord.Intents.default()
intents.message_content = True
client = discord.Client(intents=intents)

# Fast API
async def lifespan(app: FastAPI):
    # Start the discord bot
    asyncio.create_task(client.start(Config.DISCORD_TOKEN))
    yield
    # Stop the discord bot
    await client.close()

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database
engine = create_engine(
    Config.DATABASE_URL, connect_args={"check_same_thread": False}
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

from app import routes