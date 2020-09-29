// import React, { useState, useEffect } from "react";
// import MenuCard from "./MenuCard";
// import { MenuBoardProps } from "./types";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../../redux";
// import { fetchMenuList, MenuItem } from "../../redux/menuList/menuList";
// import { Filter, FilterId } from "../FilterBar/types";

export const aa = () => { }

// const MenuBoard: React.FC<MenuBoardProps> = ({
//   handleClick,
//   calendar,
// }) => {
//   const [cardList, setCardList] = useState<MenuItem[] | null>(null);
//   const filterList = useSelector<RootState, Filter[]>(state => state.filterList)
//   const menuList = useSelector<RootState, MenuItem[]>(state => state.menuList.data)
//   const dispatch = useDispatch()


//   useEffect(() => {
//     if (menuList.length === 0) dispatch(fetchMenuList())
//     setCardList(menuList)
//   }, [menuList, dispatch])

// useEffect(() => {
//   const filterCardList = () => {
//     let tempArr: MenuItem[] = [];

//     const selectedFilterIdList = filterList.reduce<FilterId[]>((acc, item) => {
//       if (item.selected) acc.push(item.id);
//       return acc;
//     }, []);

//     selectedFilterIdList.length <= 0
//       ? (tempArr = menuList)
//       : (tempArr = createCardList(selectedFilterIdList));

//     setCardList(tempArr);
//   };

// const createCardList = (selectedFilterIdList: FilterId[]) =>
//   menuList.reduce<MenuItem[]>((acc, food) => {
//     const foodCategory = food.CATEGORY as FilterId;
//     if (
//       selectedFilterIdList.includes(foodCategory) ||
//       (favList.includes(food.ID) &&
//         selectedFilterIdList.includes("FAVORITES"))
//     ) acc.push(food);
//     return acc;
//   }, []);

//   setCardList([]);
//   filterCardList();
// }, [filterList, menuList]);


// const disableCheck = (id: string): boolean => {
//   const filtedItem = calendar.filter((item) => item.id === id);
//   return !filtedItem[0];
// };

// return (
//   <div className="grid_i">
//     {cardList ? cardList.map((item: MenuItem) => (
      // <MenuCard
      //   key={item.ID}
      //   item={item}
      //   addCalendar={handleClick}
      //   disableCheck={disableCheck}
      // />
//       <p>fix this</p>
//     )
//     ) : null}
//   </div>
// );
// };

// export default MenuBoard