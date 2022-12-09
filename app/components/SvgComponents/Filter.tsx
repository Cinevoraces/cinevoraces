import type { SvgProps } from '@custom_types/index';

const FilterSvg = ({ style }: SvgProps) => {
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
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default FilterSvg;
