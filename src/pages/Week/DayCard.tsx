import React from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { RootState } from "../../redux"
import { WeekDay, CalendarItem, MenuItemJSON } from "../../shared/types"
import './styles/week.css'


const DayCard: React.FC<DayCardProps> = ({ day, calendarDisplay }) => {
  const menuList = useSelector<RootState, MenuItemJSON[]>(state => state.menuList)
  return (
    <div className="day-card">
      <div className="header">
        <h3>{day.day}</h3>
        <h4>{day.dateId}</h4>
        <Link to={`/d/${day.dateId}`}><button>✎</button></Link>
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