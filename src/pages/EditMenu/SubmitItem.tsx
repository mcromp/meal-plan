import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import CloseIcon from '../../assets/CloseIcon';
import { fetchHelper } from '../../redux/fetchHelper/fetchHelper';
import { ReqType } from '../../redux/fetchHelper/types';
import { FilterId } from '../../shared/types';
import SubmitItemForm from './SubmitItemForm';

const SubmitItem: React.FC<any> = ({
  setIsAddModalShown
}) => {
  const [selectedFilter, setSelectedFilter] = useState<FilterId | "">("")
  const [selectedName, setSelectedName] = useState<string>("")

  const dispatch = useDispatch();

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFilter(e.target.value as FilterId)
  };

  const handleSubmit = () => {
    const body = {
      item: selectedName,
      filter: selectedFilter
    }
    dispatch(fetchHelper(ReqType.reqAddMenu, body))
    setIsAddModalShown(false)
  }

  const isDisabled: boolean = !selectedName || !selectedFilter;
  return (
    <div className="add-modal">
      <div className="add-modal__content">
        <button onClick={() => setIsAddModalShown(false)}> <CloseIcon /></button>
        <span>Input a name, assign a filter, then click 'Submit'</span>
        <input maxLength={20} value={selectedName} onChange={(e) => setSelectedName(e.target.value)} type="text" />

        <SubmitItemForm
          selectedFilter={selectedFilter}
          handleSelect={handleSelect} />

        <button disabled={isDisabled} onClick={() => handleSubmit()}>Submit</button>
        <button onClick={() => setIsAddModalShown(false)}>NVM</button>
      </div>
    </div>
  );
};


export default SubmitItem;