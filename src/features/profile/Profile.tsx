import { useForm, FormProvider, type SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";

import ProfilePictureEditor from "./components/ProfilePictureEditor.tsx";
import useUser from '../../hooks/useUser.ts';
import ProfileInformation from "./components/ProfileInformation.tsx";
import Loading from "../../components/layouts/Loading.tsx";
import WeeklySchedule from "./components/WeeklySchedule.tsx";
import { supabase } from "@/lib/supabase.ts";

import closeSvg from '@/assets/Profile/close.svg';
import checkSvg from "@/assets/Profile/check.svg";

interface DayInterface {
  isOpen: boolean,
  from: string | undefined,
  to: string | undefined
}

interface ProfileInterface {
  displayName: string
  phoneNumber: string,
  schedule: {
    poniedziałek : DayInterface,
    wtorek: DayInterface,
    środa: DayInterface,
    czwartek: DayInterface,
    piątek: DayInterface,
    sobota: DayInterface,
    niedziela: DayInterface,
  }
}

export default function Profile() {
  const [profileData, setProfileData] = useState();
  const { user } = useUser();

  const methods = useForm<ProfileInterface>({
    defaultValues: {
      displayName: "",
      phoneNumber: "",
      schedule: {
        poniedziałek : { isOpen: false, from: undefined, to: undefined },
        wtorek: { isOpen: false, from: undefined, to: undefined },
        środa: { isOpen: false, from: undefined, to: undefined },
        czwartek: { isOpen: false, from: undefined, to: undefined },
        piątek: { isOpen: false, from: undefined, to: undefined },
        sobota: { isOpen: false, from: undefined, to: undefined },
        niedziela: { isOpen: false, from: undefined, to: undefined },
      }
    }
  });
  const { register, handleSubmit, reset, formState: { isDirty } } = methods;

  const onSubmit: SubmitHandler<ProfileInputs> = (data) => console.log(data);

  useEffect(() => {
    const getUserData = async () => {
      if (!user || !user.id) return;

      const { data, error } = await supabase
          .from('profiles')
          .select()
          .eq('id', user.id)
          .single()

      if (error) {
        console.log("Błąd pobierania profilu:", error.message);
        return;
      }

      if (data) {
        setProfileData(data);
      }
    }

    void getUserData();
  }, [user]);

  if (!profileData) {
    return (
      <div className='w-full h-full grow'>
        <Loading fullSize={false}/>
      </div>
    )
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit, (errors) => console.log(errors))} className='w-fit flex flex-wrap flex-col bg-white rounded-sm shadow-sm box-border py-6 px-9'>
        <div className='flex'>
          <ProfilePictureEditor/>
          <ProfileInformation profileData={profileData} register={register}/>
          <WeeklySchedule/>
        </div>
         {
           isDirty && <div className='flex justify-end gap-6 text-[15px] pt-6'>
             <button
               type='button'
               className='flex gap-3 border border-gray-500 bg-gray-50 opacity-50 px-3 py-2 rounded-sm cursor-pointer'
               onClick={() => reset()}
             >
               <img src={closeSvg} alt='Odrzuć zmiany ikona' className='[filter:brightness(0)_saturate(100%)_invert(50%)_sepia(6%)_saturate(239%)_hue-rotate(212deg)_brightness(90%)_contrast(88%)] w-5'/>
               Odrzuć zmiany
             </button>
             <button
               type='submit'
               className='flex gap-3 border border-transparent bg-(--active-color) text-white opacity-85 font-semibold px-3 py-2 rounded-sm cursor-pointer'
             >
               <img src={checkSvg} alt='Zapisz zmiany ikona' className='w-5'/>
               Zapisz zmiany
             </button>
          </div>
        }
      </form>
    </FormProvider>
  )
}