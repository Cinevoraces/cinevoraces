import Select from './Select';
import type { SelectProps } from './Select';
import type { ControlledTextProps } from 'models/custom_types';

interface SearchBarProps extends ControlledTextProps<HTMLInputElement>, SelectProps{};

/**
 * 
 * @param value state for controlled text input dedicated to search query
 * @param onChange event handler for controlled text input
 * @param placeholder for text input
 * @param id setting text input id
 * @param customStyle for textinput
 * @param valueSetter changing season selection
 * @param stateValue selected season
 * @param displayOptionsSetter displaying select options state setter
 * @param displayOptionsState displaying options state
 * @param options select options
 * @param name sets name param of the custom select input
 * @returns <div> containing a custom select input and a controlled text input
 */
const SearchBar = (props: SearchBarProps) => {
  const searchBarStyle = `flex w-full pr-1 max-w-[450px] 
  border border-orange-primary rounded-xl 
  focus-within:outline-none focus-within:ring-4 focus-within:ring-offset-0 focus-within:ring-white/5 
  hover:outline-none hover:ring-4 hover:ring-offset-0 hover:ring-white/5
  transition duration-150 hover:ease-out `;
  const textInputStyle = `w-full px-1.5
  text-sm 
  rounded-xl bg-transparent border-none 
  focus:border-transparent focus:ring-transparent focus:outline-none `;
  const { id, placeholder, value, onChange, customStyle, ...selectProps } = props; 
  const textProps = { id, placeholder, value, onChange };
  return (
    <div className={searchBarStyle}>
      <Select {...selectProps} selectCustomStyle={customStyle ? 'searchbar' : undefined}/>
      <input type='text' 
        className={textInputStyle}
        {...textProps}/>
    </div>
  );
};

export default SearchBar;
