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
    <div className="day-card" onClick={() => setIsClicked(true)}>
      <div className="header">
        <h3>{day.day}</h3>
        <h4>{day.dateId}</h4>
        <button>✎</button>
      </div>
      <div>
        {calendarDisplay?.menuItems.map(item => {
          const menuItem = menuList.find(f => f.ID === item.foodId)
          return (
            <div key={item.foodId}>
              <span>{menuItem?.ITEM}, {item.quantity}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

type DayCardProps = {
  day: WeekDay;
  calendarDisplay: CalendarItem | null | undefined;
}

export default DayCard