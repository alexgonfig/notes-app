from fastapi import APIRouter

router = APIRouter()


# User registration
@router.post("/register")
def auth_register():
    return {"message": "User registered successfully!"}


# User login
@router.post("/login")
def auth_login():
    return {"message": "User Logged in successfully!"}
