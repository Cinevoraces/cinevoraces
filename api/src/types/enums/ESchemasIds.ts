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
    // Public API schemas
    GETFileByEntityId = 'GET/:docType/:entityId',
    // Reviews API schemas
    PUTReviews = 'PUT/reviews/:movieId',
    // Seasons API schemas
    GETSeasons = 'GET/seasons',
    // Users API schemas
    GETPublicUsers = 'GET/users',
    GETPrivateUsers = 'GET/users/me',
    PUTUsers = 'PUT/users',
    PUTUsersAvatar = 'PUT/users/avatar',
    // Global schemas
    Error = 'Error',
    // Item schemas
    IMovie = 'IMovie',
    IReducedMovie = 'IReducedMovie',
    IReview = 'IReview',
    ISeason = 'ISeason',
    IPublicUser = 'IPublicUser',
    IPrivateUser = 'IPrivateUser',
}
