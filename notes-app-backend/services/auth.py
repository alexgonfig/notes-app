from fastapi import Request, HTTPException
from passlib.context import CryptContext
from datetime import datetime, timedelta
from jose import JWTError, jwt, ExpiredSignatureError
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
def create_access_token(data: dict, expires_delta: timedelta = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)):
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


# validate a JWT token and return the payload
def validate_access_token(access_token):
    payload = jwt.decode(access_token, SECRET_KEY, algorithms=[ALGORITHM])
    return payload


# middleware for validating authentication tokens
def validate_auth(request: Request):
    authorization: str = request.headers.get("Authorization")

    # Validate if the Authorization header existsF
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(
            status_code=400,
            detail="Authorization header missing or malformed"
        )

    access_token: str = authorization.split("Bearer ")[1]

    try:
        payload: dict = validate_access_token(access_token)
        return payload
    except ExpiredSignatureError:
        raise HTTPException(
            status_code=401, detail="La sesión del usuario ha expirado"
        )
    except JWTError:
        raise HTTPException(
            status_code=403, detail="Invalid token"
        )
