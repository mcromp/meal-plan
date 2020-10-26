import React from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../redux"
import Loading from "../../shared/Loading"
import { User } from "../../shared/types"

const SigninForm: React.FC<SigninFormProps> = ({ value, label = "Select", selectMessage = " ", optionMap, handleSelect, }) => {
  const isLoading = useSelector<RootState, any>(state => state.isLoading)

  const options = (optionMap.map((option: User, i: number) =>
    <option className="signin-form__option" key={option.id} value={i}>{option.username}</option>
  ))
  if (isLoading) { return <Loading /> }
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