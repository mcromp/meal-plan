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
import MenuBoard from "../Menu/MenuBoard";


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
      updatedQuantity > 0 ?
        tempBoard[index].quantity = updatedQuantity
        : tempBoard.splice(index, 1)
      setCheckoutBoardItems(tempBoard)
    }
  }

  const addCheckOutBoardItem = (item: MenuItem) => {
    if (checkoutBoardItems?.find(i => i.foodId === item.ID)) return;
    const itemToAdd: CalendarMenuItem = {
      foodId: item.ID,
      quantity: 1,
    }
    if (checkoutBoardItems) {
      const newArr = [...checkoutBoardItems]
      newArr.push(itemToAdd)
      setCheckoutBoardItems(newArr)
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
            <CheckoutBoardItem
              key={checkoutItem.foodId}
              item={checkoutItem}
              // setCheckoutBoardItems={setCheckoutBoardItems}
              modifyQuantityOfCheckoutBoardItem={modifyQuantityOfCheckoutBoardItem} />
          )
          ) : null}

        <button onClick={handleSubmit}>SUBMIT</button>

        {/* <SearchBar
          menuList={menuList}
          calendar={calendar}
          addToCalendar={addItemToCalendar} /> */}

        {/* <FilterButtonList /> */}

        <MenuBoard
          addCheckOutBoardItem={addCheckOutBoardItem}
        />
      </>

    </div>

  );
}

export default Day;
