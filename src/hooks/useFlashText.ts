import React, { useEffect, useLayoutEffect, useState } from 'react'

export function useFlashText<T>(text: T, time: number = 1500): [T | null, React.Dispatch<T>] {
  const [display, setDisplay] = useState<T | null>(text);
  useLayoutEffect(() => {
    setDisplay(text);
   const timeout =  setTimeout(() => {
      setDisplay(null);
    }, time);
    return () => {
      clearTimeout(timeout)
    }
  });
  return [display, setDisplay];
};