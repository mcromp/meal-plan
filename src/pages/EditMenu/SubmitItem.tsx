import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux';
import { Filter, FilterId } from '../../shared/types';
import SubmitItemForm from './SubmitItemForm';

const SubmitItem: React.FC<any> = () => {
  const [selectedFilter, setSelectedFilter] = useState<FilterId>()

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFilter(e.target.value as FilterId)
  };

  return (
    <div className="add-modal">
      <div className="add-modal__content">
        <span>hello world i am a test.</span>

        <SubmitItemForm
          selectedFilter={selectedFilter}
          handleSelect={handleSelect} />

      </div>
    </div>
  );
};


export default SubmitItem;