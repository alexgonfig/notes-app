from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from database import get_db_session
from schemas.note import NoteCreate, NoteUpdate
from services.auth import validate_auth
from controllers.notes import get_all_user_notes, get_user_note_by_id,create_new_note, update_existing_note, delete_existing_note

router = APIRouter()


# Get all user notes
@router.get("")
async def notes_get(db_session: AsyncSession = Depends(get_db_session), token_payload: dict = Depends(validate_auth)):
    return await get_all_user_notes(db_session, token_payload)


# Get user note by note id
@router.get("/{note_id}")
async def notes_get_by_id(note_id: int, db_session: AsyncSession = Depends(get_db_session), token_payload: dict = Depends(validate_auth)):
    return await get_user_note_by_id(note_id, db_session, token_payload)


# Create a new user note
@router.post("")
async def notes_create(note: NoteCreate, db_session: AsyncSession = Depends(get_db_session), token_payload: dict = Depends(validate_auth)):
    return await create_new_note(note, db_session, token_payload)


# Update a user note
@router.put("/{note_id}")
async def notes_update(note_id: int, note: NoteCreate, db_session: AsyncSession = Depends(get_db_session), token_payload: dict = Depends(validate_auth)):
    return await update_existing_note(note_id, note, db_session, token_payload)


# Delete a user note
@router.delete("/{note_id}")
async def notes_delete(note_id: int, db_session: AsyncSession = Depends(get_db_session), token_payload: dict = Depends(validate_auth)):
    return await delete_existing_note(note_id, db_session, token_payload)
