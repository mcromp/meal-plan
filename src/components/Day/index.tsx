import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCalendarItem, removeCalendarItemById, modifyCalendarItemQuantity } from "../../redux/calendar";
import { MenuItem, CalendarItem } from "../../types";
import CheckoutBoardItem from "../CheckoutBoard/CheckoutBoard";
import SearchBar from "../SearchBar/SearchBar";
import FilterButtonList from "../FilterBar/FilterBar";
import MenuBoard from "../Menu/MenuBoard";
import './Day.css'
import { fetchMenuList } from "../../redux/fooddata";
import { RootState } from "../../redux";


const Day = () => {
  const dispatch = useDispatch()
  const calendar = useSelector<RootState, CalendarItem[]>(state => state.calendar)
  // const dummyData = useSelector<RootState, any>(state => state.data)
  // const [dayTime, setDayTime] = useState<any>([])

  useEffect(() => {
    dispatch(fetchMenuList())
  }, [dispatch])


  const addItemToCalendar = (id: string, amount: number) => {
    const day = "2020-05-13"
    const newCalendarItem: CalendarItem = { id, quantity: amount, day };
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
        <CheckoutBoardItem
          key={calendarItem.id}
          calendarItem={calendarItem}
          handleItemCardClick={handleItemCardClick}
        />
      )) : null}
      <button>SUBMIT</button>

      <SearchBar
        calendar={calendar}
        addToCalendar={addItemToCalendar} />

      <FilterButtonList />

      <MenuBoard
        handleClick={handleItemCardClick}
        calendar={calendar} />

    </div>
  );
}

export default Day;
