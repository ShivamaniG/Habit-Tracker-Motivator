from flask import Flask, jsonify
import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity

app = Flask(__name__)

# Load and preprocess data
def load_data():
    data = pd.read_csv("data.csv")
    return data

def recommend_habits(user_habits):
    # Define possible habit suggestions
    habit_library = [
        {"title": "Drink Water", "description": "Stay hydrated by drinking 8 glasses of water daily.", "category": "health"},
        {"title": "Morning Stretch", "description": "Start your day with a 5-minute stretching session.", "category": "fitness"},
        {"title": "Read a Book", "description": "Develop your mind by reading at least 20 pages daily.", "category": "learning"},
        {"title": "Plan Your Day", "description": "Increase productivity by planning tasks for the day.", "category": "productivity"},
        {"title": "Meditate", "description": "Relax and focus with 10 minutes of daily meditation.", "category": "mindfulness"}
    ]
    
    # Vectorize habit categories
    categories = [habit["category"] for habit in habit_library]
    vectorizer = CountVectorizer()
    vectorizer.fit(categories)
    vectors = vectorizer.transform(categories).toarray()

    # User habit vector
    user_vector = vectorizer.transform([" ".join(user_habits)]).toarray()

    # Calculate similarity
    similarities = cosine_similarity(user_vector, vectors).flatten()
    
    # Sort by similarity and recommend top 3 habits
    recommended_indices = np.argsort(-similarities)[:3]
    recommendations = [habit_library[i] for i in recommended_indices]

    return recommendations


@app.route("/generate-habit-suggestions", methods=["GET"])
def generate_habit_suggestions():
    # Simulate user's existing habits (can be replaced with dynamic user data)
    user_habits = ["health", "fitness"]
    
    # Get recommendations
    recommendations = recommend_habits(user_habits)
    return jsonify(recommendations)

if __name__ == "__main__":
    app.run(debug=True)
