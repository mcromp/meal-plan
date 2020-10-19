import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import { setAlertMessage } from "../../redux/modules/alertMessage";
import AlertText from "../../shared/AlertText";
import { MenuItemJSON, CalendarMenuItem } from "../../shared/types";

const SearchBar: React.FC<SearchBarProps> = ({ menuList, checkoutBoardItems, addCheckOutBoardItem }) => {
  const [textValue, setTextValue] = useState<string>("")
  const [searchListDisplay, setSearchListDisplay] = useState<MenuItemJSON[]>([])
  const [isListShown, setisListShown] = useState(true)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setAlertMessage(""))
  }, [dispatch])

  const wrapperRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  useOnClickOutside(wrapperRef, () => setisListShown(false))

  const checkSubStingIncludes = (a: string, b: string) => a.toLocaleLowerCase().includes(b.toLocaleLowerCase())

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const word = e.target.value;
    setSearchListDisplay([])
    setTextValue(word)
    if (word.length > 0) {
      const searchList = menuList.reduce((acc: any, item: MenuItemJSON) => {
        if (checkSubStingIncludes(item.ITEM, word)) acc.push(item)
        return acc
      }, []).splice(0, 5)
      setSearchListDisplay(searchList)
    }
  }

  const handleClick = (item: MenuItemJSON) => {
    setSearchListDisplay([])
    setTextValue("")
    const itemAlreadyInCheckout = checkoutBoardItems.map((item: CalendarMenuItem) => item.foodId)
    if (itemAlreadyInCheckout.includes(item.ID)) {
      dispatch(setAlertMessage(`${item.ITEM} has already been added`))
    }
    else addCheckOutBoardItem(item)
  }

  return (
    <div ref={wrapperRef} className="search-container">
      <input
        onClick={() => setisListShown(true)}
        placeholder="Type to search"
        value={textValue}
        onChange={e => handleChange(e)} />
      <div className="search-alert">
        <AlertText />
      </div>
      <div className="search-list-container">
        {isListShown && searchListDisplay.map(item =>
          <div
            onClick={() => handleClick(item)}
            key={item.ID}
            tabIndex={0}>
            <span>{item.ITEM}</span>
          </div>)}
      </div>
    </div>
  );
};

type SearchBarProps = {
  menuList: MenuItemJSON[];
  checkoutBoardItems: CalendarMenuItem[];
  addCheckOutBoardItem: (item: MenuItemJSON) => void
}

export default SearchBar