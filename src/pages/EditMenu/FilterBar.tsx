import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFilter, resetFilter } from "../../redux/modules/filterList";
import { RootState } from "../../redux";
import { Filter } from "../../shared/types";
import CloseIcon from "../../assets/CloseIcon";


const FilterBar: React.FC = () => {
  const [showAll, setShowAll] = useState<boolean>(false);
  const [enabledFilterList, setEnabledFilterList] = useState<Filter[]>([]);
  const filterList = useSelector<RootState, Filter[]>(state => state.filterList);
  const dispatch = useDispatch();

  const handleFilterClick = (filter: Filter, isEnabled: boolean) => {
    dispatch(setFilter(filter, isEnabled));
    setShowAll(true);
  };

  const addFilter = (filter: Filter) => {
    const UpdatedEnabledFilters = [...enabledFilterList, filter];
    setEnabledFilterList(UpdatedEnabledFilters);
  };

  const removeFilter = (filter: Filter) => {
    const prevEnabledFilterList = [...enabledFilterList];
    prevEnabledFilterList.splice(prevEnabledFilterList.indexOf(filter), 1);
    if (!prevEnabledFilterList[0]) setShowAll(false);
    setEnabledFilterList(prevEnabledFilterList);
  };

  const clearAll = () => {
    dispatch(resetFilter());
    setEnabledFilterList([]);
    setShowAll(false);
  };
  return (
    <div className="filters" >
      {filterList.map((filter: Filter) => {
        return (enabledFilterList.includes(filter)) ?
          <button
            className="filters__button filters__button--remove"
            key={filter.name}
            onClick={() => {
              handleFilterClick(filter, false);
              removeFilter(filter);
            }}>{filter.name} <CloseIcon /></button>
          :
          <button
            className="filters__button filters__button--add"
            key={filter.name}
            onClick={() => {
              handleFilterClick(filter, true);
              addFilter(filter);
            }}
          >{filter.name}</button>
      }
      )}

      {showAll ? <button className="filters__button filters__button--clear-all" onClick={clearAll}>Clear All Filters</button> : null}
    </div>
  );
};



export default FilterBar;