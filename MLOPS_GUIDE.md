# Emotion Cipher AI - MLOps Guide

This project features a fully custom machine-learning-based emotion detection framework augmented with MLOps capabilities including MLflow tracking, Inference Observability (Loguru), and Docker containerization.

## Prerequisites

Ensure your Python virtual environment is set up and NLTK, MLflow, Scikit-Learn, Pandas, Joblib, and Loguru are installed.
You can install the requirements securely using:
```bash
pip install -r backend/requirements.txt
```

## 1. Preparing the Dataset

We use a large CSV-based text dataset (typically the `goemotions` dataset comprised of 3 chunked CSV files). 
By default, the training scraper will search for these text CSVs inside the `backend/full_dataset/` directory.

### Training the Model
To start training and let MLflow automatically track your metrics (Accuracy, F1, precision):
```bash
# Navigate to backend
cd backend/

# Execute the training pipeline
python train_custom_model.py
```
> **Note:** If you want to run a completely different dataset (even a single JSON file instead of the 3 part CSV), you can provide it via an argument:
> `python train_custom_model.py --dataset path/to/my_data.json`

## 2. Using MLflow (Tracking)

After the `train_custom_model.py` finishes, it will generate a directory called `mlruns/`. 
This folder holds a ledger of all your training attempts and their hyperparameters (like TFIDF ranges) so you can compare the best models.

To view the dashboard and see the metrics visually in your browser:
```bash
cd backend/
mlflow ui
```
*Then open `http://127.0.0.1:5000` in your web browser.*

## 3. Serving Predictions (Hybrid AI)

The backend endpoints seamlessly blend your Custom ML Model `.joblib` with an incredibly powerful HuggingFace deep-learning model called `SamLowe/roberta-base-go_emotions`.

When you run the backend server:
```bash
cd backend/
uvicorn main:app --reload
```
A system logger `inference.log` will begin. When the API decrypts or encrypts messages:
1. It tries the Custom Scikit-learn model first.
2. If the probability confidence is **> 0.60 (60%)**, it immediately responds with your customized output.
3. If it is uncertain, it automatically flags the logger and runs the heavy Deep Learning fallback model. 

### Inference Log
You can tail the real-time inference observability log:
```bash
tail -f backend/inference.log
```
The logs will show explicit structural reports detailing latencies, text lengths, confidence values, and tags like `[CUSTOM_MODEL]` or `[AI_MODEL]`.

## 4. Containerizing with Docker

For production scalability, the ML framework is bundled into an isolated Docker image.
```bash
# Build the MLOps image
docker build -t emotion-cipher-backend ./backend

# Run the inference container on port 8000
docker run -p 8000:8000 emotion-cipher-backend
```
