import { basePath } from "@/lib/env-variables";
import { clearFlagsStorage } from "@/lib/storage";
import { usePersistStore, useSessionStore, useStore } from "@/store/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useCallback } from "react";

export default function useProfile() {
  const favourites = usePersistStore((state: any) => state.favourites);
  const setStoreFavourites = usePersistStore((state: any) => state.setStoreFavourites);
  const isGuessTheFlagWriteAnswer = useStore(
    (state: any) => state.isGuessTheFlagWriteAnswer
  );
  const setStoreIsGuessTheFlagWriteAnswer = useStore(
    (state: any) => state.setStoreIsGuessTheFlagWriteAnswer
  );
  const setGameUserName = useStore((state: any) => state.setGameUserName);
  const gameUserName = useStore((state: any) => state.gameUserName);
  const session = useSessionStore((state: any) => state.session);

  const profileName = useStore((state: any) => state.profileName);
  const setProfileName = usePersistStore((state: any) => state.setProfileName);
  const resetAuthCTAVariables = useStore(
    (state: any) => state.resetAuthCTAVariables
  );
  const setSession = useSessionStore((state: any) => state.setSession);

  const getProfile = useCallback(
    async (token: string) => {
      try {
        const response = await axios.get(`${basePath}user/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        await setProfileName(response.data.user.name);
        await setStoreFavourites(response.data.favourites)

      } catch (error) {
        console.log("error", error);
      }
    },
    [session]
  );

  const signOutHandler = useCallback(async() => {
    try {
       await axios.get(`${basePath}user/logout`, {
        headers: {
          Authorization: `Bearer ${session}`,
        }
      });

      await clearFlagsStorage()
     
    } catch (err) {
      console.log(err);
    } finally {
      // Clear all AsyncStorage data
      await AsyncStorage.clear();
      resetAuthCTAVariables();
      setSession(false);
    }
  },[]);

  const setIsFavourite = useCallback(async (flagName: string) => {
    console.log(session)
    try {
      const response = await axios.patch(
        `${basePath}user/favourites`,
        { flag: flagName },
        {
          headers: {
            'Authorization': `${session}`,
            'Content-Type': 'application/json; charset=utf-8'
          }
        }
      );

      if (response.data.success) {
        setStoreFavourites(response.data.favourites);
        return { 
          success: true, 
          message: response.data.message 
        };
      }
    } catch (error) {
      return console.error('Error toggling favourite:', error);
      
    } 
  }, [session, basePath]);


  const getFavourites = useCallback(async(item: string)=> {
    
    try {
      const response = await axios.get(`${basePath}user/favourites`);

      if(response.status === 200){
        setStoreFavourites(response)
      }
    }catch(err){
      console.log(err)
    }

  },[favourites, setStoreFavourites]);

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
    getFavourites,
    setIsFavourite,
    getProfile,
    // setIsGuessTheFlagWriteAnswer: guessTheFlagWriteAnswerHandler,
    isGuessTheFlagWriteAnswer,
    // setGameUserName: setGameUserNameHandler,
    gameUserName,
    signOutHandler
  };
}
