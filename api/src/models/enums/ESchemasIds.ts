export enum ESchemasIds {
  // Admin API schemas
  PUTMoviesAsAdmin = 'PUT/admin/movies/publish/:id',
  DELETEMoviesAsAdmin = 'DELETE/admin/movies/:id',
  PUTMoviesPosterAsAdmin = 'PUT/admin/movies/update-posters',
  GETReviewsAsAdmin = 'GET/admin/reviews',
  DELETEReviewsAsAdmin = 'DELETE/admin/reviews/:movieId/:userId',
  POSTSeasonsAsAdmin = 'POST/seasons',
  DELETEUsersAsAdmin = 'DELETE/admin/users/:id',
  // Auth API schemas
  POSTRegister = 'POST/register',
  POSTLogin = 'POST/login',
  GETRefresh = 'GET/refresh',
  // Episodes API schemas
  GETEpisodes = 'GET/episodes',
  // Metrics API schemas
  GETMetrics = 'GET/metrics',
  // Movies API schemas
  GETMovies = 'GET/movies',
  POSTMovies = 'POST/movies',
  PUTMovies = 'PUT/movies',
  // Public API schemas
  GETPosterByFileName = 'GET/poster/:fileName',
  // Reviews API schemas
  PUTReviews = 'PUT/reviews/:movieId',
  // Seasons API schemas
  GETSeasons = 'GET/seasons',
  // Users API schemas
  GETUsers = 'GET/users',
  PUTUsers = 'PUT/users',
  PUTUsersAvatar = 'PUT/users/avatar',
  // Global schemas
  Error = 'Error',
  // Item schemas
  IEpisode = 'IEpisode',
  IGlobalMetrics = 'IGlobalMetrics',
  IUserMetrics = 'IUserMetrics',
  IMovie = 'IMovie',
  IReducedMovie = 'IReducedMovie',
  IReview = 'IReview',
  ISeason = 'ISeason',
  IUser = 'IUser',
}
