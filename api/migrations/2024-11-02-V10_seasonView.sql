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
            LEFT JOIN episode ON movie.episode_id = episode.id AND movie.is_published = TRUE
            GROUP BY episode.season_number
      ) mc ON mc.season_number = "season".number;

COMMIT;

-- MIGRATION DOWN
BEGIN;

DROP VIEW IF EXISTS seasonView;

COMMIT;
