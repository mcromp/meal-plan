import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux";
import { fetchHelper } from "../../redux/fetchHelper/fetchHelper";
import { ReqType } from "../../redux/fetchHelper/types";
import { MenuItemJSON, User } from "../../shared/types";
import HeartIcon from "../../assets/HeartIcon";

const FoodItem: React.FC<FoodItemProps> = ({
  item,
  addCheckoutItem,
  disableCheck,
}) => {
  const { favList, id: userId } = useSelector<RootState, User>(state => state.currentUser);
  const [isFav, setIsFav] = useState<boolean>(favList.includes(item.ID));
  const [isDisabled, setIsDisabled] = useState<boolean>();
  const dispatch = useDispatch()

  useEffect(() => {
    setIsDisabled(disableCheck(item.ID));
  }, [disableCheck, item.ID]);

  const toggleFav = () => {
    const body = {
      userId,
      itemId: item.ID
    }
    isFav ? dispatch(fetchHelper(ReqType.reqRemoveFav, body))
      : dispatch(fetchHelper(ReqType.reqAddFav, body));
    setIsFav(prevState => !prevState);
  };


  return (
    <div className={isDisabled ? "food-item--disabled" : "food-item"}>
      <span className="food-item__title">{item.ITEM}</span>
      <div className="food-item__button">
        <button className="food-item__button--add" disabled={isDisabled} onClick={() => addCheckoutItem(item)} >+</button>
        <button className={isFav ? "food-item__heart--fav" : "food-item__heart"} onClick={toggleFav}><HeartIcon /></button>
      </div>
    </div >
  );
};

type FoodItemProps = {
  item: MenuItemJSON,
  addCheckoutItem: (item: MenuItemJSON) => void,
  disableCheck: (id: string) => boolean
};

export default FoodItem;