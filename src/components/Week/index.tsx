// import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { Redirect } from 'react-router-dom';
// import { RootState } from '../../redux';
// // import { calendarGet, CalendarItem, CalendarState } from '../../redux/calendar/calendar';
// import { MenuItem } from '../../redux/menuList/menuList';
// import { clearCurrentUser } from '../../redux/users/userCurrent';
// import { User } from '../../redux/users/users';
// import './Week.css'
export const x = () => { }
// enum Weekdays {
//   "Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat",
// }
// enum MonthNames {
//   "Jan", "Feb", "Mar", "Apr", "May", "June",
//   "July", "Aug", "Sept", "Oct", "Nov", "Dec"
// }

// interface WeekDay {
//   month: string;
//   day: string;
//   date: string;
//   year: string;
//   dateId: string;

// }

// interface DayCardProps {
//   day: WeekDay,
//   calendar: CalendarItem[],
//   handleDateCardClick: (dateId: string) => void;
// }

// const generateWeekDays = () => {
//   const today: Date = new Date();
//   const emptyWeek: number[] = new Array(7).fill(null)
//   return emptyWeek.reduce((acc: WeekDay[], _, dayIndex) => {
//     const theday = new Date(today);
//     theday.setDate(today.getDate() + dayIndex)
//     const month = theday.getMonth();
//     const day = theday.getDay();
//     const date = String(theday.getDate())
//     const year = String(theday.getFullYear())
//     const dateId: string = `${date}-${month}-${year}`
//     acc.push({
//       month: MonthNames[month],
//       day: Weekdays[day],
//       date,
//       year,
//       dateId
//     })
//     return acc
//   }, [])
// }

// const DayCard: React.FC<DayCardProps> = ({ day, calendar, handleDateCardClick }) => {
//   const [calendarDisplay, setCalendarDisplay] = useState<CalendarItem | null>(null)
//   // const menuList = useSelector<RootState, MenuItem[]>(state => state.menuList.data)

//   useEffect(() => {
//     const temp = calendar.find(item => item.date === day.dateId)
//     if (temp)
//       setCalendarDisplay(temp)
//   }, [day.dateId, calendar])
//   return (
//     <>
//       <span>{day.dateId}</span>

//       {calendarDisplay ? <div>
//         {calendarDisplay.menuItems.map(item => {
//           // const menuItem = menuList.find(f => f.ID === item.foodId)
//           return (<div key={item.foodId}>
//             {/* <span>{menuItem?.ITEM}, {item.quantity}</span> */}
//           </div>
//           )
//         })}
//       </div> : null}
//       <button onClick={() => handleDateCardClick(day.dateId)}>Click to edit</button>

//     </>
//   )
// }

// const Week = () => {
//   const currentUser = useSelector<RootState, User | null>(state => state.currentUser)
//   const [daySelected, setDaySelected] = useState<string | null>(null)
//   const [week, setWeek] = useState<WeekDay[] | null>(null)
//   const { calendar, loading: calendarLoading } = useSelector<RootState, CalendarState>(state => state.calendarGet)

//   const dispatch = useDispatch();

//   useEffect(() => {
//     const generatedWeek = generateWeekDays()
//     setWeek([...generatedWeek])
//     const dateList = generatedWeek.map(day => day.dateId).sort()
//     if (currentUser)
//       dispatch(calendarGet(dateList, currentUser.id))
//   }, [currentUser, dispatch])


//   const handleSignout = () => {
//     dispatch(clearCurrentUser())
//   }

//   const handleDateCardClick = (dateId: any) => {
//     setDaySelected(dateId)

//   }



//   if (!currentUser) { return <Redirect to='/' /> }
//   if (daySelected) { return <Redirect to={`/d/${daySelected}`} /> }

//   return (
//     <>
//       {calendarLoading ? <span>loading</span>
//         :
//         <>
//           <div className="user-bar">
//             <h3>Logged in as: {currentUser.username}</h3>
//             <button onClick={handleSignout}>Sign Out</button>
//           </div>

//           <div className="parent">
//             {week ?
//               week.map(day => (
//                 <div key={day.dateId}>
//                   <DayCard
//                     day={day}
//                     handleDateCardClick={handleDateCardClick}
//                     calendar={calendar} />
//                   <br />
//                   <br />

//                   <br />

//                 </ div>
//               )) : null
//             }
//           </div>
//         </>
//       }
//     </>
//   );
// }

// export default Week;
