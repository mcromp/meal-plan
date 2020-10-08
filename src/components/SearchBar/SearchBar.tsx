import React, { useState, useRef, useLayoutEffect } from "react";
import { MenuItem } from "../../redux/modules/menuList"
import { CalendarMenuItem } from "../Day";

const SearchBar: React.FC<SearchBarProps> = ({ menuList, checkoutBoardItems, addCheckOutBoardItem }) => {
  const [textValue, setTextValue] = useState<string>("")
  const [searchListDisplay, setSearchListDisplay] = useState<MenuItem[]>([])
  const [showList, setShowList] = useState(true)
  const [errorText, setErrorText] = useState("")
  const wrapperRef = useRef<HTMLDivElement>(null)


  useLayoutEffect(() => {
    window.addEventListener("mousedown", handleClickOutside)
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const handleClickOutside = (event: MouseEvent): void => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target as HTMLElement)) setShowList(false)
  }

  const checkSubStingIncludes = (a: string, b: string) => a.toLocaleLowerCase().includes(b.toLocaleLowerCase())


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorText("")
    const word = e.target.value;
    setSearchListDisplay([])
    setTextValue(word)
    if (word.length > 0) {
      const searchList = menuList.reduce((acc: any, item: MenuItem) => {
        if (checkSubStingIncludes(item.ITEM, word)) acc.push(item)
        return acc
      }, []).splice(0, 5)
      setSearchListDisplay(searchList)
    }
  }

  const handleClick = (item: MenuItem) => {
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
        onClick={() => setShowList(true)}
        placeholder="Type to search"
        value={textValue}
        onChange={e => handleChange(e)} />
      <span>{errorText}</span>
      {showList && searchListDisplay.map(item =>
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
  menuList: MenuItem[];
  checkoutBoardItems: CalendarMenuItem[];
  addCheckOutBoardItem: (item: MenuItem) => void
}

export default SearchBar