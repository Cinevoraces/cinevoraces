import React, { useState, useRef, useEffect } from 'react';
import { Button, RadioInput, Select, SearchBar } from '@components/Input';
import useCloseMenuOnOutsideClick from '@hooks/useCloseMenuOnOutsideClick';
import useCloseOnEnterPress from '@hooks/useCloseOnEnterPress';

export interface SvgProps {
  style: string;
}
const ArrowSvg = ({ style }: SvgProps) => {
  return (
    <svg
      aria-hidden
      width="15"
      height="10"
      viewBox="0 0 15 10"
      xmlns="http://www.w3.org/2000/svg"
      className={style}>
      <path
        d="M6.59173 8.91205L0.801064 2.31692C0.117679 1.53975 0.673081 0.322266 1.71023 0.322266L13.2916 0.322266C13.5237 0.322068 13.7509 0.388539 13.9461 0.51372C14.1413 0.638901 14.2961 0.817486 14.392 1.02809C14.488 1.23869 14.521 1.47238 14.487 1.70118C14.4531 1.92997 14.3537 2.14417 14.2007 2.31813L8.41007 8.91085C8.29674 9.04006 8.15698 9.14363 8.00017 9.21459C7.84336 9.28555 7.67313 9.32227 7.5009 9.32227C7.32868 9.32227 7.15844 9.28555 7.00163 9.21459C6.84482 9.14363 6.70506 9.04006 6.59173 8.91085V8.91205Z"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
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

const seasons = [
  { name: 'Saison 4 - 2023', value: '4' },
  { name: 'Saison 3 - 2022', value: '3' },
  { name: 'Saison 2 - 2021', value: '2' },
  { name: 'Saison 1 - 2020', value: '1' },
  { name: 'Tous les films', value: '0' },
];

export default function Films() {
  const [season, setSeason] = useState(seasons[0]);
  const [isSelectOpened, setIsSelectOpened] = useState(false);
  const toggleSelectDisplay = () => setIsSelectOpened(!isSelectOpened);
  const [searchValue, setSearchValue] = useState('');

  return (
    <main className="custom-container ">
      <SearchBar
        name='searchbarSelect'
        options={seasons}
        displayOptionsState={isSelectOpened}
        displayOptionsSetter={toggleSelectDisplay}
        stateValue={season}
        valueSetter={setSeason}
        customStyle='searchbar'
        id='search'
        placeholder='Rechercher un titre...'
        value={searchValue}
        onChange={(e) => setSearchValue(e.currentTarget.value)}
      />
    </main>
  );
}
