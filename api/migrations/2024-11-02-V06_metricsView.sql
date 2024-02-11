BEGIN;

DROP VIEW IF EXISTS metricsView;
CREATE VIEW metricsView AS

SELECT sc.ct "seasons_count",mc.ct "movies_count",cc.ct "countries_count"
FROM
	(SELECT COUNT (*) ct FROM "season")sc,
	(SELECT COUNT (*) ct FROM "movie" WHERE is_published = 'true')mc,
	(SELECT COUNT (*) ct FROM "country")cc
;

COMMIT;

-- MIGRATION DOWN
BEGIN;

DROP VIEW IF EXISTS metricsView;

COMMIT;
