import React from 'react';
import { useEffect } from 'react';

interface RangeCommonProps {
  label: string;
  min: number;
  max: number;
}

interface RangeProps extends RangeCommonProps {
  stateValue: number;
  setter(value: number): void;
}

/**
 * @return              \<input\> type range
 * @param label         set \<label\> content and 'id' param
 * @param min           set range minimal value
 * @param max           set range maximal value 
 * @param stateValue    controlled state
 * @param setter        state setter
 */
const Range = ({ label, min, max, stateValue, setter }: RangeProps) => {
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(Number(e.currentTarget.value));
  };

  return (
    <fieldset className='flex justify-between items-center gap-3'>
      <p className='min-w-[2rem]'>{stateValue}</p>
      <input
        id={label}
        type="range"
        min={min}
        max={max}
        value={stateValue}
        onChange={handleOnChange} />
      <p className='min-w-[2rem]'>{max}</p>
    </fieldset>
  );
};

interface DoubleRangeProps extends RangeCommonProps{
  stateValueMin: number;
  stateValueMax: number;
  minSetter(value: number): void;
  maxSetter(value: number): void;
}

/**
 * @return              \<input\> type range
 * @param label         set \<label\> content and 'id' param
 * @param min           set range minimal value
 * @param max           set range maximal value 
 * @param stateValueMin      controlled state
 * @param stateValueMax      controlled state
 * @param minSetter     state setter
 * @param maxSetter     state setter
 */
const DoubleRange = ({ label, min, max, stateValueMin, stateValueMax, minSetter, maxSetter }: DoubleRangeProps) => {
  const minHandleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    minSetter(Number(e.currentTarget.value));
  };
  const maxHandleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    maxSetter(Number(e.currentTarget.value));
  };

  return (
    <fieldset className='w-2/3 px-auto flex justify-between items-center gap-4'>
      <p className='min-w-[2rem]'>{stateValueMin}</p>
      <div className='relative w-full -mt-2'>
        <input
          id={label}
          type="range"
          min={min}
          max={max}
          value={stateValueMin}
          onChange={minHandleOnChange}
          className="absolute" />
        <input
          id='bis'
          type="range"
          min={min}
          max={max}
          value={stateValueMax}
          onChange={maxHandleOnChange}
          className="absolute" />
      </div>
      <p className='min-w-[2rem]'>{stateValueMax}</p>
    </fieldset>
  );
};

export { Range, DoubleRange };
