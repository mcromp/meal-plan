import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux';
import { CalendarMenuItem, MenuItemJSON } from '../../shared/types';


const CheckoutBoardItem: React.FC<CheckoutBoardItemProps> = ({
  item, modifyQuantityOfCheckoutBoardItem, removeFromCheckoutBoard
}) => {
  const menuList = useSelector<RootState, MenuItemJSON[]>(state => state.menuList)
  const [name, setName] = useState<string>("")

  useEffect(() => {
    const findName = menuList.find(i => i.ID === item.foodId)
    if (findName) setName(findName?.ITEM)
  }, [menuList, item.foodId])


  return (
    <div className="checkout-board">
      <span className="checkout-board__name">{name}</span>
      <span className="quantity">{item.quantity}</span>
      <div className="checkout-board__buttons">
        <button className="button--checkout-item" onClick={() => modifyQuantityOfCheckoutBoardItem(item, 1)}>+</button>
        <button className="button--checkout-item" onClick={() => modifyQuantityOfCheckoutBoardItem(item, -1)}>-</button>
        <button className="button--checkout-item" onClick={() => removeFromCheckoutBoard(item)}>remove</button>
      </div>
    </div>
  )
};

type CheckoutBoardItemProps = {
  item: CalendarMenuItem;
  modifyQuantityOfCheckoutBoardItem: (item: CalendarMenuItem, amount: number) => void;
  removeFromCheckoutBoard: (item: CalendarMenuItem) => void
}

export default CheckoutBoardItem