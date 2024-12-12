from pydantic import BaseModel, Field, model_validator, ValidationError
from datetime import datetime
from typing import Optional


class NoteBase(BaseModel):
    title: str = Field(
        ...,
        min_length=3,
        max_length=50,
        description="El título de la nota debe contener entre 3 y 50 caracteres.",
    )
    content: str = Field(
        ...,
        min_length=3,
        description="El contenido de la nota debe contener un minimo de 3 caracteres.",
    )

    @model_validator(mode="before")
    @classmethod
    def validate_title_content(cls, values):
        title = values.get('title')
        content = values.get('content')

        if not title:
            raise ValueError("Debe ingresar un titulo para la nota")

        if not content:
            raise ValueError("Debe ingresar contenido para la nota")

        if len(title) < 3 or len(title) > 50:
            raise ValueError(
                "El título de la nota debe tener entre 3 y 50 caracteres.")

        if len(content) < 3:
            raise ValueError(
                "El contenido de la nota debe tener al menos 3 caracteres.")

        return values


class NoteCreate(NoteBase):
    pass


class NoteUpdate(NoteBase):
    updated_at: datetime


class NoteResponse(BaseModel):
    id: int
    user_id: int
    title: str
    content: str
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True
        from_attributes = True
