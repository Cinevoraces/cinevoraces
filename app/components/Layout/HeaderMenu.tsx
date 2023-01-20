import { forwardRef } from 'react';
import Link from 'next/link';
import { useAppSelector, useAppDispatch } from '@store/store';
import { logout, user } from '@store/slices/user';
import { toggleUserMenu } from '@store/slices/global';
import { toast } from 'react-hot-toast';
import HeaderMenuButton from './HeaderMenuButton';
import type { HeaderMenuButtonProps } from './HeaderMenuButton';

interface HeaderMenuProps extends HeaderMenuButtonProps {
  type: 'burger' | 'user';
  links: string[][];
}

/**
 * @return              fragment wrapping Button and possibly displayed <nav>
 * @param type          burger or user
 * @param stateValue    controlled state
 * @param setter        state setter
 * @param links         links that will feed the <nav>
 * @param ref           reference for opening / closing purposes
 */
const HeaderMenu = forwardRef<HTMLElement, HeaderMenuProps>((props, ref) => {
  HeaderMenu.displayName = 'HeaderMenu';
  const { type, setter, stateValue, links } = props;
  const pseudo = useAppSelector(user).pseudo;
  const dispatch = useAppDispatch();

  const basicMenuStyle =
    'absolute z-[90] top-0 w-full max-w-md pb-2 px-4 flex flex-col bg-medium-gray shadow-lg sm:rounded-b-lg ';
  const basicLinksStyle = 'py-2.5 border-b border-b-white last:border-b-transparent';
  const burgerCustomStyle = 'left-0 pt-10';
  const userCustomStyle = 'right-0 pt-14';
  let menuStyle = basicMenuStyle;
  (type === 'burger') ? (menuStyle += burgerCustomStyle) : (menuStyle += userCustomStyle);
  let linkStyle = basicLinksStyle;
  type === 'user' && (linkStyle += ' text-right');

  const logoutHandler = () => {
    // State clearing
    dispatch(logout());
    // localStorage cleaning
    window.localStorage.clear();
    // refresh_token cleaning
    document.cookie = 'refresh_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    dispatch(toggleUserMenu());
    toast.success('À bientôt !');
  };

  return (
    <>
      <HeaderMenuButton {...props} />
      <nav
        ref={ref}
        className={stateValue ? (menuStyle + `${(type !== 'user') ? ' pt-12' : ''}`) : 'hidden' }>
        {
          (type === 'user' && pseudo) && (<p className='absolute top-4 left-4 text-orange-primary'>{pseudo}</p>)
        }
        {/* { // adding
          type !== 'user' && <div className='w-full h-2'/>
        } */}
        {links.map((link) => (
          <Link
            href={link[1]}
            key={link[0]}
            className={linkStyle}
            onClick={() => setter}>
            {link[0]}
          </Link>
        ))}
        {
          type === 'user' &&
            <Link
              href='/'
              key='logout'
              className={linkStyle}
              onClick={logoutHandler}>
              Se déconnecter
            </Link>
        }
      </nav>
    </>
  );
});

export default HeaderMenu;
