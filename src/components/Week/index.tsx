import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { RootState } from '../../redux';
import { calendarGet, CalendarState } from '../../redux/calendar/calendarGet';
import { clearCurrentUser } from '../../redux/users/userCurrent';
import { User } from '../../redux/users/users';
import './Week.css'

enum Weekdays {
  "Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat",
}
enum MonthNames {
  "Jan", "Feb", "Mar", "Apr", "May", "June",
  "July", "Aug", "Sept", "Oct", "Nov", "Dec"
}

interface WeekDay {
  month: string;
  day: string;
  date: string;
  year: string;
  dateId: string;

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
    const dateId: string = `${year}-${month}-${date}`
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

function Week() {
  const currentUser = useSelector<RootState, User | null>(state => state.currentUser)
  const [daySelected, setDaySelected] = useState<string | null>(null)
  const [week, setWeek] = useState<WeekDay[] | null>(null)
  const { calendar, loading: calendarLoading, error: calendarErr } = useSelector<RootState, CalendarState>(state => state.calendarGet)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(calendarGet())
  }, [])

  useEffect(() => {
    if (!week) {
      const generatedWeek = generateWeekDays()
      console.log(generatedWeek)
      setWeek([...generatedWeek])
    }
  }, [week])

  const handleSignout = () => {
    dispatch(clearCurrentUser())
  }

  if (!currentUser) { return <Redirect to='/' /> }
  if (daySelected) { return <Redirect to={`/${daySelected}`} /> }
  return (
    <>
      {calendarLoading ? <span>loading</span>
        :
        <>
          <div className="user-bar">
            <h3>Logged in as: {currentUser.username}</h3>
            <button onClick={handleSignout}>Sign Out</button>
          </div>

          <div className="parent">
            {/* {
              return <div key={dateId}>
              <span>{Weekdays[day]} {MonthNames[month]} {date}  </span>
              <button onClick={() => setDaySelected(dateId)}>GO TO DAY</button>
            </div>
            })} */}
          </div>
        </>
      }
    </>
  );
}

export default Week;
