import { MenuItemJSON } from "../../shared/types";

const SET_MENULIST = "menu-plan/menuList/SET_MENULIST";
const ADD_MENULIST = "menu-plan/menuList/ADD_MENULIST"

const reducer = (state = [], action: MenuListActions) => {
 switch (action.type) {
  case SET_MENULIST:
   return action.menuList;
  case ADD_MENULIST:
return [...state, action.menuItem]
  default:
   return state;
 }
};

export const setMenuList = (menuList: MenuItemJSON[]) => ( {
  type: SET_MENULIST,
  menuList,
});

export const addMenuList = (menuItem: MenuItemJSON) => ( {
  type: ADD_MENULIST,
  menuItem,
});

interface SetMenuList {
 type: typeof SET_MENULIST;
 menuList: MenuItemJSON[];
}

interface AddMenuList {
 type: typeof ADD_MENULIST;
 menuItem: MenuItemJSON;
}

export type MenuListActions = SetMenuList | AddMenuList;

export default reducer;
