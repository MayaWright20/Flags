import CTA from '@/components/buttons/large-cta';
import { supabase } from '@/lib/supabase';
import { useStore } from '@/store/store';
import { Image, StyleSheet, View } from 'react-native';

export default function ProfileScreen() {
  // Settings - search by guesss by flag/ name
  // sign out
  // reset favourites
  // remove profile

  const resetAuthCTAVariables = useStore(
    (state: any) => state.resetAuthCTAVariables
  );

  const signOutHandler = () => {
    resetAuthCTAVariables();
    supabase.auth.signOut();
  };
  return (
    <View style={styles.page}>
      <Image
        source={require('@/assets/images/laying.png')}
        style={{ width: '100%', height: 200, marginBottom: 150 }}
      />
      <CTA title={'Sign out'} onPress={signOutHandler} />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 5,
  },
});
