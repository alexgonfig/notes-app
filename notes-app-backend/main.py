from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.exceptions import RequestValidationError
from fastapi.openapi.utils import get_openapi
from routes import api_router
import os


app = FastAPI(title="Notes App API",
              version="1.0.0",
              )

# allowed origins
origins = [
    os.getenv("FRONTEND_ORIGIN")  # frontend origin
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    # Custom Spanish error messages
    error_messages = {
        'string_too_short': 'El valor de {loc} debe tener al menos {limit_value} caracteres.',
        'string_too_long': 'El valor de {loc} debe tener como máximo {limit_value} caracteres.',
        'value_error.missing': 'El campo {loc} es obligatorio.',
        'type_error': 'El campo {loc} debe ser de tipo {type}.'
    }

    custom_errors = [
        {
            "message": error_messages.get(error["type"], error["msg"]).format(
                # Get only the last element in loc (field name)
                loc=error["loc"][-1],
                limit_value=error.get("ctx", {}).get("limit_value", ""),
                type=error.get("type", ""),
            ),
            # Get only the last element in loc (field name)
            "field": error["loc"][-1]
        }
        for error in exc.errors()
    ]

    return JSONResponse(
        status_code=422,
        content={"errors": custom_errors}
    )


# API ENDPOINTS
app.include_router(api_router, prefix='/api')
