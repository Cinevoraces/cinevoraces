
import Image from 'next/image';
import { useAppSelector } from '@store/store';
import { user } from '@store/slices/user';
import defaultUserPic from '@public/icons/user_default.svg';
import { useState } from 'react';

export interface HeaderMenuButtonProps {
  type: 'burger' | 'user';
  stateValue: boolean;
  setter: (value: boolean)=>void;
  
}

/**
 * @return              \<button\> type burger menu
 * @param type          burger or user
 * @param stateValue    controlled state
 * @param setter        state setter
 */
const HeaderMenuButton = (props: HeaderMenuButtonProps) => {
  const { type, stateValue, setter } = props;
  const userId = useAppSelector(user).id;
  const [source, setSource] = useState(`${process.env.NEXT_PUBLIC_API_BASE_URL_SSR}/public/avatar/${userId}`);
  const basicHeaderButtonStyle = `relative w-10 h-10 flex flex-col gap-1.5 items-center rounded-full overflow-hidden
  focus:outline-none focus:ring-4 focus:ring-offset-0 focus:ring-white/5 focus:scale-110 
  hover:outline-none hover:ring-4 hover:ring-offset-0 hover:ring-white/5 hover:scale-110
  transition duration-150 hover:ease-out `;
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
            src={source}
            width={35}
            height={35}
            alt="User menu button"
            className="user w-[35px] h-[35px] p-0.5 border border-white rounded-full lg:w-[45px] lg:h-[45px] hover:border-2"
            onError={() => setSource(defaultUserPic)}
          />)
      }
    </button>
  );
};

export default HeaderMenuButton;
