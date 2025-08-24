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

export default function UserScreen() {
  const router = useRouter();
  const setIsAuthCTADisabled = useStore((state) => state.setIsAuthCTADisabled);
  const setAuthCTATitle = useStore((state) => state.setAuthCTATitle);
  const decreaseAuthCTANumber = useStore(
    (state) => state.decreaseAuthCTANumber
  );
  const setIsAuthLoginRoute = useStore((state) => state.setIsAuthLoginRoute);

  useEffect(() => {
    setIsAuthLoginRoute(true);
    setIsAuthCTADisabled(true);
    setAuthCTATitle('Continue');
  }, [setAuthCTATitle, setIsAuthCTADisabled, setIsAuthLoginRoute]);

  const smallCTAHandler = () => {
    decreaseAuthCTANumber();
    router.navigate('/sign-up');
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.smallCTAWrapper}>
          <SmallCTA
            onPress={smallCTAHandler}
            color={COLOURS.white}
            backgroundColor={COLOURS.blue}
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
            // ctaTitle="Continue"
            ctaHandler={() => {}}
            color={COLOURS.blue}
            content={[
              {
                title: 'Profile picture',
                maxLength: 20,
                keyboardType: '',
                errorMessages: {},
                formType: FORM_TYPES.UPLOAD,
                regex: /^.{12,}$/,
              },
              {
                title: 'First name',
                maxLength: 20,
                keyboardType: '',
                errorMessages: {},
                formType: FORM_TYPES.TEXT_INPUT,
                regex: /^.{12,}$/,
              },
              {
                title: 'Last name',
                maxLength: 20,
                keyboardType: '',
                errorMessages: {},
                formType: FORM_TYPES.TEXT_INPUT,
                regex: /^.{12,}$/,
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
    borderColor: COLOURS.blue,
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
