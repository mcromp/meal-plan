import React from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { RootState } from "../../redux"
import { WeekDay, CalendarItem, MenuItemJSON } from "../../shared/types"



const DayCard: React.FC<DayCardProps> = ({ day, calendarDisplay }) => {
  const menuList = useSelector<RootState, MenuItemJSON[]>(state => state.menuList)
  return (
    <>
      <span>{day.dateId}</span>
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
      <Link to={`/d/${day.dateId}`}><button>Edit</button></Link>

    </>
  )
}

type DayCardProps = {
  day: WeekDay;
  calendarDisplay: CalendarItem | null | undefined;
}

export default DayCard