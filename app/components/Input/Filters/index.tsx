import { useEffect, useRef } from 'react';
import type { FormEvent } from 'react';
import Button from '../Button';
import { CheckBox, RangeInput, DoubleRangeInput, StarRadio } from '../index';
import { FilterSvg, ResetSvg } from '@components/SvgComponents/Filter';
import { BookmarkSvg, LikeSvg } from '@components/SvgComponents/InteractionsSVG';
import UnwatchedSvg from '@components/SvgComponents/Unwatched';
import userFilterResetHandling from './handleSetRangeInput';

import { toast } from 'react-hot-toast';

import type { FilterOptions, FilterUserInputs, SeasonOption } from 'models/custom_types/index';
export interface FilterProps {
  filterOptions: FilterOptions;
  isMenuOpened: boolean;
  displayMenuSetter: ()=>void;
  userFilterInputs: FilterUserInputs;
  userFilterInputsSetter: (category: string, filter: string)=>{ payload: FilterUserInputs; type: string };
  userFilterReset: ()=>void;
  filtersCounter: number;
  resultsCount?: number;
  isUserConnected?: boolean;
  season?: SeasonOption;
}

const counterFilterStyle = `absolute z-10 -top-5 -right-6 w-[22px] h-[22px] 
  flex items-center justify-center
  text-dark-gray text-xs 
  rounded-full bg-orange-primary 
  after:absolute after:-z-10 after:w-4 after:h-4 after:bg-orange-primary/50 after:rounded-full after:animate-ping`;

/**
 * 
 * @param filterOptions - adapted filtering options to the current season selection
 * @param isMenuOpened - opening status state
 * @param displayMenuSetter - opening setter
 * @param userFilterInputs - state containing user inputs collection
 * @param userFilterInputsSetter - state setter for user inputs collection
 * @param userFilterReset - function to handle state reset and other consequences
 * @param filtersCounter - filterCounter state
 * @param resultsCount - length from selected movie array
 * @param isUserConnected - taken from user state
 * @param season - from state
 * @returns <div> Interactive filtering component for movie grids
 */
const Filter = ({
  filterOptions,
  isMenuOpened,
  displayMenuSetter,
  userFilterInputs,
  userFilterInputsSetter,
  userFilterReset,
  filtersCounter,
  resultsCount,
  isUserConnected,
  season,
}: FilterProps) => {
  const categories = [
    { title: 'Genres', stateName: 'genres' },
    { title: 'Durée', stateName: 'runtime' },
    { title: 'Année de sortie', stateName: 'releaseYear' },
    { title: 'Note moyenne', stateName: 'avgRate' },
    { title: 'Pays de production', stateName: 'countries' },
  ];
  if (isUserConnected) categories.splice(0, 0, { title: 'Mes actions', stateName: 'review' });

  const reviewActions = [
    { title: 'Ma liste', stateName: 'bookmarked', svg: <BookmarkSvg style="absolute right-7 w-5 h-5 stroke-white fill-none"/> },
    { title: 'Non-vus', stateName: 'unwatched', svg: <UnwatchedSvg style="absolute right-[26px] -top-0.5 w-6 h-6 "/> },
    { title: 'Mes Favoris', stateName: 'liked', svg: <LikeSvg style="absolute right-7 w-5 h-5 stroke-white fill-none"/> }, 
  ];

  const toggleDisplay = () => displayMenuSetter();
  const filterRef = useRef<HTMLDivElement>(null);
  const handleCloseFilters = (e: React.MouseEvent) => {
    displayMenuSetter();
  };
  const handleCloseOnKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') displayMenuSetter();
  };

  const handleSetRangeInput = (category: string) => (e: string) => {
    userFilterInputsSetter(category, e);
  };

  const handleUserFilterReset = () => userFilterResetHandling(userFilterReset, filterRef);

  const filtersCounterRef = useRef<number>(0);
  const seasonRef = useRef<SeasonOption | undefined>(undefined);

  // Notification system when changing season delete some unapplied filters
  // Two specific steps as the mechanism firstly change the season state, then change available filters
  // First update the counter ref on each season modification
  useEffect(() => {
    filtersCounterRef.current = filtersCounter;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [season]);
  // Then compare it to the former value in case of season switch
  useEffect(() => {
    if (season?.value !== seasonRef.current?.value){
      if (filtersCounterRef.current > filtersCounter) {
        toast('Certains filtres ne s\'appliquent pas à la saison en cours. Ils ont été supprimés.');
      }
    }
    seasonRef.current = season;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtersCounter]);

  return (
    <div
      id="filter-input"
      className="relative w-full flex justify-between md:justify-end"
      ref={filterRef}
      onKeyUp={handleCloseOnKeyPress}>
      <div className="flex gap-6 w-full z-20 md:w-fit">
        <Button
          name="filter"
          customStyle="empty"
          onClick={toggleDisplay}>
          <div className="relative filter flex gap-2 flex-between items-center">
            <p>Filtrer</p>
            <FilterSvg
              style={
                !isMenuOpened
                  ? 'w-4 stroke-orange-primary fill-dark-gray'
                  : 'w-4 stroke-orangeprimary fill-orange-primary'
              }
            />
            {
              (filtersCounter !== 0) &&
              <p
                className={counterFilterStyle}>
                {filtersCounter}
              </p>
            }
          </div>
        </Button>
        <Button
          name="reset"
          customStyle="empty"
          onClick={handleUserFilterReset}>
          <ResetSvg style="w-6 h-6 fill-white " />
        </Button>
        {
          (isMenuOpened) &&
          <p className='w-full text-right self-center text-xl font-semibold md:hidden'>
            {resultsCount + ' films'}
          </p>
        }
      </div>
      {isMenuOpened && (
        <>
          <div
            className="fixed top-0 left-0 z-10 w-screen h-screen"
            onClick={handleCloseFilters}/>
          <div
            id="filter-categories"
            className="filter absolute z-10 top-14 w-full 
            px-4 py-3 
            grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8 xl:grid-cols-3 xl:gap-10 
          bg-medium-gray border border-orange-primary rounded-xl ">
            {categories.map((c) => (
              <div
                id="filters-categories__category"
                key={c.stateName}
                className={(c.stateName === 'genres' || c.stateName === 'countries' || c.stateName === 'review') ? 'lg:col-span-2 xl:col-span-3' : ''}>
                <h2 className="mb-2">{c.title}</h2>
                {(c.stateName === 'genres' || (c.stateName === 'countries' && filterOptions[c.stateName])) && (
                  <ul className="grid grid-cols-2 gap-y-3 gap-x-6 lg:grid-cols-3 xl:grid-cols-5">
                    {filterOptions[c.stateName]?.map((f: string) => (
                      <li
                        key={f}
                        className="col-span-1 ">
                        <CheckBox
                          name={f}
                          id={f}
                          customStyle="filter"
                          checked={userFilterInputs[c.stateName]?.includes(f) || false}
                          onChange={() => {
                            userFilterInputsSetter(c.stateName, f);
                          }}
                        />
                      </li>
                    ))}
                  </ul>
                )}
                {c.stateName === 'runtime' && (
                  <RangeInput
                    id="runtime"
                    min={Number(filterOptions.runtime[0])}
                    max={Number(filterOptions.runtime[1])}
                    value={
                      !userFilterInputs.runtime ? Number(filterOptions.runtime[1]) : Number(userFilterInputs.runtime[0])
                    }
                    setter={handleSetRangeInput(c.stateName)}
                  />
                )}
                {c.stateName === 'releaseYear' && (
                  <DoubleRangeInput
                    id="runtime"
                    min={Number(filterOptions.releaseYear[0])}
                    max={Number(filterOptions.releaseYear[1])}
                    minValue={
                      !(userFilterInputs.releaseYear && userFilterInputs.releaseYear[0])
                        ? Number(filterOptions.releaseYear[0])
                        : Number(userFilterInputs.releaseYear[0])
                    }
                    maxValue={
                      !(userFilterInputs.releaseYear && userFilterInputs.releaseYear[1])
                        ? Number(filterOptions.releaseYear[1])
                        : Number(userFilterInputs.releaseYear[1])
                    }
                    minSetter={handleSetRangeInput('minReleaseYear')}
                    maxSetter={handleSetRangeInput('maxReleaseYear')}
                  />
                )}
                {c.stateName === 'avgRate' && (
                  <div className="-ml-12 w-full -mb-6">
                    <StarRadio
                      value={userFilterInputs.avgRate ? Number(userFilterInputs.avgRate[0]) : 0}
                      onChange={(e: FormEvent) => {
                        if (e.target instanceof HTMLInputElement) {
                          userFilterInputsSetter(c.stateName, e.target.value);
                        }
                      }}
                    />
                  </div>
                )}
                { (c.stateName === 'review' && isUserConnected) && (
                  <ul className='grid grid-cols-1 gap-y-3 gap-x-6 lg:grid-cols-3 xl:grid-cols-5'>
                    {
                      reviewActions.map((a) => (
                        <li
                          key={a.stateName}
                          className="col-span-1 relative">
                          {a.svg}
                          <CheckBox
                            name={a.title}
                            id={a.stateName}
                            customStyle="filter"
                            checked={userFilterInputs[c.stateName]?.includes(a.stateName) || false}
                            onChange={() => {
                              userFilterInputsSetter(c.stateName, a.stateName);
                            }}
                          />
                        </li>
                      ))
                    }
                  </ul>)
                }
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Filter;
