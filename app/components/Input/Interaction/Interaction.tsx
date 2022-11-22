import type { ReactNode } from 'react';
import React, { useState } from 'react';
import { BookmarkSvg, LikeSvg, StarSvg, ViewSvg } from './SVG';
import type { SvgProps } from './SVG';

interface InteractionProps {
  type: 'bookmark' | 'like' | 'starButton' | 'starRating' |'view';
  counter: number;
  isClicked: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export default function Interaction({ type, counter, isClicked, onClick }: InteractionProps) {
  let SvgComponent: (props: SvgProps)=>JSX.Element;
  let svgStyle = 'h-7 w-16 fill-none ';
  switch (type) {
    case 'bookmark':
      SvgComponent = BookmarkSvg;
      break;
    case 'like':
      SvgComponent = LikeSvg;
      break;
    case 'starButton':
      SvgComponent = StarSvg;
      svgStyle += 'stroke-white';
      break;
    case 'starRating':
      SvgComponent = StarSvg;
      break;
    default:
      SvgComponent = ViewSvg;
      break;
  }
  const buttonStyle = `bg-medium-gray w-16 h-16 pt-1 rounded-xl interaction outline-none
    focus:scale-105 hover:scale-105
    transition ease-out duration-200 `;
  const customExpandedStarContainerStyle = buttonStyle + 'overflow-hidden w-60 flex transition-width ease-in duration-400 focus-within:scale-105';
  const customStarButtonStyle = 'relative z-10 w-16 h-18 bg-medium-gray outline-none ';
  const ratingMenuContainer = 'relative h-full w-52 pl-16 ';
  const ratingMenuStyle = 'absolute inset-y-4 right-4 w-40 flex flex-row justify-between items-center '; // Row reverse to use the sibling selector
  const starInputSvgStyle = `h-6 w-6 fill-dark-gray stroke-transparent 
    
    peer-checked:fill-yellow
    transition delay-400 duration-200 `;
  const starInputsNames = [
    'firstStar',
    'secondStar',
    'thirdStar',
    'fourthStar',
    'fifthStar',
  ];

  return (
    <>
      {type !== 'starButton' ? (
        <button
          onClick={onClick}
          className={isClicked ? buttonStyle + 'interaction--clicked translate-y-[2px]' : buttonStyle}>
          <SvgComponent style={isClicked ? svgStyle + 'fill-white' : svgStyle} />
          <p className='text-sm mt-1'>{counter}</p>
        </button>
      ) : (
        <div
          className={
            isClicked ? customExpandedStarContainerStyle : customExpandedStarContainerStyle.replace('w-60', 'w-16')
          }>
          <button
            onClick={onClick}
            className={customStarButtonStyle}>
            <SvgComponent style={svgStyle} />
            <p className='text-sm mt-1'>{counter}</p>
          </button>
          <div className={ratingMenuContainer}>
            <fieldset className={ratingMenuStyle}>
              <legend className='sr-only'>Notez le film sur 5</legend>
              {
                //label is group to color the star background on hover
                // input is peer to color star background when checked
                starInputsNames.map((inputName, i) => (
                  <label htmlFor={inputName} className='peer group relative w-8 h-8' key={inputName}>
                    <input type="radio" name="rating" id={inputName} value={i} className='peer appearance-none absolute inset-2 w-4 h-4 cursor-pointer '/> 
                    <SvgComponent style={starInputSvgStyle + 'absolute inset-1 cursor-pointer'} />
                  </label>
                ))
              }
            </fieldset>
          </div>
        </div>
      )}
    </>
  );
}
