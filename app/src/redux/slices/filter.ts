import type { RootState } from 'redux/store';
import { createSlice } from '@reduxjs/toolkit';

type filterState = {
  mainFilters: filter[],
  genre: filter[],
  country: filter[],
  periode: {[key: string]: number[]},
  runtime: {[key: string]: number},
  avgRate: number,
  query: string,
  isDefault: boolean,
  isLogged: boolean
}

const initialState: filterState = { 
  mainFilters: [],
  periode: {
    baseValues: [1919, new Date().getFullYear()],
    stateValues: [1919, new Date().getFullYear()]
  },
  runtime: {maxValue: 200, value: 0},
  avgRate: 0,
  genre: [],
  country: [],
  query: '',
  isDefault: true,
  isLogged: false
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    // Rewrite state with fetched data
    initFilters(state, {payload}: {payload: DBFilters[]}) {
      // Set Periodes
      state.periode = {
        baseValues: [parseInt(payload[0].min_max_dates[0].split(',')[0],10), parseInt(payload[0].min_max_dates[0].split(',')[1],10)],
        stateValues: [parseInt(payload[0].min_max_dates[0].split(',')[0],10), parseInt(payload[0].min_max_dates[0].split(',')[1],10)]
      };
      state.runtime.maxValue = payload[0].max_runtime;
      state.runtime.value = payload[0].max_runtime;
      // Set Average rate
      state.avgRate = 0;
      payload.forEach(({seasons_list, genres_list, countries_list}) => {
        // Set Seasons
        let formatedData: Array<{name: string, isChecked: boolean, value?: string}> = [
          {name: 'Tout les films', value: '', isChecked: false},
          {name: 'Ma liste', value: 'bookmarked=true', isChecked: false},
        ]; // Formated data container
        let constructor: Array<number[] | string> = []; // Constructor container
        seasons_list.forEach((season) => {
          !(constructor.includes(season)) && constructor.push(season);
        });
        constructor.forEach((season, index) => { // Format data
          console.log(season)
          formatedData.push(
            {name: `Saison ${season}`, value: `season_number=${season[0]}`, 
              isChecked: (index === constructor.length - 1) ? true : false});
        });
        state.mainFilters = formatedData; // Update state
        constructor = []; // Reset constructor
        formatedData = []; // Reset formatedData
        // Format genres
        genres_list.forEach((genre) => {
          !(constructor.includes(genre)) && constructor.push(genre);
        });
        constructor.forEach((genre) => {
          formatedData.push({name: genre as string, isChecked: false});
        });
        state.genre = formatedData;
        constructor = [];
        formatedData = [];
        // Format countries
        countries_list.forEach((country) => {
          !(constructor.includes(country)) && constructor.push(country);
        }); 
        constructor.forEach((country) => {
          formatedData.push({name: country as string, isChecked: false});
        });
        state.country = formatedData;
      });
    },
    resetFilters(state) {
      // Reset Season
      state.mainFilters.forEach((el, index) => {
        el.isChecked = (index === state.mainFilters.length - 1) ? true : false; // Set last season true
      });
      // Reset Tags
      [state.genre, state.country].forEach((tag) => {
        tag.forEach((el) => {
          el.isChecked = false;
        });
      });
      // Reset range values
      state.periode.stateValues = state.periode.baseValues;
      state.runtime.value = state.runtime.maxValue;
      state.avgRate = 0;
      state.isDefault = true;
    },
    setMainFilter(state, action) {
      state.mainFilters.forEach((el) => {
        el.isChecked = (el.value === action.payload) ? true : false;
      });
      state.isDefault = false;
    },
    setCountryFilter(state, action) {
      state.country.forEach((el) => {
        if (el.name === action.payload) {
          el.isChecked = !el.isChecked;};
      });
      state.isDefault = false;
    },
    setGenreFilter(state, action) {
      state.genre.forEach((el) => {
        if (el.name === action.payload) {
          el.isChecked = !el.isChecked;};
      });
      state.isDefault = false;
    },
    setPeriodeMinVal(state, action) {
      state.periode.stateValues[0] = action.payload;
      state.isDefault = false;
    },
    setPeriodeMaxVal(state, action) {
      state.periode.stateValues[1] = action.payload;
      state.isDefault = false;
    },
    setRuntimeVal(state, action) {
      state.runtime.value = action.payload;
      state.isDefault = false;
    },
    setAverageRateVal(state, action) {
      state.avgRate = action.payload;
      state.isDefault = false;
    },
    setQuery(state, action) {
      state.query = action.payload;
    }}});

export const filters = (state: RootState) => state.filter;
export const { 
  initFilters,
  resetFilters,
  setMainFilter,
  setCountryFilter,
  setGenreFilter,
  setPeriodeMinVal, 
  setPeriodeMaxVal,
  setRuntimeVal,
  setAverageRateVal,
  setQuery
} = filterSlice.actions;
export default filterSlice.reducer;