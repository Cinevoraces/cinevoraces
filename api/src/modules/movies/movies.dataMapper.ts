const getMovies = `
  SELECT 
	id, author_id, season_number, is_published, french_title, original_title, poster_url, publishing_date, created_at, updated_at
	-- Add additionnal selectors here
	FROM movieView
	-- if token is provided
	JOIN review
  	ON movieView.id=review.movie_id 
  	AND review.bookmarked = true
  	WHERE review.user_id=$1
	;
`;
