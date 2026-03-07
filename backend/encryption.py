import hashlib
from cryptography.fernet import Fernet
import base64


def generate_key(emotion):

    hash_key = hashlib.sha256(emotion.encode()).digest()

    key = base64.urlsafe_b64encode(hash_key[:32])

    return key


def encrypt_message(text, emotion):

    key = generate_key(emotion)

    cipher = Fernet(key)

    encrypted = cipher.encrypt(text.encode())

    return encrypted.decode()


def decrypt_message(cipher_text, emotion):

    key = generate_key(emotion)

    cipher = Fernet(key)

    decrypted = cipher.decrypt(cipher_text.encode())

    return decrypted.decode()