from pydantic import BaseModel

class LineResponse(BaseModel):
    id: int
    name: str