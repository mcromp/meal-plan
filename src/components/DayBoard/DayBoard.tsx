import { CalendarItem, FoodItem } from "../../types";
import React from 'react'
import { DayItemProps } from "./types";

const DayItem: React.FC<DayItemProps> = ({
    calendarItem,
    removeItem,
    fooddata,
    addCalendar,
}) => {
    const foodItem = fooddata.find((i: FoodItem) => i.ID === calendarItem.id);
    return foodItem ? (
        <div key={foodItem.ID}>
            <h1>{foodItem.ITEM}</h1>
            <h3>{calendarItem.quantity}</h3>
            <button onClick={() => removeItem(calendarItem.id)}>Remove Item</button>
            <button onClick={() => addCalendar(calendarItem.id, 1)}>+1</button>
            <button onClick={() => addCalendar(calendarItem.id, -1)}>-1</button>
        </div>
    ) : null;
};

export default DayItem