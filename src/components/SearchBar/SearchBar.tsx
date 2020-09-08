import React, { useState, useRef, useLayoutEffect } from "react";
import { FoodItem } from "../../types";


const SearchBar: React.FC<any> = ({ fooddata, calendar, addToCalendar }) => {
    const [textValue, setTextValue] = useState<string>("")
    const [searchListDisplay, setSearchListDisplay] = useState<FoodItem[]>([])
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
            let searchList = fooddata.reduce((acc: any, item: FoodItem) => {
                if (checkSubStingIncludes(item.ITEM, word)) acc.push(item)
                return acc
            }, []).splice(0, 5)
            setSearchListDisplay(searchList)
        }
    }

    const handleClick = (item: FoodItem) => {
        setSearchListDisplay([])
        setTextValue("")
        const itemAlreadyInCalendar = calendar.map((item: any) => item.id)
        if (itemAlreadyInCalendar.includes(item.ID)) errorMessage(item.ITEM)
        else addToCalendar(item.ID, 1)

    }

    const errorMessage = (item: string) => {
        setErrorText(`${item} has already been added`)
        setTimeout(() => {
            setErrorText("")
        }, 1500);
    }


    return (
        <div style={{ backgroundColor: "mediumpurple" }}>
            <div ref={wrapperRef} className="flex-container flex-column pos-rel">
                <input
                    onClick={() => setShowList(true)}
                    placeholder="Type to search"
                    value={textValue}
                    onChange={e => handleChange(e)}
                />
                <span>{errorText}</span>
                {showList && searchListDisplay.map(i =>
                    <div
                        onClick={() => handleClick(i)}
                        key={i.ID}
                        tabIndex={0}
                    >
                        <span>{i.ITEM}</span>
                    </div>)}
            </div>
        </div>
    );
};

export default SearchBar