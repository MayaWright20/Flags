import CTA from '@/components/buttons/large-cta';
import { SplashScreenController } from '@/components/splash/splash-screen-controller';
import useProfile from '@/hooks/useProfile';

import { supabase } from '@/lib/supabase';
import { useStore } from '@/store/store';
import { Session } from '@supabase/supabase-js';
import { router, Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, StyleSheet, useWindowDimensions, View } from 'react-native';

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

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [session, setSession] = useState<Session | null>(null);
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) Alert.alert(error.message, 'here');
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
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
    setLoading(false);
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
