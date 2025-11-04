import { basePath } from '@/lib/env-variables';
import { usePersistStore, useStore } from '@/store/store';
import axios from 'axios';
import { useCallback, useEffect } from 'react';

export default function useProfile() {
  const favourites = useStore((state: any) => state.favourites);
  const setStoreFavourites = useStore((state: any) => state.setStoreFavourites);
  const isGuessTheFlagWriteAnswer = useStore(
    (state: any) => state.isGuessTheFlagWriteAnswer
  );
  const setStoreIsGuessTheFlagWriteAnswer = useStore(
    (state: any) => state.setStoreIsGuessTheFlagWriteAnswer
  );
  const setGameUserName = useStore((state: any) => state.setGameUserName);
  const gameUserName = useStore((state: any) => state.gameUserName);
  const session = usePersistStore((state: any) => state.session);

  const getProfile = useCallback(async () => {
    try {
      if (session) {
        const response = await axios.get(`${basePath}user/profile`, {
          headers: {
            Authorization: `Bearer ${session}`,
          },
        });
        console.log("profile",response.data);
      }
    } catch (error) {
      console.log('error', error);
    }
  }, [session]);

  const setFavourites = useCallback(
    (item: string) => {
      if (favourites.includes(item)) {
        const updated = favourites.filter((fav: string) => fav !== item);
        setStoreFavourites(updated);
      } else {
        const updated = [...favourites, item];
        setStoreFavourites(updated);
      }
    },
    [favourites, setStoreFavourites]
  );

  const setGameUserNameHandler = useCallback(
    (value: string) => {
      setGameUserName(value);
    },
    [setGameUserName]
  );

  const guessTheFlagWriteAnswerHandler = () => {
    const newValue = !isGuessTheFlagWriteAnswer;
    setStoreIsGuessTheFlagWriteAnswer(newValue);
  };

  useEffect(() => {
    if (session) {
      getProfile();
    }
  }, [session, getProfile]);

  return {
    favourites,
    setFavourites,
    getProfile,
    setIsGuessTheFlagWriteAnswer: guessTheFlagWriteAnswerHandler,
    isGuessTheFlagWriteAnswer,
    setGameUserName: setGameUserNameHandler,
    gameUserName,
  };
}
