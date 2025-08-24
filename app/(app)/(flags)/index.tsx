import { IconSymbol } from '@/components/ui/IconSymbol';
import { COLOURS } from '@/constants/colours';
import useCountries from '@/hooks/useCountries';
import { countries } from '@/lib/country-codes';
import { FlashList } from '@shopify/flash-list';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function FlagsScreen() {
  const { allCountries, loading } = useCountries();
  return (
    <FlashList
      contentContainerStyle={styles.container}
      data={allCountries
        ?.slice()
        .sort((a, b) => a.name.common.localeCompare(b.name.common))}
      estimatedItemSize={40}
      renderItem={({ item }: { item: any }) => (
        <View style={styles.item}>
          <Image
            source={{
              uri: `https://flagcdn.com/w2560/${
                countries[item['name']['common']]
              }.png`,
            }}
            style={styles.image}
          />
          <View style={styles.wrapper}>
            <IconSymbol
              style={styles.icon}
              size={28}
              name="heart"
              color={'red'}
            />
            <Text style={styles.title}>{item['name']['common']}</Text>
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 150,
    alignSelf: 'center',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLOURS.lightGrey,
    marginVertical: 7,
    backgroundColor: 'white',
    marginHorizontal: 5,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '25%',
    aspectRatio: 1,
    objectFit: 'cover',
    borderRadius: 10,
  },
  wrapper: {
    flex: 1,
    height: '100%',
  },
  title: {
    marginLeft: 20,
    fontSize: 20,
    paddingRight: 5,
  },
  icon: {
    alignSelf: 'flex-end',
    margin: 7,
  },
});
