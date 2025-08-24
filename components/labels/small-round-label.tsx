import {
  BORDER_RADIUS,
  FONTS_VARIANTS,
  MARGIN,
  PADDING,
} from '@/constants/styles';
import { StyleSheet, Text, View } from 'react-native';

export default function SmallRoundLabel({
  title,
  right,
  bottom,
  color,
}: {
  title: string;
  right?: number;
  bottom?: number;
  color?: string;
}) {
  return (
    <View style={[styles.pillWrapper, { bottom: bottom, right: right }]}>
      <Text style={[{ ...FONTS_VARIANTS.XSMALL_TEXT_BOLD, color: color }]}>
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pillWrapper: {
    backgroundColor: 'white',
    position: 'absolute',
    paddingVertical: PADDING.SMALL_PADDING,
    paddingHorizontal: PADDING.MEDIUM_PADDING,
    margin: MARGIN.MEDIUM_MARGIN,
    borderRadius: BORDER_RADIUS.XLARGE_BORDER_RADIUS,
  },
});
