import { useEffect } from 'react';

/**
 * @param state boolean - containing opened status
 * @param setter status mutator
 */
export default function useCloseMenuOnEnterKeyPress(
  state: boolean,
  setter: (value: boolean)=>void
) {
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
}
