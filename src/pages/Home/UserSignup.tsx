import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux';
import { User } from '../../shared/types';

const UserSignup: React.FC<UserSignupProps> = ({
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
    <div className="user-signup">
      <span className="user-signup__heading">Input new username</span>
      <input className="user-signup__input" type="text" value={value} ref={focusRef} onKeyDown={(e) => handleKeyDown(e)} onChange={(e) => setValue(e.target.value)} />
      <button className="button" disabled={submitDisabled} onClick={() => signupUser(value)}>Submit</button>
      <button className="button" onClick={() => setShowAddUser(false)}>X</button>

      {usernameIncluded ?
        <span className="user-signup__error">Name already included</span> : null
      }
      {value.length <= 3 || value.length >= 25 ?
        <span className="user-signup__error">Username must be between 3 and 25 characters</span> : <br />
      }
    </div>
  )
}


type UserSignupProps = {
  setShowAddUser: (boolean: boolean) => void;
  signupUser: (username: string) => void;
}


export default UserSignup