import type { CompleteMovie } from './movies';

export interface SeasonOption{
  name: string;
  value: string;
}

export interface FilterOptions {
  genres: string[];
  countries: string[];
  runtime: string[];
  releaseYear: string[];
  avgRate: string[];
  [key: string]: string[];
}
export interface FilterUserInputs {
  filtersCounter: string[];
  genres?: string[];
  countries?: string[];
  runtime?: string[];
  releaseYear?: string[];
  avgRate?: string[];
  [key: string]: string[] | undefined;
}

export interface FilteredMoviesStateInterface {
  season?: SeasonOption;
  searchQuery?: string;
  isSeasonSelectOpened: boolean;
  isFilterMenuOpen: boolean;
  availableFilters: FilterOptions;
  userFilterInputs: FilterUserInputs;
  filteredMovies?: CompleteMovie[];
}

