import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux'
import { MenuItems } from '../../redux/calendar/calendar'
import { fetchDispatch } from '../../redux/fetchDispatch/fetchDispatch'

export const Test: React.FC<any> = () => {


  const loading = useSelector<RootState, any>(state => state.isLoading)
  // const users = useSelector<RootState, any>(state => state.users)
  const cal = useSelector<RootState, any>(state => state.calendar)
  const err = useSelector<RootState, any>(state => state.alertMessage)
  const [error, setError] = useState("")
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("TESTSTTSTSTSTST#($)#($)#($)#$)(#)$#$)(", cal)

  }, [cal])

  useEffect(() => {
    setError(err)
  }, [err])

  useEffect(() => {
    setTimeout(() => {
      setError("")
    }, 3000);
  }, [error])

  useEffect(() => {

  }, [loading])

  const handleClick = () => {
    // let dateList = ["28-8-2020", "30-8-2020"]
    // dispatch(fetchDispatch("req_getCalendar", "5f6f3d42cd9bedc5e0f8db81", { dateList }))
    // const username = "Abbea"
    // dispatch(fetchDispatch("req_addUser", "", { username }))
    const userId = "5f6f3d42cd9bedc5e0f8db81"
    const date = "28-8-2020"
    const menuItems: MenuItems[] = [
      {
        "foodId": "1",
        "quantity": 0
      },
    ]
    const body = {
      userId,
      date,
      menuItems
    }
    dispatch(fetchDispatch("reqUpdateCalendar", body, ""))
  }

  return (
    <div>
      <h1>test</h1>
      {loading ? "whuddup" : null}
      {error}
      <button onClick={handleClick}>OKDIE</button>
    </div>
  )
}