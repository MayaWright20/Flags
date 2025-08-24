import { COLOURS } from '@/constants/colours';
import { BORDER_RADIUS, FONTS_VARIANTS, SHADOW } from '@/constants/styles';
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

export default function SmallCTA({
  title,
  backgroundColor = COLOURS.black,
  color = 'white',
  onPress,
  styleInput,
}: {
  title: string;
  backgroundColor?: string;
  color?: string;
  onPress: (event: GestureResponderEvent) => void;
  styleInput?: ViewStyle;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        styleInput,
        { backgroundColor: backgroundColor, ...SHADOW },
      ]}
    >
      <Text
        style={[
          styles.title,
          { ...FONTS_VARIANTS.SMALL_CTA },
          { color: color },
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: BORDER_RADIUS.XLARGE_BORDER_RADIUS,
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'flex-start',
  },
  title: {
    textTransform: 'capitalize',
    textAlign: 'center',
  },
});
