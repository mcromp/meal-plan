import React from 'react';
import "./styles/home.css";
import MIcon from "../../shared/sass/micon";

const TitleContainer: React.FC<TitleContainerProps> = ({ scrollRef }) => {
  const scrollToRef = (ref: React.MutableRefObject<any>) => window.scrollTo(0, ref.current.offsetTop)

  return (
    <div className="home-title">
      <h1 className="home-title__title">Menu Plan</h1>
      <div className="home-title__icon"><MIcon /></div>
      <span className="home-title__sub-title">Plan out your food for the next 7 days using state-of-the-art website on your computer.</span>
      <span className="home-title__sub-text">Best viewed on Chrome's Desktop Browser</span>
      <button className="home-title__button" onClick={() => scrollToRef(scrollRef)}>Sign up</button>
    </div>
  )
}

type TitleContainerProps = {
  scrollRef: React.MutableRefObject<any>;
}

export default TitleContainer;