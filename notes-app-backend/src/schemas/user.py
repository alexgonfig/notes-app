from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class UserBase(BaseModel):
    username: str
    email: str
    password_hash: str


class UserCreate(UserBase):
    pass  # Inherits properties from UserBase


class userUpdate(UserBase):
    updated_at: Optional[datetime] = None


class UserResponse(UserBase):
    id: int
    created_at: datetime
    updated_at: datetime
    enabled: bool

    class Config:
        orm_mode = True  # This tells Pydantic to treat SQLAlchemy models as dicts
