BEGIN;

CREATE
OR REPLACE FUNCTION new_season (
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
$$ LANGUAGE plpgsql;

COMMIT;

-- MIGRATION DOWN
BEGIN;

DROP FUNCTION new_season;

COMMIT;