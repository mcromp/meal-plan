import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Redirect } from "react-router-dom"
import { RootState } from "../../redux"
import { fetchHelper } from "../../redux/fetchHelper/fetchHelper"
import { ReqType } from "../../redux/fetchHelper/types"
import { resetFilter } from "../../redux/modules/filterList"
import Loading from "../../shared/Loading"
import { User, WeekDay, CalendarItem } from "../../shared/types"
import DayCard from "./DayCard"
import { generateWeekDays } from "./utils/generateWeek"
import './styles/week.css'

const Week: React.FC<any> = React.forwardRef((props, ref: any) => {
  const currentUser = useSelector<RootState, User | null>(state => state.currentUser)
  const [week, setWeek] = useState<WeekDay[] | null>(null)
  const calendar = useSelector<RootState, CalendarItem[]>(state => state.calendar)
  const isLoading = useSelector<RootState, boolean>(state => state.isLoading)
  const isLoggedIn = useSelector<RootState, boolean>(state => state.isLoggedIn)

  const dispatch = useDispatch();


  useEffect(() => {
    const generatedWeek = generateWeekDays();
    setWeek([...generatedWeek]);
    const dateList = generatedWeek.map(day => day.dateId).sort();
    if (currentUser)
      dispatch(fetchHelper(ReqType.reqGetCalendar, { dateList }, currentUser.id));
  }, [currentUser, dispatch]);

  useEffect(() => {
    dispatch(resetFilter())
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchHelper(ReqType.reqGetMenu))
  }, [dispatch]);

  if (!isLoggedIn && !currentUser) { return <Redirect to='/' /> };
  if (isLoading) return <Loading />


  return (
    <div className="container" ref={ref}>
      { week?.map(day => {
        const calendarDisplay = calendar.find(item => item.date === day.dateId);
        return (
          <DayCard
            key={day.dateId}
            day={day}
            calendarDisplay={calendarDisplay} />)
      })}
    </div>
  );
})

export default Week;
