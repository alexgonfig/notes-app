from fastapi import FastAPI
from .routes.api_router import router as api_router

app = FastAPI()


# Root
@app.get("/")
def read_root():
    return {"message": "Hola desde FastAPI"}


# API ENDPOINTS
app.include_router(api_router, prefix='/api')
