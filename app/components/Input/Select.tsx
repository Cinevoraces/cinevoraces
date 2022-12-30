import React, { useRef } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { Button, RadioInput } from '@components/Input';
import useCloseMenuOnOutsideClick from '@hooks/useCloseMenuOnOutsideClick';
import useCloseMenuOnEnterKeyPress from '@hooks/useCloseOnEnterPress';
import type { Season, SvgProps } from '@custom_types/index';

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

export interface OptionProps {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
}
export interface SelectProps {
  name: string;
  options: OptionProps[];
  displayOptionsState: boolean;
  displayOptionsSetter: ()=>void;
  stateValue: OptionProps;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  valueSetter: Dispatch<SetStateAction<OptionProps>> | ((season: Season)=>{ payload: Season; type: any; });
  customStyle?: 'searchbar';
}

export default function Select(props: SelectProps) {
  const { name, options, displayOptionsState, displayOptionsSetter, stateValue, valueSetter, customStyle } = props;
  const toggleSelectDisplay = () => displayOptionsSetter();
  const selectRef = useRef<HTMLDivElement>(null);
  useCloseMenuOnOutsideClick(selectRef, name, displayOptionsState, displayOptionsSetter);
  useCloseMenuOnEnterKeyPress(displayOptionsState, displayOptionsSetter);

  return (
    <div
      id="select-input"
      className={name + ' relative flex flex-col gap-2 items-center'}
      ref={selectRef}>
      {!customStyle ? (
        <Button
          customStyle="select"
          onClick={toggleSelectDisplay}
          name={name}>
          <div className="w-full flex justify-between items-center">
            {stateValue.name}
            <ArrowSvg style="stroke-orange-primary fill-orange-primary" />
          </div>
        </Button>
      ) : (
        <button
          className={
            name +
            ' min-w-[150px] h-full px-3 rounded-xl bg-medium-gray shadow-inner focus:outline-none focus:text-orange-primary'
          }
          onClick={toggleSelectDisplay}
          name={name}>
          <div className="w-full flex justify-between items-center">
            <p className="text-sm">{stateValue.name}</p>
            <ArrowSvg style="stroke-orange-primary fill-orange-primary" />
          </div>
        </button>
      )}
      {displayOptionsState && (
        <fieldset
          className={
            name +
            ` absolute z-20 top-12 w-full -ml-1 
              text-sm 
              py-2.5 flex flex-col gap-2 border rounded-xl 
              bg-medium-gray border-orange-primary`
          }>
          {options.map((o) => (
            <RadioInput
              style="select"
              key={o.name}
              label={o.name}
              name="season"
              value={o.value}
              onChange={() => valueSetter({ ...o })}
            />
          ))}
        </fieldset>
      )}
    </div>
  );
}
