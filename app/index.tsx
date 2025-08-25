import CTA from '@/components/buttons/large-cta';
import { useStore } from '@/store/store';
import { router } from 'expo-router';
import {
  Image,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';

export default function Index() {
  const setIsAuthLoginRoute = useStore((state) => state.setIsAuthLoginRoute);
  const { height } = useWindowDimensions();

  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/happy_flags.png')}
        style={styles.image}
      />
      <Text style={styles.title}>Guess the Flag</Text>
      <View
        style={[styles.btnsContainer, styles.wrapper, { bottom: height / 7.9 }]}
      >
        <CTA
          title={'Login'}
          onPress={() => {
            setIsAuthLoginRoute(true);
            router.navigate('/login');
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    position: 'relative',
    alignItems: 'center',
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
    paddingHorizontal: 20,
  },
  image: {
    marginTop: '20%',
    width: '50%',
    height: '15%',
    alignSelf: 'center',
  },
  title: {
    fontWeight: '700',
    fontSize: 40,
    marginTop: '50%',
  },
});
