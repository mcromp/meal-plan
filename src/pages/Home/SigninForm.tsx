import React from "react"
import { User } from "../../shared/types"

const SigninForm: React.FC<SigninFormProps> = ({ value, label = "Select", selectMessage = " ", optionMap, handleSelect, }) => {
  const options = (optionMap.map((option: User, i: number) =>
    <option className="signin-form__option" key={option.id} value={i}>{option.username}</option>
  ))
  return (
    <form className="signin-form">
      <label> {label}
        <select className="signin-form__select" value={value} onChange={(e) => handleSelect(e)}>
          <option value="" disabled>{selectMessage}</option>
          {options}
        </select>
      </label>
    </form>
  )
}

type SigninFormProps = {
  value: string;
  label: string
  selectMessage: string
  optionMap: User[]
  handleSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default SigninForm