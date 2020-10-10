import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFilter, resetFilter } from "../../redux/modules/filterList";
import { RootState } from "../../redux";
import { Filter } from "../../shared/types";


const FilterButtonList: React.FC = () => {
  const [showAll, setShowAll] = useState<boolean>(false);
  const [enabledFilterList, setEnabledFilterList] = useState<Filter[]>([]);
  const filterList = useSelector<RootState, Filter[]>(state => state.filterList)
  const dispatch = useDispatch()

  const handleFilterClick = (filter: Filter, boo: boolean) => {
    dispatch(setFilter(filter, boo))
    setShowAll(true);
  };

  const addFilter = (filter: Filter) => {
    const temp = [...enabledFilterList, filter];
    setEnabledFilterList(temp);
  };

  const removeFilter = (filter: Filter) => {
    const prevEnabledFilterList = [...enabledFilterList];
    prevEnabledFilterList.splice(prevEnabledFilterList.indexOf(filter), 1);
    if (!prevEnabledFilterList[0]) setShowAll(false);
    setEnabledFilterList(prevEnabledFilterList);
  };

  const clearAll = () => {
    dispatch(resetFilter())
    setEnabledFilterList([]);
    setShowAll(false);
  };
  return (
    <div>
      <div>
        {enabledFilterList.map((filter: Filter) =>
          <button
            key={filter.name}
            style={{ backgroundColor: "red" }}
            onClick={() => {
              handleFilterClick(filter, false);
              removeFilter(filter);
            }}>{filter.name} X</button>
        )}
      </div>
      <div>
        {filterList.map((filter: Filter) =>
          <button
            key={filter.name}
            disabled={filter.selected}
            onClick={() => {
              handleFilterClick(filter, true);
              addFilter(filter);
            }}
          >{filter.name}</button>
        )}
        {showAll ? <button onClick={clearAll}>clear all filters</button> : null}
      </div>
    </div>
  );
};

export default FilterButtonList