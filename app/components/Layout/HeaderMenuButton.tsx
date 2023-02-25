import { useAppSelector } from '@store/store';
import { user } from '@store/slices/user';
import Avatar from '@components/Avatar';

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
          <Avatar id={userId ? userId : 0} pseudo='me'/>
      }
    </button>
  );
};

export default HeaderMenuButton;
