import React from "react"
import { User } from "../../shared/types"

const UsersSelectForm: React.FC<SelectFormProps> = ({ value, label = "Select", selectMessage = " ", optionMap, handleSelect, }) => {
  const options = (optionMap.map((option: User, i: number) =>
    <option key={option.id} value={i}>{option.username}</option>
  ))
  return (
    <form>
      <label> {label}
        <select value={value} onChange={(e) => handleSelect(e)}>
          <option className="option" value="" disabled>{selectMessage}</option>
          {options}
        </select>
      </label>
    </form>
  )
}

type SelectFormProps = {
  value: string;
  label: string
  selectMessage: string
  optionMap: User[]
  handleSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default UsersSelectForm