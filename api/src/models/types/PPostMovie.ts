export interface PPostMovie {
  french_title: string;
  original_title: string;
  directors: Array<string>;
  release_date: string;
  runtime: number;
  casting: Array<string>;
  presentation: string;
  movie_genres: Array<string>;
  movie_languages: Array<string>;
  movie_countries: Array<string>;
  episode_id: number;
  user_id?: number;
}
