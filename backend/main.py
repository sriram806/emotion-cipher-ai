from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from emotion_model import detect_emotion
from encryption import encrypt_message, decrypt_message
from schemas import MessageRequest, DecryptRequest

app = FastAPI(title="Emotion Cipher AI")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/encrypt")
def encrypt_text(data: MessageRequest):

    message = data.message

    emotion = detect_emotion(message)

    encrypted = encrypt_message(message, emotion)

    return {
        "encrypted_text": encrypted,
        "emotion": emotion
    }


@app.post("/decrypt")
def decrypt_text(data: DecryptRequest):

    decrypted = decrypt_message(data.encrypted_text, data.emotion)

    return {
        "message": decrypted,
        "emotion": data.emotion
    }