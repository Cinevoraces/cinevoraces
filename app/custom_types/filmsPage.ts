import type { CompleteMovie } from './movies';

export interface Season{
  name: string;
  value: string;
}

export interface FilterOptionsProps {
  genres?: string[];
  countries?: string[];
  runtime?: string[];
  minReleaseYear?: string[];
  maxReleaseYear?: string[];
  minAvgRate?: string[];
  [key: string]: string[] | undefined;
}

export interface filteredMoviesStateInterface {
  season?: Season;
  searchQuery?: string;
  isSeasonSelectOpened: boolean;
  isFilterMenuOpen: boolean;
  allMoviesFromSeason?: CompleteMovie[];
  availableFilters?: FilterOptionsProps;
  userFilters?: FilterOptionsProps;
  filteredMovies?: CompleteMovie[];
}

