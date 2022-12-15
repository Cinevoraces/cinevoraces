import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { filteredMoviesStateInterface } from '@custom_types/index';

const initialState: filteredMoviesStateInterface = {
  isSeasonSelectOpened: false,
  isFilterMenuOpen: false,
  availableFilters: {
    genres:[],
    countries:[],
    runtime:[],
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
    changeSearchQuery(state, action){
      return { ...state, searchQuery: action.payload };
    },
    setAvailableFilters(state, action) {
      return {
        ...state,
        availableFilters: action.payload,
      };
    },
    initializeOrCorrectUserInputs(state){
      //initialize or corrects filters that gets modified or removed by season change
      return {
        ...state,
        userFilterInputs: {
          ...state.userFilterInputs,
          runtime: [state.availableFilters.runtime[1]],
          releaseYear: [...state.availableFilters.releaseYear],
        }
      };
    },
    setFilter(state, action){
      const { category, filter } = action.payload;
      if (category.includes('ReleaseYear')){
        if (category === 'minReleaseYear' && state.userFilterInputs.releaseYear){
          return {
            ...state,
            userFilterInputs: {
              ...state.userFilterInputs,
              releaseYear: [
                Math.max(filter, Number(state.availableFilters.releaseYear[0])).toString(),
                state.userFilterInputs.releaseYear[1],
              ]
            }
          };
        } else if (state.userFilterInputs.releaseYear){
          return {
            ...state,
            userFilterInputs: {
              ...state.userFilterInputs,
              releaseYear: [
                state.userFilterInputs.releaseYear[0],
                Math.min(filter, Number(state.availableFilters.releaseYear[1])).toString(),
              ]
            }
          };
        }
      }
      if (!state.userFilterInputs[category] || category === 'runtime' || category === 'avgRate'){
        return {
          ...state,
          userFilterInputs: {
            ...state.userFilterInputs,
            [category]: [filter],
          },
        };
      }
      if (category === 'genres' || category === 'countries'){
        return {
          ...state,
          userFilterInputs: {
            ...state.userFilterInputs,
            [category]: 
            // Use of ! as last resort as type asertion could not work
                  (state.userFilterInputs[category]!.includes(filter)) ?
                    [ ...state.userFilterInputs[category]!.filter((f) => f !== filter)]
                    : [
                      ...state.userFilterInputs[category]!,
                      filter
                    ]
          }
        };
      }
    },
  }
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
