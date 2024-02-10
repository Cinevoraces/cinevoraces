BEGIN;

ALTER TABLE public."user" ADD COLUMN is_verified BOOLEAN DEFAULT FALSE;
UPDATE public."user" SET is_verified = TRUE;

COMMIT;
