import React, { useState, useLayoutEffect, useEffect, useRef } from "react";
import data from "./food_data/fooddata.json";
import SearchBar from "./components/SearchBar/SearchContainer";
import { FoodItem, Filter, CalendarItem, User, FilterId } from "./types";
import { defaultFilterList } from "./food_data/defaultFilterList";
import FilterButtonList from "./components/FilterBar/FilterContainer";
import './App.css'
import FoodCardList from "./components/FoodCard/FoodCardContainer";

let fooddata: FoodItem[] = data;

function App() {
  const [calendar, setCalendar] = useState<CalendarItem[]>([]);
  const [filterList, setfilterList] = useState<Filter[]>(defaultFilterList);
  const [user, setUser] = useState<User>({
    id: "99",
    favList: ["0"],
    name: "Ugly Child",
  });

  const findCalendarItem = (item: CalendarItem, id: string) =>
    item.date === "today" && item.user === user.id && item.id === id;

  const disableCheck = (id: string): boolean => {
    const filtedItem = calendar.filter((item) => item.id === id);
    return !filtedItem[0];
  };

  const addToCalendar = (id: string, amount: number) => {
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
    const selectedItemId = calendar.findIndex((item) =>
      findCalendarItem(item, id)
    );
    if (selectedItemId === -1) {
      if (amount > 0) addToCalendar(id, amount);
    } else {
      const updatedQuantity = calendar[selectedItemId].quantity + amount;
      if (updatedQuantity <= 0) removeItem(id);
      else setCalendar((prevState) => {
        const newState = [...prevState];
        newState[selectedItemId].quantity = updatedQuantity;
        return newState;
      });

    }
  };

  const addFav = (id: string) => {
    const i = user.favList.indexOf(id);
    const tempArr = { ...user };
    if (i === -1) tempArr.favList.push(id)
    else tempArr.favList.splice(i, 1)
    setUser(tempArr);
  };

  return (
    <div>
      <span>currently logged in as: {user.name}</span>
      <h2>Food 2 today:</h2>
      <div style={{ backgroundColor: "pink" }}>
        {calendar.map((calendarItem) => (
          <DayItem
            key={calendarItem.id}
            calendarItem={calendarItem}
            fooddata={fooddata}
            removeItem={removeItem}
            addCalendar={handleClick}
          />
        ))}
      </div>
      <SearchBar fooddata={fooddata} calendar={calendar} addToCalendar={addToCalendar} />
      {/* <button onClick={() => console.log(user)}>click for user</button> */}
      <FilterButtonList filterList={filterList} setFilterList={setfilterList} />
      <FoodCardList
        fooddata={fooddata}
        handleClick={handleClick}
        disableCheck={disableCheck}
        user={user}
        addFav={addFav}
        filterList={filterList}
      />
    </div>
  );
}
//******************************************************************************
//            DAY ITEM
//******************************************************************************

interface DayItemProps {
  calendarItem: CalendarItem;
  removeItem: (id: string) => void;
  fooddata: FoodItem[];
  addCalendar: (id: string, number: number) => void;
}

const DayItem: React.FC<DayItemProps> = ({
  calendarItem,
  removeItem,
  fooddata,
  addCalendar,
}) => {
  const foodItem = fooddata.find((i: FoodItem) => i.ID === calendarItem.id);
  return foodItem ? (
    <div key={foodItem.ID}>
      <h1>{foodItem.ITEM}</h1>
      <h3>{calendarItem.quantity}</h3>
      <button onClick={() => removeItem(calendarItem.id)}>Remove Item</button>
      <button onClick={() => addCalendar(calendarItem.id, 1)}>+1</button>
      <button onClick={() => addCalendar(calendarItem.id, -1)}>-1</button>
    </div>
  ) : null;
};


export default App;
