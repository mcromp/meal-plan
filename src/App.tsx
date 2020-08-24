import React, { useState } from "react";
import data from "./food_data/fooddata.json";
import { CATEGORIES } from "./food_data/categories";

type Category =
  | "BURGERSANDWICH"
  | "BEVERAGE"
  | "CHICKENFISH"
  | "DESSERTSHAKE"
  | "SNACKSIDE"
  | "BREAKFAST";

// type Price = "$" | "$$" | "$$$";
// interface FoodItem {
//   ITEM: string;
//   CAL: string;
//   PRICE: string;
//   CATEGORY: Category;
//   ID: string;
// }

const fooddata = data;

type ButtonProps = {
  callback: (name: string) => void;
};

const foodList: string[] = CATEGORIES;

function App() {
  // const handleTypeClick = (name: string) => {
  //   console.log(name);
  // };
  const [itemListToday, setItemListToday] = useState([]);
  return (
    <div>
      {/* <Categories callback={handleTypeClick} /> */}
      {fooddata.map((x) => {
        return (
          <FoodCard
            key={x.ID}
            item={x.ITEM}
            id={x.ID}
            cal={x.CAL}
            cat={x.CATEGORY}
            price={x.PRICE}
          />
        );
      })}
      <h1>heyya</h1>
    </div>
  );
}

type Props = {
  item: string;
  cal: string;
  cat: string;
  price: string;
  id: string;
};

const FoodCard: React.FC<Props> = ({ item, cal, cat, price, id }) => {
  return (
    <div>
      <hr />
      <br />
      <span>{cal}</span>
      <br />
      <span>{price}</span>
      <h1>{item}</h1>
      <span>{cat}</span>
      {/* adds itemtodaylist */}
      <button onClick={() => console.log(`item ${item}, +1`)}>plus 1</button>
      {/* subtracts itemtodaylist */}
      <button onClick={() => console.log(`item ${item}, -1`)}>minus 1</button>
      <hr />
    </div>
  );
};

// const Categories: React.FC<ButtonProps> = ({ callback }) => {
//   return (
//     <>
//       {CATEGORIES.map((x: any) => (
//         <h1 key={x} onClick={() => callback(x)}>
//           {x}
//         </h1>
//       ))}
//     </>
//   );
// };

export default App;
