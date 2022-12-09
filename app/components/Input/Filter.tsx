import React, { useState, useRef, useEffect, FormEvent } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import Button from './Button';
import { CheckBox, RangeInput, DoubleRangeInput, StarRadio } from './index';
import useCloseMenuOnOutsideClick from '@hooks/useCloseMenuOnOutsideClick';
import useCloseOnEnterPress from '@hooks/useCloseOnEnterPress';
import FilterSvg from '@components/SvgComponents/Filter';

export interface FilterOptionsProps {
  genres?: string[];
  countries?: string[];
  runtime: string[];
  releaseYear: string[];
  minAvgRate: string[];
  [key: string]: string[] | undefined;
}

export interface FilterProps {
  options: FilterOptionsProps[];
  displayOptionsState: boolean;
  displayOptionsSetter: ()=>void;
  stateValue: FilterOptionsProps;
  valueSetter: Dispatch<SetStateAction<FilterOptionsProps>>;
}

const filters: FilterOptionsProps = {
  genres: [
    'Action',
    'Animation',
    'Aventure',
    'Comédie',
    'Crime',
    'Documentaire',
    'Drame',
    'Familial',
    'Fantastique',
    'Science-Fiction',
  ],
  countries: [
    'Algérie',
    'Angola',
    'Argentine',
    'Australie',
    'Autriche',
    'Belgique',
    'Brésil',
    'Bulgarie',
    'Canada',
    'Chine',
    'République Tchèque',
    'France',
  ],
  runtime: ['54', '192'],
  releaseYear: ['1912', '2023'],
  minAvgRate: ['0'],
};

const initFiltersInput: FilterOptionsProps = {
  genres: [''],
  countries: [''],
  runtime: filters.runtime,
  releaseYear: [...filters.releaseYear],
  minAvgRate:[...filters.minAvgRate]
};

const categories = [
  { title: 'Genres', stateName: 'genres' },
  { title: 'Pays de production', stateName: 'countries' },
  { title: 'Durée', stateName: 'runtime' },
  { title: 'Année de sortie', stateName: 'releaseYear' },
  { title: 'Note moyenne', stateName: 'minAvgRate' },
];

export default function Filter() {
  const [isFilterMenuOpened, setIsFilterMenuOpened] = useState(false);
  const toggleDisplay = () => setIsFilterMenuOpened(!isFilterMenuOpened);
  const filterRef = useRef<HTMLDivElement>(null);
  useCloseMenuOnOutsideClick(filterRef, 'filter', isFilterMenuOpened, setIsFilterMenuOpened);
  useCloseOnEnterPress(isFilterMenuOpened, setIsFilterMenuOpened);
  const [filtersInputs, setFiltersInput] = useState(initFiltersInput);
  const [maxRuntime, setMaxRuntime] = useState(initFiltersInput.runtime[1]);
  const [minReleaseYear, setMinReleaseYear] = useState(initFiltersInput.releaseYear[0]);
  const [maxReleaseYear, setMaxReleaseYear] = useState(initFiltersInput.releaseYear[1]);
  const [minAvgRate, setMinAvgRate] = useState(filters.minAvgRate[0]);

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
              !isFilterMenuOpened
                ? 'w-4 stroke-orange-primary fill-dark-gray'
                : 'w-4 stroke-orangeprimary fill-orange-primary'
            }
          />
        </div>
      </Button>
      {isFilterMenuOpened && (
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
              {(c.stateName === 'genres' || (c.stateName === 'countries' && filters[c.stateName])) && (
                <ul className="grid grid-cols-2 gap-3">
                  {filters[c.stateName]?.map((f) => (
                    <li
                      key={f}
                      className="col-span-1">
                      <CheckBox
                        name={f}
                        id={f}
                        value={f}
                        customStyle="filter"
                        onChange={(e) => {
                          setFiltersInput({
                            ...filtersInputs,
                            [c.stateName]:
                              filtersInputs[c.stateName] && typeof filtersInputs[c.stateName] !== 'number'
                                ? [...filtersInputs[c.stateName]!, e.currentTarget.value]
                                : [e.currentTarget.value],
                          });
                        }}
                      />
                    </li>
                  ))}
                </ul>
              )}
              {c.stateName === 'runtime' && (
                <RangeInput
                  id="runtime"
                  min={Number(filters.runtime[0])}
                  max={Number(filters.runtime[1])}
                  value={Number(maxRuntime)}
                  setter={setMaxRuntime}
                />
              )}
              {c.stateName === 'releaseYear' && (
                <DoubleRangeInput
                  id="runtime"
                  min={Number(filters.releaseYear[0])}
                  max={Number(filters.releaseYear[1])}
                  minValue={Number(minReleaseYear)}
                  maxValue={Number(maxReleaseYear)}
                  minSetter={setMinReleaseYear}
                  maxSetter={setMaxReleaseYear}
                />
              )}
              {c.stateName === 'minAvgRate' && (
                <div className='-ml-12'>
                  <StarRadio value={Number(minAvgRate)} onChange={(e) =>{
                    (e.currentTarget && e.currentTarget instanceof HTMLInputElement) &&
                    setMinAvgRate(e.currentTarget.value);
                  }}/>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
