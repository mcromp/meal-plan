import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { RootState } from "../../redux"
import { fetchHelper } from "../../redux/fetchHelper/fetchHelper"
import { ReqType } from "../../redux/fetchHelper/types"
import { setIsLoggedIn } from "../../redux/modules/isLoggedIn"
import { User } from "../../shared/types"
import BigButton from "../../shared/BigButton"
import UserDelete from "./UserDelete"
import UserSignup from "./UserSignup"
import MedButton from "../../shared/MedButton"
import UsersSelectForm from "./UsersSelectForm"
import AlertText from "../../shared/AlertText"

const Home = () => {
  const [isDeleteConfirmShown, setIsDeleteConfirmShown] = useState<boolean>(false)
  const [isSignupShown, setIsSignupShown] = useState<boolean>(false)
  const [value, setValue] = useState<string>("")
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const users = useSelector<RootState, User[]>(state => state.users)

  const dispatch = useDispatch()
  const history = useHistory();


  useEffect(() => {
    dispatch(fetchHelper(ReqType.reqGetUsers))
  }, [dispatch])

  // useEffect(() => {
  //   if (alertMessage) {
  //     dispatch(setAlertMessage(""))
  //   }
  // }, [dispatch, alertMessage])

  const handleDeleteSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setIsDeleteConfirmShown(false)
    if (selectedUser) deleteUser(selectedUser.id)
    setSelectedUser(null)
    setValue("")
  }

  const handleSignin = () => {
    dispatch(fetchHelper(ReqType.reqGetUser, "", selectedUser?.id))
    dispatch(setIsLoggedIn(true))
    setSelectedUser(null)
    setValue("")
    history.push("/w")
  }

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value)
    setSelectedUser(users[+e.target.value])
  }

  const deleteUser = (id: string) => {
    dispatch(fetchHelper(ReqType.reqDeleteUser, { id }))
  }

  const signupUser = (username: string) => {
    dispatch(fetchHelper(ReqType.reqAddUser, { username }))
    setIsSignupShown(false)
  }

  const checkValue = value.length === 0;

  if (isSignupShown) {
    return (
      <UserSignup
        setShowAddUser={setIsSignupShown}
        signupUser={signupUser} />)
  }
  if (isDeleteConfirmShown) {
    return (
      <UserDelete
        handleSubmit={handleDeleteSubmit}
        setConfirmDelete={setIsDeleteConfirmShown}
        selectedUser={selectedUser} />)
  }
  return (
    <>
      <UsersSelectForm
        value={value}
        label={"Select Login Username"}
        selectMessage={"Select"}
        optionMap={users}
        handleSelect={handleSelect} />

      <BigButton disabled={checkValue} onClick={() => handleSignin()}>Sign in</BigButton>
      <MedButton disabled={checkValue} onClick={() => setIsDeleteConfirmShown(true)}>Delete User</MedButton>
      <span>Don't have an account?</span>
      <BigButton onClick={() => setIsSignupShown(true)}>Sign up!</BigButton>
      <AlertText />
    </>
  )
}


export default Home