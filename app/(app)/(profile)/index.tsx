import { PAGE } from '@/constants/styles';
import { usePageVariables } from '@/hooks/usePageVariables';
import { supabase } from '@/lib/supabase';
import { useStore } from '@/store/store';
import { StyleSheet, Text, View } from 'react-native';

export default function ProfileScreen() {
  // Settings - search by guesss by flag/ name
  // sign out
  // reset favourites

  const resetAuthCTAVariables = useStore(
    (state) => state.resetAuthCTAVariables
  );
  return (
    <View style={[{ ...PAGE.PAGE }, usePageVariables().pageMarginHorizontal]}>
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
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
