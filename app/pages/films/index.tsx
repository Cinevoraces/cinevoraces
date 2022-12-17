import { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
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
  setFilteredMovies,
  cleanUserInputs,
} from '@store/slices/filteredMovies';
import type { CompleteMovie, Season, FilterOptions } from '@custom_types/index';
import type { ChangeEvent } from 'react';

import filtersSync from '@utils/filterSyncer';

const posterStyles = `rounded-lg w-full h-full object-cover shadow-lg max-w-[250px] 
    hover:scale-105 
    transition duration-150 hover:ease-out `;
const gridStyle = 'w-full grid gap-2 grid-cols-2 ';

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
  const handleFilterReset = () => dispatch(cleanUserInputs());

  const { data: seasonsArray } = useSWR('/seasons');
  const seasons = useRef<{ name: string; value: string; }[]>([]);

  // Initialise the default value for select button and first movies fetching
  useEffect(() => {
    if (seasonsArray){
      seasons.current = [ 
        ...seasonsArray
          .map( (s: { season_number: number; year: number; movie_count: number }) => (
            {
              name: `Saison ${s.season_number} - ${s.year}`,
              value: '' + s.season_number,
            }
          )),
        { name: 'Tous les films', value: '0' }]
        .sort((a, b) => a.value > b.value ? -1 : 1);
    }
    (seasonsArray && !season) && dispatch(changeSeason(seasons.current[seasonsArray.length - 1]));
  }, [seasonsArray]);
  // Recovers movies from asked season, once season is defined
  const { data: movies, error, mutate } = useSWR(() => (season) && `/movies?${selectQueryString}${(season.value !== '0') ? `&where[season_number]=${season.value}` : ''}`);
  // Each Season change triggers an SWR call
  // Changing movie set alters filters displayed and stored in state
  // then reapply current filter rules to the new movie set
  useEffect(() => {
    mutate();
    if (movies){
      dispatch(setAvailableFilters(filtersSync(movies)));
      dispatch(initializeOrCorrectUserInputs());
      movies && dispatch(setFilteredMovies(movies));  
    }
  }, [movies]);

  // On user filter inputs, alter movies set for representation
  useEffect(() => {
    movies && dispatch(setFilteredMovies(movies));
  }, [searchQuery, userFilterInputs]);

  const movieResults = useAppSelector(filteredMovies).filteredMovies;

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
          placeholder="🔍 Rechercher un film"
          value={(searchQuery) ? searchQuery : ''}
          onChange={handleChangeSearchValue}
        />
      )}
      { availableFilters &&
        <Filter 
          isMenuOpened={isFilterMenuOpen}
          displayMenuSetter={handleToggleFilterMenu}
          filterOptions={availableFilters}
          userFilterInputs={userFilterInputs}
          userFilterInputsSetter={handleSetFilters}
          userFilterReset={handleFilterReset}
          filtersCounter={Number(userFilterInputs.filtersCounter[0])}
        />
      }
      <section id="movie-grid">
        {error && <p>Une erreur est survenue.</p>}
        {!movieResults && !error && <p>Chargement des données.</p>}
        {movieResults && 
        <div className='flex flex-col gap-3 font-medium'>
          <p>{movieResults.length + ' films'}</p>
          <ul className={gridStyle}>
            {
              movieResults.map((movie: CompleteMovie) => (
                <li key={movie.french_title}>
                  <Link href={`/films/${movie.id}`}>
                    <Image
                      src={movie.poster_url}
                      alt={`${movie.french_title} movie poster`}
                      width={200}
                      height={(200 * 9) / 16}
                      className={posterStyles}
                    />
                  </Link>
                </li>))
            }
          </ul>
        </div>
        }
      </section>
    </main>
  );
}
