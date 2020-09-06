import React, { useState } from "react";
import { FoodItem, Filter, CalendarItem, User } from "./types";
import { defaultFilterList } from "./food_data/defaultFilterList";
import SearchBar from "./components/SearchBar/SearchContainer";
import FilterButtonList from "./components/FilterBar/FilterContainer";
import FoodCardList from "./components/FoodCard/FoodCardContainer";
import DayBoardItem from "./components/DayBoard/DayBoard";
import data from "./food_data/fooddata.json";
import './App.css'

const fooddata: FoodItem[] = data;

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

  const addItemToCalendar = (id: string, amount: number) => {
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

  const modifyQuantityOfCalendarItem = (selectedItemId: number, id: string, amount: number) => {
    const updatedQuantity = calendar[selectedItemId].quantity + amount;
    if (updatedQuantity <= 0) removeItem(id);
    else setCalendar((prevState) => {
      const newState = [...prevState];
      newState[selectedItemId].quantity = updatedQuantity;
      return newState;
    });
  }

  const handleItemCardClick = (id: string, amount: number) => {
    const selectedItemId = calendar.findIndex((item) => findCalendarItem(item, id));
    if (selectedItemId === -1) {
      if (amount > 0) addItemToCalendar(id, amount);
    } else modifyQuantityOfCalendarItem(selectedItemId, id, amount)
  };

  const toggleFav = (id: string) => {
    const i = user.favList.indexOf(id);
    const tempArr = { ...user };
    if (i === -1) tempArr.favList.push(id)
    else tempArr.favList.splice(i, 1)
    setUser(tempArr);
  };

  return (
    <div style={{ backgroundColor: "pink" }}>
      {calendar.map((calendarItem) => (
        <DayBoardItem
          key={calendarItem.id}
          calendarItem={calendarItem}
          fooddata={fooddata}
          removeItem={removeItem}
          addCalendar={handleItemCardClick}
        />
      ))}
      <SearchBar
        fooddata={fooddata}
        calendar={calendar}
        addToCalendar={addItemToCalendar} />
      <FilterButtonList
        filterList={filterList}
        setFilterList={setfilterList} />
      <FoodCardList
        fooddata={fooddata}
        handleClick={handleItemCardClick}
        calendar={calendar}
        user={user}
        toggleFav={toggleFav}
        filterList={filterList}
      />
    </div>
  );
}

export default App;
