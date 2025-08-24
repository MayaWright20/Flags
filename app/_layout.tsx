import CTA from '@/components/buttons/large-cta';
import { SplashScreenController } from '@/components/splash/splash-screen-controller';
import { SessionProvider, useSession } from '@/context/authentication-context';
import { supabase } from '@/lib/supabase';
import { useStore } from '@/store/store';
import { router, Stack } from 'expo-router';
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
    <SessionProvider>
      <SplashScreenController />
      <RootNavigator />
    </SessionProvider>
  );
}

function RootNavigator() {
  const { session, login } = useSession();
  const { height } = useWindowDimensions();

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

  AppState.addEventListener('change', (state) => {
    if (state === 'active') {
      supabase.auth.startAutoRefresh();
    } else {
      supabase.auth.stopAutoRefresh();
    }
  });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    if (error) Alert.alert(error.message);
    if (!session)
      Alert.alert('Please check your inbox for email verification!');
  }

  const onPress = () => {
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
      router.navigate('/sign-up/user');
      increaseAuthCTANumber();
    } else if (authCTANumber === 2) {
      login();
      router.navigate('/(app)');
      resetAuthCTAVariables();
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
