import CTA from "@/components/buttons/large-cta";
import { SplashScreenController } from "@/components/splash/splash-screen-controller";
import useProfile from "@/hooks/useProfile";
import { usePersistStore, useStore } from "@/store/store";
import axios from "axios";
import { router, Stack } from "expo-router";
import { useState } from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import { basePath } from "../lib/env-variables";


export default function Root() {
  return (
    <>
      <SplashScreenController />
      <RootNavigator />
    </>
  );
}

function RootNavigator() {
  const { height } = useWindowDimensions();
  const { getProfile } = useProfile();

  const isAuthCTADisabled = useStore((state: any) => state.isAuthCTADisabled);
  const setIsAuthCTADisabled = useStore(
    (state: any) => state.setIsAuthCTADisabled
  );
  const authCTANumber = useStore((state: any) => state.authCTANumber);
  const authCTATitle = useStore((state: any) => state.authCTATitle);
  const increaseAuthCTANumber = useStore(
    (state: any) => state.increaseAuthCTANumber
  );
  const resetAuthCTAVariables = useStore(
    (state: any) => state.resetAuthCTAVariables
  );
  const isAuthLoginRoute = useStore((state: any) => state.isAuthLoginRoute);
  const setIsAuthLoginRoute = useStore(
    (state: any) => state.setIsAuthLoginRoute
  );
  const formData = useStore((state: any) => state.formData);
  const session = usePersistStore((state: any) => state.session);
  const setSession = usePersistStore((state: any) => state.setSession);

  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);

    try {
      setIsAuthCTADisabled(true);
      const response = await axios.post(`${basePath}user/login`, {
        email: formData.Email?.toLowerCase() || formData.Username?.toLowerCase(),
        password: formData.Password,
        username: formData.Username?.toLowerCase() || formData.Email?.toLowerCase(),
      });

      if (response.data.token) {
        setSession(response.data.token);
        goToHomeScreen();
      }
    } catch (error) {
      console.log("error signing in:", error);
      setIsAuthCTADisabled(false);
    }
    setLoading(false);
  }

  async function goToHomeScreen() {
    if (session) {
      await axios.get(`${basePath}user/profile`);

      router.navigate("/(app)");
      resetAuthCTAVariables();
    }
  }

  async function signUpWithEmail() {
    setLoading(true);

    try {
      const hiddenPassword = formData.Password;
      setIsAuthCTADisabled(true);
      const response = await axios.post(`${basePath}user/signup`, {
        name: formData.Name,
        email: formData.Email.toLowerCase(),
        password: hiddenPassword,
        username: formData.Username.toLowerCase(),
      });

      if (response.data.token) {
        setSession(response.data.token);
        goToHomeScreen();
      }
    } catch (error) {
      console.log("error signing up");
    }
    setLoading(false);
  }

  const onPress = () => {
    if (authCTANumber === 0 && isAuthLoginRoute) {
      signInWithEmail();
      // Don't navigate immediately - let signInWithEmail handle navigation on success
    } else if (authCTANumber === 0) {
      router.navigate("/sign-up");
      setIsAuthLoginRoute(false);
      increaseAuthCTANumber();
    } else if (authCTANumber === 1) {
      signUpWithEmail();
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Protected guard={session}>
          <Stack.Screen
            name="(app)"
            options={{
              headerShown: false,
              animation: "slide_from_bottom",
            }}
          />
        </Stack.Protected>
        <Stack.Protected guard={!session}>
          <Stack.Screen name="index" />
          <Stack.Screen
            name="login"
            options={{
              headerShown: false,
              animation: "flip",
            }}
          />
          <Stack.Screen
            name="sign-up"
            options={{
              headerShown: false,
              animation: "flip",
            }}
          />
        </Stack.Protected>
      </Stack>
      {!session && (
        <View style={[styles.ctaWrapper, { bottom: height / 20 }]}>
          <CTA
            disabled={isAuthCTADisabled}
            title={authCTATitle}
            onPress={onPress}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  ctaWrapper: {
    flex: 1,
    width: "100%",
    position: "absolute",
    paddingHorizontal: 20,
  },
});
