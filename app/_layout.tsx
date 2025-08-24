import CTA from '@/components/buttons/large-cta';
import { SplashScreenController } from '@/components/splash/splash-screen-controller';
import { SessionProvider, useSession } from '@/context/authentication-context';
import { useStore } from '@/store/store';
import { router, Stack } from 'expo-router';
import { StyleSheet, useWindowDimensions, View } from 'react-native';

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

  const onPress = () => {
    console.log('formData', formData);
    if (authCTANumber === 0 && isAuthLoginRoute) {
      login();
      router.navigate('/(app)');
      resetAuthCTAVariables();
    } else if (authCTANumber === 0) {
      router.navigate('/sign-up');
      setIsAuthLoginRoute(false);
      increaseAuthCTANumber();
    } else if (authCTANumber === 1) {
      router.navigate('/sign-up/user');
      increaseAuthCTANumber();
    } else if (authCTANumber === 2) {
      login();
      router.navigate('/(app)');
      resetAuthCTAVariables();
    } else {
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
