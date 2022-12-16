import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { filteredMoviesStateInterface } from '@custom_types/index';

const initialState: filteredMoviesStateInterface = {
  isSeasonSelectOpened: false,
  isFilterMenuOpen: false,
  availableFilters: {
    genres: [],
    countries: [],
    runtime: [],
    releaseYear: [],
    avgRate: [],
  },
  userFilterInputs: {},
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
    changeSearchQuery(state, action) {
      return { ...state, searchQuery: action.payload };
    },
    setAvailableFilters(state, action) {
      return {
        ...state,
        availableFilters: action.payload,
      };
    },
    initializeOrCorrectUserInputs(state) {
      //initializes or corrects filters that gets modified or removed by user season change
      const newState = state;

      if (newState.userFilterInputs.genres){
        newState.userFilterInputs.genres = newState.userFilterInputs.genres.filter((g) => newState.availableFilters.genres.includes(g));
      } 
      if (newState.userFilterInputs.countries){
        newState.userFilterInputs.countries = newState.userFilterInputs.countries.filter((g) => newState.availableFilters.countries.includes(g));
      } 
      if (newState.userFilterInputs.runtime){
        newState.userFilterInputs.runtime = [
          Math.max(
            Math.min(Number(newState.userFilterInputs.runtime[0]), Number(newState.availableFilters.runtime[1])),
            Number(Number(newState.availableFilters.runtime[0]))
          ).toString()
        ];
      }
      // if (newState.userFilterInputs.releaseYear){
      //   newState.userFilterInputs.releaseYear = [
      //     Math.max(
      //       Math.min(Number(newState.userFilterInputs.releaseYear[0]), Number(newState.availableFilters.releaseYear[1])),
      //       Number(Number(newState.availableFilters.releaseYear[0])),
      //     ).toString(),
      //     Math.min(
      //       Math.max(Number(newState.userFilterInputs.releaseYear[1]), Number(newState.availableFilters.releaseYear[0])),
      //       Number(Number(newState.availableFilters.releaseYear[1]))
      //     ).toString()];
      // }
      newState.userFilterInputs.releaseYear = state.availableFilters.releaseYear;
      return newState;
    },
    setFilter(state, action) {
      const { category, filter } = action.payload;
      // This code block is relying on releaseYear being initialized
      if (category.includes('ReleaseYear') && state.userFilterInputs.releaseYear) {
        const newReleaseYears = (category === 'minReleaseYear')
          ? state.userFilterInputs.releaseYear = [
            Math.min(
              Math.max(filter, Number(state.availableFilters.releaseYear[0])),
              Number(state.userFilterInputs.releaseYear![1]),
            ).toString(),
            state.userFilterInputs.releaseYear[1],
          ]
          : state.userFilterInputs.releaseYear = [
            state.userFilterInputs.releaseYear[0],
            Math.max(
              Math.min(filter, Number(state.availableFilters.releaseYear[1])),
              Number(state.userFilterInputs.releaseYear[0]),
            ).toString(),
          ];
        state.userFilterInputs.releaseYear = newReleaseYears;
        return state;
      };
      // Category initializer or single value arrays
      if (!state.userFilterInputs[category] || category === 'runtime' || category === 'avgRate') {
        state.userFilterInputs[category] = [filter];
        return state;
      };
      if ((category === 'genres' || category === 'countries') && state.userFilterInputs[category]) {
        state.userFilterInputs[category] = 
              // Use of ! as last resort as type asertion could not work -------- To fix later ------------
              state.userFilterInputs[category]?.includes(filter)
                ? [...state.userFilterInputs[category]!.filter((f) => f !== filter)]
                : [...state.userFilterInputs[category]!, filter];
        return state;
      };
    },
  },
});

export const filteredMovies = (state: RootState) => state.filteredMovies;
export const {
  toggleSeasonSelect,
  toggleFilterMenu,
  changeSeason,
  changeSearchQuery,
  setAvailableFilters,
  initializeOrCorrectUserInputs,
  setFilter,
} = filteredMoviesSlice.actions;
export default filteredMoviesSlice.reducer;
