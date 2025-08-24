import { PAGE } from '@/constants/styles';
import { useSession } from '@/context/authentication-context';
import { usePageVariables } from '@/hooks/usePageVariables';
import { StyleSheet, Text, View } from 'react-native';

export default function ProfileScreen() {
  // Settings - search by guesss by flag/ name
  // sign out
  // reset favourites

  const { signOut } = useSession();
  return (
    <View style={[{ ...PAGE.PAGE }, usePageVariables().pageMarginHorizontal]}>
      <Text
        onPress={() => {
          // The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
          signOut();
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
