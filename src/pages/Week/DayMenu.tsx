import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import useIsLoading from "../../hooks/useIsLoading";
import { RootState } from "../../redux";
import Loading from "../../shared/Loading";
import { WeekDay, CalendarItem, MenuItemJSON } from "../../shared/types";
import './styles/week.css';


const DayMenu: React.FC<DayMenuProps> = ({ day, calendarDisplay }) => {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const menuList = useSelector<RootState, MenuItemJSON[]>(state => state.menuList);
  const [isLoading] = useIsLoading();

  if (isClicked) { return <Redirect to={`/d/${day.dateId}`} /> };
  return (
    <div className="day-menu" onClick={() => setIsClicked(true)}>
      <div className="day-menu__heading">
        <span className="day-menu__heading--day">{day.day}</span>
        <span className="day-menu__heading--date">{day.dateId}</span>
      </div>
      {isLoading ? <Loading /> :
        <>
          {calendarDisplay?.menuItems.map(item => {
            const menuItem = menuList.find(f => f.id === item.foodId)
            return (
              <div className="day-menu__menu-item" key={item.foodId}>
                <span className="menu-item__name">{menuItem?.item}</span>
                <span className="menu-item__amount">{item.quantity}</span>
              </div>
            )
          })}
        </>}
    </div>
  );
};

type DayMenuProps = {
  day: WeekDay;
  calendarDisplay: CalendarItem | null | undefined;
};

export default DayMenu;