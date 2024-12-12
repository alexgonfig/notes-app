import pytest
import pytest_asyncio
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from models.note import Note
from schemas.note import NoteCreate, NoteUpdate
from database import Base
from services.notes import (
    create_note,
    get_note_by_id,
    get_all_notes,
    update_note,
    delete_note
)

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
def token_payload():
    return {"user_id": 1}

# Test cases


@pytest.mark.asyncio
async def test_create_note(test_db, token_payload):
    note_data = NoteCreate(title="Test Title", content="<b>Test Content</b>")
    response = await create_note(note_data, test_db, token_payload)

    assert response["message"] == "Nota creada con exito!"
    assert "noteId" in response

    # Validate that the note was saved in the database
    saved_note = await get_note_by_id(response["noteId"], token_payload["user_id"], test_db)
    assert saved_note is not None
    assert saved_note.title == "Test Title"
    assert saved_note.content == "<b>Test Content</b>"


@pytest.mark.asyncio
async def test_get_note_by_id(test_db, token_payload):
    # Prepopulate a note
    note = Note(user_id=token_payload["user_id"],
                title="Note 1", content="Content 1")
    test_db.add(note)
    await test_db.commit()
    await test_db.refresh(note)

    # Fetch the note
    fetched_note = await get_note_by_id(note.id, token_payload["user_id"], test_db)

    assert fetched_note is not None
    assert fetched_note.id == note.id
    assert fetched_note.title == "Note 1"


@pytest.mark.asyncio
async def test_get_all_notes(test_db, token_payload):
    # Prepopulate multiple notes
    notes = [
        Note(user_id=token_payload["user_id"],
             title=f"Note {i}", content=f"Content {i}")
        for i in range(1, 4)
    ]
    test_db.add_all(notes)
    await test_db.commit()

    # Fetch all notes
    notes_response = await get_all_notes(token_payload["user_id"], test_db)

    assert len(notes_response) == 3    


@pytest.mark.asyncio
async def test_update_note(test_db, token_payload):
    # Prepopulate a note
    note = Note(user_id=token_payload["user_id"],
                title="Old Title", content="Old Content")
    test_db.add(note)
    await test_db.commit()
    await test_db.refresh(note)

    # Update the note
    updated_data = NoteUpdate(
        title="New Title", content="New Content", updated_at=note.updated_at)
    response = await update_note(note.id, updated_data, test_db, token_payload)

    assert response["message"] == "Nota actualizada con exito!"

    # Validate the update
    updated_note = await get_note_by_id(note.id, token_payload["user_id"], test_db)
    assert updated_note.title == "New Title"
    assert updated_note.content == "New Content"


@pytest.mark.asyncio
async def test_delete_note(test_db, token_payload):
    # Prepopulate a note
    note = Note(user_id=token_payload["user_id"],
                title="To Delete", content="Delete Content")
    test_db.add(note)
    await test_db.commit()
    await test_db.refresh(note)

    # Delete the note
    response = await delete_note(note.id, test_db, token_payload)

    assert response["message"] == "La nota fue eliminada exitosamente"

    # Validate deletion
    deleted_note = await get_note_by_id(note.id, token_payload["user_id"], test_db)
    assert deleted_note is None