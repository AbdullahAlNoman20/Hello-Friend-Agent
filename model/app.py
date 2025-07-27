# ml-model/app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib

app = Flask(__name__)
CORS(app)  # Allow cross-origin (from React)

# Load pre-trained emotion model
model = joblib.load('model.pkl')  # make sure model.pkl exists

@app.route('/predict', methods=['POST'])
def predict_emotion():
    data = request.get_json()
    text = data.get('text')

    if not text:
        return jsonify({'error': 'No text provided'}), 400

    # Predict using the ML model
    prediction = model.predict([text])[0]

    return jsonify({'emotion': prediction})

if __name__ == '__main__':
    app.run(port=5000, debug=True)
# ml-model/app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib

app = Flask(__name__)
CORS(app)  # Allow cross-origin (from React)

# Load pre-trained emotion model
model = joblib.load('model.pkl')  # make sure model.pkl exists

@app.route('/predict', methods=['POST'])
def predict_emotion():
    data = request.get_json()
    text = data.get('text')

    if not text:
        return jsonify({'error': 'No text provided'}), 400

    # Predict using the ML model
    prediction = model.predict([text])[0]

    return jsonify({'emotion': prediction})

if __name__ == '__main__':
    app.run(port=5000, debug=True)
