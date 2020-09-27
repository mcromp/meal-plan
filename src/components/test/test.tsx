import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux'
import { calendarGet, CalendarState } from '../../redux/calendar/calendarGet'

export const Test: React.FC<any> = () => {
  const { calendar, loading: calendarLoading, error: calendarErr } = useSelector<RootState, CalendarState>(state => state.calendarGet)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(calendarGet())
  }, [])


  useEffect(() => {
    console.log(calendar)
  }, [calendar])

  return (
    <div>
      <h1>test</h1>
    </div>
  )
}