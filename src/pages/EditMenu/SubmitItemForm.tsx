import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux';
import { Filter } from '../../shared/types';

const SubmitItemForm: React.FC<any> = ({
  selectedFilter,
  handleSelect
}) => {
  const filterList = useSelector<RootState, Filter[]>(state => state.filterList);
  const options = (filterList.map((filter: Filter) => {
    if (filter.id !== "FAVORITES") return <option className="" key={filter.id} value={filter.id}>{filter.name}</option>
  }
  ));
  return (
    <form className="">
      <label>
        <select className="" value={selectedFilter} onChange={(e) => handleSelect(e)}>
          <option value="" disabled>Select Filter Category</option>
          {options}
        </select>
      </label>
    </form>
  )
}

export default SubmitItemForm;