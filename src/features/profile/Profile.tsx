import { useEffect, useState } from "react";

import useUser from '../../hooks/useUser.ts';
import Loading from "../../components/layouts/Loading.tsx";
import { supabase } from "@/lib/supabase.ts";
import { type ProfileData } from "@/features/profile/utils/validation.ts";
import ProfileForm from "@/features/profile/components/ProfileForm.tsx";

const defaultDayState = { isOpen: false, from: undefined, to: undefined };

const defaultSchedule = {
  poniedziałek: {...defaultDayState},
  wtorek: {...defaultDayState},
  środa: {...defaultDayState},
  czwartek: {...defaultDayState},
  piątek: {...defaultDayState},
  sobota: {...defaultDayState},
  niedziela: {...defaultDayState}
};

export default function Profile() {
  const { user } = useUser();
  const [initialData, setInitialData] = useState<ProfileData|null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user.id) return;

      const { data, error } = await supabase
          .from('profiles')
          .select()
          .eq('id', user.id)
          .single()

      if (!error && data) {
        setInitialData({
          displayName: data.displayName || '',
          phoneNumber: data.phoneNumber || '',
          schedule: data.schedule || defaultSchedule
        });
      } else {
        console.error(error?.message);
      }
      setIsLoading(false);
    }

    void fetchProfile();
  }, [user]);

  if (isLoading) {
    return (
      <div className='w-full h-full grow'>
        <Loading fullSize={false}/>
      </div>
    )
  }

  if (!initialData) {
    return <div>Brak profilu</div>
  }

  return <ProfileForm initialData={initialData}/>
}