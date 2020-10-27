import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect, useParams } from "react-router-dom"
import { RootState } from "../../redux"
import { fetchHelper } from "../../redux/fetchHelper/fetchHelper"
import { ReqType } from "../../redux/fetchHelper/types"
import { User, CalendarItem, MenuItemJSON, CalendarMenuItem } from "../../shared/types"
import CheckoutItem from "./Checkout"
import FilterBar from "./FilterBar"
import FoodItems from "./FoodItems"
import SearchBar from "./SearchBar"
import './styles/edit-menu.css'

const EditMenu: React.FC = () => {
  const currentUser = useSelector<RootState, User | null>(state => state.currentUser);
  const calendar = useSelector<RootState, CalendarItem[]>(state => state.calendar);
  const menuList = useSelector<RootState, MenuItemJSON[]>(state => state.menuList);
  // const isLoading = useSelector<RootState, boolean>(state => state.isLoading);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [checkoutItems, setCheckoutBoardItems] = useState<CalendarMenuItem[]>([]);
  const params: { day: string } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const menuItemFind = calendar.find(((item) => item.date === params.day))
    if (menuItemFind) {
      setCheckoutBoardItems(menuItemFind.menuItems)
    }
  }, [params.day, calendar])

  const handleSubmit = () => {
    if (currentUser && checkoutItems) {
      const body = {
        userId: currentUser?.id,
        date: params.day,
        menuItems: [...checkoutItems]
      }
      dispatch(fetchHelper(ReqType.reqUpdateCalendar, body))
    }
    setIsSubmitted(true)
  }

  const modifyQuantityOfCheckoutItem = (item: CalendarMenuItem, amount: number) => {
    const tempBoard: CalendarMenuItem[] = [...checkoutItems]
    const index: number = tempBoard?.indexOf(item);
    const updatedQuantity = tempBoard[index].quantity + amount
    updatedQuantity > 0 ?
      tempBoard[index].quantity = updatedQuantity
      : tempBoard.splice(index, 1)
    setCheckoutBoardItems(tempBoard)
  };

  const removeFromCheckout = (item: CalendarMenuItem) => {
    const temp = [...checkoutItems]
    const index: number = temp?.indexOf(item);
    temp.splice(index, 1)
    setCheckoutBoardItems(temp)
  };

  const addCheckoutItem = (item: MenuItemJSON) => {
    if (checkoutItems?.find(i => i.foodId === item.ID)) return;
    const itemToAdd: CalendarMenuItem = {
      foodId: item.ID,
      quantity: 1,
    }
    const updatedItems = [...checkoutItems, itemToAdd]
    setCheckoutBoardItems(updatedItems)

  };

  const checkoutMap = checkoutItems.length === 0 ?
    <span className="board__empty-text">Menu is empty! Add items by clicking "+".<br /> Then click "SUBMIT" to save the menu, or click "BACK" to return without saving</span> :
    checkoutItems.map((checkoutItem: CalendarMenuItem) => (
      <CheckoutItem
        key={checkoutItem.foodId + "checkout"}
        item={checkoutItem}
        removeFromCheckout={removeFromCheckout}
        modifyQuantityOfCheckoutItem={modifyQuantityOfCheckoutItem} />
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
            {checkoutMap}
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
          checkoutBoardItems={checkoutItems}
          addCheckOutBoardItem={addCheckoutItem} />

        <FilterBar />
      </div>

      <FoodItems
        checkoutItems={checkoutItems}
        addCheckoutItem={addCheckoutItem} />


    </div >
  );
}

export default EditMenu;
