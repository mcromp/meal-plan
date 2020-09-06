import { Filter } from "../../types";
import React, { useState } from "react";

interface FilterButtonListProps {
    filterList: Filter[],
    setFilterList: (filterList: Filter[]) => void;
}

const FilterButtonList: React.FC<FilterButtonListProps> = ({ filterList, setFilterList }) => {
    const [showAll, setShowAll] = useState<boolean>(false);
    const [enabledFilterList, setEnabledFilterList] = useState<Filter[]>([]);

    const clearAll = () => {
        const resetFilterList = filterList.map((filter: Filter) => {
            filter.selected = false;
            return filter;
        });
        setFilterList(resetFilterList);
        setEnabledFilterList([]);
        setShowAll(false);
    };

    const setFilter = (filter: Filter, boo: boolean) => {
        const prevState = [...filterList];
        prevState[prevState.indexOf(filter)].selected = boo;
        setFilterList(prevState);
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
            {enabledFilterList.map((filter: Filter) => {
                return (
                    <button
                        key={filter.name}
                        style={{ backgroundColor: "red" }}
                        onClick={() => {
                            setFilter(filter, false);
                            removeFilter(filter);
                        }}
                    >
                        {filter.name} X
                    </button>
                );
            })}
            <br />
            <hr />
            {filterList.map((filter: Filter) => (
                <button
                    onClick={() => {
                        setFilter(filter, true);
                        addFilter(filter);
                    }}
                    key={filter.name}
                    disabled={filter.selected}
                >
                    {filter.name}
                </button>
            ))}
            {showAll ? <button onClick={clearAll}>clear all filters</button> : null}
        </div>
    );
};

export default FilterButtonList