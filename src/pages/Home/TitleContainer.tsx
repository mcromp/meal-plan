import React from 'react';
import "./styles/home.css";

const TitleContainer: React.FC<TitleContainerProps> = ({ scrollRef }) => {
  const scrollToRef = (ref: React.MutableRefObject<any>) => window.scrollTo(0, ref.current.offsetTop)

  return (
    <div className="title-container">
      <h1>
        <span>menu</span>
        <span> planner</span>
      </h1>
      <div className="sub-title-container" onClick={() => scrollToRef(scrollRef)}>
        <h2>Plan your 7 day menu</h2>
        <p>Best viewed on Chrome desktop</p>
        <span className="down-arrow" onClick={() => scrollToRef(scrollRef)}>↓</span>
      </div>
    </div>
  )
}

type TitleContainerProps = {
  scrollRef: React.MutableRefObject<any>;
}

export default TitleContainer;