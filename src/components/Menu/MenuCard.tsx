import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux';
import { fetchDispatch, reqAddFav, reqRemoveFav } from '../../redux/fetchDispatch/fetchDispatch';
import { User } from '../../redux/users/users';

const MenuCard: React.FC<any> = ({
  item,
  addCheckOutBoardItem,
  disableCheck,
}) => {
  const { favList, id: userId } = useSelector<RootState, User>(state => state.currentUser)
  const [isFav, setIsFav] = useState<boolean>(favList.includes(item.ID))
  const dispatch = useDispatch()

  useEffect(() => {
  }, [isFav])

  const toggleFav = () => {
    const body = {
      userId,
      itemId: item.ID
    }
    !isFav ? dispatch(fetchDispatch(reqAddFav, body))
      : dispatch(fetchDispatch(reqRemoveFav, body))
    setIsFav(prevState => !prevState)
  };


  return (
    <div style={{ backgroundColor: "mediumpurple" }}>
      <span>{item.ITEM}</span>
      <button onClick={() => addCheckOutBoardItem(item.ID, 1)}>plus 1</button>
      <button
        onClick={() => addCheckOutBoardItem(item.ID, -1)}
        disabled={disableCheck(item.ID)}>
        minus 1
            </button>
      <button onClick={toggleFav}>
        {isFav ? "💟" : "♡"}
      </button>
      <span>hello is this thing on?</span>
    </div >
  );
};

export default MenuCard