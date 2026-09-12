import { useState, useEffect } from "react";

import DayScheduleItem from "./DayScheduleItem.tsx";
import type { DayOfTheWeekType } from "../types.ts";

const week: DayOfTheWeekType[] = ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela'];

export default function WeeklySchedule() {
  const [openHours, setOpenHours] = useState<Record<string, boolean>>({
    'Poniedziałek': false,
    'Wtorek': false,
    'Środa': false,
    'Czwartek': false,
    'Piątek': false,
    'Sobota': false,
    'Niedziela': false
  });

  useEffect(() => {
    // implement fetching openHours
  }, []);

  const handleIsOpenToggle = (day: DayOfTheWeekType, isChecked: boolean) => {
    setOpenHours(prev => ({
      ...prev,
      [day]: isChecked
    }));
  }

  return (
    <div className='flex flex-col ml-4 h-fit'>
      <div className='grid grid-rows-8 flex-1 items-center my-2 mx-4 py-3 px-10 shadow-[1px_1px_7px_1px_#ddd] rounded-md'>
        <h1 className='font-semibold text-lg mb-1 border-b pb-3'>Godziny Otwarcia</h1>
        {
          week.map((day) => {
            return (
              <DayScheduleItem
                key={day}
                dayOfTheWeek={day}
                isChecked={openHours[day] || false}
                setIsChecked={(isChecked) => handleIsOpenToggle(day, isChecked)}
              />
            )
          })
        }
      </div>
    </div>
  )
}