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
        <div className='absolute grid grid-cols-2 items-center gap-6 right-8 -bottom-14 text-[15px]'>
          <button type='button' className='border border-gray-400 bg-gray-50 text-gray-600 px-3 py-2 rounded-sm cursor-pointer'>
            Odrzuć zmiany
          </button>
          <button type='submit' className='border border-purple-600 bg-(--active-color) text-gray-50 font-semibold px-3 py-2 rounded-sm cursor-pointer'>
            Zapisz zmiany
          </button>
        </div>
      </form>
    </FormProvider>
  )
}