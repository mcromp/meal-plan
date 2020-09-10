import React, { useEffect } from "react";
import data from "../../food_data/fooddata.json";
import { useDispatch, useSelector } from "react-redux";
import { addCalendarItem, removeCalendarItemById, modifyCalendarItemQuantity } from "../../redux/calendar";
import { FoodItem, CalendarItem } from "../../types";
import DayBoardItem from "../DayBoard/DayBoard";
import SearchBar from "../SearchBar/SearchBar";
import FilterButtonList from "../FilterBar/FilterBar";
import FoodCardList from "../FoodCard/FoodCardContainer";
import './App.css'
import { fetchData } from "../../redux/fooddata";
import { RootState } from "../../redux";

const fooddata: FoodItem[] = data;

function App() {
  const dispatch = useDispatch()
  const calendar = useSelector<RootState, CalendarItem[]>(state => state.calendar)
  const dummyData = useSelector<RootState, any>(state => state.data)

  useEffect(() => {
    dispatch(fetchData())
    console.log('heyya')
  }, [dispatch])

  useEffect(() => {
    console.log(dummyData)
  }, [dummyData])

  const addItemToCalendar = (id: string, amount: number) => {
    const newCalendarItem: CalendarItem = { id, quantity: amount };
    dispatch(addCalendarItem(newCalendarItem))
  };

  const handleItemCardClick = (id: string, amount: number) => {
    const selectedItemIndex = calendar.findIndex((item: any) => item.id === id);
    if (selectedItemIndex === -1) {
      if (amount > 0) addItemToCalendar(id, amount);
    } else modifyQuantityOfCalendarItem(selectedItemIndex, id, amount)
  };

  const modifyQuantityOfCalendarItem = (selectedItemIndex: number, id: string, amount: number) => {
    const updatedQuantity = calendar[selectedItemIndex].quantity + amount;
    if (updatedQuantity <= 0) dispatch(removeCalendarItemById(id))
    else dispatch(modifyCalendarItemQuantity(selectedItemIndex, updatedQuantity))
  }

  return (
    <div style={{ backgroundColor: "pink" }}>
      {calendar ? calendar.map((calendarItem: any) => (
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
      <FilterButtonList />
      <FoodCardList
        fooddata={fooddata}
        handleClick={handleItemCardClick}
        calendar={calendar}
      />
    </div>
  );
}

export default App;
