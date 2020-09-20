import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux';
import { deleteUserFetch, resetDeleteMessage } from '../../redux/users/userDelete';
import { User, usersGet, UsersState } from '../../redux/users/users';
import { URL } from "../../redux/users/users";


const Login = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false)
  const [showAddUser, setShowAddUser] = useState<boolean>(false)
  const [message, setMessage] = useState<string | null>(null)
  const [value, setValue] = useState<string>("")
  const usersState = useSelector<RootState, UsersState>(state => state.usersState)
  const deleteStateMessage = useSelector<RootState, string | null>(state => state.userDelete.message)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(usersGet())
  }, [dispatch])

  useEffect(() => {
    if (deleteStateMessage) handleMessage(deleteStateMessage)
    dispatch(resetDeleteMessage())
  }, [dispatch, deleteStateMessage])

  const fetchUsers = () => {
    dispatch(usersGet())
  }


  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value)
    setSelectedUser(usersState.users[+e.target.value])
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setConfirmDelete(false)
    if (selectedUser) deleteUser(selectedUser.id)
    setSelectedUser(null)
    setValue("")
  }

  const deleteUser = (id: string) => {
    dispatch(deleteUserFetch(id))
    fetchUsers();
  }

  const signupUser = (username: string) => {
    fetch(URL + "signup", {
      method: 'POST',
      body: JSON.stringify({ username }),
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(res => res.json())
      .then(res => {
        const newUser = res.newUser.username;
        handleMessage(`${newUser} added successfully`)
        fetchUsers();
        setShowAddUser(false)
      })
      .catch(err => {
        console.error(err)
        handleMessage("Error, user could not be added")
      })
  }


  const handleUserSelect = () => {
    setConfirmDelete(true)
  }

  const handleMessage = (text: string) => {
    setMessage(text)
    setTimeout(() => {
      setMessage(null)
    }, 1500);
  }

  const checkValue = value.length === 0;

  return (
    <>
      {showAddUser ?
        <CreateUser
          setShowAddUser={setShowAddUser}
          signupUser={signupUser}
          handleMessage={handleMessage}
        />
        :
        confirmDelete ?

          <ConfirmDelete
            handleSubmit={handleSubmit}
            setConfirmDelete={setConfirmDelete}
            selectedUser={selectedUser} />
          :
          <>

            <SelectForm
              value={value}
              handleSelect={handleSelect}
              handleUserSelect={handleUserSelect} />

            {message ? <div><span>{message}</span> </div> : null}

            <button disabled={checkValue} onClick={() => console.log("testy")}>Sign in!</button>
            <button disabled={checkValue} onClick={handleUserSelect}>Delete user</button>
            <br />
            <button onClick={() => setShowAddUser(true)}>Sign up!</button>
          </>
      }
    </>)
}


const CreateUser: React.FC<any> = ({
  setShowAddUser,
  signupUser
}) => {
  const [value, setValue] = useState("")
  const [usernameList, setUsernameList] = useState<any[]>([])
  const usersState = useSelector<RootState, UsersState>(state => state.usersState)

  useEffect(() => {
    const newlist = usersState.users.reduce((acc: any, user: User) => {
      acc.push(user.username)
      return acc
    }, [])
    setUsernameList(newlist)
  }, [usersState.users])
  const usernameIncluded = usernameList.includes(value);
  const submitDisabled = value.length <= 3 || usernameIncluded;

  return (
    <div>
      <span>Input Username for new user</span>
      <br />
      <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
      <button disabled={submitDisabled} onClick={() => signupUser(value)}>Submit</button>
      <button onClick={() => setShowAddUser(false)}>X</button>
      <br />
      { usernameIncluded ?
        <span>name already included</span> : null
      }
      {value.length <= 3 ?
        <span>Username must be at least 3 characters</span> : null
      }
    </div>
  )
}


const SelectForm: React.FC<any> = ({ value, handleSelect, handleUserSelect }) => {
  const usersState = useSelector<RootState, UsersState>(state => state.usersState)
  const optionMap = (usersState.users.map((user: any, i: any) =>
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


const ConfirmDelete: React.FC<any> = ({
  handleSubmit,
  selectedUser,
  setConfirmDelete
}) => {

  return (
    <div style={{ backgroundColor: "plum" }}>
      <span>Delete {selectedUser.username}?</span>
      <button onClick={handleSubmit}>YES</button>
      <button onClick={() => setConfirmDelete(false)}>NO</button>
    </div>
  )
}

export default Login