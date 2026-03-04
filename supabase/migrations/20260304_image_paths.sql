-- queries: image_path text → image_paths text[]
ALTER TABLE queries ADD COLUMN image_paths text[] NOT NULL DEFAULT '{}';
UPDATE queries SET image_paths = ARRAY[image_path] WHERE image_path IS NOT NULL;
ALTER TABLE queries DROP COLUMN image_path;

-- messages: image_path text → image_paths text[]
ALTER TABLE messages ADD COLUMN image_paths text[] NOT NULL DEFAULT '{}';
UPDATE messages SET image_paths = ARRAY[image_path] WHERE image_path IS NOT NULL;
ALTER TABLE messages DROP COLUMN image_path;
