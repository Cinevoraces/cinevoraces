import Link from 'next/link';
import Image from 'next/image';
import { useAppSelector, useAppDispatch } from '@store/store';
import { logout, user } from '@store/slices/user';
import defaultUserPic from '@public/icons/user_default.svg';
import { toggleUserMenu } from '@store/slices/global';
import { toast } from 'react-hot-toast';
import { forwardRef } from 'react';
interface HeaderMenuButtonProps {
  type: 'burger' | 'user';
  stateValue: boolean;
  setter(value: boolean): void;
}

/**
 * @return              \<button\> type burger menu
 * @param type          burger or user
 * @param stateValue    controlled state
 * @param setter        state setter
 */
const HeaderMenuButton = (props: HeaderMenuButtonProps) => {
  const { type, stateValue, setter } = props;
  const avatar_url = useAppSelector(user).avatar_url;
  const basicHeaderButtonStyle = 'relative w-10 h-10 flex flex-col gap-1.5 items-center ';
  let buttonStyle = basicHeaderButtonStyle;
  (type === 'burger') ? buttonStyle += 'burger pt-2.5 lg:hidden ' : buttonStyle += 'user justify-center ';
  const burgerLineStyle = 'burger h-0.5 w-5 rounded-full bg-white transition ease transform duration-300';
  return (
    <button
      onClick={() => setter(!stateValue)}
      // Hovering every item from header, including the other headerMenuButton
      className={ stateValue ? buttonStyle + 'z-[100]' : buttonStyle }>
      {
        type === 'burger' ? (
          <>
            <div className={burgerLineStyle + `${stateValue && ' rotate-45 translate-y-2'}`} />
            <div className={burgerLineStyle + `${stateValue && ' opacity-0'}`} />
            <div className={burgerLineStyle + `${stateValue && ' -rotate-45 -translate-y-2'}`} />
          </>
        ) :
          (<Image
            src={avatar_url ? avatar_url : defaultUserPic}
            width={35}
            height={35}
            alt="User menu button"
            className="user w-[35px] h-[35px] p-0.5 border border-white rounded-full lg:w-[45px] lg:h-[45px]"
          />)
      }
    </button>
  );
};

interface HeaderMenuProps extends HeaderMenuButtonProps {
  type: 'burger' | 'user';
  links: string[][];
}

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
        className={stateValue ? menuStyle : 'hidden'}>
        {
          (type === 'user' && pseudo) && (<p className='absolute top-4 left-4 text-orange-primary'>{pseudo}</p>)
        }
        {links.map((link) => (
          <Link
            href={link[1]}
            key={link[0]}
            className={linkStyle}
            onClick={setter}>
            {link[0]}
          </Link>
        ))}
        {
          type === 'user' &&
            <Link
              href='#'
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
