import React from 'react';

interface BurgerMenuButtonProps {
  stateValue: boolean;
  setter(value: boolean): void;
}

/**
 * @return              \<button\> type burger menu
 * @param stateValue    controlled state
 * @param setter        state setter
 */
export default function BurgerMenuButton(props: BurgerMenuButtonProps) {
  const { stateValue, setter } = props;
  const lineStyle = 'h-0.5 w-5 rounded-full bg-white transition ease transform duration-300';
  return (
    <button
      onClick={() => setter(!stateValue)}
      className="relative w-10 h-10 pt-2.5 flex flex-col gap-1.5 items-center">
      <div className={lineStyle + `${stateValue && ' rotate-45 translate-y-2'}`} />
      <div className={lineStyle + `${stateValue && ' opacity-0'}`} />
      <div className={lineStyle + `${stateValue && ' -rotate-45 -translate-y-2'}`} />
    </button>
  );
}
