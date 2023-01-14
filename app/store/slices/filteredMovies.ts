import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { CompleteMovie, FilteredMoviesStateInterface, FilterOptions, FilterUserInputs } from '@custom_types/index';

const initialState: FilteredMoviesStateInterface = {
  isSeasonSelectOpened: false,
  isFilterMenuOpen: false,
  availableFilters: {
    genres: [],
    countries: [],
    runtime: [],
    releaseYear: [],
    avgRate: [],
  },
  userFilterInputs: {
    filtersCounter: ['0'],
  },
};

const filteredMoviesSlice = createSlice({
  name: 'filteredMovies',
  initialState,
  reducers: {
    toggleSeasonSelect(state: FilteredMoviesStateInterface) {
      return { ...state, isSeasonSelectOpened: !state.isSeasonSelectOpened };
    },
    toggleFilterMenu(state: FilteredMoviesStateInterface) {
      return { ...state, isFilterMenuOpen: !state.isFilterMenuOpen };
    },
    changeSeason(state: FilteredMoviesStateInterface, action) {
      return { ...state, season: action.payload };
    },
    changeSearchQuery(state: FilteredMoviesStateInterface, action) {
      return { ...state, searchQuery: action.payload };
    },
    setAvailableFilters(state: FilteredMoviesStateInterface, action) {
      return {
        ...state,
        availableFilters: action.payload,
      };
    },
    cleanUserInputs(state: FilteredMoviesStateInterface) {
      return {
        ...state,
        userFilterInputs: {
          filtersCounter: ['0'],
          releaseYear: state.availableFilters.releaseYear,
        },
      };
    },
    initializeOrCorrectUserInputs(state: FilteredMoviesStateInterface) {
      //initializes or corrects filters that gets modified or removed by user season change
      const newState = state;

      if (newState.userFilterInputs.genres) {
        newState.userFilterInputs.genres = newState.userFilterInputs.genres.filter((g) =>
          newState.availableFilters.genres.includes(g)
        );
      }
      if (newState.userFilterInputs.countries) {
        newState.userFilterInputs.countries = newState.userFilterInputs.countries.filter((g) =>
          newState.availableFilters.countries.includes(g)
        );
      }
      if (newState.userFilterInputs.runtime) {
        newState.userFilterInputs.runtime = [
          Math.max(
            Math.min(Number(newState.userFilterInputs.runtime[0]), Number(newState.availableFilters.runtime[1])),
            Number(Number(newState.availableFilters.runtime[0]))
          ).toString(),
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
    setFilter(state: FilteredMoviesStateInterface, action) {
      const { category, filter } = action.payload;
      // This code block is relying on releaseYear being initialized
      if (category.includes('ReleaseYear') && state.userFilterInputs.releaseYear) {
        const newReleaseYears =
          category === 'minReleaseYear'
            ? (state.userFilterInputs.releaseYear = [
              Math.min(
                Math.max(filter, Number(state.availableFilters.releaseYear[0])),
                Number(state.userFilterInputs.releaseYear![1])
              ).toString(),
              state.userFilterInputs.releaseYear[1],
            ])
            : (state.userFilterInputs.releaseYear = [
              state.userFilterInputs.releaseYear[0],
              Math.max(
                Math.min(filter, Number(state.availableFilters.releaseYear[1])),
                Number(state.userFilterInputs.releaseYear[0])
              ).toString(),
            ]);
        state.userFilterInputs.releaseYear = newReleaseYears;
        state.userFilterInputs.filtersCounter = [countFilters(state.userFilterInputs, state.availableFilters).toString()];
        return state;
      }
      // Category initializer or single value arrays
      if (!state.userFilterInputs[category] || category === 'runtime' || category === 'avgRate') {
        state.userFilterInputs[category] = [filter];
        state.userFilterInputs.filtersCounter = [countFilters(state.userFilterInputs, state.availableFilters).toString()];
        return state;
      }
      if ((category === 'genres' || category === 'countries' || category === 'review') && state.userFilterInputs[category]) {
        state.userFilterInputs[category] =
          // Use of ! as last resort as type asertion could not work -------- To fix later ------------
          state.userFilterInputs[category]?.includes(filter)
            ? [...state.userFilterInputs[category]!.filter((f) => f !== filter)]
            : [...state.userFilterInputs[category]!, filter];
        state.userFilterInputs.filtersCounter = [countFilters(state.userFilterInputs, state.availableFilters).toString()];
        return state;
      }
    },
    setFilteredMovies(state: FilteredMoviesStateInterface, action) {
      const { moviesToFilter, isUserConnected } = action.payload;
      const { genres, countries, runtime, releaseYear, avgRate, review } = state.userFilterInputs;
      const searchQuery = state.searchQuery;
      const filterFunctions = [
        (m: CompleteMovie) =>
          genres && genres.length > 0 ? m.genres.filter((g) => genres?.includes(g)).length > 0 : true,
        (m: CompleteMovie) =>
          countries && countries.length > 0 ? m.countries.filter((g) => countries?.includes(g)).length > 0 : true,
        (m: CompleteMovie) => (runtime ? m.runtime <= Number(runtime[0]) : true),
        (m: CompleteMovie) =>
          releaseYear
            ? Number(releaseYear[0]) <= Number(m.release_date.slice(0, 4)) &&
              Number(m.release_date.slice(0, 4)) <= Number(releaseYear[1])
            : true,
        (m: CompleteMovie) => (avgRate ? m.metrics.avg_rating >= Number(avgRate) : true),
        (m: CompleteMovie) => (searchQuery ? m.french_title.toLowerCase().includes(searchQuery.toLowerCase()) : true),
        (m: CompleteMovie) =>
          (isUserConnected && review && review.includes('bookmarked')) ? (m.user_review?.bookmarked) : true,
        (m: CompleteMovie) =>
          (isUserConnected && review && review.includes('unwatched')) ? (!m.user_review || !m.user_review?.viewed) : true,
        (m: CompleteMovie) =>
          (isUserConnected && review && review.includes('liked')) ? (m.user_review?.liked) : true,
      ];
      const newState = state;
      newState.filteredMovies = filterFunctions.reduce(
        (acc, filterFunc) => acc.filter((movie) => filterFunc(movie)),
        [...moviesToFilter]
      );
      return newState;
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
  setFilteredMovies,
  cleanUserInputs,
} = filteredMoviesSlice.actions;
export default filteredMoviesSlice.reducer;

const countFilters = (userFilters: FilterUserInputs, availableFilters: FilterOptions) => {
  let counter = 0;
  for (const category in userFilters) {
    if (userFilters[category]) {
      if (category === 'avgRate') counter++;
      if (category === 'genres' || category === 'countries' || category === 'review') counter += userFilters[category]!.length;
      if (category === 'runtime' && userFilters[category]![0] !== availableFilters[category][1] ) counter ++;
      if (
        category === 'releaseYear' &&
        (userFilters[category]![0] !== availableFilters[category][0] ||
          userFilters[category]![1] !== availableFilters[category][1])
      )
        counter++;
    }
  }
  return counter;
};
