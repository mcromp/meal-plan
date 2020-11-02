import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux';
import { CalendarMenuItem, MenuItemJSON } from '../../shared/types';


const CheckoutItem: React.FC<CheckoutItemProps> = ({
  item,
  modifyQuantityOfCheckoutItem,
  removeFromCheckout
}) => {
  const menuList = useSelector<RootState, MenuItemJSON[]>(state => state.menuList);
  const [name, setName] = useState<string>("");

  useEffect(() => {
    const findName = menuList.find(i => i.id === item.foodId);
    if (findName) setName(findName?.item);
  }, [menuList, item.foodId]);


  return (
    <div className="checkout-item">
      <span className="checkout-item__name">{name}</span>
      <span className="checkout-item__quantity">{item.quantity}</span>
      <div className="checkout-item__buttons">
        <button className="button--checkout-item" onClick={() => modifyQuantityOfCheckoutItem(item, 1)}>+</button>
        <button className="button--checkout-item" onClick={() => modifyQuantityOfCheckoutItem(item, -1)}>-</button>
        <button className="button--checkout-item" onClick={() => removeFromCheckout(item)}>remove</button>
      </div>
    </div>
  );
};

type CheckoutItemProps = {
  item: CalendarMenuItem;
  modifyQuantityOfCheckoutItem: (item: CalendarMenuItem, amount: number) => void;
  removeFromCheckout: (item: CalendarMenuItem) => void
};

export default CheckoutItem;