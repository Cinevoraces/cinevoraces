import React, { useState, useRef, useEffect } from 'react';
import type { Dispatch, SetStateAction, FormEvent } from 'react';
import Button from './Button';
import { CheckBox, RangeInput, DoubleRangeInput, StarRadio } from './index';
import useCloseMenuOnOutsideClick from '@hooks/useCloseMenuOnOutsideClick';
import useCloseOnEnterPress from '@hooks/useCloseOnEnterPress';
import FilterSvg from '@components/SvgComponents/Filter';

import type { FilterOptions, FilterUserInputs } from '@custom_types/index';
export interface FilterProps {
  filterOptions: FilterOptions;
  isMenuOpened: boolean;
  displayMenuSetter: ()=>void;
  userFilterInputs: FilterUserInputs;
  userFilterInputsSetter: (category: string, filter: string)=>{ payload: FilterUserInputs; type: string };
}

const categories = [
  { title: 'Genres', stateName: 'genres' },
  { title: 'Pays de production', stateName: 'countries' },
  { title: 'Durée', stateName: 'runtime' },
  { title: 'Année de sortie', stateName: 'releaseYear' },
  { title: 'Note moyenne', stateName: 'avgRate' },
];

export default function Filter({
  filterOptions,
  isMenuOpened,
  displayMenuSetter,
  userFilterInputs,
  userFilterInputsSetter,
}: FilterProps) {
  // Opening / closing the filter menu
  const toggleDisplay = () => displayMenuSetter();
  const filterRef = useRef<HTMLDivElement>(null);

  useCloseMenuOnOutsideClick(filterRef, 'filter', isMenuOpened, toggleDisplay);
  useCloseOnEnterPress(isMenuOpened, toggleDisplay);
  // const [minAvgRate, setMinAvgRate] = useState(filters?.minAvgRate[0] || '0');

  const handleSetRangeInput = (category: string) => (e: string) => {
    userFilterInputsSetter(category, e);
  };

  return (
    <div
      id="filter-input"
      className="relative w-full filter"
      ref={filterRef}>
      <Button
        name="filter"
        customStyle="empty"
        onClick={toggleDisplay}>
        <div className="filter flex gap-2 flex-between items-center">
          <p>Filtrer</p>
          <FilterSvg
            style={
              !isMenuOpened
                ? 'w-4 stroke-orange-primary fill-dark-gray'
                : 'w-4 stroke-orangeprimary fill-orange-primary'
            }
          />
        </div>
      </Button>
      {isMenuOpened && (
        <div
          id="filter-categories"
          className="filter absolute z-10 top-14 w-full 
            px-2 py-3 
            flex flex-col gap-4  
          bg-medium-gray border border-orange-primary rounded-xl ">
          {categories.map((c) => (
            <div
              id="filters-categories__category"
              key={c.stateName}>
              <h2 className="mb-2">{c.title}</h2>
              {(c.stateName === 'genres' || (c.stateName === 'countries' && filterOptions[c.stateName])) && (
                <ul className="grid grid-cols-2 gap-3">
                  {filterOptions[c.stateName]?.map((f: string) => (
                    <li
                      key={f}
                      className="col-span-1">
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
                  minValue={!(userFilterInputs.releaseYear && userFilterInputs.releaseYear[0])
                    ? Number(filterOptions.releaseYear[0])
                    : Number(userFilterInputs.releaseYear[0])}
                  maxValue={!(userFilterInputs.releaseYear && userFilterInputs.releaseYear[1])
                    ? Number(filterOptions.releaseYear[1])
                    : Number(userFilterInputs.releaseYear[1])}
                  minSetter={handleSetRangeInput('minReleaseYear')}
                  maxSetter={handleSetRangeInput('maxReleaseYear')}
                />
              )}
              {c.stateName === 'avgRate' && (
                <div className="-ml-12">
                  <StarRadio
                    value={(userFilterInputs.avgRate) ? Number(userFilterInputs.avgRate[0]) : 0}
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
