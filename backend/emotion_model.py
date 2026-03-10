import os
import joblib
import numpy as np
import time
from loguru import logger
from transformers import pipeline
from transformers import pipeline
# Configure Loguru to write to an inference tracking log file
logger.add("inference.log", rotation="10 MB", retention="10 days", level="INFO")

# AI Model (Deep Learning Full Fidelity)
classifier = pipeline(
    "text-classification",
    model="SamLowe/roberta-base-go_emotions",
    top_k=None # Get all scores to filter by threshold
)

# Load Custom ML Model if available
CUSTOM_MODEL_PATH = "custom_emotion_model.joblib"
custom_model = None
if os.path.exists(CUSTOM_MODEL_PATH):
    try:
        custom_model = joblib.load(CUSTOM_MODEL_PATH)
        logger.info(f"Loaded custom emotion model from {CUSTOM_MODEL_PATH}")
    except Exception as e:
        logger.error(f"Warning: Failed to load custom model: {e}")

def detect_emotion(text):
    start_time = time.time()
    text_length = len(text)
    
    # Try the Custom ML Model first
    if custom_model:
        # Get probability distribution
        probs = custom_model.predict_proba([text])[0]
        max_prob_idx = np.argmax(probs)
        confidence = probs[max_prob_idx]
        predicted_emotion = custom_model.classes_[max_prob_idx]
        
        # If the custom model is confident, use it
        if confidence > 0.6:  # Threshold can be adjusted
            latency = (time.time() - start_time) * 1000
            logger.info(f"[CUSTOM_MODEL] Emotion: {predicted_emotion} | Conf: {confidence:.2f} | Latency: {latency:.2f}ms | Length: {text_length}")
            return predicted_emotion
        else:
            logger.warning(f"[FALLBACK_TRIGGERED] Custom model uncertain (Conf: {confidence:.2f}). Routing to AI model...")

    # Fallback to Advanced AI (Transformers)
    results = classifier(text)[0]
    
    # Filter emotions with a confidence score > 0.15 to support robust multi-emotion output
    significant_emotions = [r["label"] for r in results if r["score"] > 0.15]
    
    # Fallback if no strong emotion is detected
    if not significant_emotions:
        significant_emotions = [results[0]["label"]]
        
    final_emotion = " + ".join(significant_emotions)
    
    latency = (time.time() - start_time) * 1000
    ai_confidence = results[0]["score"] if results else 0.0
    logger.info(f"[AI_MODEL] Emotion: {final_emotion} | Conf: {ai_confidence:.2f} | Latency: {latency:.2f}ms | Length: {text_length}")
    
    return final_emotion