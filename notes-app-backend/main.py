from fastapi import FastAPI

app = FastAPI()

# API ENDPOINTS


# Root
@app.get("/")
def read_root():
    return {"message": "Hola desde FastAPI"}


# User registration
@app.post("/api/auth/register")
def auth_register():
    return {"message": "User registered successfully!"}


# User login
@app.post("/api/auth/login")
def auth_login():
    return {"message": "User Logged in successfully!"}


# Get all user notes
@app.get("/api/notes")
def notes_get():
    return {"notes": []}


# Get user note by note id
@app.get("/api/notes/{note_id}")
def notes_get_by_id(note_id: int):
    return {"note_id": note_id}


# Create a new user note
@app.post("/api/notes")
def notes_create():
    return {"message": "User note created successfully!"}


# Update a user note
@app.put("/api/notes/{note_id}")
def notes_update(note_id: int):
    return {"message": "User note updated successfully!", "note_id": note_id}


# Delete a user note
@app.delete("/api/notes/{note_id}")
def notes_delete(note_id: int):
    return {"message": "User note deleted successfully!", "note_id": note_id}
