// TODO: May be useless once SQL conversion is done
// import type { rawMovie } from '@src/types/Movies';
// import objectHandler from './objectHandler';

// export default {
//   oneMovie: (rawMovie: rawMovie, userId: number) => {
//     return handleMovieObject(rawMovie, userId);
//   },
//   manyMovies: (rawMovies: rawMovie[], userId: number) => {
//     return rawMovies.map((rawMovie) => {
//       return handleMovieObject(rawMovie, userId);
//     });
//   }
// };

// const handleMovieObject = (rawMovie: rawMovie, userId?: number) => {
//   const { movie_has_country, movie_has_genre, movie_has_language, review } = rawMovie;
//   delete rawMovie['movie_has_country'];
//   delete rawMovie['movie_has_genre'];
//   delete rawMovie['movie_has_language'];
//   let user_review = {};
//   let reviews = {};
//   if (review) {
//     const arrayOfReviews: Array<Record<string, unknown>> = [];
//     review.forEach((review) => {
//       const { user_id, bookmarked, liked, viewed, rating, comment, created_at, updated_at } = review;
//       if (review.user_id === userId) user_review = {
//         user_review: { bookmarked, liked, viewed, rating, comment, created_at, updated_at }
//       };
//       arrayOfReviews.push({ user_id, bookmarked, liked, viewed, rating, comment, created_at, updated_at });
//     });
//     if (arrayOfReviews.length > 0) reviews = { reviews: arrayOfReviews };
//     delete rawMovie['review'];
//   }
//   return {
//     ...rawMovie,
//     ...user_review,
//     ...reviews,
//     countries: objectHandler.nestedValuesToArray(movie_has_country, 'country', 'name'),
//     genres: objectHandler.nestedValuesToArray(movie_has_genre, 'genre', 'name'),
//     languages: objectHandler.nestedValuesToArray(movie_has_language, 'language', 'name'),
//   };
// };
