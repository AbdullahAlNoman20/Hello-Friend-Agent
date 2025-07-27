import { useState } from "react";
import axios from "axios";

const EmotionTester = () => {
  const [text, setText] = useState("");
  const [prediction, setPrediction] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTest = async () => {
    if (!text.trim()) {
      setPrediction("Please enter some text.");
      return;
    }

    setLoading(true);
    setPrediction("");

    try {
      const res = await axios.post("http://127.0.0.1:5000/predict", { text });
      setPrediction(`Predicted Emotion: ${res.data.emotion}`);
    } catch (err) {
      console.error(err);
      setPrediction("Error: Could not get prediction.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 border rounded-lg shadow-md bg-white mt-10">
      <h2 className="text-2xl font-bold mb-4">Test Your Emotion</h2>
      <textarea
        className="w-full p-2 border rounded-md mb-4"
        rows="4"
        placeholder="Type something here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        onClick={handleTest}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "Predicting..." : "Submit"}
      </button>
      {prediction && <p className="mt-4 text-lg">{prediction}</p>}
    </div>
  );
};

export default EmotionTester;
