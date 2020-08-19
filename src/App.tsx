import React, { useState } from "react";
import * as fooddata from "./food_data/fooddata.json";
import { CATEGORIES } from "./food_data/categories";

interface foodItem {
  ITEM: string;
  CAL: string;
  PRICE: string;
  CATEGORY: string;
  ID: string;
}

interface ButtonProps {
  handleTypeClick?: () => void;
}

const foodList: string[] = CATEGORIES;

function App() {
  const handleTypeClick = (name: string) => {
    console.log(name);
  };

  return (
    <div>
      <Categories handleTypeClick={handleTypeClick} />
      <h1>heyya</h1>
    </div>
  );
}

const Categories: React.SFC<ButtonProps> = ({
  handleTypeClick,
}): JSX.Element => {
  return (
    <>
      {CATEGORIES.map((x: any) => (
        <h1 key={x} onClick={handleClick(x)}>
          {x}
        </h1>
      ))}
    </>
  );
};

export default App;
