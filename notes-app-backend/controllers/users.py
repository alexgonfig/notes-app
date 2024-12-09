from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import HTTPException
from schemas.user import UserCreate, UserResponse, UserLogin, UserLoginResponse
from services.users import create_user, auth_user


async def register_user(user: UserCreate, db_session: AsyncSession) -> UserResponse:
    try:
        new_user = await create_user(user, db_session)
        return new_user
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


async def authenticate_user(user: UserLogin, db_session) -> UserLoginResponse:
    try:
        user_data = await auth_user(user, db_session)
        return user_data
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
