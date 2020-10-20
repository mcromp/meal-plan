import React, { useState, useEffect, useLayoutEffect } from "react"
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
import "./styles/home.css"
import { useRef } from "react"
import TitleContainer from "./TitleContainer"

const Home = () => {
  const [isDeleteConfirmShown, setIsDeleteConfirmShown] = useState<boolean>(false)
  const [isSignupShown, setIsSignupShown] = useState<boolean>(false)
  const [isAlertShown, setIsAlertShown] = useState<boolean>(false)
  const [value, setValue] = useState<string>("")
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const users = useSelector<RootState, User[]>(state => state.users)
  const scrollRef = useRef(null);
  const dispatch = useDispatch()
  const history = useHistory();

  useLayoutEffect(() => {
    let listener = setTimeout(() => {
      setIsAlertShown(false)
    }, 1200)
    return () => clearTimeout(listener);
  })

  // const scrollToRef = (ref: React.MutableRefObject<any>) => window.scrollTo(0, ref.current.offsetTop)
  // useEffect(() => {
  //   dispatch(fetchHelper(ReqType.reqGetUsers))
  // }, [dispatch])


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
      <TitleContainer scrollRef={scrollRef} />
      <div className="home__form">
        {isAlertShown ? <AlertText /> : null}
        <div className="form__signin">
          <span className="signin__header" ref={scrollRef}>Select your username</span>
          {isDeleteConfirmShown ?
            <UserDelete
              handleSubmit={handleDeleteSubmit}
              setConfirmDelete={setIsDeleteConfirmShown}
              selectedUser={selectedUser} />
            : <>

              <UsersSelectForm
                value={value}
                label={""}
                selectMessage={"SELECT"}
                optionMap={users}
                handleSelect={handleSelect} />
              <button onClick={() => handleSignin()} disabled={checkValue}>Sign in</button>
              <button onClick={() => setIsDeleteConfirmShown(true)} disabled={checkValue}>Delete User</button>
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
              <span className="signup__header">Don't have a username?</span>
              <button className="signup__btn" onClick={() => setIsSignupShown(true)} >Sign up!</button>
            </>
          }
        </div>
      </div>
    </div >
  )
}


export default Home