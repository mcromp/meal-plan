import { Filter } from "../../types";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFilter, resetFilter } from "../../redux/filterList";

const FilterButtonList: React.FC = () => {
    const [showAll, setShowAll] = useState<boolean>(false);
    const [enabledFilterList, setEnabledFilterList] = useState<Filter[]>([]);
    const filterList = useSelector<any, Filter[]>(state => state.filterList)
    const dispatch = useDispatch()
    const clearAll = () => {
        dispatch(resetFilter())
        setEnabledFilterList([]);
        setShowAll(false);
    };

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

    return (
        <div>
            {enabledFilterList.map((filter: Filter) =>
                <button
                    key={filter.name}
                    style={{ backgroundColor: "red" }}
                    onClick={() => {
                        handleFilterClick(filter, false);
                        removeFilter(filter);
                    }}>{filter.name} X</button>)
            }
            {filterList.map((filter: Filter) => (
                <button
                    onClick={() => {
                        handleFilterClick(filter, true);
                        addFilter(filter);
                    }}
                    key={filter.name}
                    disabled={filter.selected}
                >{filter.name}</button>
            ))}
            {showAll ? <button onClick={clearAll}>clear all filters</button> : null}
        </div>
    );
};

export default FilterButtonList