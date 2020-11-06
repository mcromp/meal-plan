import React from 'react';

const AddFoodItem: React.FC<AddFoodItemProps> = ({ setIsAddModalShown }) => {
  return (
    <div className="food-item add-food-item" onClick={() => setIsAddModalShown(true)}>
      <span className="food-item__title add-food-item__title">Add your own menu item!</span>
      <div className="add-food-item__icon">+</div>
    </div >
  )
};

type AddFoodItemProps = {
  setIsAddModalShown: (bool: boolean) => void;
}

export default AddFoodItem;