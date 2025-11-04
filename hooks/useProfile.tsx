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

  const getProfile = useCallback(async() => {
    try{
      if(session){
        const response = await axios.get(`${basePath}user/profile`);

      console.log(response)
      }
    }catch(error){
      console.log('error', error)
    }
  },[]);

  // const getProfile = useCallback(async () => {
  //   try {
  //     const { data, error, status } = await supabase
  //       .from('profiles')
  //       .select('favourites,  is_guess_the_flag_write_answer, game_user_name')
  //       .eq('id', session?.user.id)
  //       .single();
  //     if (error && status !== 406) throw error;
  //     if (data) {
  //       setStoreFavourites(data.favourites);
  //       setStoreIsGuessTheFlagWriteAnswer(data.is_guess_the_flag_write_answer);
  //       setGameUserName(data.game_user_name);
  //     }
  //   } catch (error) {
  //     if (error instanceof Error) Alert.alert(error.message);
  //   }
  // }, [
  //   session?.user,
  //   setStoreFavourites,
  //   setStoreIsGuessTheFlagWriteAnswer,
  //   setGameUserName,
  // ]);

  // const updateProfile = useCallback(
  //   async ({
  //     favourites,
  //     isGuessTheFlagWriteAnswer,
  //     gameUserName,
  //   }: {
  //     favourites?: string[] | [];
  //     isGuessTheFlagWriteAnswer?: boolean;
  //     gameUserName?: string;
  //   }) => {
  //     try {
  //       if (!session?.user) throw new Error('No user on the session!');
  //       const updates = {
  //         id: session?.user.id,
  //         favourites,
  //         is_guess_the_flag_write_answer: isGuessTheFlagWriteAnswer,
  //         game_user_name: gameUserName,
  //       };
  //       const { error } = await supabase.from('profiles').upsert(updates);
  //       if (error) {
  //         throw error;
  //       }
  //     } catch (error) {
  //       if (error instanceof Error) {
  //         Alert.alert(error.message);
  //       }
  //     } finally {
  //       return;
  //     }
  //   },
  //   [session?.user]
  // );

  useEffect(() => {
    // getProfile();
  }, [session]);

  // const setfavouriteHandler = useCallback(
  //   async (item: string) => {
  //     if (favourites.includes(item)) {
  //       const updated = favourites.filter((fav: string) => fav !== item);
  //       setStoreFavourites(updated);
  //       await updateProfile({ favourites: updated });
  //     } else {
  //       const updated = [...favourites, item];
  //       setStoreFavourites(updated);
  //       await updateProfile({ favourites: updated });
  //     }
  //   },
  //   [favourites, updateProfile, setStoreFavourites]
  // );

  // const setGameUserNameHandler = useCallback(
  //   async (value: string) => {
  //     setGameUserName(value);
  //     updateProfile({ gameUserName: value });
  //   },
  //   [setGameUserName, updateProfile]
  // );

  const guessTheFlagWriteAnswerHandler = () => {
    const newValue = !isGuessTheFlagWriteAnswer;
    setStoreIsGuessTheFlagWriteAnswer(newValue);
    // updateProfile({ isGuessTheFlagWriteAnswer: newValue });
  };

  return {
    favourites,
    // setFavourites: setfavouriteHandler,
    // getProfile,
    setIsGuessTheFlagWriteAnswer: guessTheFlagWriteAnswerHandler,
    isGuessTheFlagWriteAnswer,
    // setGameUserName: setGameUserNameHandler,
    gameUserName,
  };
}
