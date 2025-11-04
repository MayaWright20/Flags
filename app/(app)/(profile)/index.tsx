import CTA from "@/components/buttons/large-cta";
import useProfile from "@/hooks/useProfile";
import { Image, StyleSheet, View } from "react-native";

export default function ProfileScreen() {
  const {signOutHandler} = useProfile();
  // sign out
  // delete profile
  // edit details - name, email, password

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
