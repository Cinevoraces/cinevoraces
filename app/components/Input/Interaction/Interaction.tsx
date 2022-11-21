import React, { useState } from 'react';
import { BookmarkSvg, LikeSvg, StarSvg, ViewSvg } from './SVG';

interface InteractionProps {
  isClicked: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  type: 'bookmark' | 'like' | 'star' | 'view';
}

export default function Interaction(props: InteractionProps) {
  const { type, isClicked, onClick } = props;
  let SvgComponent;
  const svgStyle = 'h-6 w-full fill-none ';
  switch (type) {
    case 'bookmark':
      SvgComponent = BookmarkSvg;
      break;
    case 'like':
      SvgComponent = LikeSvg;
      break;
    case 'star':
      SvgComponent = StarSvg;
      break;
    default:
      SvgComponent = ViewSvg;
      break;
  }
  const buttonStyle = 'bg-medium-gray w-16 h-16 rounded-xl interaction ease-out duration-200 ';

  return (
    <button
      onClick={onClick}
      className={isClicked ? buttonStyle + 'interaction--clicked translate-y-[2px]' : buttonStyle}>
      <SvgComponent style={isClicked ? svgStyle + 'fill-white' : svgStyle} />
    </button>
  );
}
