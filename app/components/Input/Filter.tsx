import React, { useState, useRef, useEffect } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import Button from './Button';
import { CheckBox } from './CheckBox';
import useCloseMenuOnOutsideClick from '@hooks/useCloseMenuOnOutsideClick';
import useCloseOnEnterPress from '@hooks/useCloseOnEnterPress';

export interface SvgProps {
  style: string;
}
const FilterSvg = ({ style }: SvgProps) => {
  return (
    <svg
      width="18"
      height="16"
      viewBox="0 0 18 16"
      xmlns="http://www.w3.org/2000/svg"
      className={style}>
      <path
        d="M7.99991 16C7.71657 16 7.47924 15.904 7.28791 15.712C7.09591 15.5207 6.99991 15.2833 6.99991 15V9L1.19991 1.6C0.949908 1.26667 0.912574 0.916667 1.08791 0.55C1.26257 0.183334 1.56657 0 1.99991 0H15.9999C16.4332 0 16.7376 0.183334 16.9129 0.55C17.0876 0.916667 17.0499 1.26667 16.7999 1.6L10.9999 9V15C10.9999 15.2833 10.9042 15.5207 10.7129 15.712C10.5209 15.904 10.2832 16 9.99991 16H7.99991Z"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export interface FilterOptionsProps {
  genres?: string[];
  countries?: string[];
  runtime: string[];
  releaseYear: string[];
  [key: string ]: string[] | undefined;
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
    'Canada',
    'Chine',
  ],
  runtime: ['192'],
  releaseYear: ['1912', '2023'],
};

const initFiltersInput: FilterOptionsProps = {
  genres:[''],
  countries:[''],
  runtime: filters.runtime, 
  releaseYear: [...filters.releaseYear]
};

const categories = [
  { title:'Genres', stateName: 'genres' },
  { title:'Pays de production', stateName: 'countries' },
  { title:'Durée', stateName: 'runtime' },
  { title:'Année de sortie', stateName: 'releaseYear' }, 
  { title:'Note moyenne', stateName: 'avgRate' },
];

export default function Filter() {
  const [isFilterMenuOpened, setIsFilterMenuOpened] = useState(false);
  const toggleDisplay = () => setIsFilterMenuOpened(!isFilterMenuOpened);
  const filterRef = useRef<HTMLDivElement>(null);
  useCloseMenuOnOutsideClick(filterRef, 'filter', isFilterMenuOpened, setIsFilterMenuOpened);
  const [filtersInputs, setFiltersInput] = useState(initFiltersInput);

  useEffect(() => {
    console.log(filtersInputs);
  });

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
          id='filter-categories'
          className="filter absolute z-10 top-14 w-full 
            px-2 py-3
            flex flex-col gap-2 
          bg-medium-gray border border-orange-primary rounded-xl ">
          {
            categories.map((c) => (
              <div id='filters-categories__category' key={c.stateName}>
                <h2 className='mb-2'>{c.title}</h2>
                <ul className="grid grid-cols-2 gap-2">
                  { (c.stateName === 'genres' || c.stateName === 'countries' && filters[c.stateName]) &&
                    filters[c.stateName]?.map((f) => (
                      <li key={f} className={(f.length > 16) ? 'col-span-2' : 'col-span-1'}>
                        <CheckBox
                          name={f}
                          id={f}
                          value={f}
                          customStyle="filter"
                          onChange={(e) => {
                            setFiltersInput(
                              { ...filtersInputs, 
                                [c.stateName]: (filtersInputs[c.stateName] && typeof filtersInputs[c.stateName] !== 'number' ) ? 
                                  [...filtersInputs[c.stateName]!, e.currentTarget.value] 
                                  : [e.currentTarget.value]});
                          }}
                        />
                      </li>
                    ))}
                </ul>
              </div>
            ))
          }
        </div>)
      }
    </div>
  );
}
