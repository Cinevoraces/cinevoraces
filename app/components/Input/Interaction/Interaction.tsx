import type { FormEvent } from 'react';
import React, { useEffect, useRef } from 'react';
import { BookmarkSvg, LikeSvg, StarSvg, ViewSvg } from './SVG';
import type { SvgProps } from './SVG';
import StarRadio from './StarRadio';
import useCloseMenuOnOutsideClick from '@hooks/useCloseMenuOnOutsideClick';

interface BaseInteractionProps {
  type: 'bookmark' | 'like' | 'starButton' | 'starRating' | 'view';
  counter: number;
  isClicked: boolean;
  onClick: ()=>void;
}

const buttonStyle = `bg-medium-gray w-16 h-16 pt-1 rounded-xl interaction outline-none
focus:scale-105 hover:scale-105 origin-right
transition ease-out duration-200 `;
const customExpandedStarContainerStyle =
buttonStyle + ` absolute z-10 right-0 overflow-hidden flex 
flex-row-reverse 
transition-width ease-in duration-400 focus-within:scale-105 
rating `;
const customStarButtonStyle = 'rating relative z-10 w-16 h-18 bg-medium-gray outline-none ';
const ratingMenuContainer = 'rating relative z-0 h-full w-52 pl-0 ';
const svgStyle = 'h-7 w-16 fill-none ';

export const BaseInteraction = ({ type, counter, isClicked, onClick }: BaseInteractionProps) => {
  let SvgComponent: (props: SvgProps)=>JSX.Element;
  switch (type) {
    case 'bookmark':
      SvgComponent = BookmarkSvg;
      break;
    case 'like':
      SvgComponent = LikeSvg;
      break;
    default:
      SvgComponent = ViewSvg;
      break;
  }
  return (
    <button
      onClick={onClick}
      className={isClicked ? buttonStyle + 'interaction--clicked translate-y-[2px]' : buttonStyle}>
      <SvgComponent style={isClicked ? svgStyle + 'fill-white' : svgStyle} />
      <p className="text-sm mt-1">{counter}</p>
    </button>
  );
};

interface RatingInteractionProps {
  counter: number;
  isClicked: boolean;
  ratingHandler: (e: FormEvent)=>void;
}

export const RatingInteraction = React.forwardRef<number | null, RatingInteractionProps>(({ isClicked, counter, ratingHandler }, ref) => {
  RatingInteraction.displayName = 'RatingInteraction';
  // Reference to control Rating Menu states and width
  const ratingMenuRef = useRef<HTMLDivElement>(null);
  const isMenuOpened = ratingMenuRef.current?.classList.contains('w-16') || false;
  const toggleRatingMenu = () => {
    if (ratingMenuRef && ratingMenuRef.current) {
      ratingMenuRef.current.classList.toggle('w-72');
      ratingMenuRef.current.classList.toggle('w-16');
    }
  };
  const closeRatingMenu = () => {
    if (ratingMenuRef.current?.classList.contains('w-72')){
      toggleRatingMenu();
    }
  };
  useCloseMenuOnOutsideClick(
    ratingMenuRef, 
    'rating', 
    isMenuOpened, 
    closeRatingMenu,
  );

  return (
    <div className='w-16 h-16 relative'>
      <div
        ref={ratingMenuRef}
        className={ isClicked 
          ? customExpandedStarContainerStyle + 'interaction--clicked translate-y-[2px]' 
          : customExpandedStarContainerStyle}>
        <button
          onClick={toggleRatingMenu}
          className={customStarButtonStyle}>
          <StarSvg style={svgStyle + 'stroke-white'} />
          <p className="text-sm mt-1">{counter}</p>
        </button>
        <div className={ratingMenuContainer}>
          <div className='absolute inset-y-4 right-8'>
            <StarRadio onChange={(e) => {
              ratingHandler(e);
              closeRatingMenu();
            }}/>
          </div>
        </div>
      </div>
    </div>
  );
});
