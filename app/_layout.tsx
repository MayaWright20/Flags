import CTA from '@/components/buttons/large-cta';
import { SplashScreenController } from '@/components/splash/splash-screen-controller';
import useProfile from '@/hooks/useProfile';
import { useStore } from '@/store/store';
import axios from 'axios';
import { router, Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';

const apiUrl = process.env.EXPO_PUBLIC_URL;

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


  const [loading, setLoading] = useState(false);

  const [session, setSession] = useState<string | number | null>(null);
  useEffect(() => {
    // supabase.auth.getSession().then(({ data: { session } }) => {
    //   setSession(session);
    // });
    // supabase.auth.onAuthStateChange((_event, session) => {
    //   setSession(session);
    // });
  }, []);

  async function signInWithEmail() {
    setLoading(true);
    
    // const { error } = await supabase.auth.signInWithPassword({
    //   email: email,
    //   password: password,
    // });
    // if (error) Alert.alert(error.message, 'here');
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);

    try{
      const {status} = await axios.post(`${apiUrl}user/signup`, {
        "name": formData.Name,
        "email": formData.Email,
        "password": formData.Password,
        "username": formData.Username
      });
      
      if(status === 201){
        console.log('hello')
        router.navigate('/(app)');
      }
    }catch(error){
      console.log('error signing up')
    }
    setLoading(false);
  }

  const onPress = () => {
    if (authCTANumber === 0 && isAuthLoginRoute) {
      signInWithEmail();
      router.navigate('/(app)');
      resetAuthCTAVariables();
    } else if (authCTANumber === 0) {
      router.navigate('/sign-up');
      setIsAuthLoginRoute(false);
      increaseAuthCTANumber();
    } else if (authCTANumber === 1) {
      signUpWithEmail();

      // if (session) {
      //   // getProfile();
      //   router.navigate('/(app)');
      //   resetAuthCTAVariables();
      // }
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
