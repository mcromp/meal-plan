import data from "./food_data/fooddata.json";
import React, { useState } from "react";
// import { CATEGORIES } from "./food_data/categories";

// type Category =
//   | "BURGERSANDWICH"
//   | "BEVERAGE"
//   | "CHICKENFISH"
//   | "DESSERTSHAKE"
//   | "SNACKSIDE"
//   | "BREAKFAST";

interface FoodItem {
  ITEM: string;
  CAL: string;
  CATEGORY: string;
  PRICE: string;
  ID: string;
}

interface User {
  id: string;
  favList: string[];
  name: string;
}

interface CalendarItem {
  id: string;
  date: string;
  quantity: number;
  user: string;
}

type ButtonProps = {
  callback: (name: string) => void;
};

const fooddata: FoodItem[] = data;

function App() {
  const [calendar, setCalendar] = useState<CalendarItem[]>([]);
  // const [userList, setUserList] = useState<User[]>([]);
  const [filter, setFilter] = useState<boolean>(false);
  const [user, setUser] = useState<User>({
    id: "99",
    favList: ["1", "2"],
    name: "Ugly Child",
  });

  const findCalendarItem = (item: CalendarItem, id: string) =>
    item.date === "today" && item.user === user.id && item.id === id;

  const disableCheck = (id: string): boolean => {
    const filtedItem = calendar.filter((item) => item.id === id);
    return !filtedItem[0];
  };

  const addItem = (id: string, amount: number) => {
    const newCalendarItem: CalendarItem = {
      id,
      date: "today",
      quantity: amount,
      user: user.id,
    };
    setCalendar((prevState) => [...prevState, newCalendarItem]);
  };

  const removeItem = (id: string) => {
    const filteredCalendar = calendar.filter((item) => item.id !== id);
    setCalendar([...filteredCalendar]);
  };

  const handleClick = (id: string, amount: number) => {
    let selectedItemId = calendar.findIndex((item) =>
      findCalendarItem(item, id)
    );
    if (selectedItemId === -1) {
      if (amount > 0) addItem(id, amount);
    } else {
      let updatedQuantity = calendar[selectedItemId].quantity + amount;
      if (updatedQuantity <= 0) {
        removeItem(id);
      } else {
        setCalendar((prevState) => {
          const newState = [...prevState];
          newState[selectedItemId].quantity = updatedQuantity;
          return newState;
        });
      }
    }
  };

  return (
    <div>
      <span>currently logged in as: {user.name}</span>
      <h2>Food 2 today:</h2>
      <div style={{ backgroundColor: "pink" }}>
        {calendar.map((calendarItem) => (
          <DayItem
            key={calendarItem.id}
            item={calendarItem}
            fooddata={fooddata}
            removeItem={removeItem}
            addCalendar={handleClick}
          />
        ))}
      </div>
      <div style={{ backgroundColor: "lightgoldenrodyellow" }}>
        {fooddata.map((item) => {
          return (
            <FoodCard
              key={item.ID}
              item={item}
              addCalendar={handleClick}
              disableCheck={disableCheck}
            />
          );
        })}
      </div>
    </div>
  );
}

//******************************************************************************
//            DAY ITEM
//******************************************************************************
//    REMEMBER TO ADD INTERFACE

const DayItem: React.FC<any> = ({
  item,
  removeItem,
  fooddata,
  addCalendar,
}) => {
  const foodItemId = fooddata.findIndex((butty: any) => butty.ID === item.id);
  const foodItem = fooddata[foodItemId];
  return (
    <div key={foodItem.ID}>
      <h1>{foodItem.ITEM}</h1>
      <h3>{item.quantity}</h3>
      <button onClick={() => removeItem(item.id)}>Remove Item</button>
      <button onClick={() => addCalendar(item.id, 1)}>+1</button>
      <button onClick={() => addCalendar(item.id, -1)}>-1</button>
    </div>
  );
};

//******************************************************************************
//            FOOD CARD
//******************************************************************************

// const FoodCardList: React.FC<any> = ({}) => {};

interface FoodCardProps {
  item: FoodItem;
  addCalendar: (id: string, number: number) => void;
  disableCheck: (id: string) => boolean | undefined;
}

const FoodCard: React.FC<FoodCardProps> = ({
  item,
  addCalendar: addCalendar,
  disableCheck: disableCheck,
}) => {
  return (
    <div>
      <hr />
      <br />
      <span>{item.ITEM}</span>
      <button onClick={() => addCalendar(item.ID, 1)}>plus 1</button>
      <button
        onClick={() => addCalendar(item.ID, -1)}
        disabled={disableCheck(item.ID)}
      >
        minus 1
      </button>
      {/* <button onClick={() => } */}

      <hr />
    </div>
  );
};

export default App;
