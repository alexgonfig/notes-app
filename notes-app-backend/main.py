from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.exc import OperationalError
from sqlalchemy.sql import text
from utilities.database import format_query_result
from database import get_db
from routes import api_router

app = FastAPI()


# Root
@app.get("/")
async def read_root(db: AsyncSession = Depends(get_db)):
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
