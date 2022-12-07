import React from 'react';
import Select from './Select';
import { Text } from './Text';
import type { SelectProps } from './Select';
import type { ControlledTextProps } from './Text';
import { text } from 'stream/consumers';

interface SearchBarProps extends SelectProps, ControlledTextProps<HTMLInputElement> {};

export default function SearchBar(props: SearchBarProps) {
  const { id, placeholder, value, onChange, ...selectProps } = props; 
  const textProps = { id, placeholder, value, onChange };
  return (
    <div className='flex items-center py-0.5 border border-orange-primary rounded-xl'>
      <Select {...selectProps}/>
      <Text customStyle='searchbar' {...textProps}
      />
    </div>
  );
}
