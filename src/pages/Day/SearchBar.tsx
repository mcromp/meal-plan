import React, { useState, useRef } from "react";
import { CalendarMenuItem, MenuItemJSON } from "../../shared/types";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";



const SearchBar: React.FC<SearchBarProps> = ({ menuList, checkoutBoardItems, addCheckOutBoardItem }) => {
  const [textValue, setTextValue] = useState<string>("")
  const [searchListDisplay, setSearchListDisplay] = useState<MenuItemJSON[]>([])
  const [isListShown, setisListShown] = useState(true)
  const [errorText, setErrorText] = useState("")

  const wrapperRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  useOnClickOutside(wrapperRef, () => setisListShown(false))


  const checkSubStingIncludes = (a: string, b: string) => a.toLocaleLowerCase().includes(b.toLocaleLowerCase())


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorText("")
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
      errorMessage(item.ITEM)
    }
    else addCheckOutBoardItem(item)

  }

  const errorMessage = (item: string) => {
    setErrorText(`${item} has already been added`)
    setTimeout(() => {
      setErrorText("")
    }, 1500);
  }


  return (
    <div ref={wrapperRef} className="flex-container flex-column pos-rel">
      <input
        onClick={() => setisListShown(true)}
        placeholder="Type to search"
        value={textValue}
        onChange={e => handleChange(e)} />
      <span>{errorText}</span>
      {isListShown && searchListDisplay.map(item =>
        <div
          onClick={() => handleClick(item)}
          key={item.ID}
          tabIndex={0}>
          <span>{item.ITEM}</span>
        </div>)}
    </div>
  );
};

type SearchBarProps = {
  menuList: MenuItemJSON[];
  checkoutBoardItems: CalendarMenuItem[];
  addCheckOutBoardItem: (item: MenuItemJSON) => void
}

export default SearchBar