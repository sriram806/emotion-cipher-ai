import json
import csv
import sys
import os
import glob
import joblib
import nltk
import mlflow
import mlflow.sklearn
import pandas as pd
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import make_pipeline
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, accuracy_score, f1_score

# Ensure necessary NLTK data is downloaded
try:
    nltk.data.find('corpora/stopwords')
except LookupError:
    nltk.download('stopwords')
try:
    nltk.data.find('tokenizers/punkt')
except LookupError:
    nltk.download('punkt')
try:
    nltk.data.find('tokenizers/punkt_tab')
except LookupError:
    nltk.download('punkt_tab')


def preprocess_text(text):
    """
    Basic NLP preprocessing: lowercase, remove punctuation, remove stopwords.
    """
    stop_words = set(stopwords.words('english'))
    # Tokenize and lowercase
    word_tokens = word_tokenize(text.lower())
    # Remove non-alphabetic tokens and stopwords
    filtered_text = " ".join([w for w in word_tokens if w.isalpha() and w not in stop_words])
    return filtered_text

def load_goemotions_dataset(dataset_dir):
    """
    Load the 3 GoEmotions CSV files using Pandas.
    Extract the 'text' column and find the dominant emotion column (which are one-hot encoded).
    """
    print(f"Loading datasets from {dataset_dir}...")
    csv_files = glob.glob(os.path.join(dataset_dir, "*.csv"))
    
    if not csv_files:
        raise ValueError(f"No CSV files found in {dataset_dir}")
        
    df_list = []
    for file in csv_files:
        print(f"Reading {file}...")
        df_list.append(pd.read_csv(file))
        
    # Combine all parts
    full_df = pd.concat(df_list, ignore_index=True)
    print(f"Combined dataset shape: {full_df.shape}")
    
    # The GoEmotions dataset has 'text' and multiple one-hot encoded emotion columns.
    # We need to extract the emotion label for each row.
    
    # Assuming columns other than these non-emotion ones are the emotion labels:
    non_emotion_cols = ['text', 'id', 'author', 'subreddit', 'link_id', 'parent_id', 'created_utc', 'rater_id', 'example_very_unclear']
    emotion_cols = [col for col in full_df.columns if col not in non_emotion_cols]
    
    print(f"Detected emotion columns: {len(emotion_cols)}")
    
    # We need a single label for our simple classifier.
    # For rows with multiple emotions, we can just pick the first one, or duplicate the row.
    # Here we pick the emotion with the maximum value (1), or 'neutral' if none.
    
    dataset = []
    
    # Iterate fast using pandas itertuples or apply
    # To keep it simple, we'll extract texts and the argmax emotion per row
    for index, row in full_df.iterrows():
        text = row['text']
        
        # Check if the text is valid
        if not isinstance(text, str) or pd.isna(text):
            continue
            
        # Find which emotion columns have a 1
        active_emotions = [col for col in emotion_cols if row[col] == 1]
        
        target_emotion = "neutral"
        if active_emotions:
            # Just take the first one for simplicity in this basic ML model
            target_emotion = active_emotions[0]
            
        dataset.append({"text": text, "emotion": target_emotion})
        
    print(f"Successfully processed {len(dataset)} examples.")
    return dataset

def load_dataset(filepath):
    """
    Load a dataset from a JSON or CSV file (Legacy format fallback).
    """
    dataset = []
    print(f"Loading custom dataset from {filepath}...")
    if filepath.endswith('.json'):
        with open(filepath, 'r', encoding='utf-8') as f:
            dataset = json.load(f)
    elif filepath.endswith('.csv'):
        # Just use pandas for simple CSVs too
        df = pd.read_csv(filepath)
        if 'text' in df.columns and 'emotion' in df.columns:
            for _, row in df.iterrows():
                dataset.append({"text": str(row['text']), "emotion": str(row['emotion'])})
    else:
        raise ValueError("Unsupported file format. Please provide a .json or .csv file.")
    
    return dataset

def train_model(dataset_path=None):
    print("Preparing data...")
    # Prioritize the full_dataset directory if it exists and no path was provided
    default_full_dataset_dir = os.path.join(os.path.dirname(__file__), "full_dataset")
    
    data = []
    if dataset_path and os.path.isdir(dataset_path):
         data = load_goemotions_dataset(dataset_path)
    elif dataset_path and os.path.isfile(dataset_path):
         data = load_dataset(dataset_path)
    elif os.path.exists(default_full_dataset_dir) and os.path.isdir(default_full_dataset_dir):
        print("Found full_dataset directory. Using it for training...")
        data = load_goemotions_dataset(default_full_dataset_dir)
    else:
        raise ValueError("No dataset found! Please provide a --dataset argument or place CSVs in the 'full_dataset/' folder.")
        
    if not data:
        print("Dataset is empty. Aborting.")
        return
        
    X = [item["text"] for item in data]
    y = [item["emotion"] for item in data]
    
    # Optionally preprocess text elements manually, though TfidfVectorizer does a lot of this.
    # X_preprocessed = [preprocess_text(text) for text in X]
    X_preprocessed = X # Skipping manual for simplicity, Tfidf will handle stopwords if configured
    
    # Split the dataset
    X_train, X_test, y_train, y_test = train_test_split(X_preprocessed, y, test_size=0.2, random_state=42)
    
    # Initialize MLflow experiment
    mlflow.set_experiment("emotion_cipher_custom_model")
    
    with mlflow.start_run():
        print("Building the ML pipeline...")
        # Define Hyperparameters
        tfidf_kwargs = {'stop_words': 'english', 'lowercase': True, 'max_features': 50000}
        nb_kwargs = {'alpha': 1.0}
        
        mlflow.log_params({
            "dataset_examples": len(X),
            "tfidf_max_features": tfidf_kwargs['max_features'],
            "nb_alpha": nb_kwargs['alpha']
        })
        
        pipeline = make_pipeline(
            TfidfVectorizer(**tfidf_kwargs),
            MultinomialNB(**nb_kwargs)
        )
        
        print("Training the Custom Emotion Model...")
        pipeline.fit(X_train, y_train)
        
        print("Evaluating the Model...")
        y_pred = pipeline.predict(X_test)
        
        acc = accuracy_score(y_test, y_pred)
        f1 = f1_score(y_test, y_pred, average='macro', zero_division=0)
        
        mlflow.log_metrics({
            "accuracy": acc,
            "f1_score_macro": f1
        })
        
        print(f"Accuracy: {acc:.4f} | F1 (Macro): {f1:.4f}")
        print(classification_report(y_test, y_pred, zero_division=0))
        
        # Save the model artifact to MLflow
        mlflow.sklearn.log_model(pipeline, "emotion_classifier_pipeline")
        
        # Also save the local joblib for current API loading
        model_filename = "custom_emotion_model.joblib"
        joblib.dump(pipeline, model_filename)
        print(f"Model saved locally to {model_filename} and logged to MLflow via tracking.")

if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser(description='Train Custom Emotion Model')
    parser.add_argument('--dataset', type=str, help='Path to a custom dataset (.json or .csv)')
    args = parser.parse_args()
    
    train_model(args.dataset)
