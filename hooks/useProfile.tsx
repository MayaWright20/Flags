import { basePath } from "@/lib/env-variables";
import { usePersistStore, useStore } from "@/store/store";
import axios from "axios";
import { useCallback } from "react";

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

  const profileName = useStore((state: any) => state.profileName);
  const setProfileName = useStore((state: any) => state.setProfileName);
  const resetAuthCTAVariables = useStore(
    (state: any) => state.resetAuthCTAVariables
  );
  const setSession = usePersistStore((state: any) => state.setSession);

  const getProfile = useCallback(
    async (token: string) => {
      try {
        const response = await axios.get(`${basePath}user/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        await setProfileName(response.data.user.name);

      } catch (error) {
        console.log("error", error);
      }
    },
    [session]
  );

  


  const signOutHandler = useCallback(async() => {
    try {
       await axios.get(`http://localhost:5000/api/v1/user/logout`, {
        headers: {
          Authorization: `Bearer ${session}`,
        },
      });
      
    } catch (err) {
      console.log(err);
    } finally {
      resetAuthCTAVariables();
      setSession(false);
    }
  },[]);

  // const setFavourites = useCallback(
  //   (item: string) => {
  //     if (favourites.includes(item)) {
  //       const updated = favourites.filter((fav: string) => fav !== item);
  //       setStoreFavourites(updated);
  //     } else {
  //       const updated = [...favourites, item];
  //       setStoreFavourites(updated);
  //     }
  //   },
  //   [favourites, setStoreFavourites]
  // );

  // const setGameUserNameHandler = useCallback(
  //   (value: string) => {
  //     setGameUserName(value);
  //   },
  //   [setGameUserName]
  // );

  // const guessTheFlagWriteAnswerHandler = () => {
  //   const newValue = !isGuessTheFlagWriteAnswer;
  //   setStoreIsGuessTheFlagWriteAnswer(newValue);
  // };

  // useEffect(() => {
  //   if (session) {
  //     getProfile();
  //   }
  // }, [session]);

  return {
    favourites,
    // setFavourites,
    getProfile,
    // setIsGuessTheFlagWriteAnswer: guessTheFlagWriteAnswerHandler,
    isGuessTheFlagWriteAnswer,
    // setGameUserName: setGameUserNameHandler,
    gameUserName,
    signOutHandler
  };
}
