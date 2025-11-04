import CTA from "@/components/buttons/large-cta";
import useProfile from "@/hooks/useProfile";
import { useStore } from "@/store/store";
import { Image, StyleSheet, Text, View } from "react-native";

export default function ProfileScreen() {
  const {signOutHandler} = useProfile();

  const profileName = useStore((state: any) => state.profileName);
  // sign out
  // delete profile
  // edit details - name, email, password

  return (
    <View style={styles.page}>
      <Image
        source={require("@/assets/images/laying.png")}
        style={{ width: "100%", height: 200}}
      />
      <Text style={styles.title}>hej {profileName}</Text>
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
  title: {
    fontSize: 50,
    fontWeight: "bold",
    textTransform: "capitalize"
  }
});
