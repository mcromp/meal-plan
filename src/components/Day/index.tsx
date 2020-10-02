import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Redirect, Prompt } from "react-router-dom";
import { RootState } from "../../redux";
import { CalendarItem } from "../../redux/calendar/calendarGet";
import { calendarPostFetch } from "../../redux/calendar/calendarUpdate";
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
  const [returnToWeek, setReturnToWeek] = useState<boolean>(false)
  const currentUser = useSelector<RootState, User | null>(state => state.currentUser)
  const calendar = useSelector<RootState, CalendarItem[]>(state => state.calendarGet.calendar)
  const { data: menuList, loading: menuLoading } = useSelector<RootState, MenuState>(state => state.menuList)
  const [checkoutBoardItems, setCheckoutBoardItems] = useState<CalendarMenuItem[]>([])
  const params: DayParam = useParams()

  useEffect(() => {
    const menuItemFind = calendar.find(((x) => x.date === params.day))
    if (menuItemFind) {
      setCheckoutBoardItems(menuItemFind.menuItems)
    }
  }, [])



  const handleSubmit = () => {
    if (currentUser && checkoutBoardItems) {
      dispatch(calendarPostFetch(currentUser?.id, params.day, checkoutBoardItems))
    }
    setReturnToWeek(true)
  }

  const handleClearAll = () => {
    setCheckoutBoardItems([])
  }

  const modifyQuantityOfCheckoutBoardItem = (item: CalendarMenuItem, amount: number) => {
    if (checkoutBoardItems) {
      const tempBoard: CalendarMenuItem[] = [...checkoutBoardItems]
      const index: number = tempBoard?.indexOf(item);
      const updatedQuantity = tempBoard[index].quantity + amount
      updatedQuantity > 0 ?
        tempBoard[index].quantity = updatedQuantity
        : tempBoard.splice(index, 1)
      setCheckoutBoardItems(tempBoard)
    }
  }

  const removeFromCheckoutBoard = (item: CalendarMenuItem) => {
    if (checkoutBoardItems) {
      const temp = [...checkoutBoardItems]
      const index: number = temp?.indexOf(item);
      temp.splice(index, 1)
      setCheckoutBoardItems(temp)
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
  if (returnToWeek) { return <Redirect to='/week' /> }
  if (menuLoading) { return <span>Loading...</span> }

  return (
    <div style={{ backgroundColor: "pink" }}>
      <>
        {
          checkoutBoardItems ? checkoutBoardItems.map((checkoutItem: CalendarMenuItem) => (
            <CheckoutBoardItem
              key={checkoutItem.foodId}
              item={checkoutItem}
              removeFromCheckoutBoard={removeFromCheckoutBoard}
              modifyQuantityOfCheckoutBoardItem={modifyQuantityOfCheckoutBoardItem} />
          )
          ) : null}

        <button onClick={handleSubmit}>SUBMIT</button>
        <button onClick={handleClearAll}>CLEAR ALL</button>
        <button onClick={() => setReturnToWeek(true)}>return to week, without submitting</button>

        {/* <SearchBar
          menuList={menuList}
          calendar={calendar}
          addToCalendar={addItemToCalendar} /> */}

        {/* <FilterButtonList /> */}

        <MenuBoard
          checkoutBoardItems={checkoutBoardItems}
          addCheckOutBoardItem={addCheckOutBoardItem}

        />
      </>

    </div>

  );
}

export default Day;
