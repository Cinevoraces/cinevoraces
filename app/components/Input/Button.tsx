import React from 'react';
import Link from 'next/link';

interface ButtonProps {
  children?: React.ReactNode;
  customStyle?: string;
  handler?: React.MouseEventHandler<HTMLButtonElement>;
  to?: string;
  href?: string;
}

/**
 * @returns custom Button component
 * @param customStyle custom styles
 * @param children text & / or img
 * @param handler specific handler outside forms and redirection
 * @param to to specify for internal Link redirection
 * @param href for external links only
 */
export default function Button({
  children,
  customStyle,
  handler,
  to,
  href,
}: ButtonProps) {
  const [basicStyles, empty, rounded, white] = [
    `px-6 py-3 rounded-3xl shadow-inner bg-orange-primary font-sans text-dark-gray font-semibold 
      focus:ring-none focus:outline-none focus:ring-4 focus:ring-offset-0 focus:ring-white/5`,
    'bg-opacity-0 text-white border border-orange-primary',
    'rounded-4xl',
    'bg-white focus:ring-white/20',
  ];

  let className = basicStyles;
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
          onClick={handler}>
          {children}
        </button>
      )}
    </>
  );
}
