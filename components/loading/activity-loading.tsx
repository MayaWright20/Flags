import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

export default function ActivityLoading() {
  return (
    <View style={styles.center}>
      <ActivityIndicator size="large" />
      <Text style={styles.muted}>Loading…</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  muted: {
    marginTop: 8,
    opacity: 0.6,
  },
});
