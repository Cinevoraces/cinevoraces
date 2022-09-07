import { Link } from 'react-router-dom';
import styles from './Button.module.scss';

type ButtonProps = {
  children?: React.ReactNode,
  styleMod?: string,
  handler?: React.MouseEventHandler<HTMLElement>,
  to?: string
  href?: string
}

/**
 * @return          either \<button\> or \<Link\>
 * @param to      return \<Link\> if used
 * @param handler   onClick handler
 * @param styleMod  'fill' | 'rounded' | 'white' (joinded with '-')
 */
function Button({children, styleMod, handler, to, href}: ButtonProps)  {
  // Get styleMod and look for keywords in string
  const styleResolver = (searchedString: string) => {
    if (RegExp(`\\b${searchedString}\\b`).test(styleMod!)) {
      return searchedString;
    } else {
      return null;
    }};
  const isFilled  = styleResolver('fill');
  const isRounded = styleResolver('rounded');
  const isWhite   = styleResolver('white');
  // Set the correct classname
  const className = `
    ${styles['button']}
    ${(isFilled) ? styles['button--full'] : styles['button--empty']}
    ${(isRounded) && styles['button--rounded']}
    ${(isWhite) && styles['button--white']}`;
  return(
    <>
      {href &&
        <a 
          className={className}
          href={href}
          target='_blank'
          rel='noreferrer'
          onClick={handler}         
        >
          {children}
        </a>}
      {to &&
        <Link 
          className={className}
          to={to}
          onClick={handler}         
        >
          {children}
        </Link>}
      {!to && !href &&
        <button
          className={className}
          onClick={handler}
        >
          {children}
        </button>}
    </>
  );
};

export default Button;