export interface EpisodeOption {
  name: string; 
  value: string;
}

export interface MovieBody {
  french_title: string;
  original_title: string;
  poster_url: string;
  directors: string[];
  release_date: string;
  runtime: number;
  casting: string[];
  presentation: string;
  episode_id: number;
  movie_genres: string[];
  movie_languages: string[];
  movie_countries: string[];
  [key: string]: string | number | string[];
}
