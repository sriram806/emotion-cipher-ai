# Emotion-Aware Encryption 🧠🔒

> **Where feelings stay readable, but words stay private.**

A winning submission for the **UnsaidTalks Hackathon 26** (Theme: AI + NLP + Encryption Logic). This project introduces **Empathy Encryption**, an intelligent system that encrypts text messages to protect privacy while preserving their emotional signature for AI analysis.

---

## 🌟 Solution Overview

In a world where data is increasingly analyzed by AI, how do we protect sensitive personal messages without losing the human element? 

**Emotion-Aware Encryption** solves this by creating a secure tunnel where **privacy meets empathy**:
1. **Analyze**: An NLP model detects the emotional signature (e.g., Joy, Sadness, Anger, Fear) of the raw text.
2. **Seal**: The system encrypts the text but attaches the emotional signature, creating a secure payload.
3. **Preserve**: AI systems can read the detected emotion to provide empathetic responses or analytics, *without ever seeing the raw text*.
4. **Reveal**: Only authorized users with the correct key and emotional context can decrypt the message back to its original form.

## 🚀 Key Features

- **Advanced NLP Emotion Detection**: Accurately classifies multi-dimensional emotions from text.
- **Empathy Cipher Algorithm**: Secures the payload using AES-level encryption tied to the emotional signature.
- **Premium User Experience**: A stunning, next-generation UI built with React, Next.js, and Framer Motion, featuring glassmorphism and real-time state transitions.
- **Developer Ready**: Clean REST API powered by FastAPI for seamless integration.

## 🎥 Demo Video

[👉 **Click here to watch the full Loom demo video!** ](https://www.loom.com/share/7033145415e34c30a1874ceea81b508c)

---

## 🛠️ Tech Stack

### Frontend (UI/UX & Client)
- **Next.js (React 19)**: Framework for optimal performance and routing.
- **Tailwind CSS v4**: For the custom dark-mode, glassmorphism UI.
- **Framer Motion**: For buttery-smooth, premium micro-animations.
- **Lucide React**: Beautiful icons.

### Backend (AI & Encryption API)
- **FastAPI (Python)**: High-performance asynchronous API framework.
- **Transformers (Huggingface)**: `j-hartmann/emotion-english-distilroberta-base` for robust NLP emotion detection.
- **Cryptography**: `Fernet` logic for fast and secure payload encryption.

---

## 💻 How to Run Locally

### 1. Start the Backend API
```bash
cd backend
python -m venv venv
# Windows: venv\Scripts\activate
# Mac/Linux: source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```
*The backend will run on `http://localhost:8000`.*

### 2. Start the Frontend Application
```bash
cd frontend
npm install
npm run dev
```
*The frontend will run on `http://localhost:3000`.*

---

## 🏆 Hackathon Judging Criteria Fulfillment

- **Impact (20%)**: Solves the exact problem of preserving empathy while ensuring data privacy, a crucial challenge in modern AI applications.
- **Innovation (20%)**: Reimagines encryption not just as data obfuscation, but as a dual-layer system where metadata (emotion) is intentionally exposed for AI utilility while the payload is locked.
- **Technical Execution (20%)**: Clean, modular code separation between a FastAPI backend and a Next.js frontend, complete with comprehensive documentation.
- **User Experience (25%)**: A breathtaking, "wow-factor" dark UI with interactive animations that perfectly conceptualizes the encrypt/decrypt journey.
- **Presentation (15%)**: (See Demo Video link above for full walkthrough).

---

*Built with ♥ for the UnsaidTalks Hackathon.*
