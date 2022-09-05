import { useState } from 'react';
import { useAppSelector, useAppDispatch } from 'redux/hooks';
import { 
  filters,
  setQuery,
  setMainFilter,
  setCountryFilter,
  setGenreFilter,
  setPeriodeMinVal,
  setPeriodeMaxVal,
  setRuntimeVal,
  setAverageRateVal,
  resetFilters
} from 'redux/slices/filter';
import { userState } from 'redux/slices/user';
import { Button, InputCheckbox, InputRange, DoubleInputRange, InputStar } from 'components/Inputs/InputsLib';
import { FilterMenu, DropDown } from './FilterMenu';
import { ReactComponent as SVGReset } from './FilterMenu.reset.svg';
import { ReactComponent as SVGFilterClosed } from './FilterMenu.isClosed.svg';
import { ReactComponent as SVGFilterOpen } from './FilterMenu.isOpen.svg';
import styles from './Filters.module.scss';
import SearchBar from './FilterSearchBar';

/**
 * @returns Filters menu 
 */
function Filters() {
  const [isFilterMenu, setFilterMenu] = useState(false);
  const dispatch = useAppDispatch();
  const {
    mainFilters,
    query,
    genre,
    country,
    periode,
    runtime,
    avgRate,
    isDefault}     = useAppSelector(filters);
  const {isOnline} = useAppSelector(userState);
  const handleFilterMenu = () => {
    (isFilterMenu) ? setFilterMenu(false) : setFilterMenu(true);
  };
  const handleReset = () => {
    dispatch(resetFilters());
  };
  const handleSeasonSetter = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setMainFilter(event.target.value));
  };
  const handleCountrySetter = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setCountryFilter(event.target.value));
  };
  const handleGenreSetter = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setGenreFilter(event.target.value));
  };
  const handleMinPeriodeSetter = (value: number) => {
    dispatch(setPeriodeMinVal(value));
  };
  const handleMaxPeriodeSetter = (value: number) => {
    dispatch(setPeriodeMaxVal(value));
  };
  const handleRuntimSetter = (value: number) => {
    dispatch(setRuntimeVal(value));
  };
  const handleAverageRateSetter = (value: number) => {
    dispatch(setAverageRateVal(value));
  };
  const handleAverageRateReset = () => {
    dispatch(setAverageRateVal(0));
  };
  const handleSearchBarQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setQuery(event.target.value));
  };
  
  return(
    <div className={styles.filters}>

      <div className={styles['button-container']}>
        <Button handler={handleFilterMenu}> 
          Filtrer
          {(isFilterMenu) ? <SVGFilterOpen/> : <SVGFilterClosed/>}
        </Button>
        {!isDefault &&
          <Button handler={handleReset}> 
            <SVGReset/>
          </Button>}
        {isFilterMenu && 
          <FilterMenu handleClose={handleFilterMenu}>
            <DropDown name='Genres'>
              {genre.map(({name, isChecked}) => (
                <li key={name}>
                  <InputCheckbox
                    name={name}
                    isChecked={isChecked}
                    handler={handleGenreSetter}
                  />
                </li>))}
            </DropDown>
            <DropDown name="Pays d'origine">
              {country.map(({name, isChecked}) => (
                <li key={name}>
                  <InputCheckbox
                    name={name}
                    isChecked={isChecked}
                    handler={handleCountrySetter}
                  />
                </li>))}
            </DropDown>
            <DropDown name={'Durée'}>
              <InputRange
                min={0}
                max={runtime.maxValue}
                stateValue={runtime.value}
                setter={handleRuntimSetter}
                label={'runtime'}
              />
            </DropDown>
            <DropDown name={'Année de sortie'}>
              <DoubleInputRange
                min={periode.baseValues[0]}
                max={periode.baseValues[1]}
                valueMin={periode.stateValues[0]}
                valueMax={periode.stateValues[1]}
                minSetter={handleMinPeriodeSetter}
                maxSetter={handleMaxPeriodeSetter}
                label='Année de sortie'
              />
            </DropDown>
            <DropDown name={'Note moyenne'}>
              <div className={styles['input-star-container']}>
                {/* FIXME: InputStar does not re-render as expected */}
                {(avgRate === 0) && <InputStar value={avgRate} setter={handleAverageRateSetter} isInput/>}
                {(avgRate !== 0) && 
                  <>
                    <InputStar value={avgRate} setter={handleAverageRateSetter} isInput/>
                    <button onClick={handleAverageRateReset}><SVGReset/></button>
                  </>}
              </div>
            </DropDown>
          </FilterMenu>}
      </div>
      <SearchBar
        state={mainFilters}
        setter={handleSeasonSetter}
        queryState={query}
        querySetter={handleSearchBarQuery}
        isOnline={isOnline}
      />
    </div>
  );
}

export default Filters;