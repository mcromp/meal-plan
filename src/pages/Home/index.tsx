import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { RootState } from "../../redux"
import { fetchHelper } from "../../redux/fetchHelper/fetchHelper"
import { ReqType } from "../../redux/fetchHelper/types"
import { setAlertMessage } from "../../redux/modules/alertMessage"
import { setIsLoggedIn } from "../../redux/modules/isLoggedIn"
import { User } from "../../shared/types"
import BigButton from "../../shared/BigButton"
import ConfirmDelete from "./ConfirmDelete"
import CreateUser from "./CreateUser"
import MedButton from "../../shared/MedButton"
import SelectForm from "./SelectForm"
import { useFlashText } from "../../customHooks/useFlashText"
import AlertText from "../../shared/AlertText"

const Home = () => {
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false)
  const [isSignupShown, setIsSignupShown] = useState<boolean>(false)
  const [value, setValue] = useState<string>("")
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const alertMessage = useSelector<RootState, string>(state => state.alertMessage)
  const users = useSelector<RootState, User[]>(state => state.users)
  const [flashText, setFlashText] = useFlashText("")

  const dispatch = useDispatch()
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchHelper(ReqType.reqGetUsers))
  }, [dispatch])

  useEffect(() => {
    if (alertMessage) setFlashText(alertMessage)
    dispatch(setAlertMessage(""))
  }, [dispatch, alertMessage])



  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value)
    setSelectedUser(users[+e.target.value])
  }

  const handleDeleteSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setConfirmDelete(false)
    if (selectedUser) deleteUser(selectedUser.id)
    setSelectedUser(null)
    setValue("")
  }

  const deleteUser = (id: string) => {
    dispatch(fetchHelper(ReqType.reqDeleteUser, { id }))
  }

  const signupUser = (username: string) => {
    dispatch(fetchHelper(ReqType.reqAddUser, { username }))
    setIsSignupShown(false)
  }


  const handleSignin = () => {
    dispatch(fetchHelper(ReqType.reqGetUser, "", selectedUser?.id))
    dispatch(setIsLoggedIn(true))
    setSelectedUser(null)
    setValue("")
    history.push("/w")
  }

  const checkValue = value.length === 0;

  return (
    <>
      {isSignupShown ?
        <CreateUser
          setShowAddUser={setIsSignupShown}
          signupUser={signupUser} />
        :
        confirmDelete ?

          <ConfirmDelete
            handleSubmit={handleDeleteSubmit}
            setConfirmDelete={setConfirmDelete}
            selectedUser={selectedUser} />
          :
          <>

            <SelectForm
              value={value}
              label={"Select Login Username"}
              selectMessage={"Select"}
              optionMap={users}
              handleSelect={handleSelect} />

            <BigButton disabled={checkValue} onClick={() => handleSignin()}>Sign in</BigButton>
            <MedButton disabled={checkValue} onClick={() => setConfirmDelete(true)}>Delete User</MedButton>
            <span>Don't have an account?</span>
            <BigButton onClick={() => setIsSignupShown(true)}>Sign up!</BigButton>
            <AlertText>{flashText}</AlertText>
          </>
      }
    </>
  )
}


export default Home