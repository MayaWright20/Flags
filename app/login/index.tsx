import SmallCTA from '@/components/buttons/small-cta';
import Form, { FORM_TYPES } from '@/components/form/form';
import { COLOURS } from '@/constants/colours';
import { useStore } from '@/store/store';
import { router } from 'expo-router';
import { useEffect } from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';

const { height: screenHeight } = Dimensions.get('window');

export default function LoginScreen() {
  const setAuthCTATitle = useStore((state: any) => state.setAuthCTATitle);
  const setIsAuthCTADisabled = useStore(
    (state: any) => state.setIsAuthCTADisabled
  );
  const setIsAuthLoginRoute = useStore(
    (state: any) => state.setIsAuthLoginRoute
  );

  useEffect(() => {
    setIsAuthLoginRoute(true);
    setIsAuthCTADisabled(true);
    setAuthCTATitle('Login');
  }, [setAuthCTATitle, setIsAuthCTADisabled, setIsAuthLoginRoute]);

  const smallCTAHandler = () => {
    router.back();
    setAuthCTATitle('Sign up');
    setIsAuthCTADisabled(false);
    setIsAuthLoginRoute(null);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.smallCTAWrapper}>
          <SmallCTA
            onPress={smallCTAHandler}
            color={COLOURS.white}
            backgroundColor={COLOURS.pink}
            title={'back'}
            styleInput={{ ...styles.smallCTA }}
          />
        </View>
        <KeyboardAvoidingView
          style={styles.contentWrapper}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
        >
          <Form
            color={COLOURS.pink}
            content={[
              {
                formType: FORM_TYPES.TEXT_INPUT,
                title: 'Email',
                keybordType: 'email-address',
                regex: /^[A-Za-z]{3,}$/,
              },
              {
                formType: FORM_TYPES.TEXT_INPUT,
                isInputHidden: true,
                title: 'Password',
              },
            ]}
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 35,
    maxHeight: screenHeight,
    backgroundColor: COLOURS.lightYellow,
    position: 'relative',
    borderTopWidth: 2,
    borderColor: COLOURS.pink,
  },
  safeAreaView: {
    flex: 1,
    position: 'relative',
  },
  smallCTAWrapper: {
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  smallCTA: {
    opacity: 1,
  },
  contentWrapper: {
    flex: 1,
    width: '100%',
    position: 'relative',
  },
  scrollContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  fadingText: {
    fontSize: 28,
  },
  buttonRow: {
    flexBasis: 100,
    justifyContent: 'space-evenly',
    marginVertical: 16,
  },
  wrapper: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnsContainer: {
    width: '100%',
    position: 'absolute',
    bottom: '5%',
  },
});
