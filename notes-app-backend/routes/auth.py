from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from database import get_db_session
from schemas.user import UserCreate, UserLogin
from controllers.users import register_user, authenticate_user, fetch_user_data
from services.auth import validate_auth

router = APIRouter()


# User registration
@router.post("/register")
async def register(user: UserCreate, db_session: AsyncSession = Depends(get_db_session)):
    return await register_user(user, db_session)


# User login
@router.post("/login")
async def login(user: UserLogin, db_session: AsyncSession = Depends(get_db_session)):
    return await authenticate_user(user, db_session)


# validate user token and return user data
@router.get("/validateToken")
async def validate(db_session: AsyncSession = Depends(get_db_session), token_payload: dict = Depends(validate_auth)):
    return await fetch_user_data(token_payload["user_id"], db_session)
