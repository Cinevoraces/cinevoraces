import React, { useState, useRef, useEffect } from 'react';
import { Filter, SearchBar } from '@components/Input';

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
      <Filter />
      <SearchBar
        name='searchbarSelect'
        options={seasons}
        displayOptionsState={isSelectOpened}
        displayOptionsSetter={toggleSelectDisplay}
        stateValue={season}
        valueSetter={setSeason}
        customStyle='searchbar'
        id='search'
        placeholder='Rechercher un film'
        value={searchValue}
        onChange={(e) => setSearchValue(e.currentTarget.value)}
      />
    </main>
  );
}
