import React, { useEffect, useState } from 'react'

const Loading: React.FC = () => {
  const [isShown, setIsShown] = useState(false)

  useEffect(() => {
    let timeout = setTimeout(() => {
      setIsShown(true)
    }, 750);
    return () => {
      clearTimeout(timeout)
    }
  }, [])

  return isShown ? <span>Loading...</span> : null;
}

export default Loading;

