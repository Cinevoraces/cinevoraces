import type React from 'react';
import { useEffect } from 'react';

/**
 * @param ref Menu component to close
 * @param name additionnal class name to identify a triggering button user | modal | burger
 * @param state boolean - containing opened status
 * @param setter status mutator
 */
export default function useCloseMenuOnOutsideClick(
  ref: React.RefObject<HTMLElement>,
  name: 'user' | 'modal' | 'burger' | 'rating' | 'select',
  state: boolean,
  setter: (value: boolean)=>void
) {
  useEffect(() => {
    const handleClickOutside = (e: Event) => {
      if (e.target instanceof HTMLElement && ref.current) {
        if (ref.current && e.target.classList && !ref.current.contains(e.target)) {
          state && !e.target.classList.contains(name) && setter(!state);
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });
}

