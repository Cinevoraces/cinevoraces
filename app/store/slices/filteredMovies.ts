import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { CompleteMovie } from '@custom_types/types';

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

interface filteredMoviesStateInterface {
  season?: Season;
  isSeasonSelectOpened: boolean;
  isFilterMenuOpen: boolean;
  allMoviesFromSeason?: CompleteMovie[];
  availableFilters?: FilterOptionsProps;
  userFilters?: FilterOptionsProps;
  filteredMovies?: CompleteMovie[];
}

const initialState: filteredMoviesStateInterface = {
  isSeasonSelectOpened: false,
  isFilterMenuOpen: false,
};

const filteredMoviesSlice = createSlice({
  name: 'filteredMovies',
  initialState,
  reducers: {
    toggleSeasonSelect(state) {
      return { ...state, isSeasonSelectOpened: !state.isSeasonSelectOpened };
    },
    toggleFilterMenu(state) {
      return { ...state, isFilterMenuOpen: !state.isFilterMenuOpen };
    },
    changeSeason(state, action) {
      return { ...state, season: action.payload };
    },
    setAllMoviesAndAvailableFiltersFromSeason(state, action) {
      return {
        ...state,
        allMoviesFromSeason: action.payload.movies,
        filteredMovies: action.payload.movies,
        availableFilters: action.payload.filters,
        userFilters: {},
      };
    },
    setFilter(state, action){
      const { category, filter } = action.payload;
      // If userFilters are still undefined, create the property and fill it with the first category and filter
      if (!state.userFilters){
        return {
          ...state,
          userFilters: {
            [category]: [filter]
          }
        };
      }
      // If userFilters already exists, check if the category exists. If not, create it and fill it
      if (!state.userFilters[category]){
        return {
          ...state,
          userFilters: {
            ...state.userFilters,
            [category]: [action.payload.filter]
          }
        };
      }
      // Finally, userFilters and the concerned category exist
      // If genres or countries are asked, it's a toggle
      if (category === 'genres' || category === 'countries'){
        return {
          ...state,
          userFilters: { ...state.userFilters,
            [category]: (category.contains(filter)) ? category.filter( (f: string) => f !== filter)
              : [...category, filter]
          },
        };
      }
      // If not, just replace the stored value by the new one
      return {
        ...state,
        userFilters: {
          ...state.userFilters,
          [category]: [filter],
        }
      };
    },
  }
});

export const filteredMovies = (state: RootState) => state.filteredMovies;
export const {
  toggleSeasonSelect,
  toggleFilterMenu,
  changeSeason,
} = filteredMoviesSlice.actions;
export default filteredMoviesSlice.reducer;
