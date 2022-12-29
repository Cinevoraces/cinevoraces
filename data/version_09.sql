-- Deploy cinevoraces:version_9 to pg
-- Removed old views
-- Created following views:
--    metricsView: return Website global metrics
--    userView: return user object populated with all relations
--    reviewView: return review object containing needed informations for administration
--    movieView: return movie object populated with all relations

BEGIN;

-- Drop unused views
DROP VIEW IF EXISTS indiv_actions_metrics;
DROP VIEW IF EXISTS pending_propositions;
DROP VIEW IF EXISTS next_propositions;
DROP VIEW IF EXISTS last_season_movies;
DROP VIEW IF EXISTS movies_infos;
DROP VIEW IF EXISTS filters_options;
DROP VIEW IF EXISTS movie_comments;
DROP VIEW IF EXISTS global_metrics;


-- Global metrics object
DROP VIEW IF EXISTS metricsView;
CREATE VIEW metricsView AS

SELECT sc.ct "seasons_count",mc.ct "movies_count",cc.ct "countries_count"
FROM
	(SELECT COUNT (*) ct FROM "season")sc,
	(SELECT COUNT (*) ct FROM "movie" WHERE is_published = 'true')mc,
	(SELECT COUNT (*) ct FROM "country")cc
;

-- User Full object
DROP VIEW IF EXISTS userView;
CREATE VIEW userView AS

SELECT 
      "user".id, "user".pseudo, "user".mail, "user".avatar_url, "user".role, "user".created_at, "user".updated_at,
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
                  'poster_url', movie.poster_url,
                  'presentation', movie.presentation,
                  'publishing_date', episode.publishing_date,
                  'avg_rating', ROUND(COALESCE(ar.avg_rating,0),1)
            ))
            FROM movie
                  LEFT JOIN episode 
                        ON episode.id = movie.episode_id
                  LEFT JOIN
	                  (SELECT review.movie_id AS "movie_id", AVG(rating) "avg_rating"
		                  FROM "review" WHERE "rating" IS NOT NULL GROUP BY review.movie_id) ar
	            ON movie.id = ar.movie_id
            WHERE "user".id = movie.user_id
      ), '[]') AS propositions
FROM "user"
GROUP BY 
      "user".id,
      "user".pseudo,
      "user".mail, 
	"user".avatar_url, 
	"user".role, 
	"user".created_at, 
	"user".updated_at
;


-- Reviews for Admin purpose
DROP VIEW IF EXISTS reviewView;
CREATE VIEW reviewView AS

SELECT 
      -- User and Review columns selection
      "movie".id AS movie_id,
      "user".id AS author_id, 
      "user".pseudo AS author_pseudo,
      "user".mail AS author_mail,
      "user".role AS author_role, 
      "user".avatar_url AS author_avatar,
      "user".created_at AS member_since,
	review.comment,
      -- Movie object build
      (SELECT json_build_object(
            'french_title', "movie".french_title,
            'original_title', "movie".original_title,
            'poster_url', "movie".poster_url,
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
      "user".avatar_url,
      "movie".id,
      "movie".french_title,
      "movie".original_title,
      "movie".poster_url,
      "episode".publishing_date,
      "episode".season_number
;

-- Movies Full object
DROP VIEW IF EXISTS movieView;
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
      "movie".poster_url, 
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
            'author_avatar', "user".avatar_url,
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
                  'author_avatar', "user".avatar_url,
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
	LEFT JOIN "user" 
            ON "user".id = "movie".user_id
      -- SEASON
	LEFT JOIN episode
            ON "episode".id = "movie".episode_id
      -- GENRES
	LEFT JOIN movie_has_genre 
            ON "movie".id = "movie_has_genre".movie_id
	LEFT JOIN genre 
            ON "movie_has_genre".genre_id = genre.id
      -- COUNTRIES
	LEFT JOIN movie_has_country 
            ON "movie".id = "movie_has_country".movie_id
	LEFT JOIN country 
            ON "movie_has_country".country_id = country.id
      -- LANGUAGES
	LEFT JOIN movie_has_language 
            ON "movie".id = "movie_has_language".movie_id
	LEFT JOIN "language" 
            ON "movie_has_language".language_id = "language".id
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
      "user".avatar_url,
      "user".role,
      "user".created_at,
	watchlist_count,
      views_count,
      likes_count,
      ratings_count,
      avg_rating
ORDER BY movie.id DESC
;

COMMIT;