import CTA from '@/components/buttons/large-cta';
import { usePersistStore, useStore } from '@/store/store';
import { Image, StyleSheet, View } from 'react-native';

export default function ProfileScreen() {
  // Settings - search by guesss by flag/ name
  // sign out
  // reset favourites
  // remove profile

  const resetAuthCTAVariables = useStore(
    (state: any) => state.resetAuthCTAVariables
  );
  const setSession = usePersistStore(
    (state: any) => state.setSession
  );

  const signOutHandler = () => {
    resetAuthCTAVariables();
    setSession(null)
  };
  return (
    <View style={styles.page}>
      <Image
        source={require('@/assets/images/laying.png')}
        style={{ width: '100%', height: 200, marginBottom: 150 }}
      />
      <CTA title={'Sign out'} onPress={signOutHandler} style={styles.cta} />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  cta: {
    width: '95%',
  },
});
