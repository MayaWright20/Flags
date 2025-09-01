import useSession from '@/hooks/useSession';
import { supabase } from '@/lib/supabase';
import { useStore } from '@/store/store';
import { useCallback, useEffect } from 'react';
import { Alert } from 'react-native';

export default function useProfile() {
  const { session } = useSession();
  const favourites = useStore((state: any) => state.favourites);
  const setStoreFavourites = useStore((state: any) => state.setStoreFavourites);
  const isGuessTheFlagWriteAnswer = useStore(
    (state: any) => state.isGuessTheFlagWriteAnswer
  );
  const setStoreIsGuessTheFlagWriteAnswer = useStore(
    (state: any) => state.setStoreIsGuessTheFlagWriteAnswer
  );

  const getProfile = useCallback(async () => {
    try {
      const { data, error, status } = await supabase
        .from('profiles')
        .select('favourites,  is_guess_the_flag_write_answer')
        .eq('id', session?.user.id)
        .single();
      if (error && status !== 406) throw error;
      if (data) {
        setStoreFavourites(data.favourites);
        setStoreIsGuessTheFlagWriteAnswer(data.is_guess_the_flag_write_answer);
      }
    } catch (error) {
      if (error instanceof Error) Alert.alert(error.message);
    }
  }, [session?.user, setStoreFavourites, setStoreIsGuessTheFlagWriteAnswer]);

  const updateProfile = useCallback(
    async ({
      favourites,
      isGuessTheFlagWriteAnswer,
    }: {
      favourites?: string[] | [];
      isGuessTheFlagWriteAnswer?: boolean;
    }) => {
      try {
        if (!session?.user) throw new Error('No user on the session!');
        const updates = {
          id: session?.user.id,
          favourites,
          is_guess_the_flag_write_answer: isGuessTheFlagWriteAnswer,
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
        return;
      }
    },
    [session?.user]
  );

  useEffect(() => {
    getProfile();
  }, [session]);

  const setfavouriteHandler = useCallback(
    async (item: string) => {
      if (favourites.includes(item)) {
        const updated = favourites.filter((fav: string) => fav !== item);
        setStoreFavourites(updated);
        await updateProfile({ favourites: updated });
      } else {
        const updated = [...favourites, item];
        setStoreFavourites(updated);
        await updateProfile({ favourites: updated });
      }
    },
    [favourites, updateProfile, setStoreFavourites]
  );

  const guessTheFlagWriteAnswerHandler = () => {
    const newValue = !isGuessTheFlagWriteAnswer;
    setStoreIsGuessTheFlagWriteAnswer(newValue);
    updateProfile({ isGuessTheFlagWriteAnswer: newValue });
  };

  return {
    favourites,
    setFavourites: setfavouriteHandler,
    getProfile,
    setIsGuessTheFlagWriteAnswer: guessTheFlagWriteAnswerHandler,
    isGuessTheFlagWriteAnswer,
  };
}
