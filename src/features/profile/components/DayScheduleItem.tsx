import { useState } from "react";
import { useFormContext, Controller } from 'react-hook-form';

import { Switch } from '@/components/ui/switch.tsx';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select.tsx';

import type { DayOfTheWeekType } from "../types.ts";

const hoursData = [
  '00:00', '01:00', '02:00', '03:00',
  '04:00', '05:00', '06:00', '07:00',
  '08:00', '09:00', '10:00', '11:00',
  '12:00', '13:00', '14:00', '15:00',
  '16:00', '17:00', '18:00', '19:00',
  '20:00', '21:00', '22:00', '23:00',
]

interface Props {
  dayOfTheWeek: DayOfTheWeekType,
  isChecked: boolean,
  setIsChecked: (isChecked: boolean) => void;
}

export default function DayScheduleItem({ dayOfTheWeek, isChecked, setIsChecked }: Props) {
  const [hours, setHours] = useState(hoursData);

  const { register, handleSubmit, control } = useFormContext();

  return (
    <div className='grid grid-cols-[12rem_1fr_12rem] py-2 items-center'>
      <div className={`tracking-wide w-full italic ${!isChecked && 'text-gray-400'}`}>
        {dayOfTheWeek}
      </div>
      {
        isChecked ?
          <div className='flex gap-4 mx-8 h-10 items-center justify-center'>
            <div>
              <Controller
                name={`schedule.${dayOfTheWeek}.from`}
                control={control}
                rules={{ required: true }}
                defaultValue={'06:00'}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={!isChecked}
                  >
                    <SelectTrigger className='w-36 cursor-pointer'>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className='max-h-48 overflow-y-auto' side='bottom' alignItemWithTrigger={false}>
                      <SelectGroup>
                        {
                          hours.map((item) =>
                            <SelectItem className='cursor-pointer' value={item}>{item}</SelectItem>
                          )
                        }
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />

              {/*<Select defaultValue={'06:00'} disabled={!isChecked}>*/}
              {/*  <SelectTrigger className='w-36 cursor-pointer'>*/}
              {/*    <SelectValue />*/}
              {/*  </SelectTrigger>*/}
              {/*  <SelectContent className='max-h-48 overflow-y-auto' side='bottom' alignItemWithTrigger={false}>*/}
              {/*    <SelectGroup>*/}
              {/*      {*/}
              {/*        hours.map((item) =>*/}
              {/*          <SelectItem className='cursor-pointer' value={item}>{item}</SelectItem>*/}
              {/*        )*/}
              {/*      }*/}
              {/*    </SelectGroup>*/}
              {/*  </SelectContent>*/}
              {/*</Select>*/}
            </div>
            <div>
              <Controller
                name={`schedule.${dayOfTheWeek}.to`}
                control={control}
                rules={{ required: true }}
                defaultValue='14:00'
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={!isChecked}
                  >
                    <SelectTrigger className='w-36 cursor-pointer'>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className='max-h-48 overflow-y-auto' side='bottom' alignItemWithTrigger={false}>
                      <SelectGroup>
                        {
                          hours.map((item) =>
                            <SelectItem className='cursor-pointer' value={item}>{item}</SelectItem>
                          )
                        }
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />

              {/*<Select defaultValue={'14:00'} disabled={!isChecked}>*/}
              {/*  <SelectTrigger className='w-36 cursor-pointer'>*/}
              {/*    <SelectValue />*/}
              {/*  </SelectTrigger>*/}
              {/*  <SelectContent className='max-h-48 overflow-y-auto' side='bottom' alignItemWithTrigger={false}>*/}
              {/*    <SelectGroup>*/}
              {/*      {*/}
              {/*        hours.map((item) =>*/}
              {/*          <SelectItem className='cursor-pointer' value={item}>{item}</SelectItem>*/}
              {/*        )*/}
              {/*      }*/}
              {/*    </SelectGroup>*/}
              {/*  </SelectContent>*/}
              {/*</Select>*/}
            </div>
          </div>
          :
          <div className={`w-92 h-10 flex items-center justify-center ${!isChecked && 'text-gray-400'}`}>Zamknięte</div>
      }
      <div className='flex items-center cursor-pointer justify-self-end'>
        <Switch checked={isChecked} onCheckedChange={setIsChecked}/>
      </div>
    </div>
  )
}