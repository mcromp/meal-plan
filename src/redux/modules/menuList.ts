import { MenuItemJSON } from "../../shared/types";

const SET_MENULIST = "SET_MENULIST";

const reducer = (state = initalState, action: SetMenuList) => {
 switch (action.type) {
  case SET_MENULIST:
   return action.menuList;
  default:
   return state;
 }
};

export const setMenuList = (menuList: MenuItemJSON[]) => {
 return {
  type: SET_MENULIST,
  menuList,
 };
};

interface SetMenuList {
 type: typeof SET_MENULIST;
 menuList: MenuItemJSON[];
}

interface MenuState {
 menuList: MenuItemJSON[];
}

const initalState: MenuState = {
 menuList: [],
};

export default reducer;
