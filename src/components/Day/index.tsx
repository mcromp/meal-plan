import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCalendarItem, removeCalendarItemById, modifyCalendarItemQuantity } from "../../redux/calendar";
import { MenuItem, CalendarItem } from "../../types";
import CheckoutBoardItem from "../CheckoutBoard/CheckoutBoard";
import SearchBar from "../SearchBar/SearchBar";
import FilterButtonList from "../FilterBar/FilterBar";
import MenuBoard from "../Menu/MenuBoard";
import { fetchMenuList, MenuState } from "../../redux/fooddata";
import { RootState } from "../../redux";
import { Redirect, useParams } from 'react-router-dom'
import { User } from "../../redux/users/users";
import './Day.css'

const Day = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector<RootState, User | null>(state => state.currentUser)
  const calendar = useSelector<RootState, CalendarItem[]>(state => state.calendar)
  const [calendarDay, setCalendarDay] = useState<CalendarItem[]>()
  const { data: menuList, loading, error } = useSelector<RootState, MenuState>(state => state.menuList)
  const day: string = useParams()

  useEffect(() => {
    dispatch(fetchMenuList())
  }, [dispatch])

  useEffect(() => {
    const calendarFiltered = calendar.filter(item => item.user === currentUser?.id && item.day === day)
    setCalendarDay(calendarFiltered)
  }, [])


  const addItemToCalendar = (id: string, amount: number) => {
    const newCalendarItem: CalendarItem = { id, quantity: amount, day };
    dispatch(addCalendarItem(newCalendarItem))
  };

  const handleItemCardClick = (id: string, amount: number) => {
    const selectedItemIndex = calendar.findIndex((item: CalendarItem) => item.id === id);
    if (selectedItemIndex === -1) {
      if (amount > 0) addItemToCalendar(id, amount);
    } else modifyQuantityOfCalendarItem(selectedItemIndex, id, amount)
  };

  const modifyQuantityOfCalendarItem = (selectedItemIndex: number, id: string, amount: number) => {
    const updatedQuantity = calendar[selectedItemIndex].quantity + amount;
    if (updatedQuantity <= 0) dispatch(removeCalendarItemById(id))
    else dispatch(modifyCalendarItemQuantity(selectedItemIndex, updatedQuantity))
  }

  const handleSubmit = () => {

  }

  if (!currentUser) { return <Redirect to='/' /> }
  if (loading) { return <span>Loading...</span> }

  return (
    <div style={{ backgroundColor: "pink" }}>
      <>
        {
          calendarDay ? calendarDay.map((calendarItem: CalendarItem) => (
            <CheckoutBoardItem
              key={calendarItem.id}
              calendarItem={calendarItem}
              handleItemCardClick={handleItemCardClick}
            />
          )) : null}

        <button onClick={handleSubmit}>SUBMIT</button>

        <SearchBar
          menuList={menuList}
          calendar={calendar}
          addToCalendar={addItemToCalendar} />

        <FilterButtonList />

        <MenuBoard
          handleClick={handleItemCardClick}
          calendar={calendar} />
      </>

    </div>

  );
}

export default Day;
