from passlib.context import CryptContext
from datetime import datetime, timedelta
from jose import JWTError, jwt
from models.user import User
from schemas.user import UserCreate
from database import get_db
from sqlalchemy.orm import Session
import os

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 45
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# verify hashed password
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

# hash a password
def get_password_hash(password):
    return pwd_context.hash(password)

# create a JWT token
def create_access_token(data: dict, expires_delta: timedelta = timedelta(minutes=15)):
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt