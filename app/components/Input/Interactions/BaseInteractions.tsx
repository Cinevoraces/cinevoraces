import { BookmarkSvg, LikeSvg, ViewSvg } from '@components/SvgComponents/InteractionsSVG';

interface BaseInteractionProps {
  type: 'bookmarked' | 'liked' | 'viewed';
  counter: number;
  isClicked: boolean;
  onClick: ()=>void;
}

const buttonStyle = `w-14 h-14 lg:w-16 lg:h-16 
bg-medium-gray pt-1 rounded-xl interaction outline-none 
origin-right sm:origin-left 
focus:scale-105 hover:scale-105 
transition ease-out duration-200 `;
const svgStyle = 'h-6 w-14 fill-none lg:h-8 lg:w-16 ';

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
