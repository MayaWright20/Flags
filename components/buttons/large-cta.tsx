import { COLOURS } from '@/constants/colours';
import {
  BORDER_RADIUS,
  FONTS_VARIANTS,
  PADDING,
  SHADOW,
} from '@/constants/styles';
import * as Haptics from 'expo-haptics';
import {
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

export default function CTA({
  title,
  onPress,
  disabled,
  backgroundColor = COLOURS.black,
  color = 'white',
  style,
}: {
  title: string;
  onPress: ((event: GestureResponderEvent) => void) | undefined;
  disabled?: boolean;
  backgroundColor?: string;
  color?: string;
  style?: StyleProp<ViewStyle>;
}) {
  const onPressHandler = (event: GestureResponderEvent) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    if (onPress) {
      onPress(event);
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        style,
        {
          backgroundColor: disabled ? COLOURS.mediumGrey : backgroundColor,
          borderColor: disabled ? COLOURS.darkGrey : COLOURS.orange,
          ...SHADOW,
        },
      ]}
      onPress={disabled ? undefined : onPressHandler}
    >
      <Text style={[styles.text, { ...FONTS_VARIANTS.LARGE_CTA }, { color }]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    width: '100%',
    borderRadius: BORDER_RADIUS.XLARGE_BORDER_RADIUS,
    padding: PADDING.LARGE_PADDING,
    alignSelf: 'center',
  },
  text: {
    textAlign: 'center',
    color: 'white',
  },
});
