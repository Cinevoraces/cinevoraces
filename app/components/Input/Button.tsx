import React from 'react';
import Link from 'next/link';

interface ButtonProps {
  children?: React.ReactNode;
  customStyle?: 'text' | 'empty' | 'rounded' | 'white';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  to?: string;
  href?: string;
}

/**
 * @returns custom Button component
 * @param customStyle custom styles
 * @param children text & / or img
 * @param onClick specific handler outside forms and redirection
 * @param to to specify for internal Link redirection
 * @param href for external links only
 */
export default function Button({
  children,
  customStyle,
  onClick,
  to,
  href,
}: ButtonProps) {
  const [baseStyle, classic, empty, rounded, white] = [
    `px-5 py-2 flex gap-2 justify-center
      shadow-inner font-semibold ring-none
      focus:outline-none focus:ring-4 focus:ring-offset-0 focus:ring-white/5
      hover:outline-none hover:ring-4 hover:ring-offset-0 hover:ring-white/5 hover:scale-105
      transition duration-150 hover:ease-out`,
    'bg-orange-primary text-dark-gray rounded-2xl',
    'text-white border border-orange-primary rounded-2xl',
    'bg-orange-primary text-dark-gray py-1.5 rounded-full ',
    'bg-white text-dark-gray focus:ring-white/20 rounded-2xl',
  ];

  let className = baseStyle;
  switch (customStyle) {
    case 'empty':
      className += ' ' + empty;
      break;
    case 'rounded':
      className += ' ' + rounded;
      break;
    case 'white':
      className += ' ' + white;
      break;
    default:
      className += ' ' + classic;
  }

  return (
    <>
      {to && (
        <Link
          className={className}
          href={to}
          onClick={onClick}>
          {children}
        </Link>
      )}
      {href && (
        <Link
          className={className}
          href={href}
          target="_blank">
          {children}
        </Link>
      )}
      {!href && !to && (
        <button
          className={className}
          onClick={onClick}>
          {children}
        </button>
      )}
    </>
  );
}
