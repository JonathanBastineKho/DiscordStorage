from app import Base, engine
from sqlalchemy import Column, String, Integer, Float, ForeignKey, ForeignKeyConstraint
from sqlalchemy.orm import relationship

class User(Base):
    __tablename__ = "user"
    username = Column(String, primary_key=True)
    password = Column(String)
    
    folders = relationship("Folder", back_populates="user")

class Folder(Base):
    __tablename__ = "folder"
    id = Column(Integer, primary_key=True)
    parent_folder_id = Column(Integer, ForeignKey("folder.id"), nullable=True)
    name = Column(String, nullable=False)
    user_id = Column(String, ForeignKey("user.username"), nullable=True)

    parent_folder = relationship("Folder", remote_side=[id], back_populates="subfolders")
    subfolders = relationship("Folder", back_populates="parent_folder", cascade="all, delete-orphan")

    user = relationship("User", back_populates="folders")

    files = relationship("File", back_populates="folder")


class File(Base):
    __tablename__ = "file"
    name = Column(String, primary_key=True)
    size = Column(Float)

    folder_id = Column(Integer, ForeignKey("folder.id"), primary_key=True)

    folder = relationship("Folder", back_populates="files")

    chunks = relationship("FileChunk", back_populates="file")


class FileChunk(Base):
    __tablename__ = "filechunk"
    chunk_id = Column(String, primary_key=True)
    channel_id = Column(String)

    file_name = Column(String)
    folder_id = Column(Integer)

    file = relationship("File", back_populates="chunks")

    __table_args__ = (
        ForeignKeyConstraint(
            [file_name, folder_id],
            ["file.name", "file.folder_id"],
        ),
    )

Base.metadata.create_all(engine)