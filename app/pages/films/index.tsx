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

  const { data: seasonsArray } = useSWR('/seasons');
  const seasons = useRef<{ name: string; value: string; }[]>([]);

  // Initialise the default value for select button and first movies fetching
  useEffect(() => {
    if (seasonsArray){
      seasons.current = seasonsArray.map( (s: { season_number: number; year: number; movie_count: number }) => (
        {
          name: `Saison ${s.season_number} - ${s.year}`,
          value: '' + s.season_number,
        }
      ));
    }
    (seasonsArray) && dispatch(changeSeason(seasons.current[seasonsArray.length - 1]));
  }, [seasonsArray]);
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
          options={seasons.current}
          displayOptionsState={isSeasonSelectOpened}
          displayOptionsSetter={handleToggleSeasonSelect}
          stateValue={season}
          valueSetter={handleSeasonChange}
          customStyle="searchbar"
          id="search"
          placeholder="Rechercher un film"
          value={(searchQuery) ? searchQuery : ''}
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
