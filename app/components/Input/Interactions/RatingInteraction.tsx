import type { FormEvent } from 'react';
import { useRef } from 'react';
import { StarSvg } from '@components/SvgComponents/InteractionsSVG';
import StarRadio from '../StarRadio';
import useCloseMenuOnOutsideClick from '@hooks/useCloseMenuOnOutsideClick';

const buttonStyle = `w-14 h-14 lg:w-16 lg:h-16 
bg-medium-gray pt-1 rounded-xl interaction outline-none 
origin-right sm:origin-left 
focus:scale-105 hover:scale-105 
transition ease-out duration-200 `;
// CSS trick : the opening direction depends of the margin-right/left
// flex-direction : order betwwen button svg and stars
const customExpandedStarContainerStyle =
buttonStyle + ` absolute z-10 overflow-hidden flex 
right-0 sm:left-0 
flex-row-reverse sm:flex-row
transition-width ease-in duration-400 
focus-within:scale-105 
rating `;
const customStarButtonStyle = `rating relative z-10 w-14 h-18 lg:w-16 
bg-medium-gray outline-none `;
const ratingMenuContainer = 'rating relative z-0 h-full w-52 -top-1 lg:top-0';
const svgStyle = 'h-6 w-14 fill-none lg:h-8 lg:w-16 ';

interface RatingInteractionProps {
  counter: number;
  isClicked: boolean;
  ratingHandler: (e: FormEvent)=>void;
  value?: number | undefined;
}

/**
 * 
 * @param isCLicked user input, used to visually represent the button mode
 * @param counter overall interactions for this type on this movie
 * @param ratingHandler rating mutation setter
 * @param value corresponding value issued from the radio input
 * @returns Rating button that expands to contain a custom radio inputfor rating mutation
 */
const RatingInteraction = ({ isClicked, counter, ratingHandler, value }: RatingInteractionProps) => {
  // Reference to control Rating Menu states and width
  const ratingMenuRef = useRef<HTMLDivElement>(null);
  const isMenuOpened = ratingMenuRef.current?.classList.contains('w-14') || ratingMenuRef.current?.classList.contains('w-16') || false;
  // Handling button expansion throught ref
  const toggleRatingMenu = () => {
    if (ratingMenuRef && ratingMenuRef.current) {
      ratingMenuRef.current.classList.toggle('w-72');
      ratingMenuRef.current.classList.toggle('lg:w-72');
      ratingMenuRef.current.classList.toggle('w-14');
      ratingMenuRef.current.classList.toggle('lg:w-16');
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
    <div className='w-14 h-14 relative lg:w-16 lg:h-16 '>
      <div
        ref={ratingMenuRef}
        className={ isClicked 
          ? customExpandedStarContainerStyle + 'interaction--clicked translate-y-[2px] ' 
          : customExpandedStarContainerStyle}>
        <button
          onClick={toggleRatingMenu}
          className={customStarButtonStyle}>
          <StarSvg style={value && (Number(value) !== 0) ? (svgStyle + 'stroke-white').replace('fill-none', 'fill-white') : svgStyle + 'stroke-white' } />
          <p className="text-sm mt-1">{counter}</p>
        </button>
        <div className={ratingMenuContainer}>
          <div className='absolute inset-y-4 right-8 '>
            <StarRadio 
              onChange={(e) => {
                ratingHandler(e);
                closeRatingMenu();
              }}
              value={value}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatingInteraction;
