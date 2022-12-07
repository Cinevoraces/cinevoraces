import type React from 'react';
import { useEffect } from 'react';

/**
 * @param ref Menu component to close
 * @param name additionnal class name to identify a triggering button
 * @param state boolean - containing opened status
 * @param setter status mutator
 */
export default function useCloseMenuOnEnterKeyPress(
  ref: React.RefObject<HTMLElement>,
  name: string,
  state: boolean,
  setter: (value: boolean)=>void
) {
  useEffect(() => {
    const handleEnterPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && ref.current && state) {
        setter(!state);
      }
    };
    document.addEventListener('keypress', handleEnterPress);
    return () => {
      document.removeEventListener('keypress', handleEnterPress);
    };
  });
}
