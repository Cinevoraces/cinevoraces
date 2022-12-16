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
  setAvailableFilters,
  initializeOrCorrectUserInputs,
  setFilter,
} from '@store/slices/filteredMovies';
import type { CompleteMovie, Season, FilterOptions } from '@custom_types/index';

import filtersSync from '@utils/filterSyncer';

import { toast } from 'react-hot-toast';

// To delete later
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
  //Searchbar state mechanics
  const { season, searchQuery, isSeasonSelectOpened } = useAppSelector(filteredMovies);
  const handleToggleSeasonSelect = () => dispatch(toggleSeasonSelect());
  const handleSeasonChange = (season: Season) => dispatch(changeSeason(season));
  const handleChangeSearchValue = (e: ChangeEvent) => (e.currentTarget instanceof HTMLInputElement) && dispatch(changeSearchQuery(e.currentTarget.value));
  //Filter state mechanics
  const { isFilterMenuOpen, availableFilters, userFilterInputs } = useAppSelector(filteredMovies);
  const handleToggleFilterMenu = () => dispatch(toggleFilterMenu());
  const handleSetFilters = (category: string, filter: string) => dispatch(setFilter({ category, filter }));
  //To replace with the appropriate season endpoint later
  const { data: metrics } = useSWR('/metrics');

  // Initialise the default value for select button and first movies fetching
  useEffect(() => {
    metrics && dispatch(changeSeason(seasons.filter((s) => s.value == metrics.seasons_count)[0]));
  }, [metrics, dispatch]);
  const { data: movies, error, mutate } = useSWR(() => (season) && '/movies?' + selectQueryString + '&where[season_number]=' + season.value);
  useEffect(() => {
    mutate();
    // console.log(movies);
  }, [season, movies, mutate]);

  useEffect(() => {
    if (movies){
      dispatch(setAvailableFilters(filtersSync(movies)));
      dispatch(initializeOrCorrectUserInputs());
    }
  }, [movies]);

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
      { (availableFilters) &&
        <Filter 
          isMenuOpened={isFilterMenuOpen}
          displayMenuSetter={handleToggleFilterMenu}
          filterOptions={availableFilters}
          userFilterInputs={userFilterInputs}
          userFilterInputsSetter={handleSetFilters}
        />
      }
      <section id="movie-grid">
        {error && <p>Une erreur est survenue.</p>}
        {!movies && !error && <p>Chargement des données.</p>}
        {movies && movies.map((m: CompleteMovie) => <p key={m.french_title}>{m.french_title}</p>)}
      </section>
    </main>
  );
}
