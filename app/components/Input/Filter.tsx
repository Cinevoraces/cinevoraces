import { useRef } from 'react';
import type { FormEvent } from 'react';
import Button from './Button';
import { CheckBox, RangeInput, DoubleRangeInput, StarRadio } from './index';
import useCloseMenuOnOutsideClick from '@hooks/useCloseMenuOnOutsideClick';
import useCloseOnEnterPress from '@hooks/useCloseOnEnterPress';
import { FilterSvg, ResetSvg } from '@components/SvgComponents/Filter';

import type { FilterOptions, FilterUserInputs } from '@custom_types/index';
export interface FilterProps {
  filterOptions: FilterOptions;
  isMenuOpened: boolean;
  displayMenuSetter: ()=>void;
  userFilterInputs: FilterUserInputs;
  userFilterInputsSetter: (category: string, filter: string)=>{ payload: FilterUserInputs; type: string };
  userFilterReset: ()=>void;
  filtersCounter: number;
}

const categories = [
  { title: 'Genres', stateName: 'genres' },
  { title: 'Pays de production', stateName: 'countries' },
  { title: 'Durée', stateName: 'runtime' },
  { title: 'Année de sortie', stateName: 'releaseYear' },
  { title: 'Note moyenne', stateName: 'avgRate' },
];

const counterFilterStyle = `absolute z-10 -top-4 -right-5 w-[20px] h-[20px] 
  flex items-center justify-center 
  text-dark-gray text-xs 
  rounded-full bg-orange-primary 
  after:absolute after:-z-10 after:w-4 after:h-4 after:bg-orange-primary/50 after:rounded-full after:animate-ping`;

export default function Filter({
  filterOptions,
  isMenuOpened,
  displayMenuSetter,
  userFilterInputs,
  userFilterInputsSetter,
  userFilterReset,
  filtersCounter,
}: FilterProps) {
  const toggleDisplay = () => displayMenuSetter();
  const filterRef = useRef<HTMLDivElement>(null);
  useCloseMenuOnOutsideClick(filterRef, 'filter', isMenuOpened, toggleDisplay);
  useCloseOnEnterPress(isMenuOpened, toggleDisplay);

  const handleSetRangeInput = (category: string) => (e: string) => {
    userFilterInputsSetter(category, e);
  };

  const handleUserFilterReset = () => {
    userFilterReset();
    const filterNodeList = filterRef.current?.firstChild?.childNodes
      ? ([...filterRef.current?.firstChild?.childNodes] as HTMLElement[])
      : [];
    const resetButtonSVGNode = filterNodeList.filter((node) => node.innerText === '')[0].firstChild as HTMLElement;
    const toggleRotateClass = () => {
      resetButtonSVGNode?.classList.toggle('animate-reverse-spin');
    };
    toggleRotateClass();
    setTimeout(toggleRotateClass, 1000);
  };

  return (
    <div
      id="filter-input"
      className="relative w-full flex justify-between md:justify-end"
      ref={filterRef}>
      <div className="flex gap-6">
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
              (filtersCounter !==0) &&
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
      </div>
      {isMenuOpened && (
        <div
          id="filter-categories"
          className="filter absolute z-10 top-14 w-full 
            px-2 py-3 
            grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8 xl:grid-cols-3 xl:gap-10 
          bg-medium-gray border border-orange-primary rounded-xl ">
          {categories.map((c) => (
            <div
              id="filters-categories__category"
              key={c.stateName}
              className={(c.stateName === 'genres' || c.stateName === 'countries') ? 'lg:col-span-2 xl:col-span-3' : ''}>
              <h2 className="mb-2">{c.title}</h2>
              {(c.stateName === 'genres' || (c.stateName === 'countries' && filterOptions[c.stateName])) && (
                <ul className="grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-5">
                  {filterOptions[c.stateName]?.map((f: string) => (
                    <li
                      key={f}
                      className="col-span-1 px-2 ">
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
                <div className="-ml-12 w-full">
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
