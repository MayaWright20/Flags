import { Dispatch, SetStateAction } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';

export default function SwitchBtn({
  onValueChange,
  falseColor,
  trueColor,
  value,
  label,
}: {
  onValueChange: Dispatch<SetStateAction<any>>;
  falseColor: string;
  trueColor: string;
  value: any;
  label: string;
}) {
  return (
    <View style={styles.switchWrapper}>
      <Switch
        trackColor={{ false: falseColor, true: trueColor }}
        ios_backgroundColor="#3e3e3e"
        onValueChange={onValueChange}
        value={value}
      />
      <Text style={styles.switchTitle}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  switchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
    marginBottom: 20,
  },
  switchTitle: {
    marginLeft: 10,
    fontSize: 18,
  },
});
