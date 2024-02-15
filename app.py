from flask import Flask, render_template, request, jsonify
import joblib
from sklearn.feature_extraction.text import TfidfVectorizer

app = Flask(__name__)

# Load your trained model and vectorizer
model = joblib.load('logistic_regression_model.pkl')
vectorizer = joblib.load('tfidf_vectorizer.pkl')

# Assuming these are the label names from your dataset
label_names = ['toxic', 'severe_toxic', 'obscene', 'threat', 'insult', 'identity_hate']

@app.route('/')
def home():
    return render_template('index.html')  # Ensure you have an 'index.html' file in the templates folder

@app.route('/predict', methods=['POST'])
def predict():
    if request.method == 'POST':
        comment = request.form['comment']
        comment_tfidf = vectorizer.transform([comment])
        prediction = model.predict(comment_tfidf)
        # Convert prediction to label names
        predicted_labels = [label_names[i] for i, value in enumerate(prediction[0]) if value == 1]
        print('predicted labels', jsonify(predicted_labels))
        return jsonify(predicted_labels)

if __name__ == '__main__':
    app.run(debug=True)
