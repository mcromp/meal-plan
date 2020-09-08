import { FoodItem, FilterId, Filter } from "../../types";
import React, { useState, useEffect } from "react";
import FoodCard from "./FoodCard";
import { FoodCardListProps } from "./types";
import { useSelector } from "react-redux";


const FoodCardList: React.FC<FoodCardListProps> = ({
    fooddata,
    handleClick,
    calendar,
}) => {
    const [cardList, setCardList] = useState(fooddata);
    const favList = useSelector<any, any>(state => state.favList)
    const filterList = useSelector<any, Filter[]>(state => state.filterList)
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
                    (favList.includes(food.ID) &&
                        selectedFilterIdList.includes("FAVORITES"))
                )
                    acc.push(food);
                return acc;
            }, []);

        setCardList([]);
        filterCardList();
    }, [filterList, fooddata, favList]);


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
                    />
                );
            })}
        </div>
    );
};

export default FoodCardList