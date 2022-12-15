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
LEFT JOIN ( SELECT movie.season_id, 
      COUNT(*) as mc 
      FROM movie 
      GROUP BY movie.season_id ) mc ON mc.season_id = "season".id;

COMMIT;
