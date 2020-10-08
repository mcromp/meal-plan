import { MonthNames, WeekDay, Weekdays } from "../../shared/types";

export const generateWeekDays = () => {
 const today: Date = new Date();
 const emptyWeek: number[] = new Array(7).fill(null);
 return emptyWeek.reduce((acc: WeekDay[], _, dayIndex) => {
  const theday = new Date(today);
  theday.setDate(today.getDate() + dayIndex);
  const month = theday.getMonth();
  const day = theday.getDay();
  const date = String(theday.getDate());
  const year = String(theday.getFullYear());
  const dateId: string = `${date}-${month}-${year}`;
  acc.push({
   month: MonthNames[month],
   day: Weekdays[day],
   date,
   year,
   dateId,
  });
  return acc;
 }, []);
};
