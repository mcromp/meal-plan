import React from 'react';
import ErrorPage from '../pages/ErrorPage';

const FailedToLoad = () => {
  return (
    <ErrorPage
      text={"Server Error"}
      subText={"Could not load, please try again later"}
      isRedirected={false} />
  );
};

export default FailedToLoad;