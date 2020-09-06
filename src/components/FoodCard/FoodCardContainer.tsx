import { FoodItem, Filter, User, FilterId } from "../../types";
import React, { useState, useEffect } from "react";
import FoodCard from "./FoodCard";
import { FoodCardListProps } from "./types";


const FoodCardList: React.FC<FoodCardListProps> = ({
    fooddata,
    filterList,
    user,
    handleClick,
    calendar,
    toggleFav,
}) => {
    const [cardList, setCardList] = useState(fooddata);

    useEffect(() => {
        const filterCardList = () => {
            let tempArr: FoodItem[] = [];

            const selectedFilterIdList = filterList.reduce<FilterId[]>((acc, item) => {
                if (item.selected) acc.push(item.id);
                return acc;
            }, []);

            selectedFilterIdList.length <= 0
                ? (tempArr = fooddata)
                : (tempArr = createCardList(selectedFilterIdList));

            setCardList(tempArr);
        };

        const createCardList = (selectedFilterIdList: FilterId[]) =>
            fooddata.reduce<FoodItem[]>((acc, food) => {
                const foodCategory = food.CATEGORY as FilterId;
                if (
                    selectedFilterIdList.includes(foodCategory) ||
                    (user.favList.includes(food.ID) &&
                        selectedFilterIdList.includes("FAVORITES"))
                )
                    acc.push(food);
                return acc;
            }, []);

        setCardList([]);
        filterCardList();
    }, [filterList, fooddata, user.favList]);


    const disableCheck = (id: string): boolean => {
        const filtedItem = calendar.filter((item) => item.id === id);
        return !filtedItem[0];
    };

    return (
        <div className="grid_i">
            {cardList.map((item) => {
                return (
                    <FoodCard
                        key={item.ID}
                        item={item}
                        addCalendar={handleClick}
                        disableCheck={disableCheck}
                        user={user}
                        toggleFav={toggleFav}
                    />
                );
            })}
        </div>
    );
};

export default FoodCardList