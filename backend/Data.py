import csv
import json

# Load CSV and convert to JSON
csv_file = 'backend/product_data_mongodb.csv'
json_file = 'your_data.json'

data = []

with open(csv_file, mode='r', encoding='utf-8') as f:
    reader = csv.DictReader(f)  # each row becomes a dictionary
    for row in reader:
        data.append(row)

# Write to JSON file
with open(json_file, mode='w', encoding='utf-8') as f:
    json.dump(data, f, indent=4)

print("CSV has been converted to JSON.")
