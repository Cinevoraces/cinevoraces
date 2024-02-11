BEGIN;

-- Auto update "updated_at" fields
CREATE FUNCTION fill_updated_at () RETURNS TRIGGER AS $$
	BEGIN
		NEW.updated_at = NOW();
		RETURN NEW;
	END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_ua_fields_user BEFORE
UPDATE ON "user" FOR EACH ROW
EXECUTE FUNCTION fill_updated_at ();

CREATE TRIGGER update_ua_fields_movie BEFORE
UPDATE ON "movie" FOR EACH ROW
EXECUTE FUNCTION fill_updated_at ();

CREATE TRIGGER update_ua_fields_review BEFORE
UPDATE ON "review" FOR EACH ROW
EXECUTE FUNCTION fill_updated_at ();

COMMIT;

-- MIGRATION DOWN
BEGIN;

DROP TRIGGER IF EXISTS update_ua_fields_user ON "user";

DROP TRIGGER IF EXISTS update_ua_fields_movie ON "movie";

DROP TRIGGER IF EXISTS update_ua_fields_review ON "review";

DROP FUNCTION IF EXISTS fill_updated_at;

COMMIT;