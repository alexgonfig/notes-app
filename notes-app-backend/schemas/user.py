from pydantic import BaseModel, Field, EmailStr, model_validator
from datetime import datetime
from typing import Optional


class UserBase(BaseModel):
    username: str = Field(
        ...,
        min_length=3,
        max_length=50,
        description="The username must be between 3 and 50 characters.")

    email: EmailStr = Field(
        ...,
        description="A valid email address.")


class UserCreate(UserBase):
    password_hash: str = Field(
        ...,
        min_length=8,
        max_length=100,
        alias="password",
        description="Password hash must be at least 8 characters long.")


class UserUpdate(UserBase):
    password_hash: Optional[str] = Field(
        default=None,
        min_length=8,
        max_length=100,
        alias="password",
        description="Password hash must be at least 8 characters long.")

    updated_at: Optional[datetime] = Field(
        default=None,
        description="The timestamp of the last update."
    )


class UserResponse(UserBase):
    id: int
    created_at: datetime
    updated_at: datetime
    enabled: bool

    class Config:
        orm_mode = True
        from_attributes = True


class UserLogin(BaseModel):
    username: Optional[str] = Field(
        None,
        min_length=3,
        max_length=50,
        description="The username must be between 3 and 50 characters."
    )
    email: Optional[EmailStr] = Field(
        None,
        description="A valid email address."
    )
    password: str = Field(
        ...,
        min_length=8,
        max_length=100,
        description="Password must be at least 8 characters long."
    )

    @model_validator(mode="before")
    @classmethod
    def validate_username_or_email(cls, values):
        username = values.get('username')
        email = values.get('email')

        if not username and not email:
            raise ValueError("Debe ingresar un nombre de usuario o email.")
        if username and email:
            raise ValueError("Solo un nombre de usuario o email se puede ingresar a la vez")
        return values


class UserLoginResponse(UserBase):
    access_token: str