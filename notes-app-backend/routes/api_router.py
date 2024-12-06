from fastapi import APIRouter
from . import auth, notes


router = APIRouter()


router.include_router(auth.router, prefix="/auth", tags=["Authentication"])
router.include_router(notes.router, prefix="/notes", tags=["Notes"])
