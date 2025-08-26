import useSession from '@/hooks/useSession';
import { supabase } from '@/lib/supabase';
import { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';

export default function useProfile() {
  const { session } = useSession();
  const [favourites, setFavourites] = useState<string[]>([]);
  const [isGuessTheFlagWriteAnswer, setIsGuessTheFlagWriteAnswer] =
    useState<boolean>(false);

  useEffect(() => {
    getProfile();
  }, [session, favourites]);

  const getProfile = useCallback(async () => {
    try {
      const { data, error, status } = await supabase
        .from('profiles')
        .select('favourites,  is_guess_the_flag_write_answer')
        .eq('id', session?.user.id)
        .single();
      if (error && status !== 406) throw error;
      if (data) {
        setFavourites(data.favourites);
        setIsGuessTheFlagWriteAnswer(data.is_guess_the_flag_write_answer);
      }
    } catch (error) {
      if (error instanceof Error) Alert.alert(error.message);
    }
  }, [session]);

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
      }
    },
    [session]
  );

  const setfavouriteHandler = (item: string) => {
    if (favourites.includes(item)) {
      const updated = favourites.filter((fav) => fav !== item);
      updateProfile({ favourites: updated });
    } else {
      const updated = [...favourites, item];
      updateProfile({ favourites: updated });
    }
  };

  const guessTheFlagWriteAnswerHandler = () => {
    updateProfile({ isGuessTheFlagWriteAnswer: !isGuessTheFlagWriteAnswer });
  };

  return {
    favourites,
    setFavourites: setfavouriteHandler,
    getProfile,
    setIsGuessTheFlagWriteAnswer: guessTheFlagWriteAnswerHandler,
    isGuessTheFlagWriteAnswer,
  };
}
