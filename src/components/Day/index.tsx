import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCalendarItem, removeCalendarItemById, modifyCalendarItemQuantity } from "../../redux/calendar/calendar";
import { CalendarItem } from "../../types";
import CheckoutBoardItem from "../CheckoutBoard/CheckoutBoard";
import SearchBar from "../SearchBar/SearchBar";
import FilterButtonList from "../FilterBar/FilterBar";
import MenuBoard from "../Menu/MenuBoard";
import { fetchMenuList, MenuState } from "../../redux/menuList";
import { RootState } from "../../redux";
import { Redirect, useParams } from 'react-router-dom'
import { User } from "../../redux/users/users";
import './Day.css'
import { calendarPostFetch, CalendarPostState } from "../../redux/calendar/calendarPost";
import { calendarGet, CalendarState } from "../../redux/calendar/calendarGet";


// REFACTOR THISSSSSSS
type DayParam = {
  day: string
}

const Day: React.FC<any> = ({ calendar: any }) => {
  const dispatch = useDispatch()
  const [calendarDay, setCalendarDay] = useState<CalendarItem[]>()
  const [calendarDaySubmitted, setCalendarDaySubmitted] = useState<boolean>(false)
  const currentUser = useSelector<RootState, User | null>(state => state.currentUser)
  const [calendarX, setCalendarX] = useState<CalendarItem[]>()
  // const calendar = useSelector<RootState, CalendarItem[]>(state => state.calendar)
  const calendar: any = [];
  const { data: menuList, loading: menuLoading, error: menuErr } = useSelector<RootState, MenuState>(state => state.menuList)
  const { loading: postLoading, error: postErr } = useSelector<RootState, CalendarPostState>(state => state.calendarPost)

  const params: DayParam = useParams()

  useEffect(() => {
    dispatch(calendarGet())
  }, [])


  useEffect(() => {
    dispatch(fetchMenuList())
    dispatch(calendarGet())
  }, [dispatch])

  //just for testing
  useEffect(() => {
    console.log(calendar)
  }, [])

  useEffect(() => {
    const calendarFiltered = calendar.filter((item: any) => item.user === currentUser?.id && item.day === params.day)
    setCalendarDay(calendarFiltered)
  }, [calendar])


  const addItemToCalendar = (id: string, amount: number) => {
    let user: string = "";
    if (currentUser) user = currentUser.id
    const newCalendarItem: CalendarItem = { id, quantity: amount, day: params.day, user };
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
    dispatch(calendarPostFetch(calendar))
    setCalendarDaySubmitted(true)
  }

  if (!currentUser) { return <Redirect to='/' /> }
  if (calendarDaySubmitted) { setCalendarDaySubmitted(false); return <Redirect to='/week' /> }
  if (menuLoading || postLoading) { return <span>Loading...</span> }
  if (menuErr || postErr) { return <span>Error: {menuErr || postErr}</span> }

  return (
    <div style={{ backgroundColor: "pink" }}>
      <>
        {
          calendarDay ? calendarDay.map((calendarItem: CalendarItem) => (
            <CheckoutBoardItem
              key={calendarItem.id}
              calendarItem={calendarItem}
              handleItemCardClick={handleItemCardClick} />
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
