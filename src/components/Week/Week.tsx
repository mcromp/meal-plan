import React, { useEffect } from 'react'
import './Week.css'


enum Weekdays {
    "Sun",
    "Mon",
    "Tues",
    "Wed",
    "Thur",
    "Fri",
    "Sat",
}
enum MonthNames {
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
}

let today: Date = new Date();

let currentYear = today.getFullYear();
let currentMonth = today.getMonth();
let firstDay = (new Date(currentMonth)).getDay();
let daysInMonth = new Date(currentYear, currentMonth, 32).getDate()

let weekdayz: number[] = new Array(7).fill(null)

function App() {
    useEffect(() => {
        const tomorrow = new Date(today)
        tomorrow.setDate(tomorrow.getDate() + 1)
        console.log(weekdayz.length)
        // console.log(firstDay, daysInMonth, Weekdays[tomorrow.getDay()])


    }, [])
    return (
        <div className="parent">
            {weekdayz.map((_, dayIndex) => {
                console.log(dayIndex)
                let theday = new Date(today);
                theday.setDate(today.getDate() + dayIndex)
                let p = theday.getDate();
                let g = theday.getDay();
                let r = theday.getMonth();
                return <div key={p + dayIndex}>
                    <h1>{p}</h1>
                    <p>{Weekdays[g]}</p>
                    <p>{MonthNames[r]}</p>
                </div>

            })}
        </div>
    );
}

export default App;
