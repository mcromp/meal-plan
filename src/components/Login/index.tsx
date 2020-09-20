import React, { useEffect, useState } from 'react';
const URL = "http://localhost:5000/users/"

const Login = () => {
  const [users, setUsers] = useState<any[]>([])
  const [selectedUser, setSelectedUser] = useState<any>({})
  const [value, setValue] = useState("")
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false)
  const [showAddUser, setShowAddUser] = useState<boolean>(false)
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = () => {
    fetch(URL)
      .then(res => res.json())
      .then(data => {
        setUsers(data)
      })
  }


  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value)
    setSelectedUser(users[+e.target.value])
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setConfirmDelete(false)
    deleteUser(selectedUser._id)
    setSelectedUser({})
    setValue("")
  }


  const deleteUser = (id: any) => {
    fetch(URL + id, {
      method: 'DELETE',
    })
      .then(res => res.json())
      .then(res => {
        const resUsername = res.deletedUser.username
        handleMessage(`${resUsername} deleted successfully`)
        fetchUsers()
      })
      .catch(err => console.error(err))
  }

  const signupUser = (username: any) => {
    let ppp = {
      username
    }
    fetch(URL + "signup", {
      method: 'POST',
      body: JSON.stringify(ppp),
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
    }, 2000);
  }

  return (
    <>
      {showAddUser ?
        <CreateUser
          setShowAddUser={setShowAddUser}
          users={users}
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
              users={users}
              handleUserSelect={handleUserSelect} />

            {message ? <div><span>{message}</span> </div> : null}

            <button disabled={value.length === 0} onClick={() => console.log("testy")}>Sign in!</button>
            <button disabled={value.length === 0} onClick={handleUserSelect}>Delete user</button>
            <br />
            <button onClick={() => setShowAddUser(true)}>Sign up!</button>
          </>
      }
    </>)
}


const CreateUser: React.FC<any> = ({
  setShowAddUser,
  users,
  signupUser
}) => {
  const [value, setValue] = useState("")
  const [usernameList, setUsernameList] = useState<any[]>([])
  useEffect(() => {
    const newlist = users.reduce((acc: any, user: any) => {
      acc.push(user.username)
      return acc
    }, [])
    setUsernameList(newlist)
  }, [users])
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


const SelectForm: React.FC<any> = ({ value, handleSelect, users, handleUserSelect }) => {
  const optionMap = (users.map((user: any, i: any) =>
    <option key={user._id} value={i}>{user.username}</option>
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
      <span>Are you sure you want to delete {selectedUser.username}?</span>
      <button onClick={handleSubmit}>YES</button>
      <button onClick={() => setConfirmDelete(false)}>NO</button>
    </div>
  )
}

export default Login