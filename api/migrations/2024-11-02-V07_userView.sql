BEGIN;

-- Updated on V18 -> Document implementation
DROP VIEW IF EXISTS userView;

CREATE VIEW
      userView AS
SELECT
      "user".id,
      "user".pseudo,
      "user".mail,
      "user".avatar_url,
      "user".role,
      "user".created_at,
      "user".updated_at,
      -- Metrics Object
      (
            SELECT
                  JSON_BUILD_OBJECT(
                        'propositions_count',
                        COALESCE(pc.propositions_count, 0::bigint),
                        'comments_count',
                        COALESCE(cc.comments_count, 0::bigint),
                        'likes_count',
                        COALESCE(lc.likes_count, 0::bigint),
                        'watchlist_count',
                        COALESCE(wc.watchlist_count, 0::bigint),
                        'ratings_count',
                        COALESCE(rc.ratings_count, 0::bigint)
                  )
            FROM
                  "user" um
                  LEFT JOIN (
                        SELECT
                              movie.user_id,
                              count(*) AS propositions_count
                        FROM
                              movie
                        GROUP BY
                              movie.user_id
                  ) pc ON um.id = pc.user_id
                  LEFT JOIN (
                        SELECT
                              review.user_id,
                              count(*) AS comments_count
                        FROM
                              review
                        WHERE
                              review.comment IS NOT NULL
                        GROUP BY
                              review.user_id
                  ) cc ON um.id = cc.user_id
                  LEFT JOIN (
                        SELECT
                              review.user_id,
                              count(*) AS likes_count
                        FROM
                              review
                        WHERE
                              review.liked = true
                        GROUP BY
                              review.user_id
                  ) lc ON um.id = lc.user_id
                  LEFT JOIN (
                        SELECT
                              review.user_id,
                              count(*) AS watchlist_count
                        FROM
                              review
                        WHERE
                              review.bookmarked = true
                        GROUP BY
                              review.user_id
                  ) wc ON um.id = wc.user_id
                  LEFT JOIN (
                        SELECT
                              review.user_id,
                              count(*) AS ratings_count
                        FROM
                              review
                        WHERE
                              review.rating IS NOT NULL
                        GROUP BY
                              review.user_id
                  ) rc ON um.id = rc.user_id
            WHERE
                  "user".id = um.id
      ) AS metrics,
      -- Aggregated user reviews 
      COALESCE(
            (
                  SELECT
                        JSON_AGG(
                              JSON_BUILD_OBJECT(
                                    'movie_id',
                                    review.movie_id,
                                    'bookmarked',
                                    review.bookmarked,
                                    'liked',
                                    review.liked,
                                    'viewed',
                                    review.viewed,
                                    'rating',
                                    review.rating,
                                    'comment',
                                    review.comment,
                                    'created_at',
                                    review.created_at,
                                    'updated_at',
                                    review.updated_at
                              )
                        )
                  FROM
                        review
                  WHERE
                        "user".id = review.user_id
                        AND review.comment IS NOT NULL
            ),
            '[]'
      ) AS reviews,
      -- Aggregated user propositions
      COALESCE(
            (
                  SELECT
                        JSON_AGG(
                              JSON_BUILD_OBJECT(
                                    'movie_id',
                                    movie.id,
                                    'season_number',
                                    episode.season_number,
                                    'french_title',
                                    movie.french_title,
                                    'original_title',
                                    movie.original_title,
                                    'poster_url',
                                    movie.poster_url,
                                    'publishing_date',
                                    episode.publishing_date,
                                    'release_date',
                                    movie.release_date,
                                    'presentation',
                                    JSON_BUILD_OBJECT(
                                          'author_id',
                                          "user".id,
                                          'author_pseudo',
                                          "user".pseudo,
                                          'author_avatar',
                                          "user".avatar_url,
                                          'author_role',
                                          "user".role,
                                          'presentation',
                                          movie.presentation
                                    )
                                    --'avg_rating', ROUND(COALESCE(ar.avg_rating,0),1)
                              )
                        )
                  FROM
                        movie
                        LEFT JOIN episode ON episode.id = movie.episode_id
                        LEFT JOIN (
                              SELECT
                                    review.movie_id AS "movie_id",
                                    AVG(rating) "avg_rating"
                              FROM
                                    "review"
                              WHERE
                                    "rating" IS NOT NULL
                              GROUP BY
                                    review.movie_id
                        ) ar ON movie.id = ar.movie_id
                  WHERE
                        "user".id = movie.user_id
            ),
            '[]'
      ) AS movies,
      -- user pending proposition
      COALESCE(
            (
                  SELECT
                        JSON_AGG(
                              JSON_BUILD_OBJECT(
                                    'movie_id',
                                    movie.id,
                                    'season_number',
                                    episode.season_number,
                                    'french_title',
                                    movie.french_title,
                                    'original_title',
                                    movie.original_title,
                                    'poster_url',
                                    movie.poster_url,
                                    'publishing_date',
                                    episode.publishing_date,
                                    'release_date',
                                    movie.release_date,
                                    'presentation',
                                    JSON_BUILD_OBJECT(
                                          'author_id',
                                          "user".id,
                                          'author_pseudo',
                                          "user".pseudo,
                                          'author_avatar',
                                          "user".avatar_url,
                                          'author_role',
                                          "user".role,
                                          'presentation',
                                          movie.presentation
                                    )
                                    --'avg_rating', ROUND(COALESCE(ar.avg_rating,0),1)
                              )
                        )
                  FROM
                        movie
                        LEFT JOIN episode ON episode.id = movie.episode_id
                        LEFT JOIN (
                              SELECT
                                    review.movie_id AS "movie_id",
                                    AVG(rating) "avg_rating"
                              FROM
                                    "review"
                              WHERE
                                    "rating" IS NOT NULL
                              GROUP BY
                                    review.movie_id
                        ) ar ON movie.id = ar.movie_id
                  WHERE
                        "user".id = movie.user_id
                        AND movie.is_published = false
            ),
            '[]'
      ) AS propositions
FROM
      "user"
GROUP BY
      "user".id,
      "user".pseudo,
      "user".mail,
      "user".avatar_url,
      "user".role,
      "user".created_at,
      "user".updated_at;

COMMIT;

-- MIGRATION DOWN
BEGIN;

DROP VIEW IF EXISTS userView;

COMMIT;