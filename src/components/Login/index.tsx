import React, { useEffect, useRef, useState } from 'react';
import { RootState } from '../../redux';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchDispatch, reqAddUser, reqDeleteUser, reqGetUser, reqGetUsers } from '../../redux/helpers/fetchDispatch';
import { User } from '../../redux/modules/users';
import { setAlertMessage } from '../../redux/modules/alertMessage';
import { setIsLoggedIn } from '../../redux/modules/isLoggedIn';

const Login = () => {
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false)
  const [showAddUser, setShowAddUser] = useState<boolean>(false)
  const [value, setValue] = useState<string>("")
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const alertMessage = useSelector<RootState, string>(state => state.alertMessage)
  const users = useSelector<RootState, User[]>(state => state.users)



  const dispatch = useDispatch()
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchDispatch(reqGetUsers))
  }, [dispatch])

  useEffect(() => {
    if (alertMessage) handleMessage(alertMessage)
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
    dispatch(fetchDispatch(reqDeleteUser, { id }))
  }

  const signupUser = (username: string) => {
    dispatch(fetchDispatch(reqAddUser, { username }))
    setShowAddUser(false)
  }

  const handleMessage = (text: string) => {
    setMessage(text)
    setTimeout(() => {
      setMessage(null)
    }, 1500);
  }

  const handleSignin = () => {
    dispatch(fetchDispatch(reqGetUser, "", selectedUser?.id))
    dispatch(setIsLoggedIn(true))
    setSelectedUser(null)
    setValue("")
    history.push("/w")
  }

  const checkValue = value.length === 0;

  return (
    <>
      {showAddUser ?
        <CreateUser
          setShowAddUser={setShowAddUser}
          signupUser={signupUser} />
        :
        confirmDelete ?

          <ConfirmDelete
            handleSubmit={handleDeleteSubmit}
            setConfirmDelete={setConfirmDelete}
            selectedUser={selectedUser} />
          :
          <>

            <SelectUserForm
              value={value}
              handleSelect={handleSelect} />



            <button disabled={checkValue} onClick={() => handleSignin()}>Sign in!</button>
            <button disabled={checkValue} onClick={() => setConfirmDelete(true)}>Delete user</button>
            <br />
            <button onClick={() => setShowAddUser(true)}>Sign up!</button>
            {message ? <span>{message}</span> : null}
          </>
      }
    </>
  )
}

export type CreateUserProps = {
  setShowAddUser: (boolean: boolean) => void;
  signupUser: (username: string) => void;
}


const CreateUser: React.FC<CreateUserProps> = ({
  setShowAddUser,
  signupUser
}) => {
  const [value, setValue] = useState("")
  const [usernameList, setUsernameList] = useState<string[]>([])
  const users = useSelector<RootState, User[]>(state => state.users)
  const focusRef: React.MutableRefObject<any> = useRef();

  useEffect(() => {
    const newlist = users.reduce((acc: string[], user: User) => {
      acc.push(user.username)
      return acc
    }, [])
    setUsernameList(newlist)
  }, [users])

  useEffect(() => {
    focusRef.current.focus()
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !submitDisabled) signupUser(value)
  }


  const usernameIncluded = usernameList.includes(value);
  const submitDisabled = value.length <= 3 || usernameIncluded || value.length >= 15;
  return (
    <div>
      <span>Input Username for new user</span>
      <br />
      <input type="text" value={value} ref={focusRef} onKeyDown={(e) => handleKeyDown(e)} onChange={(e) => setValue(e.target.value)} />
      <button disabled={submitDisabled} onClick={() => signupUser(value)}>Submit</button>
      <button onClick={() => setShowAddUser(false)}>X</button>
      <br />
      { usernameIncluded ?
        <span>name already included</span> : null
      }
      {value.length <= 2 || value.length >= 25 ?
        <span>Username must be between 3 and 25 characters</span> : null
      }
    </div>
  )
}


export type SelectUserFormProps = {
  value: string;
  handleSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectUserForm: React.FC<SelectUserFormProps> = ({ value, handleSelect }) => {
  const users = useSelector<RootState, User[]>(state => state.users)
  const optionMap = (users.map((user: User, i: number) =>
    <option key={user.id} value={i}>{user.username}</option>
  ))
  return (
    <form>
      <label> Select your username:
          <select value={value} onChange={(e) => handleSelect(e)}>
          <option value="" disabled>Please select</option>
          {optionMap}
        </select>
      </label>
    </form>
  )
}

export type ConfirmDeleteProps = {
  handleSubmit: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  selectedUser: User | null;
  setConfirmDelete: (boolean: boolean) => void;
}
const ConfirmDelete: React.FC<ConfirmDeleteProps> = ({
  handleSubmit,
  selectedUser,
  setConfirmDelete
}) => {
  const focusRef: React.MutableRefObject<any> = useRef();
  useEffect(() => {
    focusRef.current.focus();
  }, [])

  return (
    <div style={{ backgroundColor: "plum" }}>
      <span>Delete {selectedUser ? selectedUser.username : null}?</span>
      <button ref={focusRef} onClick={(e) => handleSubmit(e)}>YES</button>
      <button onClick={() => setConfirmDelete(false)}>NO</button>
    </div>
  )
}

export default Login