BEGIN;

CREATE OR REPLACE FUNCTION new_movie(
	title TEXT,
	original_title TEXT,
	poster_url TEXT,
	directors TEXT[],
	release_date DATE,
	runtime INT,
	casting TEXT[],
	presentation TEXT,
  movie_genres TEXT[],
	movie_languages TEXT[],
	movie_countries TEXT[],
	episode_id INT,
	user_id INT
) RETURNS void AS $$
DECLARE
	movie_id INT;
	g TEXT;
	genre_id INT;
	l TEXT;
	language_id INT;
	c TEXT;
	country_id INT;

BEGIN
	IF NOT EXISTS (SELECT * FROM movie WHERE title=movie.french_title) THEN
		INSERT INTO movie("french_title", "original_title", "poster_url", "directors", "release_date", "runtime", "casting", "presentation", "episode_id", "user_id")
		VALUES (title, original_title, poster_url, directors, release_date, runtime, casting, presentation, episode_id, user_id)
		RETURNING id INTO movie_id;
		-- Create genre if not exists
		FOREACH g IN ARRAY movie_genres
			LOOP
				IF NOT EXISTS (SELECT * FROM genre WHERE name=g) THEN
					INSERT INTO genre("name") SELECT g
					RETURNING id INTO genre_id;
				ELSE
					RAISE NOTICE 'Genre (%) déjà là', g;
					SELECT id INTO genre_id FROM genre WHERE genre.name=g;
				END IF;
				INSERT INTO movie_has_genre(movie_id, genre_id)
				SELECT movie_id, genre_id;
			END LOOP;
		-- Create language if not exists
		FOREACH l IN ARRAY movie_languages
			LOOP
				IF NOT EXISTS (SELECT * FROM "language" WHERE name=l) THEN
					INSERT INTO "language"("name") SELECT l
					RETURNING id INTO language_id;
				ELSE
					RAISE NOTICE 'Langue (%) déjà là', l;
					SELECT id INTO language_id FROM language WHERE language.name=l;
				END IF;
				INSERT INTO movie_has_language(movie_id, language_id)
				SELECT movie_id, language_id;
			END LOOP;
		-- Create country if not exists
		FOREACH c IN ARRAY movie_countries
			LOOP
				IF NOT EXISTS (SELECT * FROM country WHERE name=c) THEN
					INSERT INTO country("name") SELECT c
					RETURNING id INTO country_id;
				ELSE
					RAISE NOTICE 'Country (%) déjà là', c;
					SELECT id INTO country_id FROM country WHERE country.name=c;
				END IF;
				INSERT INTO movie_has_country(movie_id, country_id)
				SELECT movie_id, country_id;
			END LOOP;
	ELSE
		RAISE NOTICE 'Movie (%) déjà là', title;
	END IF;
END
$$ LANGUAGE plpgsql;

COMMIT;

-- MIGRATION DOWN
BEGIN;

DROP FUNCTION IF EXISTS new_movie;

COMMIT;