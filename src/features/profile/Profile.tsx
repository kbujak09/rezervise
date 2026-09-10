import { useForm, FormProvider, type SubmitHandler } from "react-hook-form";

import ProfilePictureEditor from "./components/ProfilePictureEditor.tsx";
import useUser from '../../hooks/useUser.ts';
import ProfileInformation from "./components/ProfileInformation.tsx";
import Loading from "../../components/layouts/Loading.tsx";
import WeeklySchedule from "./components/WeeklySchedule.tsx";

interface ProfileInputs {
  displayName: string
  phoneNumber: string
}

export default function Profile() {
  const { loading, user } = useUser();

  const methods = useForm<ProfileInputs>();

  const { register, handleSubmit } = methods;

  const onSubmit: SubmitHandler<ProfileInputs> = (data) => console.log(data);

  if (loading) {
    return (
      <div className='w-full h-full grow'>
        <Loading fullSize={false}/>
      </div>
    )
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className='relative w-fit flex flex-wrap bg-white rounded-sm shadow-sm box-border p-5 pb-12'>
        <ProfilePictureEditor/>
        <ProfileInformation user={user} register={register}/>
        <WeeklySchedule/>
        <div className='absolute grid grid-cols-2 items-center gap-6 right-12 -bottom-20'>
          <button type='button' className='border border-gray-400 bg-gray-50 text-gray-600 px-4 py-3 rounded-sm cursor-pointer'>
            Odrzuć zmiany
          </button>
          <button type='submit' className='border border-(--active-color) bg-(--active-color) text-white font-semibold px-4 py-3 rounded-sm cursor-pointer'>
            Zapisz zmiany
          </button>
        </div>
      </form>

    </FormProvider>
  )
}