import CTA from "@/components/buttons/large-cta";
import { usePersistStore, useStore } from "@/store/store";
import axios from "axios";
import { Image, StyleSheet, View } from "react-native";

export default function ProfileScreen() {
  // Settings - search by guesss by flag/ name
  // sign out
  // reset favourites
  // remove profile

  const resetAuthCTAVariables = useStore(
    (state: any) => state.resetAuthCTAVariables
  );
  const setSession = usePersistStore((state: any) => state.setSession);
  const session = usePersistStore((state: any) => state.session);

  const signOutHandler = async() => {
    try {
      const response = await axios.get(`http://localhost:5000/api/v1/user/logout`, {
        headers: {
          Authorization: `Bearer ${session}`,
        },
      });
      
      if (response.data.success) {
        console.log("Successfully logged out from server", response.status);
      }
    } catch (err) {
      console.log(err);
    } finally {
      resetAuthCTAVariables();
      setSession(false);
    }
  };
  return (
    <View style={styles.page}>
      <Image
        source={require("@/assets/images/laying.png")}
        style={{ width: "100%", height: 200, marginBottom: 150 }}
      />
      <CTA title={"Sign out"} onPress={signOutHandler} style={styles.cta} />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  cta: {
    width: "95%",
  },
});
