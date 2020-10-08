import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { RootState } from '../../redux';
import { CalendarItem } from '../../redux/calendar/calendar';
import { fetchDispatch, reqGetCalendar, reqGetMenu } from '../../redux/fetchDispatch/fetchDispatch';
import { resetFilter } from '../../redux/filterList/filterList';
import { MenuItem } from '../../redux/menuList/menuList';
import { User } from '../../redux/users/users';
import './Week.css'

enum Weekdays {
  "Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat",
}
enum MonthNames {
  "Jan", "Feb", "Mar", "Apr", "May", "June",
  "July", "Aug", "Sept", "Oct", "Nov", "Dec"
}

type WeekDay = {
  month: string;
  day: string;
  date: string;
  year: string;
  dateId: string;

}

type DayCardProps = {
  day: WeekDay;
  calendarDisplay: CalendarItem | null | undefined;
  handleDateCardClick: (dateId: string) => void;
}

const generateWeekDays = () => {
  const today: Date = new Date();
  const emptyWeek: number[] = new Array(7).fill(null)
  return emptyWeek.reduce((acc: WeekDay[], _, dayIndex) => {
    const theday = new Date(today);
    theday.setDate(today.getDate() + dayIndex)
    const month = theday.getMonth();
    const day = theday.getDay();
    const date = String(theday.getDate())
    const year = String(theday.getFullYear())
    const dateId: string = `${date}-${month}-${year}`
    acc.push({
      month: MonthNames[month],
      day: Weekdays[day],
      date,
      year,
      dateId
    })
    return acc
  }, [])
}

const DayCard: React.FC<DayCardProps> = ({ day, calendarDisplay, handleDateCardClick }) => {
  const menuList = useSelector<RootState, MenuItem[]>(state => state.menuList)
  return (
    <>
      <span>{day.dateId}</span>
      {calendarDisplay ? <div>
        {calendarDisplay.menuItems.map(item => {
          const menuItem = menuList.find(f => f.ID === item.foodId)
          return (
            <div key={item.foodId}>
              <span>{menuItem?.ITEM}, {item.quantity}</span>
            </div>
          )
        })}
      </div> : null}
      <button onClick={() => handleDateCardClick(day.dateId)}>Click to edit</button>

    </>
  )
}

const Week: React.FC<any> = React.forwardRef((props, ref: any) => {
  const currentUser = useSelector<RootState, User | null>(state => state.currentUser)
  const [daySelected, setDaySelected] = useState<string | null>(null)
  const [week, setWeek] = useState<WeekDay[] | null>(null)
  const calendar = useSelector<RootState, CalendarItem[]>(state => state.calendar)
  const isLoading = useSelector<RootState, boolean>(state => state.isLoading)
  const isLoggedIn = useSelector<RootState, boolean>(state => state.isLoggedIn)

  const dispatch = useDispatch();



  useEffect(() => {
    const generatedWeek = generateWeekDays()
    setWeek([...generatedWeek])
    const dateList = generatedWeek.map(day => day.dateId).sort()
    if (currentUser) dispatch(fetchDispatch(reqGetCalendar, { dateList }, currentUser.id))
  }, [currentUser, dispatch])

  useEffect(() => {
    dispatch(resetFilter())
  }, [dispatch])

  useEffect(() => {
    dispatch(fetchDispatch(reqGetMenu))
  }, [dispatch])

  const handleDateCardClick = (dateId: any) => {
    setDaySelected(dateId)
  }

  if (!isLoggedIn && !currentUser) { return <Redirect to='/' /> }
  if (daySelected) { return <Redirect to={`/d/${daySelected}`} /> }

  return (
    <>
      {isLoading ? <span>loading</span>
        :
        <>
          <div className="parent" ref={ref}>
            {week ?
              week.map(day => {
                const calendarDisplay = calendar.find(item => item.date === day.dateId);
                return <DayCard
                  key={day.dateId}
                  day={day}
                  calendarDisplay={calendarDisplay}
                  handleDateCardClick={handleDateCardClick}
                />
              }
              ) : null
            }
          </div>
        </>
      }
    </>
  );
})






export default Week;
