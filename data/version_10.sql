-- Deploy cinevoraces:version_10 to pg
-- Added Character limitations to "pseudo" and "email" fields

BEGIN;

ALTER TABLE "user"
  ADD CONSTRAINT pseudolenght CHECK (char_length(pseudo) <= 32)
;
ALTER TABLE "user"
  ADD CONSTRAINT maillenght CHECK (char_length(mail) <= 64)
;

COMMIT;