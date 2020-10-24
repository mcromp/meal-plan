import React, { useState, useLayoutEffect, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { RootState } from "../../redux"
import { fetchHelper } from "../../redux/fetchHelper/fetchHelper"
import { ReqType } from "../../redux/fetchHelper/types"
import { setIsLoggedIn } from "../../redux/modules/isLoggedIn"
import { User } from "../../shared/types"
import UserDelete from "./UserDelete"
import UserSignup from "./UserSignup"
import UsersSelectForm from "./UsersSelectForm"
import AlertText from "../../shared/AlertText"
import TitleContainer from "./TitleContainer"
import "./styles/home.css"
import MenuIcon from "../../shared/sass/MenuIcon"

const Home = () => {
  const [isDeleteConfirmShown, setIsDeleteConfirmShown] = useState<boolean>(false)
  const [isSignupShown, setIsSignupShown] = useState<boolean>(false)
  const [isAlertShown, setIsAlertShown] = useState<boolean>(false)
  const [value, setValue] = useState<string>("")
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const users = useSelector<RootState, User[]>(state => state.users);
  const dispatch = useDispatch()
  const history = useHistory();

  useLayoutEffect(() => {
    let listener = setTimeout(() => {
      setIsAlertShown(false)
    }, 1200)
    return () => clearTimeout(listener);
  })

  useEffect(() => {
    dispatch(fetchHelper(ReqType.reqGetUsers))
  }, [dispatch])

  const handleDeleteSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setIsDeleteConfirmShown(false)
    if (selectedUser) deleteUser(selectedUser.id)
    setIsAlertShown(true)
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
    setIsAlertShown(true)
  }

  const checkValue = value.length === 0;

  return (
    <div className="home">
      <div className="home__header"><MenuIcon /> Menu Plan</div>
      <TitleContainer />
      <div className="home__forms">
        <div className="form__signin">
          {isDeleteConfirmShown ?
            <UserDelete
              handleSubmit={handleDeleteSubmit}
              setConfirmDelete={setIsDeleteConfirmShown}
              selectedUser={selectedUser} />
            : <>

              <span className="signin__heading">Select your username</span>
              <UsersSelectForm
                value={value}
                label={""}
                selectMessage={"SELECT"}
                optionMap={users}
                handleSelect={handleSelect} />
              <button className="button" onClick={() => handleSignin()} disabled={checkValue}>Sign in</button>
              <button className="button" onClick={() => setIsDeleteConfirmShown(true)} disabled={checkValue}>Delete User</button>
            </>
          }
        </div>

        <div className="form__signup">
          {isSignupShown ?
            <UserSignup
              setShowAddUser={setIsSignupShown}
              signupUser={signupUser} />
            :
            <>
              <span className="signup__heading">Don't have a username?</span>
              <button className="button" onClick={() => setIsSignupShown(true)} >Sign up</button>
            </>
          }
          {isAlertShown ? <AlertText /> : null}
        </div>
      </div>
    </div >
  )
}


export default Home