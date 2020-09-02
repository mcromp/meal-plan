import React, { useState, useEffect } from "react";
import data from "./food_data/fooddata.json";

interface FoodItem {
  ITEM: string;
  CAL: string;
  PRICE: string;
  CATEGORY: string;
  ID: string;
}

interface User {
  id: string;
  favList: string[];
  name: string;
}

interface CalendarItem {
  id: string;
  date: string;
  quantity: number;
  user: string;
}

type FilterId =
  | "BURGERSANDWICH"
  | "BEVERAGE"
  | "CHICKENFISH"
  | "DESSERTSHAKE"
  | "SNACKSIDE"
  | "BREAKFAST"
  | "FAVORITES";

interface Filter {
  id: FilterId;
  name: string;
  selected: boolean;
}

let fooddata: any[] = data;

let defaultFilterList: Filter[] = [
  { id: "FAVORITES", name: "User Favorites", selected: false },
  { id: "BURGERSANDWICH", name: "Burger and Sandwhich", selected: false },
  { id: "BEVERAGE", name: "Beverage", selected: false },
  { id: "CHICKENFISH", name: "Chicken and Fish", selected: false },
  { id: "DESSERTSHAKE", name: "Dessert and MilkShake", selected: false },
  { id: "SNACKSIDE", name: "Snack and Side", selected: false },
  { id: "BREAKFAST", name: "Breakfast", selected: false },
];

function App() {
  const [calendar, setCalendar] = useState<CalendarItem[]>([]);
  const [filterList, setfilterList] = useState<Filter[]>(defaultFilterList);
  const [user, setUser] = useState<User>({
    id: "99",
    favList: ["0"],
    name: "Ugly Child",
  });

  const findCalendarItem = (item: CalendarItem, id: string) =>
    item.date === "today" && item.user === user.id && item.id === id;

  const disableCheck = (id: string): boolean => {
    const filtedItem = calendar.filter((item) => item.id === id);
    return !filtedItem[0];
  };

  const addToCalendar = (id: string, amount: number) => {
    const newCalendarItem: CalendarItem = {
      id,
      date: "today",
      quantity: amount,
      user: user.id,
    };
    setCalendar((prevState) => [...prevState, newCalendarItem]);
  };

  const removeItem = (id: string) => {
    const filteredCalendar = calendar.filter((item) => item.id !== id);
    setCalendar([...filteredCalendar]);
  };

  const handleClick = (id: string, amount: number) => {
    let selectedItemId = calendar.findIndex((item) =>
      findCalendarItem(item, id)
    );
    if (selectedItemId === -1) {
      if (amount > 0) addToCalendar(id, amount);
    } else {
      let updatedQuantity = calendar[selectedItemId].quantity + amount;
      if (updatedQuantity <= 0) {
        removeItem(id);
      } else {
        setCalendar((prevState) => {
          const newState = [...prevState];
          newState[selectedItemId].quantity = updatedQuantity;
          return newState;
        });
      }
    }
  };

  const addFav = (id: string) => {
    let i = user.favList.indexOf(id);
    let tempArr = { ...user };
    if (i === -1) {
      tempArr.favList.push(id);
    } else {
      tempArr.favList.splice(i, 1);
    }
    setUser(tempArr);
  };

  return (
    <div>
      <span>currently logged in as: {user.name}</span>
      <h2>Food 2 today:</h2>
      <button onClick={() => console.log(user)}>click for user</button>
      <FilterButtonList filterList={filterList} setFilterList={setfilterList} />
      <div style={{ backgroundColor: "pink" }}>
        {calendar.map((calendarItem) => (
          <DayItem
            key={calendarItem.id}
            calendarItem={calendarItem}
            fooddata={fooddata}
            removeItem={removeItem}
            addCalendar={handleClick}
          />
        ))}
      </div>
      <FoodCardList
        fooddata={fooddata}
        handleClick={handleClick}
        disableCheck={disableCheck}
        user={user}
        addFav={addFav}
        filterList={filterList}
      />
    </div>
  );
}

//******************************************************************************
//            Filter Buttons
//******************************************************************************

const FilterButtonList: React.FC<any> = ({ filterList, setFilterList }) => {
  const [showAll, setShowAll] = useState<boolean>(false);

  const clearAll = () => {
    let pp = filterList.map((x: Filter) => {
      x.selected = false;
      return x;
    });
    setFilterList(pp);
    setShowAll(false);
  };

  const handleClick = (thang: Filter) => {
    let xx = [...filterList];
    let i = xx.indexOf(thang);
    xx[i].selected = !xx[i].selected;
    console.log(xx);
    setFilterList(xx);
    setShowAll(true);
  };
  return (
    <div>
      {filterList.map((x: Filter) => {
        return (
          <button
            onClick={() => handleClick(x)}
            key={x.name}
            disabled={x.selected}
          >
            {x.name}
          </button>
        );
      })}
      {showAll ? <button onClick={clearAll}>clear all filters</button> : null}
    </div>
  );
};

//******************************************************************************
//            DAY ITEM
//******************************************************************************

interface DayItemProps {
  calendarItem: CalendarItem;
  removeItem: (id: string) => void;
  fooddata: FoodItem[];
  addCalendar: (id: string, number: number) => void;
}

const DayItem: React.FC<DayItemProps> = ({
  calendarItem: calendarItem,
  removeItem,
  fooddata,
  addCalendar,
}) => {
  const foodItemId = fooddata.findIndex(
    (butt: any) => butt.ID === calendarItem.id
  );
  const foodItem = fooddata[foodItemId];
  return (
    <div key={foodItem.ID}>
      <h1>{foodItem.ITEM}</h1>
      <h3>{calendarItem.quantity}</h3>
      <button onClick={() => removeItem(calendarItem.id)}>Remove Item</button>
      <button onClick={() => addCalendar(calendarItem.id, 1)}>+1</button>
      <button onClick={() => addCalendar(calendarItem.id, -1)}>-1</button>
    </div>
  );
};

//******************************************************************************
//            FOOD CARD
//******************************************************************************

interface FoodCardListProps {
  fooddata: FoodItem[];
  filterList: Filter[];
  user: User;
  handleClick: (id: string, number: number) => void;
  disableCheck: (id: string) => boolean | undefined;
  addFav: (id: string) => void;
}

const FoodCardList: React.FC<FoodCardListProps> = ({
  fooddata,
  filterList: filterList,
  user,
  handleClick,
  disableCheck,
  addFav,
}) => {
  const [cardList, setCardList] = useState(fooddata);

  useEffect(() => {
    setCardList([]);
    filterCardList();
  }, [filterList]);

  const filterCardList = () => {
    let tempArr: FoodItem[] = [];
    let selectedFilterIdList = filterList.reduce<FilterId[]>((acc, item) => {
      if (item.selected) acc.push(item.id);
      return acc;
    }, []);

    if (selectedFilterIdList.length <= 0) {
      tempArr = fooddata;
    } else {
      tempArr = createCardList(selectedFilterIdList);
    }

    setCardList(tempArr);
  };

  const createCardList = (selectedFilterIdList: FilterId[]) =>
    fooddata.reduce<FoodItem[]>((acc, food) => {
      let foodCategory = food.CATEGORY as FilterId;
      if (
        selectedFilterIdList.includes(foodCategory) ||
        (user.favList.includes(food.ID) &&
          selectedFilterIdList.includes("FAVORITES"))
      )
        acc.push(food);
      return acc;
    }, []);

  return (
    <div style={{ backgroundColor: "darkcyan" }}>
      {cardList.map((item) => {
        return (
          <FoodCard
            key={item.ID}
            item={item}
            addCalendar={handleClick}
            disableCheck={disableCheck}
            user={user}
            addFav={addFav}
          />
        );
      })}
    </div>
  );
};

interface FoodCardProps {
  item: FoodItem;
  addCalendar: (id: string, number: number) => void;
  disableCheck: (id: string) => boolean | undefined;
  user: User;
  addFav: (id: string) => void;
}

const FoodCard: React.FC<FoodCardProps> = ({
  item,
  addCalendar,
  disableCheck,
  user,
  addFav,
}) => {
  return (
    <div>
      <hr />
      <br />
      <span>{item.ITEM}</span>
      <button onClick={() => addCalendar(item.ID, 1)}>plus 1</button>
      <button
        onClick={() => addCalendar(item.ID, -1)}
        disabled={disableCheck(item.ID)}
      >
        minus 1
      </button>
      <br />
      <button onClick={() => addFav(item.ID)}>
        {user.favList.includes(item.ID) ? "💟" : "♡"}
      </button>
    </div>
  );
};

export default App;
