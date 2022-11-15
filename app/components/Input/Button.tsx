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
  const [basicStyles, empty, rounded, white] = [
    `px-5 py-2 rounded-2xl shadow-inner bg-orange-primary font-sans text-dark-gray font-semibold 
    focus:ring-none focus:outline-none focus:ring-4 focus:ring-offset-0 focus:ring-white/5
    hover:ring-none hover:outline-none hover:ring-4 hover:ring-offset-0 hover:ring-white/5 hover:scale-105`,
    'bg-opacity-0 text-white border border-orange-primary',
    'rounded-full ',
    'bg-white focus:ring-white/20',
  ];

  let className = basicStyles;
  switch (customStyle) {
    case 'empty':
      className += ' ' + empty;
      break;
    case 'rounded':
      className = className.replace('rounded-2xl', rounded); // Overloading with 'rounded-full' doesn't overwrite the basic parameter.
      break;
    case 'white':
      className += ' ' + white;
      break;
    default:
      className;
  }

  return (
    <>
      {to && (
        <Link
          className={className}
          href={to}>
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
