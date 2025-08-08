# Database Setup for Full-Text Search

This guide explains how to set up full-text search functionality for the footwear database.

## Current Search Implementation

The search functionality currently uses a fallback approach:

1. First tries to use Supabase's `textSearch` with a `search_vector` column
2. Falls back to `ilike` search if `textSearch` is not available

## Setting Up Full-Text Search (Optional)

To enable full-text search with better performance and relevance, you can set up a `search_vector` column in your Supabase database.

### Step 1: Enable the pg_trgm Extension

Run this SQL in your Supabase SQL editor:

```sql
-- Enable the pg_trgm extension for trigram matching
CREATE EXTENSION IF NOT EXISTS pg_trgm;
```

### Step 2: Add Search Vector Column

Run this SQL to add a search vector column to your footwear table:

```sql
-- Add search_vector column
ALTER TABLE footwear ADD COLUMN IF NOT EXISTS search_vector tsvector;

-- Create a function to update the search vector
CREATE OR REPLACE FUNCTION footwear_search_vector_update() RETURNS trigger AS $$
BEGIN
  NEW.search_vector :=
    setweight(to_tsvector('english', COALESCE(NEW.productname, '')), 'A') ||
    setweight(to_tsvector('english', COALESCE(NEW.brandname, '')), 'B') ||
    setweight(to_tsvector('english', COALESCE(NEW.details, '')), 'C') ||
    setweight(to_tsvector('english', COALESCE(NEW.maincatcode, '')), 'D');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update search_vector
DROP TRIGGER IF EXISTS footwear_search_vector_update ON footwear;
CREATE TRIGGER footwear_search_vector_update
  BEFORE INSERT OR UPDATE ON footwear
  FOR EACH ROW
  EXECUTE FUNCTION footwear_search_vector_update();

-- Update existing records
UPDATE footwear SET search_vector = footwear_search_vector_update();
```

### Step 3: Create Index for Better Performance

```sql
-- Create GIN index for fast full-text search
CREATE INDEX IF NOT EXISTS footwear_search_vector_idx ON footwear USING GIN (search_vector);
```

### Step 4: Update Existing Data

If you have existing data, update the search vectors:

```sql
-- Update all existing records
UPDATE footwear SET search_vector = footwear_search_vector_update();
```

## Current Search Fields

The search currently looks in these fields:

- `productname` - Product name (e.g., "Nike Air Max 270")
- `brandname` - Brand name (e.g., "Nike", "Adidas")
- `maincatcode` - Category code (e.g., "SHOES")
- `details` - Product details/description

## Testing the Search

After setting up the search vector, you can test it by:

1. Going to the main page
2. Using the search bar to search for terms like:
   - "Nike" (brand)
   - "Air Max" (product name)
   - "running" (details)
   - "SHOES" (category)

## Troubleshooting

If search is not working:

1. Check the browser console for error messages
2. Verify that your Supabase connection is working
3. Ensure the database table has the correct column names
4. Check if the `search_vector` column exists (if you set it up)

## Fallback Search

If full-text search is not set up, the application will automatically fall back to `ilike` search, which should work with the current database structure.
