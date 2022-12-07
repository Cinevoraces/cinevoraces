import React, { useState, useRef } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { Button, RadioInput } from '@components/Input';
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

interface OptionProps {
  name: string;
  value: string;
}
interface SelectProps {
  options: OptionProps[];
  displayOptionsState: boolean;
  displayOptionsSetter: ()=>void;
  stateValue: OptionProps;
  valueSetter: Dispatch<SetStateAction<OptionProps>>;
}

export default function Select(props: SelectProps) {
  const { options, displayOptionsState, displayOptionsSetter, stateValue, valueSetter } = props;
  const toggleSelectDisplay = () => displayOptionsSetter();
  const selectOptionsRef = useRef<HTMLFieldSetElement>(null);
  useCloseMenuOnOutsideClick(selectOptionsRef, 'select', displayOptionsState, displayOptionsSetter);
  useCloseOnEnterPress(selectOptionsRef, 'select', displayOptionsState, displayOptionsSetter);

  return (
    <main className="custom-container ">
      <div
        id="select-input"
        className="relative flex flex-col gap-2 items-center ">
        <Button
          customStyle="select"
          onClick={toggleSelectDisplay}>
          <div className="w-full flex justify-between">
            {stateValue.name}
            <ArrowSvg style="stroke-orange-primary fill-orange-primary mt-2" />
          </div>
        </Button>
        {displayOptionsState && (
          <fieldset
            className="select absolute top-14 w-full 
          py-2.5 flex flex-col gap-2 border rounded-xl 
          bg-medium-gray border-orange-primary"
            ref={selectOptionsRef}>
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
    </main>
  );
};
