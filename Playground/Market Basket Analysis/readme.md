## Market Basket Analysis

This project performs **Market Basket Analysis** on a transactional dataset (`transactional_data.csv`) from a retail environment to uncover patterns of items frequently purchased together. The analysis uses the **Apriori algorithm** to identify frequent itemsets and generates **association rules** to predict product combinations. The dataset is preprocessed to create a basket representation, and results are visualized to highlight insights. Evaluation is implicit through the strength of association metrics (support, confidence, lift).

### Dataset Preprocessing
The dataset contains columns like `OrderNumber` and `ProductName`, representing transactions. Preprocessing steps include:
- Dropping rows with missing `OrderNumber` values.
- Grouping transactions by `OrderNumber` to create a list of `ProductName` items per order, forming a basket.
- Converting the basket into a binary transaction matrix using `TransactionEncoder` for Apriori analysis.

**Code Example (Creating the Basket)**:
```python
df.dropna(subset='OrderNumber', inplace=True)
basket = df.groupby('OrderNumber')['ProductName'].apply(list)
te = TransactionEncoder()
te_ary = te.fit(basket).transform(basket)
df_basket = pd.DataFrame(te_ary, columns=te.columns_)
```

### Methodology
- **Feature Representation**: The binary transaction matrix (`df_basket`) indicates the presence (1) or absence (0) of each product in an order.
- **Frequent Itemsets**: The Apriori algorithm identifies itemsets with a minimum support of 0.01 (1% of transactions), focusing on pairs and higher combinations.
- **Association Rules**: Rules are generated with a minimum confidence of 0.5, ranked by lift to prioritize strong associations.
- **Visualization**:
  - **Bar Plot**: Displays the top-10 frequent item pairs by support percentage.
  - **Bar Plot**: Shows the top-10 association rules by lift.
  - **Heatmap**: Visualizes lift values between antecedents and consequents for the top rules.

**Code Example (Apriori and Rules)**:
```python
frequent_itemsets = apriori(df_basket, min_support=0.01, use_colnames=True)
rules = association_rules(frequent_itemsets, metric='confidence', min_threshold=0.5)
top_rules = rules.sort_values(by="lift", ascending=False).head(10)
```

### Key Components
1. **Frequent Itemsets Identification**:
   - Uses Apriori to find itemsets occurring in at least 1% of transactions.
   - Filters for itemsets with more than one item and ranks the top-10 by support.
   - **Visualization**: A horizontal bar plot shows support percentages, aiding in identifying popular combinations.

2. **Association Rules Generation**:
   - Generates rules with confidence ≥ 0.5, measuring the likelihood of the consequent given the antecedent.
   - Ranks rules by lift, which indicates the strength of association beyond random chance.
   - **Visualization**: A horizontal bar plot highlights the top-10 rules by lift, showing predictive power.

3. **Heatmap Visualization**:
   - Creates a crosstab of lift values between antecedents and consequents for the top-10 rules.
   - **Visualization**: A heatmap with annotations displays lift values, revealing patterns in rule strength.

### Evaluation
- **Implicit Evaluation**: The analysis relies on association metrics (support, confidence, lift) rather than a traditional precision metric, as Market Basket Analysis focuses on discovering patterns rather than ranking relevance.
- **Support**: Measures the frequency of itemsets (e.g., top pair support ranges from ~1% to higher values).
- **Confidence**: Ensures rules are reliable (≥ 0.5), indicating a strong conditional probability.
- **Lift**: Highlights the most significant associations (e.g., top lifts exceed 1, showing positive correlation).
- **Findings**: The top-10 rules by lift and frequent item pairs provide actionable insights for cross-selling or product placement, though specific values depend on the dataset’s size and distribution.

**Code Example (Evaluation Visualization)**:

**Frequent Itemsets Visualization**

```python
# Filter more than 1-item itemsets and get top 10 by support
top_pairs = frequent_itemsets[frequent_itemsets["itemsets"].apply(lambda x: len(x) > 1)]
top_pairs = top_pairs.sort_values(by="support", ascending=False).head(10)

# Step 3: Convert itemsets to string for labeling
pairs = top_pairs["itemsets"].apply(lambda x: ', '.join(sorted(list(x))))
support_values = top_pairs["support"] * 100  # Convert to percentage

# Step 4: Plot
plt.figure(figsize=(10, 6))
bars = plt.barh(pairs, support_values, color="#66b2b2")

# Add labels to bars
for bar, support in zip(bars, support_values):
  plt.text(bar.get_width() + 0.5, bar.get_y() + bar.get_height()/2, f"{support:.2f}%", va='center', ha='left', color="black", fontsize=10)

plt.xlabel('Support (% of Orders)')
plt.ylabel('Item Pair')
plt.title("Top 10 Frequent Item Pairs")
plt.gca().spines['top'].set_visible(False)
plt.gca().spines['right'].set_visible(False)
plt.gca().invert_yaxis()  # Highest support at the top
plt.tight_layout()
plt.show()
```

<img width="984" height="590" alt="image" src="https://github.com/user-attachments/assets/0795e93e-6ebd-4132-82fb-8b3fd6c50849" />

**Rules Visualization**

```python
# Get top 10 rules by lift
top_rules = rules.sort_values(by="lift", ascending=False).head(10)

# Step 3: Create readable labels for rule pairs (antecedent → consequent)
pairs = top_rules.apply(lambda row: f"{', '.join(sorted(row['antecedents']))} → {', '.join(sorted(row['consequents']))}", axis=1)

# Step 4: Extract lift values
lift_values = top_rules["lift"]

# Step 5: Plot
plt.figure(figsize=(10, 6))
bars = plt.barh(pairs, lift_values, color="#3399cc")

# Add text labels to bars
for bar, lift in zip(bars, lift_values):
  plt.text(bar.get_width() + 0.05, bar.get_y() + bar.get_height() / 2, f"{lift:.2f}", va='center', ha='left', color="black", fontsize=10)

# Final formatting
plt.xlabel('Lift')
plt.ylabel('Association Rule')
plt.title('Top 10 Association Rules by Lift')
plt.gca().spines['top'].set_visible(False)
plt.gca().spines['right'].set_visible(False)
plt.gca().invert_yaxis()  # Highest lift at top
plt.tight_layout()
plt.show()
```

<img width="1004" height="590" alt="image" src="https://github.com/user-attachments/assets/1533eceb-e1db-48eb-9a21-4bcf89f19b56" />

**Heatmap Visualization**

```python
# Convert frozensets to strings for better handling
top_rules['antecedents_str'] = top_rules['antecedents'].apply(lambda x: ', '.join(sorted(x)))
top_rules['consequents_str'] = top_rules['consequents'].apply(lambda x: ', '.join(sorted(x)))

# Create heatmap data using string columns
heatmap_data = pd.crosstab(
    top_rules['antecedents_str'],
    top_rules['consequents_str'],
    values=top_rules['lift'],
    aggfunc='mean'
)

heatmap_data = heatmap_data.fillna(0)

# Plot the heatmap
plt.figure(figsize=(10, 8))
sns.heatmap(
    heatmap_data,
    annot=True,
    cmap='Blues',
    cbar_kws={'label': 'Lift'},
    fmt='.2f',
    linewidths=0.5
)
plt.title('Heatmap of Lift Values for Top Association Rules')
plt.xticks(rotation=45, ha='right')
plt.xlabel('Consequents')
plt.ylabel('Antecedents')
plt.tight_layout()
plt.show()
```
<img width="971" height="790" alt="image" src="https://github.com/user-attachments/assets/ba2b63b1-a11a-4955-964f-3f5d6b59a977" />


### Results
- **Frequent Item Pairs**: The top-10 pairs by support (e.g., 1% to higher percentages) indicate commonly co-purchased items, visualized in a bar plot.
- **Top Association Rules**: The top-10 rules by lift (e.g., values > 1) suggest strong predictive associations, visualized in a bar plot and heatmap.
- **Insight**: High-lift rules (e.g., specific product combinations) can guide marketing strategies, though exact values require running the code on the dataset.

### Why This Approach?
- **Apriori Algorithm**: Efficient for finding frequent itemsets in transactional data, scalable with the minimum support threshold.
- **Association Rules**: Provide actionable insights (e.g., “if A, then B”) for retail strategies like bundling or promotions.
- **Visualization**: Bar plots and heatmaps make results interpretable for stakeholders, focusing on support and lift as key metrics.
- **No User Feedback Needed**: Unlike recommendation systems, Market Basket Analysis relies on transaction patterns, making it suitable for the given dataset.

### Conclusion
This Market Basket Analysis effectively identifies frequent itemsets and association rules from the H&M transactional data, with the top-10 rules by lift offering the strongest insights for cross-selling. The use of TF-IDF is not applicable here, as the focus is on binary transactions rather than text features. Future enhancements could include:
- Adjusting `min_support` or `min_threshold` to capture more or less frequent patterns.
- Incorporating additional metrics (e.g., leverage, conviction) for deeper analysis.
- Scaling to larger datasets with optimized implementations (e.g., parallel processing).
