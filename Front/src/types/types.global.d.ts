// API Arguments
type user = {
  pseudo: string,
  mail: string,
  password: string,
  accessToken: string,
  refreshToken: string
}
type id = number | string;
type interactionBody = {
  [x: string]: number | boolean,
}
interface movie {
  id: number,
  french_title: string,
  original_title: string,
  poster_url: string,
  directors: string[],
  release_date: string,
  runtime: number,
  casting: string[],
  presentation: string,
  publishing_date: string,
  user_id: number
}
interface movieProposal extends movie {
  movie_genres: string[],
}
type proposalBody = {
  french_title: string,
  original_title: string,
  poster_url: string,
  directors: string[],
  release_date: string,
  runtime: number,
  casting: string[],
  presentation: string, 
  publishing_date: string,
  user_id: number,
  season_id: number,
  movie_genres: string[],
  movie_languages: string[],
  movie_countries: string[]
}
// Responses
interface DBMovie extends movie {
  user_pseudo: string,
  user_avatar_url: string | null,
  season_number: number,
  genres: string[],
  countries: string[],
  languages: string[],
  watchlist_count: string,
  likes_count: string,
  ratings_count: string,
  views_count: string,
  avg_rating: string
};
type DBFilters = {
  seasons_list: [number[]],
  genres_list: string[],
  countries_list: string[],
  min_max_dates: [number, number],
  max_runtime: number
}
type TMDBMovie = {
  id: number,
  title: string
  release_date: string,
  poster_path: string,
  original_title?: string
  poster_url?: string
}
type DBUser = {
  id: string,
  pseudo: string,
  mail: string,
  role: string,
  created_at: string
}
type refreshToken = {
  accessToken: string,
  avatar_url: string,
  created_at: string,
  id: number,
  pseudo: string,
  refreshToken: string,
  role: string
}
type DBReview = {
  user_id: number,
  user_pseudo: string,
  movie_id: number,
  rating: number,
  created_at: string,
  updated_at?: string,
  comment: string,
  avatar_url: string,
  edit?: boolean
}
type DBUserReview = {
    bookmarked: boolean,
    viewed: boolean,
    liked: boolean,
    rating: number | boolean,
    created_at?: string
}
type slot = {
  id: number,
  season_number: number,
  episode: number,
  publishing_date: string,
  is_booked: boolean
}
// Global slice
type filter = {
  name: string,
  value?: string,
  isChecked: boolean
}