from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional


class NoteBase(BaseModel):
    title: str = Field(..., min_length=3, max_length=50, description="The note title must be between 3 and 50 characters.")
    content: str = Field(..., min_length=3, description="The note content must be of 3 characters long minimum.")


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