export default function favListReducer(favList: string[] = ["0"], action: any) {
  switch (action.type) {
    case "ADD_FAV":
      return [...favList, action.payload];
    case "REMOVE_FAV":
      const prevState = [...favList];
      prevState.splice(favList.indexOf(action.payload), 1);
      return prevState;
    default:
      return favList;
  }
}

export const addFav = (id: string) => ({
  type: "ADD_FAV",
  payload: id,
});

export const removeFav = (id: string) => ({
  type: "REMOVE_FAV",
  payload: id,
});
