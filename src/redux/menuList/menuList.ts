export interface MenuItem {
 ITEM: string;
 CAL: string;
 PRICE: string;
 CATEGORY: string;
 ID: string;
}

export const SET_MENULIST = "SET_MENULIST";

export const setMenuList = (menuList: MenuItem[]) => {
 return {
  type: SET_MENULIST,
  menuList,
 };
};

export interface SetMenuList {
 type: typeof SET_MENULIST;
 menuList: MenuItem[];
}

export interface MenuState {
 menuList: MenuItem[];
}

const initalState: MenuState = {
 menuList: [],
};

export const menuReducer = (state = initalState, action: SetMenuList) => {
 switch (action.type) {
  case SET_MENULIST:
   return action.menuList;
  default:
   return state;
 }
};
