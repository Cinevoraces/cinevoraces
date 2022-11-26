import type { ReactNode } from 'react';
import React, { useState } from 'react';
import { BookmarkSvg, LikeSvg, StarSvg, ViewSvg } from './SVG';
import type { SvgProps } from './SVG';
import StarRadio from './StarRadio';

interface InteractionProps {
  type: 'bookmark' | 'like' | 'starButton' | 'starRating' | 'view';
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
  const customExpandedStarContainerStyle =
    buttonStyle + 'overflow-hidden w-72 flex transition-width ease-in duration-400 focus-within:scale-105';
  const customStarButtonStyle = 'relative z-10 w-16 h-18 bg-medium-gray outline-none ';
  const ratingMenuContainer = 'relative h-full w-52 pl-0 ';

  return (
    <>
      {type !== 'starButton' ? (
        <button
          onClick={onClick}
          className={isClicked ? buttonStyle + 'interaction--clicked translate-y-[2px]' : buttonStyle}>
          <SvgComponent style={isClicked ? svgStyle + 'fill-white' : svgStyle} />
          <p className="text-sm mt-1">{counter}</p>
        </button>
      ) : (
        <div
          className={
            isClicked ? customExpandedStarContainerStyle : customExpandedStarContainerStyle.replace('w-72', 'w-16')
          }>
          <button
            onClick={onClick}
            className={customStarButtonStyle}>
            <SvgComponent style={svgStyle} />
            <p className="text-sm mt-1">{counter}</p>
          </button>
          <div className={ratingMenuContainer}>
            <div className='absolute inset-y-4 right-8'>
              <StarRadio />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
