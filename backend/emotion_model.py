from transformers import pipeline

# Upgraded to GoEmotions (28 distinct emotion categories) for much higher fidelity
classifier = pipeline(
    "text-classification",
    model="SamLowe/roberta-base-go_emotions",
    top_k=None # Get all scores to filter by threshold
)

def detect_emotion(text):
    results = classifier(text)[0]
    
    # Filter emotions with a confidence score > 0.15 to support robust multi-emotion output
    significant_emotions = [r["label"] for r in results if r["score"] > 0.15]
    
    # Fallback if no strong emotion is detected
    if not significant_emotions:
        significant_emotions = [results[0]["label"]]
        
    return " + ".join(significant_emotions)