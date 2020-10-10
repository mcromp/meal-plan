import React, { useEffect, useState } from 'react'

export function useFlashText<T>(text: T, time: number = 1500): [T | null, React.Dispatch<T>] {
  const [display, setDisplay] = useState<T | null>(text)
  useEffect(() => {
    setDisplay(text)
    setTimeout(() => {
      setDisplay(null)
    }, time);
  })
  return [display, setDisplay]

}