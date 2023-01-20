export interface SvgProps {
  style: string;
}

const BookmarkSvg = (props: SvgProps) => {
  return (
    <svg
      aria-hidden
      width="16"
      height="23"
      viewBox="0 0 16 23"
      xmlns="http://www.w3.org/2000/svg"
      className={props.style}>
      <path
        d="M15 21.5L8 17.0556L1 21.5V3.72222C1 3.13285 1.21071 2.56762 1.58579 2.15087C1.96086 1.73413 2.46957 1.5 3 1.5H13C13.5304 1.5 14.0391 1.73413 14.4142 2.15087C14.7893 2.56762 15 3.13285 15 3.72222V21.5Z"
        stroke="#F2F2F3"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
const LikeSvg = (props: SvgProps) => {
  return (
    <svg
      aria-hidden
      width="22"
      height="21"
      viewBox="0 0 22 21"
      xmlns="http://www.w3.org/2000/svg"
      className={props.style}>
      <path
        d="M10.639,2.598L11,2.975L11.361,2.598C11.486,2.467 11.616,2.345 11.749,2.231C14.441,-0.061 18.777,1.001 20.384,4.188C21.211,5.83 21.326,8.085 19.973,10.796C18.64,13.468 15.882,16.574 11,19.897C6.118,16.574 3.36,13.469 2.027,10.797C0.674,8.086 0.789,5.83 1.616,4.188C3.303,0.843 7.997,-0.161 10.639,2.598Z"
        stroke="#F2F2F3"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
const StarSvg = (props: SvgProps) => {
  return (
    <svg
      aria-hidden
      width="24"
      height="23"
      viewBox="0 0 24 23"
      xmlns="http://www.w3.org/2000/svg"
      className={props.style}>
      <path
        d="M11.0742 2.13299C11.3941 1.289 12.6051 1.289 12.9261 2.13299L14.996 7.8669C15.0682 8.05369 15.1954 8.21418 15.3607 8.32719C15.526 8.4402 15.7217 8.50042 15.9219 8.49989H21.0087C21.9487 8.49989 22.3587 9.66988 21.6197 10.2429L17.9999 13.4998C17.8377 13.6245 17.7192 13.7973 17.6614 13.9935C17.6035 14.1896 17.6093 14.3991 17.6779 14.5918L18.9998 20.1947C19.3218 21.0947 18.2798 21.8677 17.4919 21.3137L12.5751 18.1937C12.4067 18.0754 12.2059 18.0119 12.0001 18.0119C11.7943 18.0119 11.5935 18.0754 11.4251 18.1937L6.50837 21.3137C5.7214 21.8677 4.67845 21.0937 5.00043 20.1947L6.32237 14.5918C6.39095 14.3991 6.39673 14.1896 6.33888 13.9935C6.28104 13.7973 6.16254 13.6245 6.00039 13.4998L2.38055 10.2429C1.64058 9.66988 2.05256 8.49989 2.99052 8.49989H8.0773C8.27758 8.50056 8.47334 8.4404 8.63869 8.32737C8.80403 8.21434 8.93116 8.05377 9.00325 7.8669L11.0732 2.13299H11.0742Z"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
const ViewSvg = (props: SvgProps) => {
  return (
    <svg
      aria-hidden
      width="30"
      height="22"
      viewBox="0 0 30 22"
      xmlns="http://www.w3.org/2000/svg"
      className={props.style}>
      <path
        d="M27.9569 12.4829C28.634 11.5986 28.634 10.4029 27.9569 9.51714C25.824 6.73286 20.7069 1 14.7326 1C8.75829 1 3.64115 6.73286 1.50829 9.51714C1.17884 9.94124 1 10.463 1 11C1 11.537 1.17884 12.0588 1.50829 12.4829C3.64115 15.2671 8.75829 21 14.7326 21C20.7069 21 25.824 15.2671 27.9569 12.4829ZM19.0182 11.0001C19.0182 13.3671 17.0994 15.2858 14.7325 15.2858C12.3656 15.2858 10.4468 13.3671 10.4468 11.0001C10.4468 8.6332 12.3656 6.71442 14.7325 6.71442C17.0994 6.71442 19.0182 8.6332 19.0182 11.0001Z"
      />
      <path
        d="M27.9569 9.51714L28.7513 8.90979L28.7507 8.90903L27.9569 9.51714ZM27.9569 12.4829L28.7507 13.091L28.7508 13.0908L27.9569 12.4829ZM1.50829 9.51714L2.29802 10.1306L2.30214 10.1253L1.50829 9.51714ZM1.50829 12.4829L2.30216 11.8747L2.29801 11.8694L1.50829 12.4829ZM27.1624 10.1245C27.5657 10.652 27.5651 11.3497 27.1629 11.8749L28.7508 13.0908C29.7029 11.8475 29.7023 10.1537 28.7513 8.90979L27.1624 10.1245ZM14.7326 2C17.4032 2 19.9616 3.28704 22.1717 5.00414C24.3706 6.71249 26.1237 8.76845 27.163 10.1253L28.7507 8.90903C27.6572 7.48155 25.7853 5.27894 23.3988 3.42479C21.0235 1.57939 18.0363 0 14.7326 0V2ZM2.30214 10.1253C3.3415 8.76845 5.09458 6.71249 7.29342 5.00414C9.50353 3.28704 12.062 2 14.7326 2V0C11.4289 0 8.44162 1.57939 6.06638 3.42479C3.67986 5.27894 1.80794 7.48155 0.714442 8.90903L2.30214 10.1253ZM2 11C2 10.6851 2.10485 10.3793 2.29801 10.1306L0.718577 8.90367C0.252827 9.50322 0 10.2408 0 11H2ZM2.29801 11.8694C2.10485 11.6207 2 11.3149 2 11H0C0 11.7592 0.252827 12.4968 0.718577 13.0963L2.29801 11.8694ZM14.7326 20C12.062 20 9.50353 18.713 7.29342 16.9959C5.09458 15.2875 3.3415 13.2315 2.30214 11.8747L0.714442 13.091C1.80794 14.5185 3.67986 16.7211 6.06638 18.5752C8.44162 20.4206 11.4289 22 14.7326 22V20ZM27.163 11.8747C26.1237 13.2315 24.3706 15.2875 22.1717 16.9959C19.9616 18.713 17.4032 20 14.7326 20V22C18.0363 22 21.0235 20.4206 23.3988 18.5752C25.7853 16.7211 27.6572 14.5185 28.7507 13.091L27.163 11.8747ZM14.7325 16.2858C17.6517 16.2858 20.0182 13.9194 20.0182 11.0001H18.0182C18.0182 12.8148 16.5471 14.2858 14.7325 14.2858V16.2858ZM9.44678 11.0001C9.44678 13.9194 11.8133 16.2858 14.7325 16.2858V14.2858C12.9178 14.2858 11.4468 12.8148 11.4468 11.0001H9.44678ZM14.7325 5.71442C11.8133 5.71442 9.44678 8.08091 9.44678 11.0001H11.4468C11.4468 9.18548 12.9178 7.71442 14.7325 7.71442V5.71442ZM20.0182 11.0001C20.0182 8.08091 17.6517 5.71442 14.7325 5.71442V7.71442C16.5471 7.71442 18.0182 9.18548 18.0182 11.0001H20.0182Z"
        fill="#F2F2F3"
      />
    </svg>
  );
};

export { BookmarkSvg, LikeSvg, StarSvg, ViewSvg };
