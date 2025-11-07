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

        const favourites = await getFavourites();

        setStoreFavourites(favourites)

      } catch (error) {
        console.log("error", error);
      }
    },
    [setProfileName, setStoreFavourites]
  );

  const signOutHandler = useCallback(async() => {
    try {
       await axios.get(`${basePath}user/logout`, {
        headers: {
          Authorization: `Bearer ${session}`,
        }
      });

      // Clear specific storage items instead of everything
      await clearFlagsStorage();
      await AsyncStorage.removeItem('session');
     
    } catch (err) {
      console.log(err);
    } finally {
      // Reset local state
      setStoreFavourites([]);
      resetAuthCTAVariables();
      setSession(false);
    }
  },[session, setStoreFavourites, resetAuthCTAVariables, setSession]);

  const getFavourites = useCallback(async()=> {
    try {
      const response = await axios.get(`${basePath}user/favourites`, {
          headers: {
            'Authorization': `Bearer ${session}`,
            'Content-Type': 'application/json; charset=utf-8'
          }
        });

      if(response.status === 200){
        setStoreFavourites(response.data.favourites)
        return response.data.favourites;
      }
    }catch(err){
      console.log(err)
      return null;
    }

  },[session, setStoreFavourites]);

  const setIsFavourite = useCallback(async (flagName: string) => {
    try {
      const response = await axios.patch(
        `${basePath}user/favourites`,
        { flag: flagName },
        {
          headers: {
            'Authorization': `Bearer ${session}`,
            'Content-Type': 'application/json; charset=utf-8'
          }
        }
      );

      if (response.data.success) {
        await getFavourites();
        return { 
          success: true, 
          message: response.data.message 
        };
      }
    } catch (error) {
      console.error('Error toggling favourite:', error);
      return {
        success: false,
        message: 'Failed to toggle favourite'
      };
    } 
  }, [session, getFavourites]);


  

  // const setGameUserNameHandler = useCallback(
  //   (value: string) => {
  //     setGameUserName(value);
  //   },
  //   [setGameUserName]
  // );

  const guessTheFlagWriteAnswerHandler = () => {
    const newValue = !isGuessTheFlagWriteAnswer;
    setStoreIsGuessTheFlagWriteAnswer(newValue);
  };

  const deleteProfile = useCallback(async () => {
    try {
      const response = await axios.delete(
        `${basePath}user/delete`,
        {
          headers: {
            'Authorization': `Bearer ${session}`,
            'Content-Type': 'application/json; charset=utf-8'
          }
        }
      );

      if (response.data.success) {
        await clearFlagsStorage();
        return { 
          success: true, 
          message: response.data.message 
        };
      }
    } catch (error) {
      console.error('Error deleting profile:', error);
      return {
        success: false,
        message: 'Failed to delete profile'
      };
    } 
  }, [session]);

  return {
    favourites,
    getFavourites,
    setIsFavourite,
    getProfile,
    setIsGuessTheFlagWriteAnswer: guessTheFlagWriteAnswerHandler,
    isGuessTheFlagWriteAnswer,
    // setGameUserName: setGameUserNameHandler,
    gameUserName,
    signOutHandler,
    deleteProfile
  };
}
