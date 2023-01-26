import { BookmarkSvg, LikeSvg, ViewSvg } from '@components/SvgComponents/InteractionsSVG';

interface BaseInteractionProps {
  type: 'bookmarked' | 'liked' | 'viewed';
  counter: number;
  isClicked: boolean;
  onClick: ()=>void;
}

const buttonStyle = `w-14 h-14 md:w-16 md:h-16 xl:w-14 xl:h-14 2xl:w-16 2xl:h-16
bg-medium-gray pt-1 rounded-xl interaction outline-none 
origin-right sm:origin-left 
focus:scale-105 hover:scale-105 
transition ease-out duration-200 `;
const svgStyle = 'h-6 w-14 fill-none md:h-8 md:w-16 xl:h-6 xl:w-14 2xl:h-8 2xl:w-16 ';

/**
 * Base interactions are bookmark - like - viewed
 * @param type interaction type
 * @param counter overall interactions for this type on this movie
 * @param isCLicked user input, used to visually represent the button mode
 * @returns <button> to be used for basic review mutations
 */
const BaseInteraction = ({ type, counter, isClicked, onClick }: BaseInteractionProps) => {
  const SvgComponent = (type === 'bookmarked') ? BookmarkSvg : (type === 'liked') ? LikeSvg : ViewSvg;
  return (
    <button
      onClick={onClick}
      className={isClicked ? buttonStyle + 'interaction--clicked translate-y-[2px]' : buttonStyle}>
      <SvgComponent style={isClicked ? svgStyle.replace('fill-none', 'fill-white') : svgStyle} />
      <p className="text-sm mt-1">{counter}</p>
    </button>
  );
};

export default BaseInteraction;
