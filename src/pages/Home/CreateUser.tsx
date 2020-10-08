import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux';
import { User } from '../../shared/types';

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


type CreateUserProps = {
  setShowAddUser: (boolean: boolean) => void;
  signupUser: (username: string) => void;
}


export default CreateUser