import CTA from '@/components/buttons/large-cta';
import { SplashScreenController } from '@/components/splash/splash-screen-controller';
import { SessionProvider } from '@/context/authentication-context';
import { supabase } from '@/lib/supabase';
import { useStore } from '@/store/store';
import { Session } from '@supabase/supabase-js';
import { makeRedirectUri } from 'expo-auth-session';
import * as QueryParams from 'expo-auth-session/build/QueryParams';
import * as Linking from 'expo-linking';
import { router, Stack } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { useEffect, useState } from 'react';
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
  const [session, setSession] = useState<Session | null>(null);
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  WebBrowser.maybeCompleteAuthSession();
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
      // email: 'valid.email@supabase.io',
      email: 'mayagwright20@gmail.com',
      options: {
        emailRedirectTo: redirectTo,
      },
    });

    if (error) {
      throw error;
    }
    handleOpenMailApp();
  };
  // const { session, login } = useSession();
  const { height } = useWindowDimensions();
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
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');

  AppState.addEventListener('change', (state) => {
    if (state === 'active') {
      supabase.auth.startAutoRefresh();
    } else {
      supabase.auth.stopAutoRefresh();
    }
  });

  // useEffect(() => {
  //   if (session) getProfile();
  // }, [session]);

  async function getProfile() {
    try {
      if (!session?.user) throw new Error('No user on the session!');
      const { data, error, status } = await supabase
        .from('profiles')
        .select(`first_name, last_name, avatar_url`)
        .eq('id', session?.user.id)
        .single();
      if (error && status !== 406) {
        throw error;
      }
      if (data) {
        setLastName(data.last_name);
        setFirstName(data.first_name);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    }
  }

  async function updateProfile({
    first_name,
    last_name,
    avatar_url,
  }: {
    first_name: string;
    last_name: string;
    avatar_url: string;
  }) {
    try {
      if (!session?.user) throw new Error('No user on the session!');
      const updates = {
        id: session?.user.id,
        first_name,
        last_name,
        avatar_url,
        updated_at: new Date(),
      };
      const { error } = await supabase.from('profiles').upsert(updates);
      if (error) {
        throw error;
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
    }
  }

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
    if (error) Alert.alert('hello');
    if (!session) {
      Alert.alert('Please check your inbox for email verification!');
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

      router.navigate('/sign-up/user');
      increaseAuthCTANumber();
      console.log('in authCTA number === 1');
    } else if (authCTANumber === 2) {
      if (session) {
        console.log('in authCTA number === 2');
        getProfile();
        setFirstName(formData.first_name);
        setLastName(formData.last_name);
        setAvatarUrl(formData.avatar_url);
        updateProfile({
          first_name: firstName,
          last_name: lastName,
          avatar_url: avatarUrl,
        });
        router.navigate('/(app)');
        console.log('in authCTA number === 3');
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
