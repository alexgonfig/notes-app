from services.users import get_user_by_id, get_user_by_username, get_user_by_email, create_user, auth_user, get_user_data
from schemas.user import UserCreate, UserLogin
from models.user import User
import pytest
import pytest_asyncio
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker
from database import Base


db_url = "sqlite+aiosqlite:///:memory:"


@pytest_asyncio.fixture(scope="function")
async def test_db():

    # PostgreSQL database URL for testing
    engine = create_async_engine(db_url, echo=True)

    # Create tables in the PostgreSQL database
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    # Create an async sessionmaker
    async_session = sessionmaker(
        engine, expire_on_commit=False, class_=AsyncSession
    )

    # Yield an actual session for the test
    async with async_session() as session:
        yield session

    # Drop all tables after the test is done (clear all data)
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)

    # Dispose of the engine after the test completes
    await engine.dispose()


@pytest.fixture
def sample_user():
    return UserCreate(
        username="test_user",
        email="test_user@example.com",
        password="password123"
    )


@pytest.fixture
def sample_login_user():
    return UserLogin(
        username="test_user",
        password="password123"
    )


# Test: get_user_by_id
@pytest.mark.asyncio
async def test_get_user_by_id(test_db, sample_user):
    # Create a User object using the sample_user fixture
    user = User(
        username=sample_user.username,
        email=sample_user.email,
        password_hash="hashed_password"
    )

    # Add the user object to the session and commit the transaction
    test_db.add(user)
    await test_db.commit()

    # Refresh the user to get the ID assigned after the commit
    await test_db.refresh(user)

    # Fetch the user by ID using the service function
    result = await get_user_by_id(user.id, test_db)

    # Assertions to check that the user was added correctly
    assert result is not None
    assert result.username == sample_user.username


# Test: get_user_by_username
@pytest.mark.asyncio
async def test_get_user_by_username(test_db, sample_user):
    user = User(
        username=sample_user.username,
        email=sample_user.email,
        password_hash="hashed_password"
    )
    test_db.add(user)
    await test_db.commit()
    await test_db.refresh(user)

    result = await get_user_by_username(sample_user.username, test_db)
    assert result is not None
    assert result.email == sample_user.email


# Test: get_user_by_email
@pytest.mark.asyncio
async def test_get_user_by_email(test_db, sample_user):
    user = User(
        username=sample_user.username,
        email=sample_user.email,
        password_hash="hashed_password"
    )
    test_db.add(user)
    await test_db.commit()
    await test_db.refresh(user)

    result = await get_user_by_email(sample_user.email, test_db)
    assert result is not None
    assert result.username == sample_user.username


# Test: create_user
@pytest.mark.asyncio
async def test_create_user(test_db, sample_user):
    response = await create_user(sample_user, test_db)
    assert response.username == sample_user.username
    assert response.email == sample_user.email

    # Verifica que el usuario se agregó a la base de datos
    user_in_db = await get_user_by_username(sample_user.username, test_db)
    assert user_in_db is not None


# Test: auth_user
@pytest.mark.asyncio
async def test_auth_user(test_db, sample_user, sample_login_user):
    # Crear un usuario para autenticar
    await create_user(sample_user, test_db)

    response = await auth_user(sample_login_user, test_db)
    assert response.username == sample_user.username
    assert response.email == sample_user.email
    assert response.access_token is not None


# Test: get_user_data
@pytest.mark.asyncio
async def test_get_user_data(test_db, sample_user):
    created_user = await create_user(sample_user, test_db)
    user_data = await get_user_data(created_user.id, test_db)

    assert user_data.username == created_user.username
    assert user_data.email == created_user.email
