-- Deploy cinevoraces:version_9 to pg

BEGIN;

-- Public user object
DROP VIEW IF EXISTS public_user;

CREATE VIEW public_user AS
      SELECT 
      u.id,
      u.pseudo,
      u.mail,
      u.avatar_url,
      u.role,
      u.created_at
      FROM "user" u;
COMMIT;