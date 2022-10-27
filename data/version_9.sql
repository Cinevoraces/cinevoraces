-- Deploy cinevoraces:version_9 to pg

BEGIN;

DROP VIEW IF EXISTS full_review;

CREATE VIEW full_review AS

SELECT 
      review.movie_id,
      review.user_id,
      review.bookmarked, 
	review.viewed, 
	review.liked, 
	review.rating, 
	review.comment,
	(SELECT json_build_object(
            'id', "user".id,
            'pseudo', "user".pseudo,
            'mail', "user".mail,
            'role', "user".role,
            'avatar_url', "user".avatar_url,
            'created_at', "user".created_at
      ) AS "user"),
      (SELECT json_build_object(
            'id', "movie".id,
            'french_title', "movie".french_title,
            'original_title', "movie".original_title,
            'poster_url', "movie".poster_url,
            'publishing_date', "movie".publishing_date,
            'season_id', "movie".season_id
      ) AS "movie")
FROM "review"
	INNER JOIN "user" ON review.user_id="user".id
      INNER JOIN "movie" ON review.movie_id="movie".id
GROUP BY 
      review.movie_id,
      review.user_id,
      review.bookmarked, 
      review.viewed, 
      review.liked, 
      review.rating, 
      review.comment, 
      "user".id, 
      "user".pseudo,
      "user".mail,
      "user".role, 
      "user".avatar_url,
      "user".created_at,
      "movie".id,
      "movie".french_title,
      "movie".original_title,
      "movie".poster_url,
      "movie".publishing_date,
      "movie".season_id
      ;
COMMIT;