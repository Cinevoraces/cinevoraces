interface TMDBMovieCommons {
  adult?: boolean;
  backdrop_path?: string;
  id?: number;
  original_language?: string;
  original_title: string;
  overview?: string;
  popularity?: number;
  poster_path: string;
  release_date: string;
  title: string;
  video?: boolean;
  vote_average?: number;
  vote_count?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

interface TMDBMovie extends TMDBMovieCommons {
  genres_ids?: number[];
}

interface TMDBDetailedMovie extends TMDBMovieCommons{
  belongs_to_collection?: {};
  budget?: number;
  genres: { id: number; name: string }[];
  homepage?: string;
  imdb_id?: string;
  production_compagnies?: { id: number; logo_path: string; name: string; }[];
  production_countries: { iso_3166_1: string; name: string }[];
  revenue?: number;
  runtime: number;
  spoken_languages: { english_name: string; iso_639_1: string; name: string; }[];
  status?: string;
  tagline?: string;
}

interface TMDBCreditCommons {
  adult: boolean; 
  credit_id: string; 
  gender: number; 
  id: number; 
  known_for_department: string; 
  name: string; 
  original_name: string; 
  popularity: number; 
  profile_path: string; 
}
interface TMDBActorCredit extends TMDBCreditCommons{
  cast_id: number; 
  character: string; 
  order: number;
}
interface TMDBCrewCredit extends TMDBCreditCommons{
  department: string; 
  job: string;
}

interface TMDBMovieCredits extends TMDBCreditCommons {
  cast: TMDBActorCredit[];
  crew: TMDBCrewCredit[];
  id: number;
}

export type { TMDBMovie, TMDBDetailedMovie, TMDBMovieCredits };
