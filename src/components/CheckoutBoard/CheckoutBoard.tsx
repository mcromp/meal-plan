
import React from 'react'
import { useDispatch, useSelector } from "react-redux";
// import { removeCalendarItemById } from "../../redux/calendar/calendar";
import { RootState } from "../../redux";
import { MenuItem } from '../../redux/menuList/menuList';

import { CalendarItem } from "../../redux/calendar/calendarGet";

export interface CheckoutBoardItemProps {
  calendarItem: CalendarItem;
  handleItemCardClick: (id: string, number: number) => void;
}


const CheckoutBoardItem: React.FC<CheckoutBoardItemProps> = ({
  calendarItem,
  handleItemCardClick,
}) => {
  const dispatch = useDispatch()
  const menuList = useSelector<RootState, MenuItem[]>(state => state.menuList.data)
  const MenuItem = null
  // menuList.find((i: MenuItem) => i.ID === calendarItem.id);

  return MenuItem ? (
    <div></div>
    // <>
    //   <span>{MenuItem.ITEM}</span>
    //   <span>{calendarItem.quantity}</span>
    //   <button onClick={() => dispatch(removeCalendarItemById(calendarItem.id))}>Remove Item</button>
    //   <button onClick={() => handleItemCardClick(calendarItem.id, 1)}>+1</button>
    //   <button onClick={() => handleItemCardClick(calendarItem.id, -1)}>-1</button>
    // </>
  ) : null;
};

export default CheckoutBoardItem