from fastapi import Depends, FastAPI
from fastapi.responses import JSONResponse
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.exc import OperationalError
from sqlalchemy.sql import text
from utilities.database import format_query_result
from database import get_db_session
from routes import api_router
from starlette.exceptions import HTTPException as StarletteHTTPException

# custom FastAPI exception handler
def custom_http_exception_handler(request, exc: StarletteHTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"message": exc.detail},  # Custom format for error response
    )


app = FastAPI()


# Register the custom exception handler
app.add_exception_handler(StarletteHTTPException,
                          custom_http_exception_handler)


# Root
@app.get("/")
async def read_root(db: AsyncSession = Depends(get_db_session)):
    try:
        # Executing raw SQL query
        result = await db.execute(text("SELECT * FROM users"))
        # Convert the result to a list of dictionaries using the keys of each row
        users = await format_query_result(result)
        # Returning the users list
        return {"message": "users list", "users": users}
    except OperationalError as e:
        print(f"error while executing query: {e}")
        return {"error": "Database query failed"}

# API ENDPOINTS
app.include_router(api_router, prefix='/api')
