import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Redirect } from "react-router-dom";
import { RootState } from "../../redux";
import { CalendarItem } from "../../redux/calendar/calendarGet";
import { calendarPostFetch } from "../../redux/calendar/calendarPost";
import { MenuItem, MenuState } from "../../redux/menuList/menuList";
import { User } from "../../redux/users/users";
import CheckoutBoardItem from "../CheckoutBoard/CheckoutBoard";
import FilterButtonList from "../FilterBar/FilterBar";


// REFACTOR THISSSSSSS1212
type DayParam = {
  day: string
}

export type CalendarMenuItem = {
  foodId: string,
  quantity: number,
  _id?: string
}


const Day: React.FC = () => {
  const dispatch = useDispatch()
  const [calendarDaySubmitted, setCalendarDaySubmitted] = useState<boolean>(false)
  const currentUser = useSelector<RootState, User | null>(state => state.currentUser)
  const calendar = useSelector<RootState, CalendarItem[]>(state => state.calendarGet.calendar)
  const { data: menuList, loading: menuLoading } = useSelector<RootState, MenuState>(state => state.menuList)
  const [checkoutBoardItems, setCheckoutBoardItems] = useState<CalendarMenuItem[]>()
  const params: DayParam = useParams()

  useEffect(() => {
    // console.log(calendar)
    // console.log(params.day)
    let ppp = calendar.find(((x) => x.date === params.day))
    if (ppp) {
      setCheckoutBoardItems(ppp.menuItems)
    }
  }, [])


  useEffect(() => {
    console.log(checkoutBoardItems)
  }, [checkoutBoardItems])

  const handleSubmit = () => {
    dispatch(calendarPostFetch(calendar))
    setCalendarDaySubmitted(true)
  }


  const modifyQuantityOfCheckoutBoardItem = (item: CalendarMenuItem, amount: number) => {
    if (checkoutBoardItems) {
      let tempBoard: CalendarMenuItem[] = [...checkoutBoardItems]
      const index: number = tempBoard?.indexOf(item);
      const updatedQuantity = tempBoard[index].quantity + amount
      if (updatedQuantity >= 0) {
        tempBoard[index].quantity = updatedQuantity
        setCheckoutBoardItems(tempBoard)
      }
    }
  }



  if (!currentUser) { return <Redirect to='/' /> }
  if (calendarDaySubmitted) { setCalendarDaySubmitted(false); return <Redirect to='/week' /> }
  if (menuLoading) { return <span>Loading...</span> }
  // if (menuErr || postErr) { return <span>Error: {menuErr || postErr}</span> }

  return (
    <div style={{ backgroundColor: "pink" }}>
      <>
        {
          checkoutBoardItems ? checkoutBoardItems.map((checkoutItem: CalendarMenuItem) => (
            checkoutItem.quantity > 0 ?
              <CheckoutBoardItem
                key={checkoutItem._id}
                item={checkoutItem}
                // setCheckoutBoardItems={setCheckoutBoardItems}
                modifyQuantityOfCheckoutBoardItem={modifyQuantityOfCheckoutBoardItem} />
              : null
          )
          ) : null}

        <button onClick={handleSubmit}>SUBMIT</button>

        {/* <SearchBar
          menuList={menuList}
          calendar={calendar}
          addToCalendar={addItemToCalendar} /> */}

        <FilterButtonList />

        {/* <MenuBoard
          handleClick={handleItemCardClick}
          calendar={calendar} /> */}
      </>

    </div>

  );
}

export default Day;
