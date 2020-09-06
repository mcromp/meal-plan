import React from 'react'
import { FoodCardProps } from './types';

const FoodCard: React.FC<FoodCardProps> = ({
    item,
    addCalendar,
    disableCheck,
    user,
    addFav,
}) => {
    return (
        <div style={{ backgroundColor: "mediumpurple" }}>
            <hr />
            <br />
            <span>{item.ITEM}</span>
            <button onClick={() => addCalendar(item.ID, 1)}>plus 1</button>
            <button
                onClick={() => addCalendar(item.ID, -1)}
                disabled={disableCheck(item.ID)}
            >
                minus 1
      </button>
            <br />
            <button onClick={() => addFav(item.ID)}>
                {user.favList.includes(item.ID) ? "💟" : "♡"}
            </button>
        </div >
    );
};

export default FoodCard