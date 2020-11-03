import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import CloseIcon from '../../assets/CloseIcon';
import { RootState } from '../../redux';
import { Filter, FilterId } from '../../shared/types';
import SubmitItemForm from './SubmitItemForm';

const SubmitItem: React.FC<any> = ({
  setIsAddModalShown
}) => {
  const [selectedFilter, setSelectedFilter] = useState<FilterId | "">("")
  const [selectedName, setSelectedName] = useState<string>("")
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFilter(e.target.value as FilterId)
  };

  const handleSubmit = () => {

  }

  return (
    <div className="add-modal">
      <div className="add-modal__content">
        <button onClick={() => setIsAddModalShown(false)}> <CloseIcon /></button>
        <span>input a name and submit</span>
        <input value={selectedName} onChange={(e) => setSelectedName(e.target.value)} type="text" />

        <SubmitItemForm
          selectedFilter={selectedFilter}
          handleSelect={handleSelect} />

        <button onClick={() => console.log(selectedName)}>Submit</button>
        <button onClick={() => setIsAddModalShown(false)}>NVM</button>
      </div>
    </div>
  );
};


export default SubmitItem;