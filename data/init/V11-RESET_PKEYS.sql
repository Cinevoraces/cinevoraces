BEGIN;

SELECT pg_catalog.setval(pg_get_serial_sequence('genre',    'id'), MAX(id)) FROM "genre";
SELECT pg_catalog.setval(pg_get_serial_sequence('country',  'id'), MAX(id)) FROM "country";
SELECT pg_catalog.setval(pg_get_serial_sequence('language', 'id'), MAX(id)) FROM "language";
SELECT pg_catalog.setval(pg_get_serial_sequence('episode',  'id'), MAX(id)) FROM "episode";
SELECT pg_catalog.setval(pg_get_serial_sequence('movie',    'id'), MAX(id)) FROM "movie";
SELECT pg_catalog.setval(pg_get_serial_sequence('season',   'id'), MAX(id)) FROM "season";
SELECT pg_catalog.setval(pg_get_serial_sequence('user',     'id'), MAX(id)) FROM "user";

COMMIT;
