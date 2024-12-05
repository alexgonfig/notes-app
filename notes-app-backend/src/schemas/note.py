from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional


class NoteBase(BaseModel):
    title: str = Field(..., min_length=3)
    content: str = Field(..., min_length=3)


class NoteCreate(NoteBase):
    pass  # Inherits properties from NoteBase

class NoteUpdate(NoteBase):
    updated_at: Optional[datetime] = None


class NoteResponse(NoteBase):
    id: int
    user_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True  # This tells Pydantic to treat SQLAlchemy models as dicts