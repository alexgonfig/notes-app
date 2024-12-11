from sqlalchemy.ext.asyncio import AsyncSession
from fastapi.responses import JSONResponse
from schemas.user import UserCreate, UserResponse, UserLogin, UserLoginResponse
from services.users import create_user, auth_user, get_user_data


async def register_user(user: UserCreate, db_session: AsyncSession) -> UserResponse:
    try:
        new_user = await create_user(user, db_session)
        return new_user
    except ValueError as error:
        error_message = str(error)
        return JSONResponse(
            status_code=400,
            content={"errors": [{"message": error_message}]}
        )


async def authenticate_user(user: UserLogin, db_session) -> UserLoginResponse:
    try:
        user_data = await auth_user(user, db_session)
        return user_data
    except ValueError as error:
        error_message = str(error)
        return JSONResponse(
            status_code=400,
            content={"errors": [{"message": error_message}]}
        )


async def fetch_user_data(user_id: int, db_session) -> UserResponse:
    try:
        user_data = await get_user_data(user_id, db_session)
        return user_data
    except ValueError as error:
        error_message = str(error)
        return JSONResponse(
            status_code=400,
            content={"errors": [{"message": error_message}]}
        )
