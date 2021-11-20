from fastapi.responses import JSONResponse


def invalid_data_handler(*args, **kwargs):
    return JSONResponse(content={"error": "invalid data"}, status_code=400)
