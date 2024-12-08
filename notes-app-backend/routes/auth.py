from fastapi import APIRouter
from sqlalchemy.ext.asyncio import AsyncSession
from database import get_db_session
from fastapi import Depends
from schemas.user import UserCreate, UserLogin
from controllers.users import register_user, authenticate_user
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


# end point for testing purposes
@router.post("/validate")
async def validate(token_payload: dict = Depends(validate_auth)):
    return {"token_payload": token_payload}
