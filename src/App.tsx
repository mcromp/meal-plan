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
      <div
        style={{
          backgroundColor: "pink",
        }}
      >
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
//            Search Bar
//******************************************************************************

//******************************************************************************
//            Filter Buttons
//******************************************************************************

const FilterButtonList: React.FC<any> = ({ filterList, setFilterList }) => {
  const [showAll, setShowAll] = useState<boolean>(false);
  const [enabledFilterList, setEnabledFilterList] = useState<Filter[]>([]);

  const clearAll = () => {
    const resetFilterList = filterList.map((filter: Filter) => {
      filter.selected = false;
      return filter;
    });
    setFilterList(resetFilterList);
    setEnabledFilterList([]);
    setShowAll(false);
  };

  const setFilter = (filter: Filter, boo: boolean) => {
    let prevState = [...filterList];
    prevState[prevState.indexOf(filter)].selected = boo;
    setFilterList(prevState);
    setShowAll(true);
  };

  const addFilter = (filter: Filter) => {
    let temp = [...enabledFilterList, filter];
    setEnabledFilterList(temp);
  };

  const removeFilter = (filter: Filter) => {
    const prevEnabledFilterList = [...enabledFilterList];
    prevEnabledFilterList.splice(prevEnabledFilterList.indexOf(filter), 1);
    if (!prevEnabledFilterList[0]) setShowAll(false);
    setEnabledFilterList(prevEnabledFilterList);
  };

  return (
    <div>
      {enabledFilterList.map((filter: Filter) => {
        return (
          <button
            key={filter.name}
            style={{ backgroundColor: "red" }}
            onClick={() => {
              setFilter(filter, false);
              removeFilter(filter);
            }}
          >
            {filter.name} X
          </button>
        );
      })}
      <br />
      <hr />

      {filterList.map((filter: Filter) => (
        <button
          onClick={() => {
            setFilter(filter, true);
            addFilter(filter);
          }}
          key={filter.name}
          disabled={filter.selected}
        >
          {filter.name}
        </button>
      ))}
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
  calendarItem,
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
  filterList,
  user,
  handleClick,
  disableCheck,
  addFav,
}) => {
  const [cardList, setCardList] = useState(fooddata);

  useEffect(() => {
    const filterCardList = () => {
      let tempArr: FoodItem[] = [];

      let selectedFilterIdList = filterList.reduce<FilterId[]>((acc, item) => {
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
        let foodCategory = food.CATEGORY as FilterId;
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

  return (
    <div
      style={{
        backgroundColor: "darkcyan",
      }}
    >
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
