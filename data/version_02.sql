-- Deploy cinevoraces:version_4 to pg

BEGIN;
-- WARNING. version_04.sql contain db seeding that will be impacted
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

CREATE OR REPLACE FUNCTION new_season(
season_to_add INT,
year_to_add INT,
first_episode DATE
) RETURNS void AS $$

DECLARE
    episode INT := 1;
    episode_date DATE;
BEGIN
  -- Create season if not exists
	IF NOT EXISTS (SELECT * FROM season WHERE season_to_add=season.number) THEN
		INSERT INTO "season"("number","year") VALUES
        (season_to_add,year_to_add);
		-- Create episodes
        episode_date := first_episode;
        WHILE EXTRACT(YEAR FROM episode_date) < (year_to_add + 1)
        LOOP
            INSERT INTO "episode" ("season_number","episode_number","publishing_date") VALUES
            (season_to_add,episode,episode_date);
            episode_date := episode_date + 7;
            episode := episode + 1;
		END LOOP;
	ELSE
		RAISE EXCEPTION 'Season (%) already exist', season_to_add;
	END IF;
END
$$LANGUAGE plpgsql;

COMMIT;
