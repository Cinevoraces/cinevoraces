import type { ChangeEvent } from 'react';
import React, { useState, useRef, useEffect } from 'react';
import { Filter, SearchBar } from '@components/Input';
import useSWR from 'swr';
import { useAppSelector, useAppDispatch } from '@store/store';
import {
  filteredMovies,
  toggleSeasonSelect,
  toggleFilterMenu,
  changeSeason,
  changeSearchQuery,
  setAllMoviesAndAvailableFiltersFromSeason,
  setFilter,
} from '@store/slices/filteredMovies';
import type { CompleteMovie, Season } from '@custom_types/index';
import { getType } from '@reduxjs/toolkit';

const seasons = [
  // { name: 'Saison 4 - 2023', value: '4' },
  { name: 'Saison 3 - 2022', value: '3' },
  { name: 'Saison 2 - 2021', value: '2' },
  { name: 'Saison 1 - 2020', value: '1' },
  { name: 'Tous les films', value: '0' },
];
const metadatas = [
  'casting',
  'directors',
  'runtime',
  'release_date',
  'genres',
  'countries',
  'languages',
  'presentation',
  'metrics',
  'comments',
];
let selectQueryString: string = '';
metadatas.forEach((dataName) => (selectQueryString += `&select[${dataName}]=true`));

export default function Films() {
  const dispatch = useAppDispatch();
  const handleToggleSeasonSelect = () => dispatch(toggleSeasonSelect());
  const handleSeasonChange = (season: Season) => dispatch(changeSeason(season));
  const handleChangeSearchValue = (e: ChangeEvent) => (e.currentTarget instanceof HTMLInputElement) && dispatch(changeSearchQuery(e.currentTarget.value));
  const { data: metrics } = useSWR('/metrics');

  // Initialise the default value for select button and first movies fetching
  useEffect(() => {
    console.log(metrics);
    metrics && dispatch(changeSeason(seasons.filter((s) => s.value == metrics.seasons_count)[0]));
  }, [metrics, dispatch]);
  const { season, searchQuery, isSeasonSelectOpened, isFilterMenuOpen } = useAppSelector(filteredMovies);
  const { data: movies, error, mutate } = useSWR(() => (season) && '/movies?' + selectQueryString + '&where[season_number]=' + season.value);
  useEffect(() => {
    mutate();
    console.log(movies);
  }, [season, movies, mutate]);

  useEffect(() => {
    const filterCategories = ['genres', 'countries', 'runtime', 'release_date'];
    const filters: {[key: string]: string[] | undefined } = {};
    (movies) &&
      filterCategories.forEach((cat) => {
        const updatedFilters = {
          ...movies.reduce(
            (filters: {[key: string]: string[] }, movie: CompleteMovie) => {
              if (Array.isArray(movie[cat])) {
                return {
                  ...filters, 
                  [cat]: [
                    ...filters[cat],
                    ...movie[cat]?.filter((f: string) => !filters[cat].includes(f)),
                  ],
                };
              } else if (typeof movie[cat] === 'number' || typeof movie[cat] === 'string'){
                return {
                  ...filters, 
                  [cat]: [
                    ...filters[cat],
                    (!filters[cat].includes(movie[cat])) ? movie[cat] : null,
                  ],
                };
              }
            }, { [cat]: []})
        };
        console.log('updatedFilters : ', updatedFilters);
        filters[cat] = updatedFilters[cat];
      });
    console.log('filters object : ', filters);
  }, [movies]);

  // const handleToggleFilterMenu = () => dispatch(toggleFilterMenu());
  // console.log(useAppSelector(filteredMovies));

  // // State management to be replaced with Redux
  // // const [season, setSeason] = useState(seasons[0]);
  // const [isSelectOpened, setIsSelectOpened] = useState(false);
  // const toggleSelectDisplay = () => setIsSelectOpened(!isSelectOpened);
  // const [searchValue, setSearchValue] = useState('');
  // //Recover last season Number, to change once the API can send a complete season array
  // const {
  //   data: movies,
  //   error,
  //   mutate,
  // } = useSWR(`/movies?${(season.value !== '0') ? `where[season_number]=${season.value}` : ''}${selectQueryString}`);

  return (
    <main className="custom-container ">
      {season && (
        <SearchBar
          name="searchbarSelect"
          options={seasons}
          displayOptionsState={isSeasonSelectOpened}
          displayOptionsSetter={handleToggleSeasonSelect}
          stateValue={season}
          valueSetter={handleSeasonChange}
          customStyle="searchbar"
          id="search"
          placeholder="Rechercher un film"
          value={searchQuery}
          onChange={handleChangeSearchValue}
        />
      )}
      <Filter />
      <section id="movie-grid">
        {error && <p>Une erreur est survenue.</p>}
        {!movies && !error && <p>Chargement des données.</p>}
        {movies && movies.map((m: CompleteMovie) => <p key={m.french_title}>{m.french_title}</p>)}
      </section>
    </main>
  );
}
