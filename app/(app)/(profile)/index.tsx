import { supabase } from '@/lib/supabase';
import { useStore } from '@/store/store';
import { StyleSheet, Text, View } from 'react-native';

export default function ProfileScreen() {
  // Settings - search by guesss by flag/ name
  // sign out
  // reset favourites
  // remove profile

  const resetAuthCTAVariables = useStore(
    (state) => state.resetAuthCTAVariables
  );
  return (
    <View style={styles.page}>
      <Text
        onPress={() => {
          resetAuthCTAVariables();
          supabase.auth.signOut();
        }}
      >
        {' '}
        Profile Sign Out
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'white',
  },
});
