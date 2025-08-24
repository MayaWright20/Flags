import { COLOURS } from '@/constants/colours';
import { FONTS_VARIANTS } from '@/constants/styles';
import { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';

export default function RadioButtons({
  items,
  borderColor,
  onSelectionChange,
}: {
  items: string[];
  borderColor: string;
  onSelectionChange?: (selectedValue: string) => void;
}) {
  const { width } = useWindowDimensions();
  const [selectedCheckbox, setSelectedCheckbox] = useState<
    undefined | string
  >();

  const onPress = (input: any) => {
    setSelectedCheckbox(input);
    onSelectionChange?.(input);
  };

  return (
    <View style={styles.container}>
      {items.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.wrapper,
            {
              width: width / items.length,
              borderColor: borderColor,
            },
          ]}
          accessibilityRole="radio"
          accessibilityState={{ selected: selectedCheckbox === item }}
          onPress={() => onPress(item)}
        >
          <View
            style={[
              styles.checkbox,
              {
                borderColor: borderColor,
              },
            ]}
          >
            {selectedCheckbox === item && (
              <View
                style={[
                  styles.selectedCheckbox,
                  { backgroundColor: borderColor },
                ]}
              ></View>
            )}
          </View>
          <Text style={styles.text}>{item}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    justifyContent: 'space-between',
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  text: {
    ...FONTS_VARIANTS.EYE_BROW,
    textAlign: 'center',
  },
  checkbox: {
    width: 20,
    aspectRatio: 1,
    borderRadius: 100,
    borderWidth: 1,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOURS.white,
  },
  selectedCheckbox: {
    width: 6,
    aspectRatio: 1,
    borderRadius: 100,
  },
});
