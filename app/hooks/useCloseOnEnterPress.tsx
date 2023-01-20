import { useEffect } from 'react';

/**
 * @param state boolean - containing opened status
 * @param setter status mutator
 */
const useCloseMenuOnEnterKeyPress = (
  state: boolean,
  setter: (value: boolean)=>void
) => {
  useEffect(() => {
    const handleEnterPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && state) {
        setter(!state);
      }
    };
    document.addEventListener('keypress', handleEnterPress);
    return () => {
      document.removeEventListener('keypress', handleEnterPress);
    };
  });
};

export default useCloseMenuOnEnterKeyPress;
