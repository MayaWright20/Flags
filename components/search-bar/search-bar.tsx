import { COLOURS } from '@/constants/colours';
import { FONTS_VARIANTS, SHADOW } from '@/constants/styles';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  TextInput,
  ViewStyle,
} from 'react-native';

export default function SearchBar({
  style,
  onPress,
}: {
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={() => onPress()}
      style={[styles.container, style, { ...SHADOW }]}
    >
      <TextInput
        style={{ ...FONTS_VARIANTS.LARGE_CTA }}
        placeholder="Search"
        onPressIn={() => onPress()}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 100,
    paddingBlock: 20,
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 25,
    marginBlock: 10,
    borderWidth: 1,
    borderColor: COLOURS.lightGrey,
    alignSelf: 'center',
    backgroundColor: 'white',
  },
});
