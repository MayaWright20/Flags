import { StyleSheet, Text, View } from 'react-native';

export default function TestPage() {
  return (
    <View style={styles.container}>
      <Text>test page</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
  },
});
