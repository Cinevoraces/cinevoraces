-- Deploy cinevoraces:version_10 to pg
-- Created the following views:
--     seasonView: return all seasons with counters
-- Created the following functions:
--     new_season: create a new season and all its episodes

BEGIN;

DROP VIEW IF EXISTS seasonView;
CREATE VIEW seasonView AS

SELECT 
	"season".number as season_number, 
      "season".year,
      COALESCE(mc, 0::integer) as movie_count
FROM "season"
LEFT JOIN ( SELECT movie.season_id, 
      COUNT(*) as mc 
      FROM movie 
      GROUP BY movie.season_id ) mc ON mc.season_id = "season".id;


CREATE OR REPLACE FUNCTION new_season(first_episode DATE) 
RETURNS void AS $$

DECLARE
      -- Calculate new season values
      new_season INT = (SELECT MAX(season.number) + 1 FROM season);
      new_year INT = (SELECT MAX(season.year) + 1 FROM season);
      episode INT := 1;
      episode_date DATE;
BEGIN
      -- Create new season entry
      INSERT INTO "season"("number","year") VALUES (new_season, new_year);
	-- Create all season's episodes in proposition_slot table
      episode_date := first_episode;
      WHILE EXTRACT(YEAR FROM episode_date) < new_year
      LOOP
            INSERT INTO "proposition_slot" ("season_number","episode","publishing_date") VALUES
            (new_season, episode, episode_date);
            episode_date := episode_date + 7;
            episode := episode + 1;
	END LOOP;
END
$$ LANGUAGE plpgsql;

COMMIT;
