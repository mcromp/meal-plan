import React, { useState, useLayoutEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import CloseIcon from '../../assets/CloseIcon';
import { fetchHelper } from '../../redux/fetchHelper/fetchHelper';
import { ReqType } from '../../redux/fetchHelper/types';
import { FilterId } from '../../shared/types';
import SubmitItemForm from './SubmitItemForm';

const SubmitItem: React.FC<SubmitItemProps> = ({
  setIsAddModalShown
}) => {
  const [selectedFilter, setSelectedFilter] = useState<FilterId | "">("")
  const [selectedName, setSelectedName] = useState<string>("")
  const dispatch = useDispatch();
  const focusRef = useRef<HTMLInputElement>(null);
  const closeRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (focusRef.current) focusRef.current.focus();
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") setIsAddModalShown(false)
  }

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
    <div className="submit-item-container" onKeyDown={(e) => handleKeyDown(e)}>
      <div className="submit-item">
        <div className="submit-item__close-icon" ref={closeRef} onClick={() => setIsAddModalShown(false)}> <CloseIcon /></div>
        <span className="submit-item__text">Input a name, assign a filter, then click 'Submit'</span>
        <input className="submit-item__text-input"
          ref={focusRef}
          maxLength={20}
          value={selectedName}
          onChange={(e) => setSelectedName(e.target.value)}
          type="text" />

        <SubmitItemForm
          selectedFilter={selectedFilter}
          handleSelect={handleSelect} />

        <div className="submit-item__button-container">
          <button className="button submit-item__button" onClick={() => setIsAddModalShown(false)}>Cancel</button>
          <button className="button submit-item__button" disabled={isDisabled} onClick={() => handleSubmit()}>Submit</button>
        </div>
      </div>
    </div>
  );
};

type SubmitItemProps = {
  setIsAddModalShown: (bool: boolean) => void;
}

export default SubmitItem;