import { SafeAreaView, StyleSheet } from 'react-native';

export default function FavouritesScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* <Image
        source={{
          uri: `https://flagcdn.com/w2560/${
            countries[data[0]['name']['common']]
          }.png`,
        }}
        style={{ width: '100%', height: 200 }}
      /> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '50%',
    height: '40%',
  },
});
