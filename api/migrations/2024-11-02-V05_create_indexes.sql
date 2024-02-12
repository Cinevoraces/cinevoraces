BEGIN;

CREATE INDEX country_idx ON country USING btree (id);

CREATE INDEX genre_idx ON genre USING btree (id);

CREATE INDEX language_idx ON language USING btree (id);

CREATE INDEX movie_idx ON movie USING btree (id);

CREATE INDEX movie_has_country_idx ON movie_has_country USING btree (movie_id, country_id);

CREATE INDEX movie_has_genre_idx ON movie_has_genre USING btree (movie_id, genre_id);

CREATE INDEX movie_has_language_idx ON movie_has_language USING btree (movie_id, language_id);

CREATE INDEX review_idx ON review USING btree (movie_id, user_id);

CREATE INDEX season_idx ON season USING btree (id);

CREATE INDEX user_idx ON "user" USING btree (id);

COMMIT;

-- MIGRATION DOWN
BEGIN;

DROP INDEX IF EXISTS country_idx;

DROP INDEX IF EXISTS genre_idx;

DROP INDEX IF EXISTS language_idx;

DROP INDEX IF EXISTS movie_idx;

DROP INDEX IF EXISTS movie_has_country_idx;

DROP INDEX IF EXISTS movie_has_genre_idx;

DROP INDEX IF EXISTS movie_has_language_idx;

DROP INDEX IF EXISTS review_idx;

DROP INDEX IF EXISTS season_idx;

DROP INDEX IF EXISTS user_idx;

COMMIT;