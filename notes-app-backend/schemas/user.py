from pydantic import BaseModel, Field, EmailStr
from datetime import datetime
from typing import Optional


class UserBase(BaseModel):
    username: str = Field(..., min_length=3, max_length=50,
                          description="The username must be between 3 and 50 characters.")
    email: EmailStr = Field(..., description="A valid email address.")
    password_hash: str = Field(..., min_length=8, max_length=100,
                               description="Password hash must be at least 8 characters long.")


class UserCreate(UserBase):
    pass  # Inherits properties from UserBase


class UserUpdate(UserBase):
    updated_at: Optional[datetime] = Field(
        default=None, description="The timestamp of the last update.")


class UserResponse(UserBase):
    id: int
    created_at: datetime
    updated_at: datetime
    enabled: bool

    class Config:
        orm_mode = True  # This tells Pydantic to treat SQLAlchemy models as dicts
