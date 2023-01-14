export interface PReducedMovie {
  movie_id: number,
  season_number: number,
  french_title: string,
  original_title: string,
  poster_url: string,
  publishing_date: string,
  release_date: string,
  presentation: {
    author_id: number,
    author_pseudo: string,
    author_avatar: string,
    author_role: number,
    presentation: string,
  }
}
