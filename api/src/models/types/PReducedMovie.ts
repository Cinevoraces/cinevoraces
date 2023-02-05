export interface PReducedMovie {
  movie_id: number,
  season_number: number,
  french_title: string,
  original_title: string,
  document_group_id: number,
  publishing_date: string,
  release_date: string,
  presentation: {
    author_id: number,
    author_pseudo: string,
    author_role: number,
    presentation: string,
  }
}
