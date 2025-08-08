from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import make_pipeline
from sklearn.model_selection import train_test_split
import pandas as pd
import joblib

# Sample dataset (replace this with your actual data)
data = {
    "text": [
        "I'm so happy today",
        "This is terrible news",
        "I feel very sad and down",
        "What a wonderful experience!",
        "I'm angry about this",
        "I'm feeling great and joyful",
        "I'm disappointed",
    ],
    "label": [
        "joy",
        "anger",
        "sadness",
        "joy",
        "anger",
        "joy",
        "sadness",
    ],
}

# Convert to DataFrame
df = pd.DataFrame(data)

# Split
X_train, X_test, y_train, y_test = train_test_split(df["text"], df["label"], test_size=0.2)

# Vectorizer and model
vectorizer = TfidfVectorizer()
X_train_vec = vectorizer.fit_transform(X_train)

model = LogisticRegression()
model.fit(X_train_vec, y_train)

# Save model and vectorizer
joblib.dump(model, "model.pkl")
joblib.dump(vectorizer, "vectorizer.pkl")

print("✅ Model and vectorizer saved successfully.")
