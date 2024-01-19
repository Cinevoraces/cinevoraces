export enum ESchemasIds {
    // Auth API schemas
    POSTRegister = 'POST/register',
    POSTLogin = 'POST/login',
    GETRefresh = 'GET/refresh',
    // Movies API schemas
    GETMovies = 'GET/movies',
    GETRandomMoviePosters = 'GET/movies/random-posters/:count',
    POSTMovies = 'POST/movies',
    PUTMovies = 'PUT/movies',

    PUTReviews = 'PUT/reviews/:movieId',
    // Seasons API schemas
    // Global schemas
    Error = 'Error',
}
