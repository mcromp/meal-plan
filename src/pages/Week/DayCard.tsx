import React, { useState } from "react"
import { useSelector } from "react-redux"
import { Redirect } from "react-router-dom"
import { RootState } from "../../redux"
import { WeekDay, CalendarItem, MenuItemJSON } from "../../shared/types"
import './styles/week.css'


const DayCard: React.FC<DayCardProps> = ({ day, calendarDisplay }) => {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const menuList = useSelector<RootState, MenuItemJSON[]>(state => state.menuList)

  if (isClicked) { return <Redirect to={`/d/${day.dateId}`} /> }
  return (
    <div className="week__day-card" onClick={() => setIsClicked(true)}>
      <div className="day-card__heading">
        <span className="heading__day">{day.day}</span>
        <span className="heading__date">{day.dateId}</span>
      </div>
      {calendarDisplay?.menuItems.map(item => {
        const menuItem = menuList.find(f => f.ID === item.foodId)
        return (
          <div className="day-card__menu-item">
            <span className="menu-item__name">{menuItem?.ITEM}</span>
            <span className="menu-item__amount">{item.quantity}</span>
          </div>
        )
      })}
    </div>
  )
}

type DayCardProps = {
  day: WeekDay;
  calendarDisplay: CalendarItem | null | undefined;
}

export default DayCard