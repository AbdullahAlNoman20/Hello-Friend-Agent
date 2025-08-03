# Book Recommender System

This project implements a **collaborative filtering-based book recommender system** using three algorithms: **Cosine Similarity**, **K-Nearest Neighbors (KNN)**, and **Random Forest**. It recommends books similar to a given book based on user ratings, using a dataset of books, users, and ratings. Below, we explain the datasets, preprocessing, and each algorithm with concise examples.

## Table of Contents
- [Overview](#overview)
- [Datasets](#datasets)
- [Preprocessing](#preprocessing)
- [Algorithms](#algorithms)
  - [Cosine Similarity](#cosine-similarity)
  - [K-Nearest Neighbors (KNN)](#k-nearest-neighbors-knn)
  - [Random Forest](#random-forest)
- [Usage](#usage)
- [Dependencies](#dependencies)
- [License](#license)

## Overview
The system recommends books by analyzing user rating patterns. Given a book (e.g., "Harry Potter and the Prisoner of Azkaban"), it suggests similar books based on how users have rated them. The algorithms identify books with similar user rating profiles, leveraging collaborative filtering.

## Datasets
The project uses three CSV files:
- **books.csv**: Contains book details (ISBN, Title, Author, Publication Year, Publisher, Image URLs).
- **users.csv**: Contains user information (User-ID, Location, Age).
- **ratings.csv**: Contains user ratings (User-ID, ISBN, Book-Rating from 0 to 10).

## Preprocessing
1. **Merging Datasets**: The `ratings` and `books` datasets are merged on `ISBN` to create `ratings_with_name`, linking ratings to book titles.
2. **Filtering Active Users**: Only users with more than 200 ratings are selected (`useres_with_more_than_200_rating`), resulting in 810 users.
3. **Filtering Popular Books**: Only books with at least 50 ratings are included (`famous_books`), resulting in 706 books.
4. **Pivot Table Creation**: A pivot table `pt` (706 books × 810 users) is created with `Book-Title` as rows, `User-ID` as columns, and `Book-Rating` as values. Missing ratings are filled with 0.

## Algorithms

### Cosine Similarity
**How it Works**:
- Computes the cosine of the angle between book rating vectors in the pivot table `pt`.
- Each book is a 810-dimensional vector of user ratings. Cosine similarity measures how aligned two books' rating patterns are, producing a 706 × 706 similarity matrix.
- For a given book, the top 4 books with the highest similarity scores are recommended.

**Example**:
For "Harry Potter and the Prisoner of Azkaban (Book 3)":
- The algorithm finds books with similar user ratings (e.g., other Harry Potter books rated highly by similar users).
- Output: Recommends "Harry Potter and the Goblet of Fire (Book 4)", "Harry Potter and the Chamber of Secrets (Book 2)", "Harry Potter and the Sorcerer’s Stone (Book 1)", and "Harry Potter and the Order of the Phoenix (Book 5)".

**Code Snippet**:
```python
from sklearn.metrics.pairwise import cosine_similarity
similarity_scores = cosine_similarity(pt)
index = np.where(pt.index == book_name)[0][0]
similar_items = sorted(list(enumerate(similarity_scores[index])), key=lambda x: x[1], reverse=True)[1:5]
```

### K-Nearest Neighbors (KNN)
**How it Works**:
- Uses the `NearestNeighbors` algorithm with Euclidean distance to find the 10 closest books to each book in `pt`.
- Distances are converted to similarities using `1 / (1 + distances / max(distances))` to normalize between 0 and 1.
- For a given book, the top 4 nearest neighbors (excluding the book itself) are recommended.

**Example**:
For "Harry Potter and the Prisoner of Azkaban (Book 3)":
- KNN identifies books with rating vectors closest in Euclidean space, which are typically other Harry Potter books due to similar rating patterns.
- Output: Same recommendations as Cosine Similarity (other Harry Potter books), as both methods capture similar user preferences.

**Code Snippet**:
```python
from sklearn.neighbors import NearestNeighbors
model = NearestNeighbors(n_neighbors=10, metric='euclidean')
model.fit(pt)
distances, indices = model.kneighbors(pt)
similarity_scores = 1 / (1 + distances / np.max(distances))
```

### Random Forest
**How it Works**:
- Trains a `RandomForestRegressor` on `final_ratings` using encoded `User-ID` and `ISBN` (`user_id`, `book_id`) to predict ratings.
- Creates a `pseudo_ratings` matrix (706 × 810) by predicting ratings for each book-user pair.
- Computes cosine similarity on `pseudo_ratings` to find similar books.
- Note: The current implementation in the notebook predicts ratings for all users, unlike the original, which used one user’s predictions, leading to improved recommendations.

**Example**:
For "Harry Potter and the Prisoner of Azkaban (Book 3)":
- The improved algorithm predicts ratings for all 810 users, creating a `pseudo_ratings` matrix that mimics `pt`.
- Output: Recommends other Harry Potter books (e.g., Books 4, 2, 1, and 5), aligning with Cosine Similarity and KNN due to similar rating patterns.

**Code Snippet**:
```python
from sklearn.ensemble import RandomForestRegressor
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X, y)
pseudo_ratings = np.zeros_like(pt)
for i, book_title in enumerate(pt.index):
    isbn = books[books['Book-Title'] == book_title]['ISBN'].iloc[0]
    book_id = book_codes[book_codes['ISBN'] == isbn]['book_id'].iloc[0]
    for j, user_id in enumerate(pt.columns):
        user_code = user_codes[user_id]
        input_df = pd.DataFrame([[user_code, book_id]], columns=['user_id', 'book_id'])
        pseudo_ratings[i, j] = model.predict(input_df)[0]
similarity_scores = cosine_similarity(pseudo_ratings)
```

## Usage
1. Clone the repository: `git clone <repo-url>`
2. Install dependencies: `pip install -r requirements.txt`
3. Run the Jupyter notebook (`Collaborative Filtering Based.ipynb`) in a Python environment.
4. Call the `recommend(book_name)` function with a book title, e.g., `recommend('Harry Potter and the Prisoner of Azkaban (Book 3)')`.
5. View the HTML output with the selected book and top 4 recommended books, including titles, authors, and cover images.

## Dependencies
- Python 3.10
- pandas
- numpy
- scikit-learn
- IPython (for HTML display)

Install them using:
```bash
pip install pandas numpy scikit-learn ipython
```

## License
This project is licensed under the MIT License.