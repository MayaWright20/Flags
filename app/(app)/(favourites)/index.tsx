import { SafeAreaView, StyleSheet, Text } from 'react-native';

export default function FavouritesScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Favourites</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
