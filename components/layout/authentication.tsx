import SmallCTA from '@/components/buttons/small-cta';
import Form, { FORM_TYPES } from '@/components/form/form';
import { COLOURS } from '@/constants/colours';
import { useSession } from '@/context/authentication-context';
import { router } from 'expo-router';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useEffect } from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import CTA from '../buttons/large-cta';

const { height: screenHeight } = Dimensions.get('window');

const VIDEO_SOURCE =
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

export default function AuthenticationLayout({
  isHomePage,
  children,
}: {
  isHomePage: boolean;
  children: any;
}) {
  const { login } = useSession();
  const player = useVideoPlayer(VIDEO_SOURCE, (player) => {
    player.loop = true;
  });

  useEffect(() => {
    player.play();
    player.muted = true;
  }, [player]);

  if (isHomePage) {
    return (
      <View style={styles.homeContainer}>
        <VideoView
          style={styles.pictureContainer}
          player={player}
          allowsFullscreen={true}
          contentFit="cover"
          nativeControls={false}
        />
        {children}
        <View style={[styles.btnsContainer, styles.wrapper]}>
          <CTA
            title={'Login'}
            onPress={() => {
              router.push('/login');
            }}
          />

          <CTA
            title={'Sign up'}
            onPress={() => {
              router.push('/login/sign-up');
            }}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.smallCTAWrapper}>
          <SmallCTA
            onPress={() => router.back()}
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
            ctaTitle="Login"
            color={COLOURS.pink}
            ctaHandler={() => {
              login();
              router.push('/(app)');
            }}
            content={[
              {
                formType: FORM_TYPES.TEXT_INPUT,
                title: 'Username / Email',
                maxLength: 25,
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
  homeContainer: {
    backgroundColor: COLOURS.lightYellow,
    flex: 1,
    position: 'relative',
  },
  pictureContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  wrapper: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnsContainer: {
    flex: 1,
    position: 'absolute',
    bottom: '5%',
    paddingHorizontal: 20,
  },
  container: {
    flex: 1,
    paddingTop: 35,
    maxHeight: screenHeight,
    backgroundColor: COLOURS.lightYellow,
    position: 'relative',
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
