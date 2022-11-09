import React from 'react';
import { useEffect } from 'react';

interface RangeCommonProps {
  label: string;
  id: string;
  min: number;
  max: number;
}

interface RangeProps extends RangeCommonProps {
  value: number;
  setter(value: number): void;
}

/**
 * @return              \<input\> type range
 * @param label         set \<label\>
 * @param id            set id param content
 * @param min           set range minimal value
 * @param max           set range maximal value 
 * @param stateValue    controlled state
 * @param setter        state setter
 */
const Range = (props: RangeProps) => {
  const { id, label, max, value, setter } = props;
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(Number(e.currentTarget.value));
  };

  return (
    <fieldset>
      <label htmlFor={id}>{label}</label>
      <div className='flex justify-between items-center gap-3'>
        <p className='min-w-[2rem]'>{value}</p>
        <input
          type="range"
          {...props}
          onChange={handleOnChange} />
        <p className='min-w-[2rem]'>{max}</p>
      </div>
    </fieldset>
  );
};

interface DoubleRangeProps extends RangeCommonProps{
  minValue: number;
  maxValue: number;
  minSetter(value: number): void;
  maxSetter(value: number): void;
}

/**
 * @return              \<input\> type range
 * @param label         set \<label\> content
 * @param id            set id param content
 * @param min           set range minimal value
 * @param max           set range maximal value 
 * @param minValue      controlled state 1
 * @param maxValue      controlled state 2
 * @param minSetter     state setter 1
 * @param maxSetter     state setter 2
 */
const DoubleRange = (props: DoubleRangeProps) => {
  const { id, label, minValue, maxValue, minSetter, maxSetter } = props;
  const minHandleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    minSetter(Number(e.currentTarget.value));
  };
  const maxHandleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    maxSetter(Number(e.currentTarget.value));
  };

  return (
    <fieldset className='w-2/3 px-auto'>
      <label htmlFor={id}>{label}</label>
      <div className='flex justify-between items-center gap-4'>
        <p className='min-w-[2rem]'>{minValue}</p>
        <div className='relative w-full -mt-2'>
          <input
            type="range"
            {...props}
            value={minValue}
            onChange={minHandleOnChange}
            className="absolute" />
          <input
            type="range"
            {...props}
            value={maxValue}
            onChange={maxHandleOnChange}
            className="absolute" />
        </div>
        <p className='min-w-[2rem]'>{maxValue}</p>
      </div>
    </fieldset>
  );
};

export { Range, DoubleRange };
