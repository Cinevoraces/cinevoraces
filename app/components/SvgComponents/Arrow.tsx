import type { SvgProps } from 'models/custom_types/index';

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

export default ArrowSvg;
