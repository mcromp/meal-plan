import React from 'react'
import { MenuCardProps } from './types';
import { useSelector, useDispatch } from 'react-redux';
import { removeFav, addFav } from '../../redux/favList';
import { RootState } from '../../redux';

const MenuCard: React.FC<MenuCardProps> = ({
  item,
  addCalendar,
  disableCheck,
}) => {
  const favList = useSelector<RootState, string[]>(state => state.favList)
  const dispatch = useDispatch()

  const toggleFav = (id: string) => {
    if (favList.includes(id)) dispatch(removeFav(id))
    else dispatch(addFav(id))
  };
  return (
    <div style={{ backgroundColor: "mediumpurple" }}>
      <span>{item.ITEM}</span>
      <button onClick={() => addCalendar(item.ID, 1)}>plus 1</button>
      <button
        onClick={() => addCalendar(item.ID, -1)}
        disabled={disableCheck(item.ID)}>
        minus 1
            </button>
      <button onClick={() => toggleFav(item.ID)}>
        {favList.includes(item.ID) ? "💟" : "♡"}
      </button>
    </div >
  );
};

export default MenuCard