import CTA from "@/components/buttons/large-cta";
import useProfile from "@/hooks/useProfile";
import { usePersistStore } from "@/store/store";
import { Image, StyleSheet, Text, View } from "react-native";

export default function ProfileScreen() {
  const {signOutHandler} = useProfile();

  const profileName = usePersistStore((state: any) => state.profileName);

  // sign out
  // delete profile
  // edit details - name, email, password

  return (
    <View style={styles.page}>
      <Image
        source={require("@/assets/images/laying.webp")}
        style={{ width: "100%", height: 200}}
      />
      <Text style={styles.title}>hej! hello! Bonjour!</Text>
      <Text style={styles.title}>{profileName ? profileName : "Buddy"}</Text>
      <View style={styles.container}>
        <CTA title={"Sign out"} onPress={signOutHandler} style={styles.cta} />
      </View>
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
  title: {
    fontSize: 40,
    fontWeight: "bold",
    textTransform: "capitalize"
  },
  container: {
    flex: 1,
    width: '100%',
    marginTop: '30%'
  }
});
