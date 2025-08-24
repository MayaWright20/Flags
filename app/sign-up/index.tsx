import SmallCTA from '@/components/buttons/small-cta';
import Form, { FORM_TYPES } from '@/components/form/form';
import { COLOURS } from '@/constants/colours';
import { useStore } from '@/store/store';
import { useRouter } from 'expo-router';
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

export default function SignUpScreen() {
  const router = useRouter();
  const setIsAuthCTADisabled = useStore((state) => state.setIsAuthCTADisabled);
  const setAuthCTATitle = useStore((state) => state.setAuthCTATitle);
  const decreaseAuthCTANumber = useStore(
    (state) => state.decreaseAuthCTANumber
  );
  const setIsAuthLoginRoute = useStore((state) => state.setIsAuthLoginRoute);

  useEffect(() => {
    setIsAuthCTADisabled(true);
    setAuthCTATitle('Continue');
  }, [setAuthCTATitle, setIsAuthCTADisabled]);

  const smallCTAHandler = () => {
    setIsAuthCTADisabled(false);
    decreaseAuthCTANumber();
    setAuthCTATitle('Sign up');
    setIsAuthLoginRoute(null);

    router.navigate('/');
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.smallCTAWrapper}>
          <SmallCTA
            onPress={smallCTAHandler}
            color={COLOURS.white}
            backgroundColor={COLOURS.purple}
            title={'Back'}
            styleInput={{ ...styles.smallCTA }}
          />
        </View>
        <KeyboardAvoidingView
          style={styles.contentWrapper}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
        >
          <Form
            color={COLOURS.purple}
            content={[
              {
                formType: FORM_TYPES.TEXT_INPUT,
                title: 'Email',
                maxLength: 25,
                keyboardType: 'email-address',
                errorMessage: 'This email address is taken.',
              },
              {
                formType: FORM_TYPES.TEXT_INPUT,
                isInputHidden: true,
                title: 'Password',
                PASSWORD_ITEMS: [
                  { title: '12 characters', regex: /^.{12,}$/ },
                  {
                    title: 'Special character',
                    regex: /[!@#$%^&*(),.?":{}|<>]/,
                  },
                  { title: 'Capital letter', regex: /[A-Z]/ },
                  {
                    title: 'Lowercase letter',
                    regex:
                      /[a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z]/,
                  },
                  { title: 'Number', regex: /[0-9]/ },
                ],
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
    borderColor: COLOURS.purple,
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
