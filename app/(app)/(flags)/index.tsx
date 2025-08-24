import { SafeAreaView, StyleSheet, Text } from 'react-native';

export default function FlagsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>World flags</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
