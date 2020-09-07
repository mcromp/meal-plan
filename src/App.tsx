import React, { useState } from "react";
import { FoodItem, Filter, CalendarItem, User } from "./types";
import { defaultFilterList } from "./food_data/defaultFilterList";
import SearchBar from "./components/SearchBar/SearchBar";
import FilterButtonList from "./components/FilterBar/FilterBar";
import FoodCardList from "./components/FoodCard/FoodCardContainer";
import DayBoardItem from "./components/DayBoard/DayBoard";
import data from "./food_data/fooddata.json";
import './App.css'
import { useDispatch, useSelector } from "react-redux";
import { addCalendarItem, removeCalendarItemById, modifyCalendarItemQuantity } from "./redux/calendar";

const fooddata: FoodItem[] = data;

function App() {
  const dispatch = useDispatch()
  const calendar = useSelector<any, CalendarItem[]>(state => state)
  // const user = useSelector(state => state.user)
  // const filterList = useSelector(state => state.filterList)

  // const [calendar, setCalendar] = useState<CalendarItem[]>([]);
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
    dispatch(addCalendarItem(newCalendarItem))
    // setCalendar((prevState) => [...prevState, newCalendarItem]);
  };

  const modifyQuantityOfCalendarItem = (selectedItemIndex: number, id: string, amount: number) => {
    const updatedQuantity = calendar[selectedItemIndex].quantity + amount;
    if (updatedQuantity <= 0) dispatch(removeCalendarItemById(id))
    else dispatch(modifyCalendarItemQuantity(selectedItemIndex, updatedQuantity))
  }

  const handleItemCardClick = (id: string, amount: number) => {
    const selectedItemIndex = calendar.findIndex((item) => findCalendarItem(item, id));
    if (selectedItemIndex === -1) {
      if (amount > 0) addItemToCalendar(id, amount);
    } else modifyQuantityOfCalendarItem(selectedItemIndex, id, amount)
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
      {calendar ? calendar.map((calendarItem) => (
        <DayBoardItem
          key={calendarItem.id}
          calendarItem={calendarItem}
          fooddata={fooddata}
          handleItemCardClick={handleItemCardClick}
        />
      )) : null}
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
