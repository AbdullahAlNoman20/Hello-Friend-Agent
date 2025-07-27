# run in ml-model/ folder
from sklearn.linear_model import LogisticRegression
import joblib

X = ["i am happy", "this is bad", "i love this", "i hate it"]
y = ["joy", "anger", "joy", "anger"]

from sklearn.feature_extraction.text import CountVectorizer
vec = CountVectorizer()
X_vec = vec.fit_transform(X)

model = LogisticRegression()
model.fit(X_vec, y)

# Save pipeline
from sklearn.pipeline import make_pipeline
pipe = make_pipeline(vec, model)
joblib.dump(pipe, "model.pkl")
