import FavouriteIcon from '@/components/buttons/favourite-icon';
import { countries } from '@/lib/country-codes';
import { usePersistStore } from '@/store/store';
import { FlashList } from '@shopify/flash-list';
import { Link } from 'expo-router';
import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function FavouritesScreen() {
  const favourites = usePersistStore((state: any) => state.favourites);

  const renderItem = ({ item }: { item: any }) => {
    return (
      <Link
        href={{
          pathname: '/[id]',
          params: { id: item },
        }}
      >
        <View style={styles.itemContainer}>
          <View style={styles.itemWrapper}>
            {countries && (
              <>
                <FavouriteIcon
                  size={28}
                  favouritedItem={item}
                  styles={styles.icon}
                />
                <Image
                  source={{
                    uri: `https://flagcdn.com/w2560/${countries[item]}.png`,
                  }}
                  style={styles.itemImage}
                />
              </>
            )}
          </View>
          <Text>{item}</Text>
        </View>
      </Link>
    );
  };

  return (
    <SafeAreaView style={styles.page}>
      {favourites && favourites.length < 1 && (
        <>
          <Text style={styles.title}>No Favourites</Text>
          <View style={styles.imageWrapper}>
            <Image
              source={require('@/assets/images/no_favourites.png')}
              style={styles.image}
            />
          </View>
        </>
      )}
      {favourites && favourites.length >= 1 && (
        <FlashList
          contentContainerStyle={styles.container}
          data={favourites}
          estimatedItemSize={50}
          renderItem={renderItem}
          numColumns={2}
          ListFooterComponent={
            <Image
              source={require('@/assets/images/happy_flags.png')}
              style={{ width: '100%', height: 300, marginBottom: 150 }}
            />
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 30,
    marginBottom: 25,
    alignSelf: 'center',
    marginTop: '40%',
  },
  imageWrapper: {
    objectFit: 'cover',
    width: '100%',
    height: '30%',
  },
  image: {
    objectFit: 'cover',
    width: '100%',
    height: '100%',
  },
  container: {
    backgroundColor: 'white',
  },
  itemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
  },
  itemWrapper: {
    alignSelf: 'center',
    width: '99%',
    justifyContent: 'center',
    aspectRatio: 1,
    marginBottom: 5,
    position: 'relative',
    objectFit: 'scale-down',
  },
  itemImage: {
    width: '100%',
    height: '100%',
  },
  icon: {
    position: 'absolute',
    zIndex: 2,
    top: 0,
    alignSelf: 'flex-end',
    mixBlendMode: 'difference',
    marginRight: 5,
    marginTop: 10,
  },
});
