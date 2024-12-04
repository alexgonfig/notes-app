from fastapi import APIRouter

router = APIRouter()


# Get all user notes
@router.get("")
def notes_get():
    return {"notes": []}


# Get user note by note id
@router.get("/{note_id}")
def notes_get_by_id(note_id: int):
    return {"note_id": note_id}


# Create a new user note
@router.post("")
def notes_create():
    return {"message": "User note created successfully!"}


# Update a user note
@router.put("/{note_id}")
def notes_update(note_id: int):
    return {"message": "User note updated successfully!", "note_id": note_id}


# Delete a user note
@router.delete("/{note_id}")
def notes_delete(note_id: int):
    return {"message": "User note deleted successfully!", "note_id": note_id}
