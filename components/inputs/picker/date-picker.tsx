import { useEffect, useState } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import TextInputComponent from '../text-inputs/text-input';

interface DatePickerProps {
  onDateChange: (value: string[]) => void;
  borderColor: string;
}

export default function DatePicker({
  onDateChange,
  borderColor,
}: DatePickerProps) {
  const { width } = useWindowDimensions();

  const availableWidth = width - 60;
  const inputWidth = (availableWidth - 20) / 3;

  const [date, setDate] = useState<string[]>(['', '', '']);

  useEffect(() => {
    onDateChange(date);
  }, [date]);

  return (
    <View style={styles.container}>
      <TextInputComponent
        styleInput={{ ...styles.date }}
        borderColor={borderColor}
        placeholder={'Day'}
        keyboardType="number-pad"
        onChangeText={(text) => {
          setDate((prev) => [text, prev[1], prev[2]]);
        }}
        maxLength={2}
      />
      <TextInputComponent
        styleInput={{ ...styles.date }}
        borderColor={borderColor}
        placeholder={'Month'}
        keyboardType="number-pad"
        onChangeText={(text) => {
          setDate((prev) => [prev[0], text, prev[2]]);
        }}
        maxLength={2}
      />
      <TextInputComponent
        styleInput={{ ...styles.date }}
        borderColor={borderColor}
        placeholder={'Year'}
        keyboardType="number-pad"
        onChangeText={(text) => {
          setDate((prev) => [prev[0], prev[1], text]);
        }}
        maxLength={4}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  date: {
    textAlign: 'center',
  },
});
