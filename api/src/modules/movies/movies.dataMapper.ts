const getMovies = `
  SELECT movieView.*
  	FROM movieView
  		JOIN review
  			ON movieView.id=review.movie_id 
  			AND review.bookmarked = true
  	WHERE review.user_id=$1;
`;
