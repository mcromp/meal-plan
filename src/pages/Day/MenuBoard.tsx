import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux";
import { fetchHelper } from "../../redux/fetchHelper/fetchHelper";
import { ReqType } from "../../redux/fetchHelper/types";
import { Filter, MenuItemJSON, User, FilterId, CalendarMenuItem } from "../../shared/types";
import MenuCard from "./MenuCard";


const MenuBoard: React.FC<MenuBoardProps> = ({
  addCheckOutBoardItem,
  checkoutBoardItems
}) => {
  const filterList = useSelector<RootState, Filter[]>(state => state.filterList);
  const menuList = useSelector<RootState, MenuItemJSON[]>(state => state.menuList);
  const [cardList, setCardList] = useState<MenuItemJSON[] | null>(null);
  const { favList, id: userId } = useSelector<RootState, User>(state => state.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const filterCardList = () => {
      let cardArr: MenuItemJSON[] = [];
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
      menuList.reduce<MenuItemJSON[]>((acc, food) => {
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
    dispatch(fetchHelper(ReqType.reqGetUser, "", userId))
  }, [dispatch, userId]);


  const disableCheck = (id: string): boolean => {
    return checkoutBoardItems ?
      (checkoutBoardItems.some((item: CalendarMenuItem) => item.foodId === id))
      : false
  };

  return (
    <div className="menu-container">
      {cardList && cardList.map((item: MenuItemJSON) => (
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
  addCheckOutBoardItem: (item: MenuItemJSON) => void,
  checkoutBoardItems: CalendarMenuItem[]
};

export default MenuBoard;