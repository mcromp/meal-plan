// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { RootState } from "../../redux";
// import { MenuItem } from "../../redux/menuList/menuList";
// import { CalendarMenuItem } from "../Day";
// import { Filter, FilterId } from "../FilterBar/types";
export const dummy = () => { }
// const MenuBoard: React.FC<MenuBoardProps> = ({
//   addCheckOutBoardItem,
//   checkoutBoardItems
// }) => {
//   const filterList = useSelector<RootState, Filter[]>(state => state.filterList);
//   // const menuList = useSelector<RootState, MenuItem[]>(state => state.menuList.data);
//   const [cardList, setCardList] = useState<MenuItem[] | null>(null);

//   useEffect(() => {
//     const filterCardList = () => {
//       let cardArr: MenuItem[] = [];

//       const selectedFilterIdList = filterList.reduce<FilterId[]>((acc, filter) => {
//         if (filter.selected) acc.push(filter.id)
//         return acc
//       }, []);

//       selectedFilterIdList.length === 0
//         ? (cardArr = menuList)
//         : (cardArr = createCardList(selectedFilterIdList));

//       setCardList(cardArr);
//     };

//     const createCardList = (selectedFilterIdList: FilterId[]) =>
//       menuList.reduce<MenuItem[]>((acc, food) => {
//         const foodCategory = food.CATEGORY as FilterId;
//         if (
//           selectedFilterIdList.includes(foodCategory)
//           // (favList.includes(food.ID) &&
//           //   selectedFilterIdList.includes("FAVORITES"))
//         ) acc.push(food);
//         return acc;
//       }, []);

//     setCardList([]);
//     filterCardList();
//   }, [filterList, menuList]);



//   const disableCheck = (id: string): boolean => {
//     return checkoutBoardItems ?
//       (checkoutBoardItems.some((item: CalendarMenuItem) => item.foodId === id))
//       : false
//   };

//   return (
//     <div className="grid_i">
//       {cardList && cardList.map((item: MenuItem) => (
//         <div key={item.ID}>
//           <span>{item.ITEM}</span>
//           <button disabled={disableCheck(item.ID)} onClick={() => addCheckOutBoardItem(item)} >Add</button>
//           <button>{}</button>
//         </div>
//       ))}
//     </div>
//   );
// };

// interface MenuBoardProps {
//   addCheckOutBoardItem: (item: MenuItem) => void,
//   checkoutBoardItems: CalendarMenuItem[]
// }
// export default MenuBoard