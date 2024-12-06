from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Models base class
Base = declarative_base()

# Create db connection URL with environment variables
db_username = os.getenv("DATABASE_USERNAME")
db_password = os.getenv("DATABASE_PASS")
db_name = os.getenv("DATABASE_NAME")
db_host = os.getenv("DATABASE_HOST")
db_port = os.getenv("DATABASE_PORT")

# PostgreSQL database URL
DATABASE_URL = f"postgresql+asyncpg://{db_username}:{db_password}@{db_host}:{db_port}/{db_name}"

# Async pg database engine
engine = create_async_engine(
    DATABASE_URL,
    echo=True,
)

# Async db sessions pool manager
async_session = sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False
)


# dependency to get a db session manager
async def get_db():
    async with async_session() as session:
        yield session
