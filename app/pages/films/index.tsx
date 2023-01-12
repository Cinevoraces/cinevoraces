import { useRef, useEffect } from 'react';
import CustomHead from '@components/Head';
import { Filter, SearchBar } from '@components/Input';
import useSWR from 'swr';
import { useAppSelector, useAppDispatch } from '@store/store';
import { user } from 'store/slices/user';
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
import type { CompleteMovie, Season } from '@custom_types/index';
import type { ChangeEvent } from 'react';

import filtersSync from '@utils/filterSyncer';
import { MoviesGrid } from 'pages_chunks/film/UI';

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
  const handleChangeSearchValue = (e: ChangeEvent) =>
    e.currentTarget instanceof HTMLInputElement && dispatch(changeSearchQuery(e.currentTarget.value));
  //Filter state mechanics
  const { isFilterMenuOpen, availableFilters, userFilterInputs } = useAppSelector(filteredMovies);
  const handleToggleFilterMenu = () => dispatch(toggleFilterMenu());
  const handleSetFilters = (category: string, filter: string) => dispatch(setFilter({ category, filter }));
  const handleFilterReset = () => dispatch(cleanUserInputs());

  const { data: seasonsArray } = useSWR('/seasons');
  const seasons = useRef<{ name: string; value: string }[]>([]);

  const isUserConnected = useRef<boolean>(false);
  const id = useAppSelector(user).id;
  useEffect(() => {
    if (id) isUserConnected.current = true;
  }, [id]);

  // Initialise the default value for select button and first movies fetching
  useEffect(() => {
    if (seasonsArray) {
      seasons.current = [
        ...seasonsArray
          .filter((s: Season) => s.movie_count > 0)
          .map((s: { season_number: number; year: number; movie_count: number }) => ({
            name: `Saison ${s.season_number} - ${s.year}`,
            value: '' + s.season_number,
          })),
        { name: 'Tous les films', value: '0' },
      ].sort((a, b) => (a.value > b.value ? -1 : 1));
    }
    seasonsArray && !season && dispatch(changeSeason(seasons.current[0]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seasonsArray]);
  // Recovers movies from asked season, once season is defined
  const {
    data: movies,
    error,
    mutate,
  } = useSWR<CompleteMovie[], Error>(
    () =>
      season &&
      '/movies?where[is_published]=true' +
        `${selectQueryString}${season.value !== '0' ? `&where[season_number]=${season.value}` : ''}`
  );
  // Each Season change triggers an SWR call
  // Changing movie set alters filters displayed and stored in state
  // then reapply current filter rules to the new movie set
  useEffect(() => {
    mutate();
    if (movies) {
      dispatch(setAvailableFilters(filtersSync(movies)));
      dispatch(initializeOrCorrectUserInputs());
      // movies && dispatch(setFilteredMovies({ filteredMovies: movies, isUserConnected }));
    } else {
      dispatch(setAvailableFilters(filtersSync([])));
      dispatch(initializeOrCorrectUserInputs());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movies]);

  useEffect(() => {
    movies && dispatch(setFilteredMovies({ moviesToFilter: movies, isUserConnected: isUserConnected.current }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movies, searchQuery, userFilterInputs, isUserConnected.current]);

  const moviesResults = useAppSelector(filteredMovies).filteredMovies;

  useEffect(() => {
    console.log('moviesResults has changed');
  }, [moviesResults]);

  return (
    <>
      <CustomHead
        title="Cinévoraces - Les films"
        description="Découvrez la cinémathèque, cherchez la perle rare."
        slug="/films"
      />
      <main className="custom-container justify-start">
        <section className="w-full">
          <h1 className="hero-text text-start mb-4">Les films de la communauté</h1>
          <p>
          Retrouvez saison par saison les films sélectionnés par les{' '}
            <span className="emphasis">membres de CinéVoraces</span>. Chaque saison correspond à une année calendaire.
            <br />
          Bonnes découvertes !
          </p>
        </section>
        <section className="w-full flex flex-col gap-6 align-start md:flex-row">
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
              value={searchQuery ? searchQuery : ''}
              onChange={handleChangeSearchValue}
            />
          )}
          {availableFilters && moviesResults && (
            <Filter
              isMenuOpened={isFilterMenuOpen}
              displayMenuSetter={handleToggleFilterMenu}
              filterOptions={availableFilters}
              userFilterInputs={userFilterInputs}
              userFilterInputsSetter={handleSetFilters}
              userFilterReset={handleFilterReset}
              filtersCounter={Number(userFilterInputs.filtersCounter[0])}
              resultsCount={moviesResults.length}
              isUserConnected={isUserConnected.current}
            />
          )}
        </section>
        <MoviesGrid
          error={error}
          moviesResults={moviesResults}/>
      </main>
    </>
  );
}
