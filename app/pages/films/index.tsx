import React, { useState, useRef, useEffect } from 'react';
import { Filter, SearchBar } from '@components/Input';
import useSWR from 'swr';
import { useAppSelector, useAppDispatch } from '@store/store';
import { filteredMovies, toggleSeasonSelect, toggleFilterMenu, changeSeason } from '@store/slices/filteredMovies';
import type { CompleteMovie } from '@custom_types/types';

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
  const { data: metrics, error: metricsError } = useSWR('/metrics');
  // useEffect(()=> {
  //   console.log(metrics);
  //   (metrics) && dispatch(changeSeason(seasons.filter((s) => s.value == metrics.seasons_count)[0]));
  // }, [metrics]);
  // const season = useAppSelector(filteredMovies).season;
  // console.log(season.value);
  const {
    data: movies,
    error,
    mutate,
  } = useSWR(() => ('/movies?where[season_number]=' + metrics.seasons_count));
  console.log(movies);
  //   const {
  //   data: movies,
  //   error,
  //   mutate,
  // } = useSWR(`/movies?${(season.value !== '0') ? `where[season_number]=${season.value}` : ''}${selectQueryString}`);
  // const season = (metrics) && metrics.seasons_count;
  // dispatch(changeSeason({ name: 'Saison 3 - 2022', value: '3' }));

  // const { isSeasonSelectOpened, isFilterMenuOpen, } = useAppSelector(filteredMovies);
  // const handleToggleSeasonSelect = () => dispatch(toggleSeasonSelect);
  // const handleChangeSeason = () => dispatch(changeSeason);

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
      {/* {
        (season) &&
        <SearchBar
          name="searchbarSelect"
          options={seasons}
          displayOptionsState={isSeasonSelectOpened}
          displayOptionsSetter={handleToggleSeasonSelect}
          stateValue={season}
          valueSetter={handleChangeSeason}
          customStyle="searchbar"
          id="search"
          placeholder="Rechercher un film"
          value={searchValue}
          onChange={(e) => setSearchValue(e.currentTarget.value)}
        />
      }
      <Filter 
      />
      <section id="movie-grid">
        {error && <p>Une erreur est survenue.</p>}
        {!movies && !error && <p>Chargement des données.</p>}
        {movies && movies.map((m) => <p>{m.french_title}</p>)}
      </section> */}
    </main>
  );
}
