export interface POSTSeasonRequest {
    Body: { year: number; season_number: number };
}
export interface PUTMovieAsAdminRequest {
    Params: { id: number };
    Body: { password: string };
}

export interface DELETEMovieAsAdminRequest {
    Params: { id: number };
    Body: { password: string };
}

export interface DELETECommentAsAdminRequest {
    Params: { movieId: number; userId: number };
    Body: { password: string };
}

export interface DELETEUserAsAdminRequest {
    Params: { id: number };
    Body: { password: string };
}
