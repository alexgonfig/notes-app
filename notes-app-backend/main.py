from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from routes import api_router
from starlette.exceptions import HTTPException as StarletteHTTPException
from pydantic import ValidationError
import os


app = FastAPI()

# allowed origins
origins = [
    os.getenv("FRONTEND_ORIGIN"),  # frontend origin
    "http://localhost:3000",  # fallback alternate frontend origin
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)


# ValidationError exception handler
@app.exception_handler(ValidationError)
async def custom_validation_exception_handler(request: Request, exc: ValidationError):
    # Check if the error type is a missing body
    errors = exc.errors()
    for error in errors:
        if error["type"] == "missing" and error["loc"] == ("body",):
            return JSONResponse(
                status_code=422,
                content={
                    "message": "El cuerpo de la solicitud no puede estar vacío. Por favor, proporcione datos válidos."},
            )
    # Default handling for other validation errors
    return JSONResponse(
        status_code=422,
        content={"message": "Hubo un error de validación.", "details": errors},
    )


# Generic expection handler
@app.exception_handler(StarletteHTTPException)
async def custom_http_exception_handler(request: Request, exc: StarletteHTTPException):
    # Custom handling for HTTPException
    return JSONResponse(
        status_code=exc.status_code,
        content={"message": exc.detail},  # Custom format for error response
    )


# API ENDPOINTS
app.include_router(api_router, prefix='/api')
