import React from 'react';
import Select from './Select';
import type { SelectProps } from './Select';
import type { ControlledTextProps } from './Text';

interface SearchBarProps extends SelectProps, ControlledTextProps<HTMLInputElement> {};

export default function SearchBar(props: SearchBarProps) {
  const searchBarStyle = `flex w-full pr-1
  border border-orange-primary rounded-xl 
  focus:outline-none focus:ring-4 focus:ring-offset-0 focus:ring-white/5 
  hover:outline-none hover:ring-4 hover:ring-offset-0 hover:ring-white/5
  transition duration-150 hover:ease-out `;
  const textInputStyle = `w-full px-1.5
  text-sm 
  rounded-xl bg-transparent border-none 
  focus:border-transparent focus:ring-transparent focus:outline-none `;
  const { id, placeholder, value, onChange, ...selectProps } = props; 
  const textProps = { id, placeholder, value, onChange };
  return (
    <div className={searchBarStyle}>
      <Select {...selectProps}/>
      <input type='text' 
        className={textInputStyle}
        {...textProps}/>
    </div>
  );
}
