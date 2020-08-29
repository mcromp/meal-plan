import data from "./food_data/fooddata.json";
import React, { useState } from "react";

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

enum FiltersTypes {
  ShowAll = "SHOWALL",
  Favorites = "FAVORITES",
  BurgerSandwich = "BURGERSANDWICH",
  Beverage = "BEVERAGE",
  ChickenFish = "CHICKENFISH",
  DessertShake = "DESSERTSHAKE",
  SnackSide = "SNACKSIDE",
  Breakfast = "BREAKFAST",
}

function App() {
  const [calendar, setCalendar] = useState<CalendarItem[]>([]);
  // const [userList, setUserList] = useState<User[]>([]);
  const [currentFilter, setCurrentFilter] = useState<FiltersTypes>(
    FiltersTypes.ShowAll
  );
  const [user, setUser] = useState<User>({
    id: "99",
    favList: [],
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
    if (i === -1) {
      setUser((prevState) => {
        let tempArr = { ...prevState };
        tempArr.favList.push(id);
        return tempArr;
      });
    } else {
      setUser((prevState) => {
        let tempArr = { ...prevState };
        tempArr.favList.splice(i, 1);
        return tempArr;
      });
    }
  };

  const setFilter = (filter: FiltersTypes) => {
    console.log(filter);
    setCurrentFilter(filter);
  };

  return (
    <div>
      <span>currently logged in as: {user.name}</span>
      <h2>Food 2 today:</h2>

      <FilterButtonList currentFilter={currentFilter} handleClick={setFilter} />

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
          currentFilter={currentFilter}
          user={user}
          addFav={addFav}
        />
      </div>
    </div>
  );
}

//******************************************************************************
//            Filter Buttons
//******************************************************************************

interface FilterButtonListProps {
  currentFilter: FiltersTypes;
  handleClick: (filter: FiltersTypes) => void;
}

const FilterButtonList: React.FC<FilterButtonListProps> = ({
  currentFilter,
  handleClick,
}) => {
  return (
    <div>
      <button onClick={() => handleClick(FiltersTypes.ShowAll)}>SHOWALL</button>
      <button onClick={() => handleClick(FiltersTypes.Favorites)}>
        FAVORITES
      </button>
      <button>BURGERSANDWICH</button>
      <button>BEVERAGE</button>
      <button>CHICKENFISH</button>
      <button>DESSERTSHAKE</button>
      <button>SNACKSIDE</button>
      <button>BREAKFAST</button>
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
  user: User;
  handleClick: (id: string, number: number) => void;
  disableCheck: (id: string) => boolean | undefined;
  addFav: (id: string) => void;
  currentFilter: FiltersTypes;
}

const FoodCardList: React.FC<FoodCardListProps> = ({
  fooddata,
  user,
  handleClick,
  disableCheck,
  addFav,
  currentFilter,
}) => {
  let itemlist = fooddata;
  // if (currentFilter) {
  //   itemlist = itemlist.filter((item) => user.favList.includes(item.ID));
  // }

  return (
    <div>
      {itemlist.map((item) => {
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
      <hr />
    </div>
  );
};

export default App;
