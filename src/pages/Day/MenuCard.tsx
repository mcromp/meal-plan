import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux";
import { fetchHelper } from "../../redux/fetchHelper/fetchHelper";
import { ReqType } from "../../redux/fetchHelper/types";
import { MenuItemJSON, User } from "../../shared/types";

const MenuCard: React.FC<MenuCardProps> = ({
  item,
  addCheckOutBoardItem,
  disableCheck,
}) => {
  const { favList, id: userId } = useSelector<RootState, User>(state => state.currentUser)
  const [isFav, setIsFav] = useState<boolean>(favList.includes(item.ID))
  const [isDisabled, setIsDisabled] = useState<boolean>();
  const dispatch = useDispatch()

  useEffect(() => {
    setIsDisabled(disableCheck(item.ID))
  }, [disableCheck, item.ID])

  const toggleFav = () => {
    const body = {
      userId,
      itemId: item.ID
    }
    isFav ? dispatch(fetchHelper(ReqType.reqRemoveFav, body))
      : dispatch(fetchHelper(ReqType.reqAddFav, body))
    setIsFav(prevState => !prevState)
  };


  return (
    <div className={isDisabled ? "menu-card--disabled" : "menu-card"} >
      <span className="title">{item.ITEM}</span>
      <button className="add" disabled={isDisabled} onClick={() => addCheckOutBoardItem(item)} >+</button>
      <button className={isFav ? "heart--fav" : "heart"} onClick={toggleFav} >
        <span >♡</span>
      </button>
    </div >
  );
};

type MenuCardProps = {
  item: MenuItemJSON,
  addCheckOutBoardItem: (item: MenuItemJSON) => void,
  disableCheck: (id: string) => boolean
}

export default MenuCard