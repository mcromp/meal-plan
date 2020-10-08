import React from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../redux"
import { User } from "../../shared/types"

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

type SelectUserFormProps = {
  value: string;
  handleSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default SelectUserForm