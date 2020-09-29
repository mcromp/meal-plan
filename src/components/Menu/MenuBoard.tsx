import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux";
import { MenuItem } from "../../redux/menuList/menuList";
import { Filter } from "../FilterBar/types";

const MenuBoard: React.FC<any> = ({
  addCheckOutBoardItem
}) => {
  // const [cardList, setCardList] = useState<MenuItem[] | null>(null);
  // const filterList = useSelector<RootState, Filter[]>(state => state.filterList)
  const menuList = useSelector<RootState, MenuItem[]>(state => state.menuList.data)
  const dispatch = useDispatch()


  // useEffect(() => {
  //   if (menuList.length === 0) dispatch(fetchMenuList())
  //   setCardList(menuList)
  // }, [menuList, dispatch])

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

  //   const createCardList = (selectedFilterIdList: FilterId[]) =>
  //     menuList.reduce<MenuItem[]>((acc, food) => {
  //       const foodCategory = food.CATEGORY as FilterId;
  //       if (
  //         selectedFilterIdList.includes(foodCategory) ||
  //         (favList.includes(food.ID) &&
  //           selectedFilterIdList.includes("FAVORITES"))
  //       ) acc.push(food);
  //       return acc;
  //     }, []);

  //   setCardList([]);
  //   filterCardList();
  // }, [filterList, menuList]);


  // const disableCheck = (id: string): boolean => {
  //   const filtedItem = calendar.filter((item) => item.id === id);
  //   return !filtedItem[0];
  // };

  return (
    <div className="grid_i">
      {menuList ? menuList.map((item: MenuItem) => (
        <div key={item.ID}>
          <span>{item.ITEM}</span>
          <button onClick={() => addCheckOutBoardItem(item)} >Add 2 checkout</button>
        </div>
      )) : null}
    </div>
  );
};

export default MenuBoard