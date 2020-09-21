import { MenuItem } from "../../types";
import React from 'react'
import { CheckoutBoardItemProps } from "./types";
import { useDispatch, useSelector } from "react-redux";
import { removeCalendarItemById } from "../../redux/calendar";
import { RootState } from "../../redux";

const CheckoutBoardItem: React.FC<CheckoutBoardItemProps> = ({
  calendarItem,
  handleItemCardClick,
}) => {
  const dispatch = useDispatch()
  const menuList = useSelector<RootState, MenuItem[]>(state => state.menuList.data)


  const MenuItem = menuList.find((i: MenuItem) => i.ID === calendarItem.id);


  return MenuItem ? (
    <>
      <span>{MenuItem.ITEM}</span>
      <span>{calendarItem.quantity}</span>
      <button onClick={() => dispatch(removeCalendarItemById(calendarItem.id))}>Remove Item</button>
      <button onClick={() => handleItemCardClick(calendarItem.id, 1)}>+1</button>
      <button onClick={() => handleItemCardClick(calendarItem.id, -1)}>-1</button>
    </>
  ) : null;
};

export default CheckoutBoardItem