import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../redux';
import Loading from '../shared/Loading';

const useIsLoading = () => {
  const [isShown, setIsShown] = useState(false)
  const isLoading = useSelector<RootState, boolean>(state => state.isLoading);

  useEffect(() => {
    let timeout = setTimeout(() => {
      setIsShown(isLoading)
    }, 750);
    return () => {
      clearTimeout(timeout)
    }
  }, [isLoading]);

  return [isShown];
};


export default useIsLoading;
