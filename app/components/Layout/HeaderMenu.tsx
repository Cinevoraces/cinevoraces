import type { LegacyRef } from 'react';
import React from 'react';
import Link from 'next/link';
interface HeaderMenuButtonProps {
  stateValue: boolean;
  setter(value: boolean): void;
}

/**
 * @return              \<button\> type burger menu
 * @param stateValue    controlled state
 * @param setter        state setter
 */
const BurgerMenuButton = (props: HeaderMenuButtonProps) => {
  const { stateValue, setter } = props;
  const lineStyle = 'burger h-0.5 w-5 rounded-full bg-white transition ease transform duration-300';
  return (
    <button
      onClick={() => setter(!stateValue)}
      className="burger relative z-10 w-10 h-10 pt-2.5 flex flex-col gap-1.5 items-center">
      <div className={lineStyle + `${stateValue && ' rotate-45 translate-y-2'}`} />
      <div className={lineStyle + `${stateValue && ' opacity-0'}`} />
      <div className={lineStyle + `${stateValue && ' -rotate-45 -translate-y-2'}`} />
    </button>
  );
};

interface HeaderMenuProps extends HeaderMenuButtonProps {
  type: 'burger' | 'user';
  links: string[][];
};

const HeaderMenu = React.forwardRef<HTMLElement, HeaderMenuProps>((props, ref) => {
  HeaderMenu.displayName = 'HeaderMenu';
  const { type, stateValue, links } = props;
  const basicMenuStyle = 'absolute left-0 w-full pt-52 pb-2 px-4 flex flex-col bg-medium-gray shadow-lg';
  const basicLinksStyle = 'py-2.5 border-b border-b-white last:border-b-transparent';
  const menuStyle = basicMenuStyle;
  let linkStyle = basicLinksStyle;
  (type === 'user') && (linkStyle += ' text-right');
  return (
    <>
      {
        (type === 'burger') && <BurgerMenuButton {...props}/>
      }
      <nav
        ref={ref}
        className={stateValue ? menuStyle : 'hidden'}>
        {links.map((link) => (
          <Link
            href={link[1]}
            key={link[0]}
            className={linkStyle}>
            {link[0]}
          </Link>
        ))}
      </nav>
    </>
  );
});

export default HeaderMenu;
