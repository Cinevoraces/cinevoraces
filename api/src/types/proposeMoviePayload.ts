export interface updateProposedMovie {
  movie_id: number;
  presentation: string;
}

export interface proposeMovie {
  french_title: string;
  original_title: string;
  poster_url: string;
  directors: Array<string>;
  release_date: string;
  runtime: number;
  casting: Array<string>;
  presentation: string;
  publishing_date: string;
  user_id: number;
  season_id: number;
  movie_genres: Array<string>;
  movie_languages: Array<string>;
  movie_countries: Array<string>;
}
