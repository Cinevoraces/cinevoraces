BEGIN;

-- Updated on V18 -> Document implementation
DROP VIEW IF EXISTS movieView;

CREATE VIEW
      movieView AS
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
      (
            SELECT
                  json_build_object(
                        'author_id',
                        movie.user_id,
                        'author_pseudo',
                        "user".pseudo,
                        'author_avatar',
                        "user".avatar_url,
                        'author_role',
                        "user".role,
                        'presentation',
                        movie.presentation
                  ) AS "presentation"
      ),
      -- Metrics Object
      (
            SELECT
                  json_build_object(
                        'watchlist_count',
                        COALESCE(wc.watchlist_count, 0),
                        'views_count',
                        COALESCE(vc.views_count, 0),
                        'likes_count',
                        COALESCE(lc.likes_count, 0),
                        'ratings_count',
                        COALESCE(rc.ratings_count, 0),
                        'avg_rating',
                        ROUND(COALESCE(ar.avg_rating, 0), 1)
                  ) AS "metrics"
      ),
      -- Aggregated comments objects
      COALESCE(
            (
                  SELECT
                        JSON_AGG(
                              JSON_BUILD_OBJECT(
                                    'author_id',
                                    "user".id,
                                    'author_pseudo',
                                    "user".pseudo,
                                    'author_avatar',
                                    "user".avatar_url,
                                    'author_role',
                                    "user".role,
                                    'comment',
                                    review.comment,
                                    'rating',
                                    review.rating,
                                    'created_at',
                                    review.created_at,
                                    'updated_at',
                                    review.updated_at
                              )
                        )
                  FROM
                        review
                        JOIN "user" ON review.user_id = "user".id
                  WHERE
                        movie.id = review.movie_id
                        AND review.comment IS NOT NULL
            ),
            '[]'
      ) AS comments
FROM
      movie
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
      LEFT JOIN (
            SELECT
                  "review".movie_id AS "movie_id",
                  COUNT(*) "watchlist_count"
            FROM
                  review
            where
                  "bookmarked" = true
            GROUP BY
                  movie_id
      ) wc ON "movie".id = wc.movie_id
      LEFT JOIN (
            SELECT
                  "review".movie_id AS "movie_id",
                  COUNT(*) "views_count"
            FROM
                  review
            where
                  "viewed" = true
            GROUP BY
                  movie_id
      ) vc ON "movie".id = vc.movie_id
      LEFT JOIN (
            SELECT
                  "review".movie_id AS "movie_id",
                  COUNT(*) "likes_count"
            FROM
                  review
            where
                  "liked" = true
            GROUP BY
                  movie_id
      ) lc ON "movie".id = lc.movie_id
      LEFT JOIN (
            SELECT
                  "review".movie_id AS "movie_id",
                  COUNT(*) "ratings_count"
            FROM
                  "review"
            WHERE
                  "rating" IS NOT NULL
            GROUP BY
                  "review".movie_id
      ) rc ON "movie".id = rc.movie_id
      LEFT JOIN (
            SELECT
                  "review".movie_id AS "movie_id",
                  AVG(rating) "avg_rating"
            FROM
                  "review"
            WHERE
                  "rating" IS NOT NULL
            GROUP BY
                  "review".movie_id
      ) ar ON "movie".id = ar.movie_id
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
ORDER BY
      movie.id DESC;

COMMIT;

-- MIGRATION DOWN
BEGIN;

DROP VIEW IF EXISTS movieView;

COMMIT;