from pydantic import BaseModel, Field, model_validator
from datetime import datetime
from typing import Optional


class NoteBase(BaseModel):
    title: str = Field(
        ...,
        min_length=3,
        max_length=50,
        description="The note title must be between 3 and 50 characters.",
    )
    content: str = Field(
        ...,
        min_length=3,
        description="The note content must be at least 3 characters long.",
    )

"""     @model_validator(mode="before")
    @classmethod
    def validate_title_and_content(cls, values):
        title = values.get('title')
        content = values.get('content')

        if not title or not title.strip():
            raise ValueError("Debe ingresar un titulo para la nota")
        if not content or not content.strip():
            raise ValueError("Debe ingresar contenido para la nota")

        return values """


class NoteCreate(NoteBase):
    pass


class NoteUpdate(NoteBase):
    updated_at: Optional[datetime] = None


class NoteResponse(NoteBase):
    id: int
    user_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True
        from_attributes = True
