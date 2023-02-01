BEGIN;

-- TODO: Create a document table 
-- Columns: id | data(base64) | content-type | Type(enum screenshot, poster, avatar, ...)

-- TODO: Create a document_group table
-- Columns: id | entity_id | entity_type(enum movie, user) | document_id

-- TODO: Replace the movie.poster column with a document_group

-- TODO: Replace the user.avatar column with a document_group

-- TODO: Create a function that resolves a document using a document type and an entity id

COMMIT;
