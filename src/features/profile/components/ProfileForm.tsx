import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form';

import { type ProfileData, profileSchema } from "@/features/profile/utils/validation.ts";
import ProfilePictureEditor from "@/features/profile/components/ProfilePictureEditor.tsx";
import ProfileInformation from "@/features/profile/components/ProfileInformation.tsx";
import WeeklySchedule from "@/features/profile/components/WeeklySchedule.tsx";

import closeSvg from '@/assets/Profile/close.svg';
import checkSvg from "@/assets/Profile/check.svg";

interface ProfileFormProps {
  initialData: ProfileData;
}

export default function ProfileForm({ initialData }: ProfileFormProps) {
  const methods = useForm<ProfileData>({
    resolver: zodResolver(profileSchema),
    defaultValues: initialData
  });

    const { handleSubmit, reset, formState: { isDirty } } = methods;

    console.log(isDirty);

    const onSubmit: SubmitHandler<ProfileData> = (data) => {
      reset(data);
    }
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit, (errors) => console.log(errors))} className='w-fit flex flex-wrap flex-col bg-white rounded-sm shadow-sm box-border py-6 px-9'>
        <div className='flex'>
          <ProfilePictureEditor/>
          <ProfileInformation/>
          <WeeklySchedule/>
        </div>

        {
          isDirty && (
          <div className='flex justify-end gap-6 text-[15px] pt-6 animate-saveProfile w-full'>
            <button
              type='button'
              className='flex gap-3 border border-gray-400 text-gray-600 bg-gray-50 px-3 py-2 rounded-sm cursor-pointer animate-show'
              onClick={() => reset()}
            >
              <img
                src={closeSvg}
                alt='Odrzuć zmiany ikona'
                className='[filter:brightness(0)_saturate(100%)_invert(50%)_sepia(6%)_saturate(239%)_hue-rotate(212deg)_brightness(90%)_contrast(88%)] w-5'
              />
              Odrzuć zmiany
            </button>
            <button
              type='submit'
              className='flex gap-3 border border-transparent bg-(--active-color)
               text-white font-semibold px-3 py-2 rounded-sm cursor-pointer animate-show'
            >
              <img src={checkSvg} alt='Zapisz zmiany ikona' className='w-5'/>
              Zapisz zmiany
            </button>
          </div>
        )}
      </form>
    </FormProvider>
  )
}