from fastapi.exceptions import HTTPException


def pagination_helper(page, limit):
    try:
        page = abs(int(page))
        assert page != 0, "page number can't be zero"
    except (ValueError, AssertionError) as e:
        raise HTTPException(status_code=400, detail=str(e))

    skip = (limit * page) - limit
    return skip
