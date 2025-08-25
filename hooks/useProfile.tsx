import useSession from '@/hooks/useSession';
import { supabase } from '@/lib/supabase';
import { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';

export default function useProfile() {
  const { session } = useSession();
  const [favourites, setFavourites] = useState<string[]>([]);

  useEffect(() => {
    getProfile();
  }, [session, favourites]);

  const getProfile = useCallback(async () => {
    try {
      const { data, error, status } = await supabase
        .from('profiles')
        .select('favourites')
        .eq('id', session?.user.id)
        .single();
      if (error && status !== 406) throw error;
      if (data) setFavourites(data.favourites);
    } catch (error) {
      if (error instanceof Error) Alert.alert(error.message);
    }
  }, [session]);

  const updateProfile = useCallback(
    async ({ favourites }: { favourites?: string[] | [] }) => {
      try {
        if (!session?.user) throw new Error('No user on the session!');
        const updates = {
          id: session?.user.id,
          favourites,
        };
        const { error } = await supabase.from('profiles').upsert(updates);
        if (error) {
          throw error;
        }
      } catch (error) {
        if (error instanceof Error) {
          Alert.alert(error.message);
        }
      } finally {
      }
    },
    [session]
  );

  const setAsFavourite = (item: string) => {
    if (favourites.includes(item)) {
      const updated = favourites.filter((fav) => fav !== item);
      updateProfile({ favourites: updated });
    } else {
      const updated = [...favourites, item];
      updateProfile({ favourites: updated });
    }
  };

  return {
    favourites,
    setFavourites: setAsFavourite,
    getProfile,
  };
}
