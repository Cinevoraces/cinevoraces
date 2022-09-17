import Link from 'next/link';

type ButtonProps = {
  children?: React.ReactNode,
  handler?: React.MouseEventHandler<HTMLElement>,
  to?: string,
  href?: string,
  style?: 'full' | 'empty' | 'rounded' | 'white',
};

/**
 * @return        either \<button\> or \<Link\>
 * @param handler   onClick handler
 * @param to      for internal links return \<Link\> if used
 * @param href    for external links return \<a\> if used
 * @param style  'fill' | 'empty' | 'rounded' | 'white'
 */

export default function Button({ children, handler, to, href, style }: ButtonProps) {
  const basicStyle = 'box-border px-6 py-3 rounded-3xl font-semibold shadow-inner bg-orange-primary text-dark-gray';
  const emptyModifier = 'bg-opacity-0 text-white border border-orange-primary';
  const roundedModifier = 'rounded-4xl';
  const whiteModifier = 'bg-white';

  let className = basicStyle;
  switch (style) {
    case 'empty':
      className += ' ' + emptyModifier;
      break;
    case 'rounded':
      className += ' ' + roundedModifier;
      break;
    case 'white':
      className += ' ' + whiteModifier;
      break;
    default :
      className;
  }

  return (
    <>
      {
        to && 
          <Link className={className} href={to}>
            <a>{children}</a>
          </Link>
      }
      {
        href && 
          <a 
            className={className}
            href={href} target='_blank' rel="noreferrer">{children}
          </a>
      }
      {
        !href && !to &&
          <button className={className} onClick={handler}>
            {children}
          </button>
      }
    </>
  );
}