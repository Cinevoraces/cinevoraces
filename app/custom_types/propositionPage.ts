export interface Episode {
  name: string; 
  value: { id: number; season_id: number; publishing_date: string }
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
  publishing_date: string;
  season_id: number;
  movie_genres: string[];
  movie_languages: string[];
  movie_countries: string[];
  [key: string]: string | number | string[];
}
