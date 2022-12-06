import React, { useState, useRef } from 'react';
import { Button, RadioInput } from '@components/Input';
import useCloseMenuOnOutsideClick from '@hooks/useCloseMenuOnOutsideClick';
import useCloseOnEnterPress from '@hooks/useCloseOnEnterPress';

export interface SvgProps {
  style: string;
}
const ArrowSvg = ({ style }: SvgProps) =>{
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
        strokeLinejoin="round"/>
    </svg>
  );
};
const FilterSvg = ({ style }: SvgProps) =>{
  return (
    <svg 
      width="18" 
      height="16" 
      viewBox="0 0 18 16" 
      xmlns="http://www.w3.org/2000/svg"
      className={style}>
      <path 
        d="M7.99991 16C7.71657 16 7.47924 15.904 7.28791 15.712C7.09591 15.5207 6.99991 15.2833 6.99991 15V9L1.19991 1.6C0.949908 1.26667 0.912574 0.916667 1.08791 0.55C1.26257 0.183334 1.56657 0 1.99991 0H15.9999C16.4332 0 16.7376 0.183334 16.9129 0.55C17.0876 0.916667 17.0499 1.26667 16.7999 1.6L10.9999 9V15C10.9999 15.2833 10.9042 15.5207 10.7129 15.712C10.5209 15.904 10.2832 16 9.99991 16H7.99991Z"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"/>
    </svg>
  );
};

const seasons = [
  [4, 2023],
  [3, 2022],
  [2, 2021],
  [1, 2020],
  [0],
];

export default function Films() {
  const [season, setSeason] = useState([4, 2023]);
  const [isSelectOpened, setIsSelectOpened] = useState(false);
  const toggleSelectDisplay = () => setIsSelectOpened(!isSelectOpened);
  const selectOptionsRef = useRef<HTMLFieldSetElement>(null);
  useCloseMenuOnOutsideClick(selectOptionsRef, 'select', isSelectOpened, setIsSelectOpened);
  useCloseOnEnterPress(selectOptionsRef, 'select', isSelectOpened, setIsSelectOpened);

  return (
    <main className='custom-container '>
      <div id='select-input' className='relative flex flex-col gap-2 items-center '>
        <Button 
          customStyle='select'
          onClick={toggleSelectDisplay}>
          <div className='w-full flex justify-between'>
            { (season[0] !== 0)? `Saison ${season[0]} - ${season[1]}` : 'Tous les films'}
            <ArrowSvg style="stroke-orange-primary fill-orange-primary mt-2"/>
          </div>
        </Button>
        {
          (isSelectOpened) &&
          <fieldset className="select absolute top-14 w-full 
          py-2.5 flex flex-col gap-2 border rounded-xl 
          bg-medium-gray border-orange-primary"
          ref={selectOptionsRef}>
            {
              seasons.map((s) => (
                <RadioInput
                  style='select'
                  key={s[0]}
                  label={(s[0] !== 0)? `Saison ${s[0]} - ${s[1]}` : 'Tous les films'}
                  name="season"
                  value={s[0]}
                  onChange={
                    () => {
                      setSeason([...s]);
                    }
                  }/>
              ))
            }
          </fieldset>
        }
      </div>
    </main>
  );
}
