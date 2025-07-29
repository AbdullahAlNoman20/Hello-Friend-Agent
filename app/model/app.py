from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib

app = Flask(__name__)
CORS(app)  # allows requests from React

# Load your ML model (replace with your actual file)
model = joblib.load("model.pkl")
vectorizer = joblib.load("vectorizer.pkl")


@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()
        print("Received data:", data)

        text = data.get("text", "")
        if not text:
            return jsonify({"error": "No text provided"}), 400

        # Transform and predict
        text_vector = vectorizer.transform([text])
        prediction = model.predict(text_vector)[0]
        print("Prediction:", prediction)

        return jsonify({"emotion": prediction})

    except Exception as e:
        print("Prediction error:", e)
        return jsonify({"error": "Could not get prediction"}), 500

    # Predict emotion from text
    prediction = model.predict([text])[0]  # model expects a list of texts
    return jsonify({'emotion': prediction})

if __name__ == '__main__':
    app.run(port=5000, debug=True)
