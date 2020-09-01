import data from "./food_data/fooddata.json";
import React, { useState, useEffect } from "react";

interface FoodItem {
  ITEM: string;
  CAL: string;
  CATEGORY: string;
  PRICE: string;
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

type ButtonProps = {
  callback: (name: string) => void;
};

const fooddata: FoodItem[] = data;

type FilterId =
  | "BURGERSANDWICH"
  | "BEVERAGE"
  | "CHICKENFISH"
  | "DESSERTSHAKE"
  | "SNACKSIDE"
  | "BREAKFAST"
  | "SHOWALL"
  | "FAVORITES";

interface Filter {
  id: FilterId;
  name: string;
  selected: boolean;
}

let defaultFilterList: Filter[] = [
  { id: "FAVORITES", name: "User Favorites", selected: false },
  { id: "BURGERSANDWICH", name: "Burger and Sandwhich", selected: false },
  { id: "BEVERAGE", name: "Beverage", selected: false },
  { id: "CHICKENFISH", name: "Chicken and Fish", selected: false },
  { id: "DESSERTSHAKE", name: "Dessert and MilkShake", selected: false },
  { id: "SNACKSIDE", name: "Snack and Side", selected: false },
  { id: "BREAKFAST", name: "Breakfast", selected: true },
];

function App() {
  const [calendar, setCalendar] = useState<CalendarItem[]>([]);
  // const [userList, setUserList] = useState<User[]>([]);
  const [filterList, setFilterList] = useState<Filter[]>(defaultFilterList);
  const [user, setUser] = useState<User>({
    id: "99",
    favList: ["0", "1", "2"],
    name: "Ugly Child",
  });

  const findCalendarItem = (item: CalendarItem, id: string) =>
    item.date === "today" && item.user === user.id && item.id === id;

  const disableCheck = (id: string): boolean => {
    const filtedItem = calendar.filter((item) => item.id === id);
    return !filtedItem[0];
  };

  const addItem = (id: string, amount: number) => {
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
      if (amount > 0) addItem(id, amount);
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

  const changeFilter1 = () => {
    let pp = [...filterList];
    setFilterList((prevState) => {
      pp[3].selected = true;
      prevState = [...pp];
      return prevState;
    });
    // console.log(filterList, "filter list");
  };
  const changeFilter2 = () => {
    let pp = [...filterList];
    setFilterList((prevState) => {
      pp[4].selected = true;
      prevState = [...pp];
      return prevState;
    });
    // console.log(filterList, "filter list");
  };

  return (
    <div>
      <span>currently logged in as: {user.name}</span>
      <h2>Food 2 today:</h2>
      <button onClick={() => console.log(user)}>click for user</button>
      <button onClick={changeFilter1}>click for user</button>
      <button onClick={changeFilter2}>click for user</button>

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
      <div style={{ backgroundColor: "lightgoldenrodyellow" }}>
        <FoodCardList
          fooddata={fooddata}
          handleClick={handleClick}
          disableCheck={disableCheck}
          user={user}
          addFav={addFav}
          filterList={filterList}
        />
      </div>
    </div>
  );
}

//******************************************************************************
//            Filter Buttons
//******************************************************************************

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
    (butty: any) => butty.ID === calendarItem.id
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
    filterCardList(filterList);
  }, [filterList]);

  useEffect(() => {}, [cardList]);

  const createCardList = (
    selectedFilterList: Filter[],
    favoritesSelected: boolean
  ) =>
    fooddata.reduce<FoodItem[]>((acc, foodItem) => {
      selectedFilterList.forEach((selecedFilter) => {
        if (selecedFilter.id === foodItem.CATEGORY) acc.push(foodItem);
        if (favoritesSelected) {
          user.favList.forEach((favItem) => {
            if (foodItem.ID === favItem) acc.push(foodItem);
          });
        }
      });
      return acc;
    }, []);

  const filterCardList = (pp: Filter[]) => {
    const selectedFilterList = pp.filter((item) => item.selected);
    const favoritesSelected = pp.some(
      (item) => item.id === "FAVORITES" && item.selected
    );
    const filterFoodList: FoodItem[] = [];
    if (selectedFilterList.length === 0) {
      return;
    } else if (selectedFilterList.length !== 0) {
      let newlist: FoodItem[] = createCardList(
        selectedFilterList,
        favoritesSelected
      );
      setCardList(newlist);
    }
  };

  return (
    <div>
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
