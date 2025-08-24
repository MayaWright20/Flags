import CTA from '@/components/buttons/large-cta';
import { COLOURS } from '@/constants/colours';
import { useStore } from '@/store/store';
import { router } from 'expo-router';
import { StyleSheet, useWindowDimensions, View } from 'react-native';

export default function Index() {
  const setIsAuthLoginRoute = useStore((state) => state.setIsAuthLoginRoute);
  const { height } = useWindowDimensions();

  return (
    <View style={styles.container}>
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
    paddingHorizontal: 20,
  },
});
