import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import "./styles/NotFound404.css"

const ErrorPage: React.FC<ErrorPageProps> = ({
  text,
  subText,
  isRedirected
}) => {
  const [isTimedOut, setIsTimedOut] = useState<boolean>(false)
  useEffect(() => {
    let listener = setTimeout(() => {
      setIsTimedOut(true)
    }, 5000);
    return () => {
      clearTimeout(listener)
    }
  }, []);

  if (isRedirected && isTimedOut) { return <Redirect to={`/`} />; };
  return (
    <div className="main">
      <span className="main__text">{text}</span>
      <span className="main__sub-text">{subText}</span>
    </div>
  );
};

type ErrorPageProps = {
  text: string;
  subText: string;
  isRedirected: boolean;
};

export default ErrorPage;