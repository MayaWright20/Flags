import AsyncStorage from "@react-native-async-storage/async-storage";

export const clearFlagsStorage = async () => {
    try {
      await AsyncStorage.removeItem("flags");
    } catch (error) {
      console.error('Error clearing flags data:', error);
    }
};