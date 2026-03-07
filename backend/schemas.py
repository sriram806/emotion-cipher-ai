from pydantic import BaseModel


class MessageRequest(BaseModel):
    message: str


class DecryptRequest(BaseModel):
    encrypted_text: str
    emotion: str