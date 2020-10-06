// import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { RootState } from '../../redux'
// import { MenuItems } from '../../redux/calendar/calendar'
// import { fetchDispatch, reqAddFav, reqClearFavList, reqRemoveFav, reqUpdateCalendar } from '../../redux/fetchDispatch/fetchDispatch'

// export const Test: React.FC<any> = () => {
export const test = () => { }

//   const loading = useSelector<RootState, any>(state => state.isLoading)
//   // const users = useSelector<RootState, any>(state => state.users)
//   const cal = useSelector<RootState, any>(state => state.calendar)
//   const err = useSelector<RootState, any>(state => state.alertMessage)
//   const [error, setError] = useState("")
//   const dispatch = useDispatch();

//   useEffect(() => {

//   }, [cal])

//   useEffect(() => {
//     setError(err)
//   }, [err])

//   useEffect(() => {
//     setTimeout(() => {
//       setError("")
//     }, 3000);
//   }, [error])

//   useEffect(() => {

//   }, [loading])

//   const handleClick = () => {
//     // let dateList = ["28-8-2020", "30-8-2020"]
//     // dispatch(fetchDispatch("req_getCalendar", { dateList }, "5f6f3d42cd9bedc5e0f8db81"))
//     // const username = "Abbea"
//     // dispatch(fetchDispatch("req_addUser", { username }, ""))
//     // const userId = "5f6f3d42cd9bedc5e0f8db81"
//     // const date = "28-8-2020"
//     // const menuItems: MenuItems[] = [
//     //   {
//     //     "foodId": "1",
//     //     "quantity": 0
//     //   },
//     // ]
//     // const body = {
//     //   userId,
//     //   date,
//     //   menuItems
//     // }
//     // dispatch(fetchDispatch(reqUpdateCalendar, body, ""))
//     //fav add
//     let userId = "5f6f3d42cd9bedc5e0f8db81";
//     let itemId = "20"

//     // dispatch(fetchDispatch(reqAddFav, { userId, itemId }))
//     //fav remove
//     // dispatch(fetchDispatch(reqClearFavList, { userId }))

//   }

//   return (
//     <div>
//       <h1>test</h1>
//       {loading ? "whuddup" : null}
//       {error}
//       <button onClick={handleClick}>OKDIE</button>
//     </div>
//   )
// }