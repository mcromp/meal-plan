import { FoodItem } from "../../types";
import React from 'react'
import { DayBoardItemProps } from "./types";
import { useDispatch } from "react-redux";
import { removeCalendarItemById } from "../../redux/calendar";

const DayBoardItem: React.FC<DayBoardItemProps> = ({
    calendarItem,
    fooddata,
    handleItemCardClick,
}) => {
    const dispatch = useDispatch()
    const foodItem = fooddata.find((i: FoodItem) => i.ID === calendarItem.id);
    return foodItem ? (
        <>
            <span>{foodItem.ITEM}</span>
            <span>{calendarItem.quantity}</span>
            <button onClick={() => dispatch(removeCalendarItemById(calendarItem.id))}>Remove Item</button>
            <button onClick={() => handleItemCardClick(calendarItem.id, 1)}>+1</button>
            <button onClick={() => handleItemCardClick(calendarItem.id, -1)}>-1</button>
        </>
    ) : null;
};

export default DayBoardItem