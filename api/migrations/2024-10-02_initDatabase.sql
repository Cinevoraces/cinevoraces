BEGIN;

INSERT INTO public."user" ("mail", "password", "pseudo", "role", "created_at")
VALUES ('lol@lol.fr', 'lol', 'lol', 1, NOW());

COMMIT;
