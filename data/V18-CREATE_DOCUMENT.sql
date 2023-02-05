BEGIN;

----------------------------------------------------------------------------------------------------
--------------------------------------- Create document tables -------------------------------------
----------------------------------------------------------------------------------------------------
CREATE TABLE "document_group" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TABLE  "document" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "document_group_id" INTEGER NOT NULL REFERENCES "document_group"("id") ON DELETE CASCADE,
  "data" bytea NOT NULL,
  "content_type" VARCHAR(100) NOT NULL,
  "type" INT NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX document_group_id_index ON document (document_group_id);

-- Retrieve all poster_url and avatar_url
SELECT json_build_object(
  'movies', (SELECT json_agg(json_build_object('id', m.id, 'poster_url', m.poster_url)) FROM movie m),
  'users', (SELECT json_agg(json_build_object('id', u.id, 'avatar_url', u.avatar_url)) FROM "user" u)
);

----------------------------------------------------------------------------------------------------
-------------------------------------- Update views and tables -------------------------------------
----------------------------------------------------------------------------------------------------

-- Drop new_movie function, userView and movieView
DROP FUNCTION IF EXISTS new_movie(TEXT, TEXT, TEXT, TEXT[], DATE, INT, TEXT[], TEXT, INT, INT);
DROP VIEW IF EXISTS userView;
DROP VIEW IF EXISTS movieView;
DROP VIEW IF EXISTS reviewView;
-- Replace the movie.poster_url column with a document_group
ALTER TABLE "movie" ALTER COLUMN poster_url DROP NOT NULL;
UPDATE "movie" SET poster_url = NULL;
ALTER TABLE "movie" RENAME COLUMN poster_url TO document_group_id;
ALTER TABLE "movie" ALTER COLUMN document_group_id TYPE INTEGER USING document_group_id::integer;
ALTER TABLE "movie" ADD CONSTRAINT fk_document_group_id FOREIGN KEY ("document_group_id") 
  REFERENCES "document_group"(id) ON DELETE CASCADE;
-- Replace the user.avatar_url column with a document_group
ALTER TABLE "user" ALTER COLUMN avatar_url DROP NOT NULL;
UPDATE "user" SET avatar_url = NULL;
ALTER TABLE "user" RENAME COLUMN avatar_url TO document_group_id;
ALTER TABLE "user" ALTER COLUMN document_group_id TYPE INTEGER USING document_group_id::integer;
ALTER TABLE "user" ADD CONSTRAINT fk_document_group_id FOREIGN KEY (document_group_id) 
  REFERENCES "document_group"(id) ON DELETE CASCADE;

----------------------------------------------------------------------------------------------------
----------------------------------- Re-create new_movie function -----------------------------------
----------------------------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION new_movie(
	title TEXT,
	original_title TEXT,
	directors TEXT[],
	release_date DATE,
	runtime INT,
	casting TEXT[],
	presentation TEXT,
  movie_genres TEXT[],
	movie_languages TEXT[],
	movie_countries TEXT[],
	episode_id INT,
	user_id INT
) RETURNS void AS $$
DECLARE
	movie_id INT;
	g TEXT;
	genre_id INT;
	l TEXT;
	language_id INT;
	c TEXT;
	country_id INT;
	document_group_id INT;

BEGIN
	IF NOT EXISTS (SELECT * FROM movie WHERE title=movie.french_title) THEN
    -- create a new document_group row
    INSERT INTO document_group DEFAULT VALUES RETURNING id INTO document_group_id;
		INSERT INTO movie("french_title", "original_title", "document_group_id", "directors", "release_date", "runtime", "casting", "presentation", "episode_id", "user_id")
		VALUES (title, original_title, document_group_id, directors, release_date, runtime, casting, presentation, episode_id, user_id)
		RETURNING id INTO movie_id;
		-- Create genre if not exists
		FOREACH g IN ARRAY movie_genres
			LOOP
				IF NOT EXISTS (SELECT * FROM genre WHERE name=g) THEN
					INSERT INTO genre("name") SELECT g
					RETURNING id INTO genre_id;
				ELSE
					RAISE NOTICE 'Genre (%) déjà là', g;
					SELECT id INTO genre_id FROM genre WHERE genre.name=g;
				END IF;
				INSERT INTO movie_has_genre(movie_id, genre_id)
				SELECT movie_id, genre_id;
			END LOOP;
		-- Create language if not exists
		FOREACH l IN ARRAY movie_languages
			LOOP
				IF NOT EXISTS (SELECT * FROM "language" WHERE name=l) THEN
					INSERT INTO "language"("name") SELECT l
					RETURNING id INTO language_id;
				ELSE
					RAISE NOTICE 'Langue (%) déjà là', l;
					SELECT id INTO language_id FROM language WHERE language.name=l;
				END IF;
				INSERT INTO movie_has_language(movie_id, language_id)
				SELECT movie_id, language_id;
			END LOOP;
		-- Create country if not exists
		FOREACH c IN ARRAY movie_countries
			LOOP
				IF NOT EXISTS (SELECT * FROM country WHERE name=c) THEN
					INSERT INTO country("name") SELECT c
					RETURNING id INTO country_id;
				ELSE
					RAISE NOTICE 'Country (%) déjà là', c;
					SELECT id INTO country_id FROM country WHERE country.name=c;
				END IF;
				INSERT INTO movie_has_country(movie_id, country_id)
				SELECT movie_id, country_id;
			END LOOP;
	ELSE
		RAISE NOTICE 'Movie (%) déjà là', title;
	END IF;
END
$$ LANGUAGE plpgsql;

----------------------------------------------------------------------------------------------------
------------------------------------------ Recreate Views ------------------------------------------
----------------------------------------------------------------------------------------------------
CREATE VIEW userView AS
SELECT "user".id, "user".pseudo, "user".mail, "user".role, "user".created_at, "user".updated_at,
  -- Metrics Object
  (SELECT JSON_BUILD_OBJECT(
      'propositions_count', COALESCE(pc.propositions_count, 0::bigint),
      'comments_count', COALESCE(cc.comments_count, 0::bigint),
      'likes_count', COALESCE(lc.likes_count, 0::bigint),
      'watchlist_count', COALESCE(wc.watchlist_count, 0::bigint),
      'ratings_count', COALESCE(rc.ratings_count, 0::bigint)
    )
    FROM "user" um
    LEFT JOIN ( SELECT movie.user_id,
      count(*) AS propositions_count
      FROM movie
      GROUP BY movie.user_id) pc ON um.id = pc.user_id
    LEFT JOIN ( SELECT review.user_id,
      count(*) AS comments_count
      FROM review
      WHERE review.comment IS NOT NULL
      GROUP BY review.user_id) cc ON um.id = cc.user_id
    LEFT JOIN ( SELECT review.user_id,
      count(*) AS likes_count
      FROM review
      WHERE review.liked = true
      GROUP BY review.user_id) lc ON um.id = lc.user_id
    LEFT JOIN ( SELECT review.user_id,
      count(*) AS watchlist_count
      FROM review
      WHERE review.bookmarked = true
      GROUP BY review.user_id) wc ON um.id = wc.user_id
    LEFT JOIN ( SELECT review.user_id,
      count(*) AS ratings_count
      FROM review
      WHERE review.rating IS NOT NULL
      GROUP BY review.user_id) rc ON um.id = rc.user_id
    WHERE "user".id = um.id
  ) AS metrics,
  -- Aggregated user reviews 
  COALESCE((SELECT JSON_AGG(
    JSON_BUILD_OBJECT(
      'movie_id', review.movie_id,
      'bookmarked', review.bookmarked,
      'liked', review.liked,
      'viewed', review.viewed,
      'rating', review.rating,
      'comment', review.comment,
      'created_at', review.created_at,
      'updated_at', review.updated_at
      ))
        FROM review
        WHERE "user".id = review.user_id
        AND review.comment IS NOT NULL
      ), '[]') AS reviews,
  -- Aggregated user propositions
  COALESCE((SELECT JSON_AGG(
    JSON_BUILD_OBJECT(
      'movie_id', movie.id,
      'season_number', episode.season_number,
      'french_title', movie.french_title, 
      'original_title', movie.original_title, 
      'document_group_id', movie.document_group_id,
      'publishing_date', episode.publishing_date,
      'release_date', movie.release_date,
      'presentation', JSON_BUILD_OBJECT(
        'author_id', "user".id,
        'author_pseudo', "user".pseudo,
        'author_role', "user".role,
        'presentation', movie.presentation
      )
      --'avg_rating', ROUND(COALESCE(ar.avg_rating,0),1)
    ))
    FROM movie
      LEFT JOIN episode 
        ON episode.id = movie.episode_id
      LEFT JOIN
        (SELECT review.movie_id AS "movie_id", AVG(rating) "avg_rating"
		      FROM "review" WHERE "rating" IS NOT NULL GROUP BY review.movie_id) ar
	          ON movie.id = ar.movie_id
          WHERE "user".id = movie.user_id
    ), '[]') AS movies,
    -- user pending proposition
    COALESCE((SELECT JSON_AGG(
      JSON_BUILD_OBJECT(
        'movie_id', movie.id,
        'season_number', episode.season_number,
        'french_title', movie.french_title, 
        'original_title', movie.original_title, 
        'document_group_id', movie.document_group_id,
        'publishing_date', episode.publishing_date,
        'release_date', movie.release_date,
        'presentation', JSON_BUILD_OBJECT(
        'author_id', "user".id,
        'author_pseudo', "user".pseudo,
        'author_role', "user".role,
        'presentation', movie.presentation
        )
        --'avg_rating', ROUND(COALESCE(ar.avg_rating,0),1)
      ))
      FROM movie
        LEFT JOIN episode 
          ON episode.id = movie.episode_id
        LEFT JOIN
	        (SELECT review.movie_id AS "movie_id", AVG(rating) "avg_rating"
		        FROM "review" WHERE "rating" IS NOT NULL GROUP BY review.movie_id) ar
	            ON movie.id = ar.movie_id
        WHERE "user".id = movie.user_id AND movie.is_published = false
      ), '[]') AS propositions
FROM "user"
GROUP BY 
  "user".id,
  "user".pseudo,
  "user".mail, 
	"user".role, 
	"user".created_at, 
	"user".updated_at
;

CREATE VIEW reviewView AS
SELECT 
  -- User and Review columns selection
  "movie".id AS movie_id,
  "user".id AS author_id, 
  "user".pseudo AS author_pseudo,
  "user".mail AS author_mail,
  "user".role AS author_role, 
  "user".created_at AS member_since,
	review.comment,
  -- Movie object build
  (SELECT json_build_object(
      'french_title', "movie".french_title,
      'original_title', "movie".original_title,
      'document_group_id', "movie".document_group_id,
      'publishing_date', "episode".publishing_date,
      'season_id', "episode".season_number
    ) AS "movie")
  FROM "review"
	  INNER JOIN "user" ON review.user_id="user".id
      INNER JOIN "movie" ON review.movie_id="movie".id
      LEFT JOIN "episode" ON episode.id = "movie".episode_id
WHERE review.comment IS NOT NULL
GROUP BY 
  review.comment, 
  "user".id, 
  "user".pseudo,
  "user".mail,
  "user".role, 
  "movie".id,
  "movie".french_title,
  "movie".original_title,
  "movie".document_group_id,
  "episode".publishing_date,
  "episode".season_number
;

CREATE VIEW movieView AS
SELECT
  -- Movie columns selection
  "movie".id, 
  "movie".user_id AS author_id, 
	"episode".season_number AS season_number,
	"episode".episode_number AS episode_number,
  "movie".is_published, 
  "movie".french_title, 
  "movie".original_title, 
  "movie".document_group_id, 
  "movie".casting, 
  "movie".directors,
  "movie".runtime, 
  "episode".publishing_date,
  "movie".release_date,
  -- Aggregated Genres selection 
	array_agg(DISTINCT genre.name) AS genres,
  -- Aggregated Countries selection 
  array_agg(DISTINCT country.name) AS countries,
  -- Aggregated Languages selection 
	array_agg(DISTINCT language.name) AS languages,
  -- Presentations Object
  (SELECT json_build_object(
    'author_id', movie.user_id,
    'author_pseudo', "user".pseudo,
    'author_role', "user".role,
    'presentation', movie.presentation
  ) AS "presentation"),
  -- Metrics Object
  (SELECT json_build_object(
    'watchlist_count', COALESCE(wc.watchlist_count,0),
    'views_count', COALESCE(vc.views_count,0),
    'likes_count', COALESCE(lc.likes_count,0),
    'ratings_count', COALESCE(rc.ratings_count,0),
    'avg_rating', ROUND(COALESCE(ar.avg_rating,0),1)
  ) AS "metrics"),
  -- Aggregated comments objects
	COALESCE((SELECT JSON_AGG(
    JSON_BUILD_OBJECT(
      'author_id', "user".id,
      'author_pseudo', "user".pseudo,
      'author_role', "user".role,
      'comment', review.comment,
      'rating', review.rating,
      'created_at', review.created_at,
      'updated_at', review.updated_at
    ))
    FROM review
      JOIN "user" ON review.user_id = "user".id
      WHERE movie.id = review.movie_id
      AND review.comment IS NOT NULL
  ), '[]') AS comments
  FROM movie
  -- USER
	LEFT JOIN "user" ON "user".id = "movie".user_id
  -- SEASON
	LEFT JOIN episode ON "episode".id = "movie".episode_id
  -- GENRES
	LEFT JOIN movie_has_genre ON "movie".id = "movie_has_genre".movie_id
	LEFT JOIN genre ON "movie_has_genre".genre_id = genre.id
  -- COUNTRIES
	LEFT JOIN movie_has_country ON "movie".id = "movie_has_country".movie_id
	LEFT JOIN country ON "movie_has_country".country_id = country.id
  -- LANGUAGES
	LEFT JOIN movie_has_language ON "movie".id = "movie_has_language".movie_id
	LEFT JOIN "language" ON "movie_has_language".language_id = "language".id
  -- MOVIE METRICS
	LEFT JOIN
	  (SELECT "review".movie_id AS "movie_id", COUNT(*) "watchlist_count"
	    FROM review where "bookmarked" = true GROUP BY movie_id) wc
	      ON "movie".id = wc.movie_id
	LEFT JOIN
	  (SELECT "review".movie_id AS "movie_id", COUNT(*) "views_count"
	    FROM review where "viewed" = true GROUP BY movie_id) vc
	      ON "movie".id = vc.movie_id
	LEFT JOIN
	  (SELECT "review".movie_id AS "movie_id", COUNT(*) "likes_count"
	    FROM review where "liked" = true GROUP BY movie_id) lc
	      ON "movie".id = lc.movie_id
	LEFT JOIN
	  (SELECT "review".movie_id AS "movie_id", COUNT(*) "ratings_count"
	    FROM "review" WHERE "rating" IS NOT NULL GROUP BY "review".movie_id) rc
	      ON "movie".id = rc.movie_id
	LEFT JOIN
	  (SELECT "review".movie_id AS "movie_id", AVG(rating) "avg_rating"
		  FROM "review" WHERE "rating" IS NOT NULL GROUP BY "review".movie_id) ar
	      ON "movie".id = ar.movie_id
GROUP BY
	"movie".id,
  "movie".french_title,
  "movie".original_title,
  "movie".directors,
  "movie".release_date,
	"movie".runtime, 
  "movie".casting,
  "movie".presentation, 
  "movie".is_published,
	"episode".publishing_date, 
  "episode".season_number,
  "episode".episode_number,
  "movie".user_id, 
	"movie".user_id,
  "user".pseudo,
  "user".role,
  "user".created_at,
	watchlist_count,
  views_count,
  likes_count,
  ratings_count,
  avg_rating
ORDER BY movie.id DESC
;

----------------------------------------------------------------------------------------------------
--------------------------------- Update or Create Avatar function ---------------------------------
----------------------------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION add_or_update_avatar(
  p_user_id INTEGER, p_data BYTEA, p_content_type VARCHAR(100)
)
RETURNS VOID AS $$
DECLARE
  l_document_group_id INTEGER;
  l_document_id INTEGER;
BEGIN
  -- Verify if user already has a document_group and create one if not
  SELECT document_group_id INTO l_document_group_id FROM "user" WHERE id = p_user_id;
  IF l_document_group_id IS NULL THEN
    INSERT INTO "document_group" DEFAULT VALUES
    RETURNING id INTO l_document_group_id;
    UPDATE "user" SET "document_group_id" = l_document_group_id
    WHERE id = p_user_id;
  END IF;

  -- Verify if document_group already has a document with type 0 (avatar) and get its id
  -- If document does not exist, create one
  SELECT id INTO l_document_id FROM "document" WHERE "document_group_id" = l_document_group_id AND "type" = 0;
  IF l_document_id IS NULL THEN
    INSERT INTO "document" ("document_group_id", "data", "content_type", "type")
    VALUES (l_document_group_id, p_data, p_content_type, 0)
    RETURNING id INTO l_document_id;
  END IF;

  -- Update the document with new data and content_type
  UPDATE "document" SET "data" = p_data, "content_type" = p_content_type
  WHERE id = l_document_id;
END;
$$ LANGUAGE plpgsql;


COMMIT;
