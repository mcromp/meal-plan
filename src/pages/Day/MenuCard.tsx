import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux";
import { fetchHelper } from "../../redux/fetchHelper/fetchHelper";
import { ReqType } from "../../redux/fetchHelper/types";
import { User } from "../../shared/types";


const MenuCard: React.FC<any> = ({
  item,
  addCheckOutBoardItem,
  disableCheck,
}) => {
  const { favList, id: userId } = useSelector<RootState, User>(state => state.currentUser)
  const [isFav, setIsFav] = useState<boolean>(favList.includes(item.ID))
  const dispatch = useDispatch()

  const toggleFav = () => {
    const body = {
      userId,
      itemId: item.ID
    }
    !isFav ? dispatch(fetchHelper(ReqType.reqAddFav, body))
      : dispatch(fetchHelper(ReqType.reqRemoveFav, body))
    setIsFav(prevState => !prevState)
  };


  return (
    <div style={{ backgroundColor: "mediumpurple" }}>
      <span>{item.ITEM}</span>
      <button disabled={disableCheck(item.ID)} onClick={() => addCheckOutBoardItem(item)} >Add</button>
      <button onClick={toggleFav}>
        {isFav ? "💟" : "♡"}
      </button>
    </div >
  );
};

export default MenuCard