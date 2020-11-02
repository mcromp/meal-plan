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
      const searchList = menuList.filter((item: MenuItemJSON) => checkSubStingIncludes(item.item, word)).splice(0, 5)
      setSearchListDisplay(searchList)
    }
  }

  const handleClick = (item: MenuItemJSON) => {
    setSearchListDisplay([])
    setTextValue("")
    const itemAlreadyInCheckout = checkoutBoardItems.map((item: CalendarMenuItem) => item.foodId)
    if (itemAlreadyInCheckout.includes(item.id)) {
      dispatch(setAlertMessage(`${item.item} has already been added`))
    }
    else addCheckOutBoardItem(item)
  }

  return (
    <div ref={wrapperRef} className="search">
      <input
        type="search"
        onClick={() => setisListShown(true)}
        placeholder="Type to search"
        value={textValue}
        onChange={e => handleChange(e)} />
      <div className="search__alert">
        <AlertText />
      </div>
      <div className={isListShown && textValue ? "search-results" : "none"}>
        {isListShown && searchListDisplay.map(item =>
          <div
            className="search-results__container"
            onClick={() => handleClick(item)}
            key={item.id}
            tabIndex={0}>
            <span className="search-results__name">{item.item}</span>
          </div>)}
      </div>
    </div >
  );
};

type SearchBarProps = {
  menuList: MenuItemJSON[];
  checkoutBoardItems: CalendarMenuItem[];
  addCheckOutBoardItem: (item: MenuItemJSON) => void
}

export default SearchBar