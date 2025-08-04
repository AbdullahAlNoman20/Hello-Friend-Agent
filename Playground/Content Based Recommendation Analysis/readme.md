## Content-Based Recommendation Systems

This project implements four content-based recommendation models to suggest similar products based on product attributes (`color` and `materials`). All models use **TF-IDF** (Term Frequency-Inverse Document Frequency) to extract features from a `tags` column, which combines lowercase color names (duplicated for emphasis) and cleaned material descriptions. The models differ in how they compute similarity and generate recommendations, but all are evaluated using **Precision@10** (Precision@K), which measures the fraction of relevant items (sharing the same color or at least one material) in the top-10 recommendations.

### Dataset Preprocessing
The H&M dataset (`handm.csv`) contains product details like `productName`, `colorName`, and `materials`. Preprocessing steps include:
- Removing duplicates based on `productId`.
- Filtering out rows with missing `materials`.
- Cleaning `materials` using regex to extract material names and percentages (e.g., "cotton 100%"), removing punctuation, and normalizing spaces.
- Creating a `tags` column by concatenating lowercase `colorName` (twice) and cleaned `materials`.
- Dropping `colorName` and `materials` columns, retaining `color` for evaluation.

**Code Example (Cleaning Materials and Creating Tags)**:
```python
def clean_text(text):
    text = text.lower()
    material_pattern = r'(\w+(?:\s+\w+)*)\s*:\s*([\w\s]+)\s+(\d+%|\d+\.\d+%)(?=\s|$|,|\n)'
    material_matches = re.findall(material_pattern, text)
    standalone_material_pattern = r'material:\s*(\w+(?:\s+\w+)*)(?=\s|$|,|\n)'
    standalone_materials = re.findall(standalone_material_pattern, text)
    materials = [f"{match[1]} {match[2]}".strip() for match in material_matches]
    materials.extend(standalone_materials)
    cleaned_text = ' '.join(materials)
    cleaned_text = re.sub(r'[^\w\s%]', '', cleaned_text)
    cleaned_text = re.sub(r'\s+', ' ', cleaned_text).strip()
    return cleaned_text

new_df['materials'] = new_df['materials'].apply(clean_text)
new_df['tags'] = new_df['colorName'].str.lower() + ' ' + new_df['colorName'].str.lower() + ' ' + new_df['materials'].str.lower()
new_df['color'] = new_df['colorName']
new_df = new_df.drop(columns=['colorName', 'materials'])
new_df['tags'] = new_df['tags'].str.split().str.join(' ')
```

### Feature Extraction
All four models use **TF-IDF** to convert the `tags` column into numerical vectors, capturing the importance of words (e.g., colors, materials) while reducing the impact of common terms. The `TfidfVectorizer` is configured with `max_features=160` and English stop words to focus on meaningful terms.

**Code Example (TF-IDF Vectorization)**:
```python
tfidf = TfidfVectorizer(max_features=160, stop_words='english')
vectors = tfidf.fit_transform(new_df['tags']).toarray()
```

### Models Overview

1. **KNN Model**
   - **Approach**: Uses K-Nearest Neighbors (KNN) with cosine similarity on TF-IDF vectors to find the top-10 nearest products. Recommendations are filtered to exclude the input product.
   - **Mechanism**: Computes cosine distances between the input product’s vector and all others, selecting the closest neighbors.
   - **Strength**: Simple and effective for direct attribute-based similarity matching.
   - **Code Example**:
     ```python
     knn_model = NearestNeighbors(n_neighbors=10, metric='cosine', algorithm='brute')
     knn_model.fit(vectors)
     def recommend(cloth):
         cloth_index = new_df[new_df['productName'] == cloth].index[0]
         cloth_vector = vectors[cloth_index].reshape(1, -1)
         distances, indices = knn_model.kneighbors(cloth_vector, n_neighbors=10)
         recommended = [(idx, 1 - distances[0][i+1]) for i, idx in enumerate(indices[0][1:]) if new_df.iloc[idx]['productName'] != cloth][:5]
         return recommended
     ```

2. **Random Forest + Cosine Similarity Model**
   - **Approach**: Combines cosine similarity (weight: 0.7) with Random Forest (RF) classifier probabilities (weight: 0.3). The RF model is trained on TF-IDF vectors with `productName` as pseudo-labels to learn product-specific patterns.
   - **Mechanism**: Computes a weighted score combining cosine similarity and RF probabilities, selecting top-5 recommendations.
   - **Strength**: Attempts to capture complex patterns via RF, but pseudo-labels may introduce noise.
   - **Code Example**:
     ```python
     rf_model = RandomForestClassifier(n_estimators=100, random_state=42)
     rf_model.fit(vectors, label_encoder.fit_transform(new_df['productName']))
     def recommend(cloth):
         cloth_index = new_df[new_df['productName'] == cloth].index[0]
         distances = cosine_similarity(vectors)[cloth_index]
         cloth_vector = vectors[cloth_index].reshape(1, -1)
         rf_probs = rf_model.predict_proba(cloth_vector)[0]
         combined_scores = 0.7 * distances + 0.3 * rf_probs[label_encoder.transform(new_df['productName'])]
         cloth_list = sorted(list(enumerate(combined_scores)), reverse=True, key=lambda x: x[1])[1:10]
         recommended = [i for i in cloth_list if new_df.iloc[i[0]]['productName'] != cloth][:5]
         return recommended
     ```

3. **Hybrid Random Forest + KNN + Cosine Similarity Model**
   - **Approach**: Integrates cosine similarity (weight: 0.1), RF probabilities (weight: 0.2), and KNN similarity scores (weight: 0.7). Both RF and KNN are trained on TF-IDF vectors.
   - **Mechanism**: Combines scores from all three methods, prioritizing KNN (highest weight) to select top-5 recommendations.
   - **Strength**: Leverages multiple similarity signals for robust recommendations, balancing local (KNN), global (cosine), and learned (RF) patterns.
   - **Code Example**:
     ```python
     combined_scores = np.zeros(len(new_df))
     combined_scores += 0.1 * cosine_similarity(vectors)[cloth_index]
     rf_probs = rf_model.predict_proba(vectors[cloth_index].reshape(1, -1))[0]
     rf_contribution = np.zeros(len(new_df))
     for idx, label_idx in enumerate(label_encoder.transform(new_df['productName'])):
         if label_idx < len(rf_probs):
             rf_contribution[idx] = rf_probs[label_idx]
     combined_scores += 0.2 * rf_contribution
     knn_distances, knn_indices = knn_model.kneighbors(vectors[cloth_index].reshape(1, -1), n_neighbors=10)
     knn_scores = 1 - knn_distances[0]
     knn_contribution = np.zeros(len(new_df))
     for i, idx in enumerate(knn_indices[0]):
         if i < len(knn_scores) and idx < len(new_df):
             knn_contribution[idx] = knn_scores[i]
     combined_scores += 0.7 * knn_contribution
     ```

4. **TF-IDF + Cosine Similarity Model**
   - **Approach**: Uses cosine similarity directly on TF-IDF vectors to find the top-10 most similar products, filtered to exclude the input product.
   - **Mechanism**: Computes cosine similarity between the input product’s vector and all others, selecting the top-5 recommendations.
   - **Strength**: Lightweight and effective for attribute-based matching, similar to KNN but without the neighbor-based approach.
   - **Code Example**:
     ```python
     similarity = cosine_similarity(vectors)
     def recommend(cloth):
         cloth_index = new_df[new_df['productName'] == cloth].index[0]
         distances = similarity[cloth_index]
         cloth_list = sorted(list(enumerate(distances)), reverse=True, key=lambda x: x[1])[1:10]
         recommended = [i for i in cloth_list if new_df.iloc[i[0]]['productName'] != cloth][:5]
         return recommended
     ```

### Evaluation
All models were evaluated using **Precision@10**, defined as the fraction of the top-10 recommended items that are relevant (sharing the same `color` or at least one material in `tags`). Relevance is checked using:
```python
def is_relevant(item1_tags, item2_tags, item1_color, item2_color):
    item1_materials = set(item1_tags.split())
    item2_materials = set(item2_tags.split())
    return item1_color == item2_color or len(item1_materials.intersection(item2_materials)) > 0
```
Evaluation involves sampling the entire dataset (`sample_size = new_df.shape[0]`) to compute Precision@10 for each product and averaging the results.

**Evaluation Results (Precision@10)**:
- **KNN Model**: 0.9169
- **Random Forest + Cosine Similarity Model**: 0.8496
- **Hybrid Random Forest + KNN + Cosine Similarity Model**: **0.8141**
- **TF-IDF + Cosine Similarity Model**: 0.8122

**Highest Precision@10**: The **KNN Model** achieves the highest Precision@10 of **0.9169**, indicating that 91.69% of the top-10 recommendations are relevant on average.

### Analysis
- **KNN Model (0.9169)**: Excels due to its direct use of cosine similarity on TF-IDF vectors, effectively capturing attribute-based similarity (color and materials). Its simplicity avoids noise from additional components.
- **Random Forest + Cosine Similarity (0.8496)**: Underperforms due to the RF classifier’s reliance on noisy pseudo-labels (`productName`), which may not align well with attribute-based similarity, diluting the effectiveness of cosine similarity.
- **Hybrid Model (0.8141)**: Surprisingly lower than KNN, despite combining multiple signals. The low weight on cosine similarity (0.1) and high weight on KNN (0.7) may not optimally balance contributions, and RF’s noise may further reduce precision.
- **TF-IDF + Cosine Similarity (0.8122)**: Performs similarly to the Hybrid model, as it relies solely on cosine similarity of TF-IDF vectors. It’s slightly less effective than KNN, possibly due to differences in implementation or filtering.

### Why TF-IDF for All Models?
- **Consistency**: TF-IDF ensures a uniform feature representation across all models, focusing on key attributes (colors, materials) while downweighting common terms.
- **Effectiveness**: TF-IDF is well-suited for text-based attributes, providing sparse, high-dimensional vectors that capture term importance, ideal for cosine similarity and machine learning models.
- **Simplicity**: It’s computationally efficient and effective for small-to-medium datasets like H&M’s, avoiding the need for complex embeddings when the vocabulary is limited.

### Why Precision@10?
- **Relevance Focus**: Measures how well recommendations match the input product’s attributes, critical for content-based systems.
- **No User Data**: Without user feedback, Precision@10 uses a proxy (shared color or material), suitable for the dataset.
- **Comparability**: Consistent metric across all models, enabling fair comparison of their effectiveness.
- **User-Centric**: K=10 reflects a realistic number of recommendations a user might view, balancing precision and coverage.

### Conclusion
The **KNN Model** (Precision@10: 0.9169) is the most effective, leveraging TF-IDF’s robust feature representation and cosine similarity for accurate attribute-based recommendations. The Hybrid model, despite its complexity, underperforms due to suboptimal weighting and RF’s noisy contribution. Future improvements could involve:
- Tuning weights in the Hybrid model (e.g., increasing cosine similarity’s weight).
- Enhancing `tags` with additional features (e.g., product category, style).
- Incorporating user feedback for more robust evaluation.
- Experimenting with other embeddings (e.g., Word2Vec, as attempted initially) with larger datasets or pre-trained models.
