import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import useIsLoading from "../../hooks/useIsLoading";
import { RootState } from "../../redux";
import { fetchHelper } from "../../redux/fetchHelper/fetchHelper";
import { ReqType } from "../../redux/fetchHelper/types";
import FailedToLoad from "../../shared/FailedToLoad";
import Loading from "../../shared/Loading";
import { User, CalendarItem, MenuItemJSON, CalendarMenuItem } from "../../shared/types";
import SubmitItem from "./SubmitItem";
import CheckoutItem from "./CheckoutItem";
import FilterBar from "./FilterBar";
import FoodItems from "./FoodItems";
import SearchBar from "./SearchBar";
import './styles/edit-menu.css';

const EditMenu: React.FC = () => {
  const currentUser = useSelector<RootState, User | null>(state => state.currentUser);
  const calendar = useSelector<RootState, CalendarItem[]>(state => state.calendar);
  const menuList = useSelector<RootState, MenuItemJSON[]>(state => state.menuList);
  const isFailedToLoad = useSelector<RootState, Boolean>(state => state.isFailedToLoad);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [checkoutItems, setCheckoutItems] = useState<CalendarMenuItem[]>([]);
  const [isModalShown, setIsAddModalShown] = useState<boolean>(false);
  const [isLoading] = useIsLoading();
  const params: { day: string } = useParams();
  const dispatch = useDispatch();


  useEffect(() => {
    const menuItemFind = calendar.find(((item) => item.date === params.day))
    if (menuItemFind) {
      setCheckoutItems(menuItemFind.menuItems)
    };
  }, [params.day, calendar]);

  const handleSubmit = () => {
    if (currentUser && checkoutItems) {
      const body = {
        userId: currentUser?.id,
        date: params.day,
        menuItems: [...checkoutItems]
      };
      dispatch(fetchHelper(ReqType.reqUpdateCalendar, body));
    };
    setIsSubmitted(true);
  };

  const modifyQuantityOfCheckoutItem = (item: CalendarMenuItem, amount: number) => {
    const tempBoard: CalendarMenuItem[] = [...checkoutItems];
    const index: number = tempBoard?.indexOf(item);
    const updatedQuantity = tempBoard[index].quantity + amount
    updatedQuantity > 0 ?
      tempBoard[index].quantity = updatedQuantity
      : tempBoard.splice(index, 1);
    setCheckoutItems(tempBoard);
  };

  const removeFromCheckout = (item: CalendarMenuItem) => {
    const updatedCheckout = [...checkoutItems];
    const index: number = updatedCheckout?.indexOf(item);
    updatedCheckout.splice(index, 1);
    setCheckoutItems(updatedCheckout);
  };

  const addCheckoutItem = (item: MenuItemJSON) => {
    if (checkoutItems?.find(i => i.foodId === item.id)) return;
    const itemToAdd: CalendarMenuItem = {
      foodId: item.id,
      quantity: 1,
    };
    const updatedItems = [...checkoutItems, itemToAdd];
    setCheckoutItems(updatedItems);

  };

  const checkoutMap = checkoutItems.length === 0 ?
    <span className="checkout__empty-text">This menu is empty! <br />Add items by clicking "+" on cards of food below.<br /> Then click "SUBMIT" to save the menu, or click "BACK" to return without saving.</span> :
    checkoutItems.map((checkoutItem: CalendarMenuItem) => (
      <CheckoutItem
        key={checkoutItem.foodId + "checkout"}
        item={checkoutItem}
        removeFromCheckout={removeFromCheckout}
        modifyQuantityOfCheckoutItem={modifyQuantityOfCheckoutItem} />
    ));

  if (!currentUser) { return <Redirect to='/' /> };
  if (isSubmitted) { return <Redirect to='/w' /> };
  if (isFailedToLoad) { return <FailedToLoad /> };
  return (
    <div className="day">
      {isModalShown ? <SubmitItem setIsAddModalShown={setIsAddModalShown} /> : null}

      <div className="checkout-back">
        <button className="checkout-back__back" onClick={() => setIsSubmitted(true)}>⬅ BACK</button>
        <div className="checkout">
          <span className="checkout__heading">Menu for {params.day}</span>
          {isLoading ? <Loading /> :
            <div className="checkout__board">
              {checkoutMap}
            </div>}
          <div className="checkout__button-bar">
            <button className="button" onClick={() => setCheckoutItems([])}>CLEAR ALL</button>
            <button className="button--checkout-submit" onClick={handleSubmit}>SUBMIT</button>
          </div>
        </div>
      </div>
      <div className="search-filter-grid">
        <SearchBar
          menuList={menuList}
          checkoutBoardItems={checkoutItems}
          addCheckOutBoardItem={addCheckoutItem} />

        <FilterBar />
      </div>

      <FoodItems
        checkoutItems={checkoutItems}
        addCheckoutItem={addCheckoutItem}
        setIsAddModalShown={setIsAddModalShown} />

    </div >
  );
};

export default EditMenu;
