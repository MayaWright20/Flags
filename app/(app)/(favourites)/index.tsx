import useCountries from '@/hooks/useCountries';
import { useState } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function FavouritesScreen() {
  const { allCountries } = useCountries();
  const [favourites, setFavourites] = useState([]);
  return (
    <SafeAreaView
      style={[
        styles.container,
        { justifyContent: favourites.length <= 0 ? 'center' : 'flex-start' },
      ]}
    >
      {favourites.length <= 0 && (
        <>
          <Text style={styles.title}>No Favourites .</Text>
          <View style={styles.imageWrapper}>
            <Image
              source={require('@/assets/images/no_favourites.png')}
              style={styles.image}
            />
          </View>
        </>
      )}
      {favourites.length > 0 && (
        <Image
          source={require('@/assets/images/no_favourites.png')}
          style={{ width: '100%', height: 200 }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: 'white',
  },
  imageWrapper: {
    objectFit: 'contain',
    width: '100%',
    height: '30%',
    padding: 5,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 21,
    marginBottom: 25,
  },
});
