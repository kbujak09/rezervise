import { useEffect } from "react";

import DayScheduleItem from "./DayScheduleItem.tsx";
import type { DayOfTheWeekType } from "../types.ts";

const week: DayOfTheWeekType[] = ['poniedziałek', 'wtorek', 'środa', 'czwartek', 'piątek', 'sobota', 'niedziela'];

export default function WeeklySchedule() {
  useEffect(() => {
    // implement fetching openHours
  }, []);

  return (
    <div className='flex flex-col ml-4 h-fit'>
      <div className='grid grid-rows-8 flex-1 items-center ml-4 py-3 px-10 shadow-[1px_1px_7px_1px_#ddd] rounded-md'>
        <h1 className='font-semibold text-lg mb-1 border-b pb-3 tracking-wide [word-spacing:1.2px] opacity-75'>Godziny Otwarcia</h1>
        {
          week.map((day) => {
            return (
              <DayScheduleItem
                key={day}
                dayOfTheWeek={day}
              />
            )
          })
        }
      </div>
    </div>
  )
}