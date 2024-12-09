from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from routes import api_router
from starlette.exceptions import HTTPException as StarletteHTTPException
from pydantic import ValidationError


app = FastAPI()


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
