import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux'
import { fetchDispatch } from '../../redux/fetchDispatch/fetchDispatch'

export const Test: React.FC<any> = () => {


  const loading = useSelector<RootState, any>(state => state.isLoading)
  const users = useSelector<RootState, any>(state => state.users)

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("TESTSTTSTSTSTST#($)#($)#($)#$)(#)$#$)(", users)

  }, [users])

  useEffect(() => {
    console.log("loading", loading)

  }, [loading])

  const handleClick = () => {
    dispatch(fetchDispatch("req_getUsers"))
  }

  return (
    <div>
      <h1>test</h1>
      {loading ? "whuddup bitch" : null}
      <button onClick={handleClick}>OKDIE</button>
    </div>
  )
}