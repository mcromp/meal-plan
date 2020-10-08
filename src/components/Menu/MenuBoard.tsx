import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux";
import { fetchDispatch, reqGetUser } from "../../redux/helpers/fetchDispatch";
import { MenuItem } from "../../redux/modules/menuList";
import { User } from "../../redux/modules/users";
import { CalendarMenuItem } from "../Day";
import { Filter, FilterId } from "../FilterBar/types";
import MenuCard from "./MenuCard";

const MenuBoard: React.FC<MenuBoardProps> = ({
  addCheckOutBoardItem,
  checkoutBoardItems
}) => {
  const filterList = useSelector<RootState, Filter[]>(state => state.filterList);
  const menuList = useSelector<RootState, MenuItem[]>(state => state.menuList);
  const [cardList, setCardList] = useState<MenuItem[] | null>(null);
  const { favList, id: userId } = useSelector<RootState, User>(state => state.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const filterCardList = () => {
      let cardArr: MenuItem[] = [];
      const selectedFilterIdList = filterList.reduce<FilterId[]>((acc, filter) => {
        if (filter.selected) acc.push(filter.id)
        return acc
      }, []);



      selectedFilterIdList.length === 0
        ? (cardArr = menuList)
        : (cardArr = createCardList(selectedFilterIdList));

      setCardList(cardArr);
    };

    const createCardList = (selectedFilterIdList: FilterId[]) =>
      menuList.reduce<MenuItem[]>((acc, food) => {
        const foodCategory = food.CATEGORY as FilterId;
        if (
          selectedFilterIdList.includes(foodCategory) ||
          (favList.includes(food.ID) &&
            selectedFilterIdList.includes("FAVORITES"))
        ) acc.push(food);
        return acc;
      }, []);

    setCardList([]);
    filterCardList();
  }, [filterList, menuList, favList]);

  useEffect(() => {
    dispatch(fetchDispatch(reqGetUser, null, userId))
  }, [dispatch, userId])


  const disableCheck = (id: string): boolean => {
    return checkoutBoardItems ?
      (checkoutBoardItems.some((item: CalendarMenuItem) => item.foodId === id))
      : false
  };

  return (
    <div className="grid_i">
      {cardList && cardList.map((item: MenuItem) => (
        <MenuCard
          key={item.ID}
          item={item}
          addCheckOutBoardItem={addCheckOutBoardItem}
          disableCheck={disableCheck} />
      ))}
    </div>
  );
};

type MenuBoardProps = {
  addCheckOutBoardItem: (item: MenuItem) => void,
  checkoutBoardItems: CalendarMenuItem[]
}
export default MenuBoard