import CTA from '@/components/buttons/large-cta';
import { SplashScreenController } from '@/components/splash/splash-screen-controller';
import useProfile from '@/hooks/useProfile';
import useSession from '@/hooks/useSession';

import { supabase } from '@/lib/supabase';
import { useStore } from '@/store/store';
import { makeRedirectUri } from 'expo-auth-session';
import * as QueryParams from 'expo-auth-session/build/QueryParams';
import * as Linking from 'expo-linking';
import { router, Stack } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { useState } from 'react';
import {
  Alert,
  AppState,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';

export default function Root() {
  return (
    <>
      <SplashScreenController />
      <RootNavigator />
    </>
  );
}

function RootNavigator() {
  const { session } = useSession();
  const { height } = useWindowDimensions();
  const { getProfile } = useProfile();

  const url = Linking.useURL();

  const isAuthCTADisabled = useStore((state) => state.isAuthCTADisabled);
  const authCTANumber = useStore((state) => state.authCTANumber);
  const authCTATitle = useStore((state) => state.authCTATitle);
  const increaseAuthCTANumber = useStore(
    (state) => state.increaseAuthCTANumber
  );
  const resetAuthCTAVariables = useStore(
    (state) => state.resetAuthCTAVariables
  );
  const isAuthLoginRoute = useStore((state) => state.isAuthLoginRoute);
  const setIsAuthLoginRoute = useStore((state) => state.setIsAuthLoginRoute);
  const formData = useStore((state) => state.formData);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  WebBrowser.maybeCompleteAuthSession();

  AppState.addEventListener('change', (state) => {
    if (state === 'active') {
      supabase.auth.startAutoRefresh();
    } else {
      supabase.auth.stopAutoRefresh();
    }
  });

  const redirectTo = makeRedirectUri({
    scheme: 'com.flagsmaya',
    preferLocalhost: true,
  });

  const createSessionFromUrl = async (url: string) => {
    const { params, errorCode } = QueryParams.getQueryParams(url);
    if (errorCode) throw new Error(errorCode);
    const { access_token, refresh_token } = params;
    if (!access_token) return;
    const { data, error } = await supabase.auth.setSession({
      access_token,
      refresh_token,
    });
    if (error) throw error;
    return data.session;
  };

  const sendMagicLink = async () => {
    const { error } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        emailRedirectTo: redirectTo,
      },
    });

    if (error) {
      throw error;
    }
    handleOpenMailApp();
  };

  async function signInWithEmail() {
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) Alert.alert(error.message);
  }

  async function signUpWithEmail() {
    const {
      data: { session },
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    if (!session) {
      Alert.alert(
        'Please check your inbox for email verification!',
        'Go to your email app'
      );
      sendMagicLink();
    }
  }

  async function handleOpenMailApp() {
    const url = 'mailto:';

    const canOpen = await Linking.canOpenURL(url);
    if (canOpen) {
      await Linking.openURL(url);
    }
  }

  const onPress = () => {
    if (url) createSessionFromUrl(url);
    if (authCTANumber === 0 && isAuthLoginRoute) {
      setEmail(formData.Email);
      setPassword(formData.Password);
      signInWithEmail();
      router.navigate('/(app)');
      resetAuthCTAVariables();
    } else if (authCTANumber === 0) {
      router.navigate('/sign-up');
      setIsAuthLoginRoute(false);
      increaseAuthCTANumber();
    } else if (authCTANumber === 1) {
      setEmail(formData.Email);
      setPassword(formData.Password);
      signUpWithEmail();

      if (session) {
        getProfile();
        router.navigate('/(app)');
        resetAuthCTAVariables();
      }
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
              animation: 'slide_from_bottom',
            }}
          />
        </Stack.Protected>
        <Stack.Protected guard={!session}>
          <Stack.Screen name="index" />
          <Stack.Screen
            name="login"
            options={{
              headerShown: false,
              animation: 'flip',
            }}
          />
          <Stack.Screen
            name="sign-up"
            options={{
              headerShown: false,
              animation: 'flip',
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
    width: '100%',
    position: 'absolute',
    paddingHorizontal: 20,
  },
});
