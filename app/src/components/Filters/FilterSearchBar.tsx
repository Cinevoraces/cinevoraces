import { useState } from 'react';
import { InputRadio } from 'components/Inputs/InputsLib';
import { FilterMenu } from './FilterMenu';
import styles from './FilterSearchBar.module.scss';

interface SearchBarProps {
  state: filter[],
  setter(e: React.ChangeEvent): void,
  queryState: string,
  querySetter(e: React.ChangeEvent): void
  isOnline: boolean
}

function SearchBar ({state, setter, queryState, querySetter, isOnline}: SearchBarProps) {
  const [dropDownMenu, setDropDownMenu] = useState<boolean>(false);
  const handleDropDown = () => {
    setDropDownMenu(!dropDownMenu);
  };
  const filteredState = state.filter(stateEntry => {
    if (stateEntry.value === 'bookmarked=true' && !isOnline) {
      return false;
    } else {
      return true;
    }});

  return(
    <div className={styles['search-bar']}>
      <button onClick={handleDropDown}>
        {filteredState
          .filter(({isChecked}) => isChecked) 
          .map(({name}) => name)}
      </button>
      {dropDownMenu &&
      <>
        <FilterMenu handleClose={handleDropDown}>
          {filteredState.map(({name, value, isChecked}, index) => (
            <div key={index}>
              <InputRadio
                field='main-filter'
                name={name}
                value={value}
                isChecked={isChecked}
                handler={setter}
              />
            </div>))}
        </FilterMenu>
      </>}
      <input 
        name='search-movie'
        type='text'
        placeholder='Rechercher un film'
        value={queryState}
        onChange={querySetter}
      />
    </div>
  );
}

export default SearchBar;