import React from 'react';

const AddFoodItem: React.FC<any> = ({ setIsAddModalShown }) => {
  return (
    <div className="food-item food-item--add">
      <span className="food-item__title food-item__title--add-item">Add your own menu item!</span>
      <button className="food-item__button--add-item" onClick={() => setIsAddModalShown(true)}>+</button>
    </div>
  )
};


export default AddFoodItem;