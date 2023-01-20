interface SvgProps {
  style: string;
}

const SimpleLogo = ({ style }: SvgProps) => {
  return (
    <svg 
      width="512" 
      height="512" 
      viewBox="0 0 512 512" 
      fill="none"
      className={style}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        fillRule="evenodd"
        clipRule="evenodd" 
        d="M126.098 419.098C78.4602 380.522 48 321.546 48 255.508C48 139.326 142.281 45 258.406 45C323.322 45 381.41 74.4759 420 120.782L258.406 255.508L420 390.234C381.622 436.285 323.96 465.69 259.469 466C254.757 426.943 221.471 396.645 181.168 396.645C159.746 396.645 140.308 405.204 126.098 419.098Z"
        fill="#FC9A3F"/>
      <path 
        d="M258.4 387.074C331.027 387.074 389.904 328.17 389.904 255.508C389.904 182.845 331.027 123.941 258.4 123.941C185.773 123.941 126.896 182.845 126.896 255.508C126.896 328.17 185.773 387.074 258.4 387.074Z" 
        fill="#F2F2F3" 
        stroke="#202029" 
        strokeWidth="8" 
        strokeMiterlimit="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"/>
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" d="M201.8 166.835C218.139 156.33 237.572 150.255 258.41 150.255C316.473 150.255 363.613 197.418 363.613 255.509C363.613 313.6 316.473 360.763 258.41 360.763C200.347 360.763 153.207 313.6 153.207 255.509C153.207 244.942 154.767 234.737 157.686 225.118C163.146 228.39 169.534 230.249 176.352 230.249C196.674 230.249 213.173 213.741 213.173 193.41C213.173 182.961 208.815 173.522 201.8 166.835Z" 
        fill="#202029" 
        stroke="black" 
        strokeWidth="0.000829121" 
        strokeMiterlimit="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"/>
      <path 
        d="M241.973 247.832C246.265 248.589 250.357 245.723 251.114 241.43C251.87 237.137 249.004 233.042 244.712 232.285C240.421 231.528 236.328 234.394 235.572 238.687C234.815 242.98 237.681 247.075 241.973 247.832Z" 
        fill="#F2F2F3" 
        stroke="black" 
        strokeWidth="0.000831718" 
        strokeMiterlimit="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"/>
    </svg>
  );
};

export default SimpleLogo;
