import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect, useParams } from "react-router-dom"
import { RootState } from "../../redux"
import { fetchHelper } from "../../redux/fetchHelper/fetchHelper"
import { ReqType } from "../../redux/fetchHelper/types"
// import Loading from "../../shared/Loading"
import { User, CalendarItem, MenuItemJSON, CalendarMenuItem } from "../../shared/types"
import CheckoutBoardItem from "./CheckoutBoard"
import FilterButtonList from "./FilterBar"
import MenuBoard from "./MenuBoard"
import SearchBar from "./SearchBar"
import './styles/day.css'

const Day: React.FC = () => {
  const currentUser = useSelector<RootState, User | null>(state => state.currentUser);
  const calendar = useSelector<RootState, CalendarItem[]>(state => state.calendar);
  const menuList = useSelector<RootState, MenuItemJSON[]>(state => state.menuList);
  // const isLoading = useSelector<RootState, boolean>(state => state.isLoading);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [checkoutBoardItems, setCheckoutBoardItems] = useState<CalendarMenuItem[]>([]);
  const params: { day: string } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const menuItemFind = calendar.find(((item) => item.date === params.day))
    if (menuItemFind) {
      setCheckoutBoardItems(menuItemFind.menuItems)
    }
  }, [params.day, calendar])

  const handleSubmit = () => {
    if (currentUser && checkoutBoardItems) {
      const body = {
        userId: currentUser?.id,
        date: params.day,
        menuItems: [...checkoutBoardItems]
      }
      dispatch(fetchHelper(ReqType.reqUpdateCalendar, body))
    }
    setIsSubmitted(true)
  }

  const modifyQuantityOfCheckoutBoardItem = (item: CalendarMenuItem, amount: number) => {
    const tempBoard: CalendarMenuItem[] = [...checkoutBoardItems]
    const index: number = tempBoard?.indexOf(item);
    const updatedQuantity = tempBoard[index].quantity + amount
    updatedQuantity > 0 ?
      tempBoard[index].quantity = updatedQuantity
      : tempBoard.splice(index, 1)
    setCheckoutBoardItems(tempBoard)
  };

  const removeFromCheckoutBoard = (item: CalendarMenuItem) => {
    const temp = [...checkoutBoardItems]
    const index: number = temp?.indexOf(item);
    temp.splice(index, 1)
    setCheckoutBoardItems(temp)
  };

  const addCheckOutBoardItem = (item: MenuItemJSON) => {
    if (checkoutBoardItems?.find(i => i.foodId === item.ID)) return;
    const itemToAdd: CalendarMenuItem = {
      foodId: item.ID,
      quantity: 1,
    }
    const updatedItems = [...checkoutBoardItems, itemToAdd]
    setCheckoutBoardItems(updatedItems)

  };

  const checkoutBoardMap =
    checkoutBoardItems.map((checkoutItem: CalendarMenuItem) => (
      <CheckoutBoardItem
        key={checkoutItem.foodId + "checkout"}
        item={checkoutItem}
        removeFromCheckoutBoard={removeFromCheckoutBoard}
        modifyQuantityOfCheckoutBoardItem={modifyQuantityOfCheckoutBoardItem} />
    ));

  if (!currentUser) { return <Redirect to='/' /> }
  if (isSubmitted) { return <Redirect to='/w' /> }


  return (
    <div className="day">
      <div className="checkout">
        <button className="day__back" onClick={() => setIsSubmitted(true)}>⬅ BACK</button>
        <div className="day__checkout">
          <span className="checkout__heading">Menu for {params.day}</span>
          <div className="checkout__board">
            {checkoutBoardMap}
          </div>
          <div className="checkout__button-bar">
            <button className="button" onClick={() => setCheckoutBoardItems([])}>CLEAR ALL</button>
            <button className="button--checkout-submit" onClick={handleSubmit}>SUBMIT</button>
          </div>
        </div>
      </div>
      <div className="day__search-filter">
        <SearchBar
          menuList={menuList}
          checkoutBoardItems={checkoutBoardItems}
          addCheckOutBoardItem={addCheckOutBoardItem} />

        <FilterButtonList />
      </div>

      <MenuBoard
        checkoutBoardItems={checkoutBoardItems}
        addCheckOutBoardItem={addCheckOutBoardItem} />


    </div >
  );
}

export default Day;
