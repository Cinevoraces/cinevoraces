BEGIN;

CREATE TABLE IF NOT EXISTS "genre"(
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "name" TEXT NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS  "language" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" TEXT NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS  "country" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" TEXT NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "season"(
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "number" INTEGER NOT NULL UNIQUE,
  "year" INTEGER NOT NULL UNIQUE,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS  "user" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "pseudo" TEXT NOT NULL UNIQUE,
  "mail" TEXT NOT NULL UNIQUE,
  "password" TEXT NOT NULL,
  "avatar_url" TEXT,
  "role" INT NOT NULL DEFAULT 0,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ 
);

CREATE TABLE IF NOT EXISTS "episode" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "season_number" INTEGER NOT NULL REFERENCES "season"("number"),
  "episode_number" INTEGER NOT NULL,
  "publishing_date" DATE NOT NULL
  );

CREATE TABLE IF NOT EXISTS "movie"(
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "french_title" TEXT NOT NULL,
  "original_title" TEXT NOT NULL,
  "poster_url" TEXT NOT NULL,
  "directors" TEXT[] NOT NULL,
  "release_date" DATE NOT NULL,
  "runtime" INTEGER NOT NULL,
  "casting" TEXT[] NOT NULL,
  "presentation" TEXT NOT NULL,
  "is_published" BOOLEAN DEFAULT 'false',
  "user_id" INTEGER NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "episode_id" INTEGER REFERENCES "episode"("id"),
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS  "review" (
  "user_id" INTEGER NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "movie_id" INTEGER NOT NULL REFERENCES "movie"("id") ON DELETE CASCADE,
  "bookmarked" BOOLEAN NOT NULL DEFAULT 'false',
  "viewed" BOOLEAN NOT NULL DEFAULT 'false',
  "liked" BOOLEAN NOT NULL DEFAULT 'false',
  "rating" INTEGER,
  "comment" TEXT,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ,
  PRIMARY KEY ("user_id", "movie_id")
);

CREATE TABLE IF NOT EXISTS "movie_has_genre" (
  "movie_id" INTEGER NOT NULL REFERENCES "movie"("id") ON DELETE CASCADE,
  "genre_id" INTEGER NOT NULL REFERENCES "genre"("id") ON DELETE CASCADE,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY ("movie_id","genre_id")
);

CREATE TABLE IF NOT EXISTS "movie_has_country" (
  "movie_id" INTEGER NOT NULL REFERENCES "movie"("id") ON DELETE CASCADE,
  "country_id" INTEGER NOT NULL REFERENCES "country"("id") ON DELETE CASCADE,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY ("movie_id","country_id")
);

CREATE TABLE IF NOT EXISTS "movie_has_language" (
  "movie_id" INTEGER NOT NULL REFERENCES "movie"("id") ON DELETE CASCADE,
  "language_id" INTEGER NOT NULL REFERENCES "language"("id") ON DELETE CASCADE,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY ("movie_id","language_id")
);

COMMIT;

-- MIGRATION DOWN
BEGIN;

DROP TABLE IF EXISTS "movie_has_language";
DROP TABLE IF EXISTS "movie_has_country";
DROP TABLE IF EXISTS "movie_has_genre";
DROP TABLE IF EXISTS "review";
DROP TABLE IF EXISTS "movie";
DROP TABLE IF EXISTS "episode";
DROP TABLE IF EXISTS "user";
DROP TABLE IF EXISTS "season";
DROP TABLE IF EXISTS "country";
DROP TABLE IF EXISTS "language";
DROP TABLE IF EXISTS "genre";

COMMIT;
