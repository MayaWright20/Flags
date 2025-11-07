import CTA from "@/components/buttons/large-cta";
import { COLOURS } from "@/constants/colours";
import useProfile from "@/hooks/useProfile";
import { usePersistStore } from "@/store/store";
import { Alert, Image, Platform, StyleSheet, Text, View } from "react-native";

export default function ProfileScreen() {
  const { signOutHandler, deleteProfile: deleteProfileHandler } = useProfile();

  const profileName = usePersistStore((state: any) => state.profileName);

  // delete profile
  // edit details - name, email, password

  const deleteProfile = () => {
    Alert.alert(
      "WARNING!",
      "This is irriversible. Do you still want to delete your profile",
      [
        {
          text: "Yes",
          onPress: () => {
            deleteProfileHandler(),
            signOutHandler()
          },
          isPreferred: true,
        },
        {
          text: "No",
          isPreferred: true,
        },
      ]
    );
  };

  return (
    <View style={styles.page}>
      <Image
        source={require("@/assets/images/laying.webp")}
        style={{ width: "100%", height: 200 }}
      />
      <Text style={styles.title}>hej! hello! Bonjour!</Text>
      <Text style={styles.title}>{profileName ? profileName : "Buddy"}</Text>
      <View style={styles.container}>
        <CTA title={"Sign out"} onPress={signOutHandler} style={styles.cta} />
        {Platform.OS === "ios" && (
          <CTA
          color={COLOURS.mediumGrey}
          backgroundColor={COLOURS.white}
          title={"Delete Profile"}
          onPress={deleteProfile}
          style={[styles.cta, styles.deleteCta]}
        />
        )}
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
    textTransform: "capitalize",
  },
  container: {
    flex: 1,
    width: "100%",
    marginTop: "30%",
  },
  deleteCta: {
    marginTop: "30%",
  },
});
