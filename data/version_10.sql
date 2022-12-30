-- Deploy cinevoraces:version_10 to pg
-- Created the following views:
--     seasonView: return all seasons with counters

BEGIN;

DROP VIEW IF EXISTS seasonView;
CREATE VIEW seasonView AS

SELECT 
	"season".number as season_number, 
      "season".year,
      COALESCE(mc, 0::integer) as movie_count
FROM "season"
LEFT JOIN ( 
      SELECT episode.season_number, COUNT(*) as mc FROM movie
            LEFT JOIN episode ON movie.episode_id = episode.id
            GROUP BY episode.season_number
      ) mc ON mc.season_number = "season".number;

COMMIT;
