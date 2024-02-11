BEGIN;

-- Updated on V18 -> Document implementation
-- ADMIN ONLY
DROP VIEW IF EXISTS reviewView;

CREATE VIEW
      reviewView AS
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
      (
            SELECT
                  json_build_object(
                        'french_title',
                        "movie".french_title,
                        'original_title',
                        "movie".original_title,
                        'poster_url',
                        "movie".poster_url,
                        'publishing_date',
                        "episode".publishing_date,
                        'season_id',
                        "episode".season_number
                  ) AS "movie"
      )
FROM
      "review"
      INNER JOIN "user" ON review.user_id = "user".id
      INNER JOIN "movie" ON review.movie_id = "movie".id
      LEFT JOIN "episode" ON episode.id = "movie".episode_id
WHERE
      review.comment IS NOT NULL
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
      "episode".season_number;

COMMIT;

-- MIGRATION DOWN
BEGIN;

DROP VIEW IF EXISTS reviewView;

COMMIT;