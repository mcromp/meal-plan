import {  useLayoutEffect } from 'react'

export function useOnClickOutside(wrapperRef: React.MutableRefObject<HTMLInputElement>, handler: () => void) {
  useLayoutEffect(() => {
    const handleClickOutside = (event: MouseEvent | KeyboardEvent): void => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as HTMLElement)) handler();
  }

  document.addEventListener('mousedown', handleClickOutside);
  document.addEventListener('keydown', handleClickOutside);

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleClickOutside);
      }
    }, [wrapperRef, handler]);
};
