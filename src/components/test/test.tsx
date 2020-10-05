import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux'
import { fetchDispatch } from '../../redux/fetchDispatch/fetchDispatch'

export const Test: React.FC<any> = () => {


  const loading = useSelector<RootState, any>(state => state.isLoading)
  // const users = useSelector<RootState, any>(state => state.users)
  const cal = useSelector<RootState, any>(state => state.calendar)


  const dispatch = useDispatch();

  useEffect(() => {
    console.log("TESTSTTSTSTSTST#($)#($)#($)#$)(#)$#$)(", cal)

  }, [cal])

  useEffect(() => {

  }, [loading])

  const handleClick = () => {
    dispatch(fetchDispatch("req_getCalendar", "5f6f3d42cd9bedc5e0f8db81", ["28-8-2020", "30-8-2020"]))
  }

  return (
    <div>
      <h1>test</h1>
      {loading ? "whuddup bitch" : null}
      <button onClick={handleClick}>OKDIE</button>
    </div>
  )
}