from fastapi.responses import JSONResponse


def invalid_data_handler(request, error):
    return JSONResponse(content={"error": str(error)}, status_code=400)


def invalid_webhook_handler(request, error):
    return JSONResponse(content={"error": str(error)}, status_code=403)


def admin_exists_handler(request, error):
    return JSONResponse(content={"error": str(error)}, status_code=409)
