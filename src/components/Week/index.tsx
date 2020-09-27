import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { RootState } from '../../redux';
import { calendarGet, CalendarState } from '../../redux/calendar/calendarGet';
import { User } from '../../redux/users/users';
import './Week.css'


enum Weekdays {
  "Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat",
}
enum MonthNames {
  "Jan", "Feb", "Mar", "Apr", "May", "June",
  "July", "Aug", "Sept", "Oct", "Nov", "Dec"
}

let today: Date = new Date();

let currentYear = today.getFullYear();
let currentMonth = today.getMonth();
let firstDay = (new Date(currentMonth)).getDay();
let daysInMonth = new Date(currentYear, currentMonth, 32).getDate()

let weekdayz: number[] = new Array(7).fill(null)

function Week() {
  const currentUser = useSelector<RootState, User | null>(state => state.currentUser)
  const [daySelected, setDaySelected] = useState<boolean>(false)
  const { calendar, loading: calendarLoading, error: calendarErr } = useSelector<RootState, CalendarState>(state => state.calendarGet)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(calendarGet())
  }, [])

  useEffect(() => {
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    console.log(weekdayz.length)
    // console.log(firstDay, daysInMonth, Weekdays[tomorrow.getDay()])


  }, [])

  if (!currentUser) { return <Redirect to='/' /> }
  if (daySelected) {
    let string: string = "2020-05-13"
    return <Redirect to={`/${string}`} />
  }

  return (
    <>
      <h3>heyya {currentUser.username}</h3>
      <div className="parent">
        {weekdayz.map((_, dayIndex) => {
          console.log(dayIndex)
          let theday = new Date(today);
          theday.setDate(today.getDate() + dayIndex)
          let r = theday.getMonth();
          let p = theday.getDate();
          let g = theday.getDay();
          return <div key={p + dayIndex}>
            <span>   {Weekdays[g]} {MonthNames[r]} {p}  </span>
            <button onClick={() => setDaySelected(true)}>GO TO DAY</button>
          </div>

        })}
      </div>
    </>
  );
}

export default Week;
