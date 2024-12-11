from sqlalchemy.ext.asyncio import AsyncSession
from fastapi.responses import JSONResponse
from services.notes import create_note, update_note, delete_note, get_note_by_id, get_all_notes
from schemas.note import NoteCreate, NoteUpdate, NoteResponse


async def get_all_user_notes(db_session: AsyncSession, token_payload: dict):
    try:
        user_notes = await get_all_notes(token_payload["user_id"], db_session)
        return user_notes
    except ValueError as e:
        return JSONResponse(status_code=400, content={
            "errors": [{"message": str(e)}]})


async def get_user_note_by_id(note_id: int, db_session: AsyncSession, token_payload: dict):
    try:
        existing_note = await get_note_by_id(note_id, token_payload["user_id"], db_session)
        return existing_note
    except ValueError as e:
        return JSONResponse(status_code=400, content={
            "errors": [{"message": str(e)}]})


async def create_new_note(note: NoteCreate, db_session: AsyncSession, token_payload: dict) -> NoteResponse:
    try:
        new_note = await create_note(note, db_session, token_payload)
        return new_note
    except ValueError as e:
        return JSONResponse(status_code=400, content={
            "errors": [{"message": str(e)}]})


async def update_existing_note(note_id: int, note: NoteUpdate, db_session: AsyncSession, token_payload: dict) -> NoteResponse:
    try:
        updated_note = await update_note(note_id, note, db_session, token_payload)
        return updated_note
    except ValueError as e:
        return JSONResponse(status_code=400, content={
            "errors": [{"message": str(e)}]})


async def delete_existing_note(note_id: int, db_session: AsyncSession, token_payload: dict):
    try:
        deleted_note = await delete_note(note_id, db_session, token_payload)
        return deleted_note
    except ValueError as e:
        return JSONResponse(status_code=400, content={
            "errors": [{"message": str(e)}]})
