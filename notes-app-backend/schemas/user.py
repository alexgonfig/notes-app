from pydantic import BaseModel, Field, EmailStr, model_validator, validator
from datetime import datetime
from typing import Optional


class UserBase(BaseModel):
    username: str = Field(
        ...,
        min_length=3,
        max_length=50,
        description="El nombre de usuario debe tener entre 3 y 50 caracteres.")

    email: EmailStr = Field(
        ...,
        description="Debe ingresar una dirección valida de email.")


class UserCreate(UserBase):
    password_hash: str = Field(
        ...,
        min_length=8,
        max_length=100,
        alias="password",
        description="La contraseña debe tener un minimo de 8 caracteres.")

    @model_validator(mode="before")
    @classmethod
    def validate_user_create_data(cls, values):
        username = values.get('username')
        email = values.get('email')
        password = values.get('password')

        if not username:
            raise ValueError("Debe ingresar un nombre de usuario")

        if not email:
            raise ValueError("Debe ingresar un email")

        if not password:
            raise ValueError("Debe ingresar una contraseña")

        if len(username) < 3 or len(username) > 50:
            raise ValueError(
                "El nombre de usuario debe tener entre 3 y 50 caracteres.")

        if len(password) < 8:
            raise ValueError(
                "La contraseña debe tener un minimo de 8 caracteres.")

        return values


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
        description="El nombre de usuario debe tener entre 3 y 50 caracteres."
    )
    email: Optional[EmailStr] = Field(
        None,
        description="Debe ingresar una dirección valida de email."
    )
    password: str = Field(
        ...,
        min_length=8,
        max_length=100,
        description="La contraseña debe tener un minimo de 8 caracteres."
    )

    @model_validator(mode="before")
    @classmethod
    def validate_username_or_email(cls, values):
        username = values.get('username')
        email = values.get('email')

        if not username and not email:
            raise ValueError("Debe ingresar un nombre de usuario o email.")
        if username and email:
            raise ValueError(
                "Solo un nombre de usuario o email se puede ingresar a la vez")
        return values


class UserLoginResponse(UserBase):
    access_token: str
