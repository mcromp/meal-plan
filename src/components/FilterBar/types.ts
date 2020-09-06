import { Filter } from "../../types";

export interface FilterButtonListProps {
  filterList: Filter[];
  setFilterList: (filterList: Filter[]) => void;
}
