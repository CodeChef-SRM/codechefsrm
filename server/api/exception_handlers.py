from fastapi.responses import JSONResponse


def invalid_data_handler(request, error):
    return JSONResponse(content={"error": str(error)}, status_code=400)


def auth_error_handler(request, error):
    return JSONResponse(content={"error": "Invalid credentials"}, status_code=error.status_code)


def data_error_handler(request, error):
    return JSONResponse(content={"error": str(error)}, status_code=error.status_code)
