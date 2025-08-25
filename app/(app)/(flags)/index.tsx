import SearchBar from '@/components/search-bar/search-bar';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { COLOURS } from '@/constants/colours';
import { SHADOW } from '@/constants/styles';
import useCountries from '@/hooks/useCountries';
import { countries } from '@/lib/country-codes';
import { supabase } from '@/lib/supabase';
import { FlashList } from '@shopify/flash-list';
import { Session } from '@supabase/supabase-js';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function FlagsScreen() {
  const [session, setSession] = useState<Session | null>(null);
  const [favourites, setFavourites] = useState<string[]>([]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  useEffect(() => {
    getProfile();
  }, [session, favourites]);

  async function getProfile() {
    try {
      const { data, error, status } = await supabase
        .from('profiles')
        .select(`favourites`)
        .eq('id', session?.user.id)
        .single();
      if (error && status !== 406) {
        throw error;
      }
      if (data) {
        setFavourites(data.favourites);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    }
  }

  async function updateProfile({ favourites }: { favourites?: string[] | [] }) {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    try {
      if (!session?.user) throw new Error('No user on the session!');
      const updates = {
        id: session?.user.id,
        favourites,
      };
      const { error } = await supabase.from('profiles').upsert(updates);
      if (error) {
        throw error;
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
    }
  }

  const setAsFavourite = (item: string) => {
    if (favourites.includes(item)) {
      const updated = favourites.filter((fav) => fav !== item);
      setFavourites(updated);
      updateProfile({ favourites: updated });
    } else {
      const updated = [...favourites, item];
      setFavourites(updated);
      updateProfile({ favourites: updated });
    }
  };

  const { allCountries } = useCountries();
  const [search, setSearch] = React.useState('');

  const sortedCountries =
    allCountries
      ?.slice()
      .sort((a, b) => a.name.common.localeCompare(b.name.common)) || [];

  const filteredCountries = search
    ? sortedCountries.filter((country) =>
        country.name.common.toLowerCase().includes(search.toLowerCase())
      )
    : sortedCountries;

  const getFirstLetter = (name: string) => {
    name.charAt(0).toUpperCase();
    if (
      name.charAt(0).toUpperCase() === 'Å' ||
      name.charAt(0).toUpperCase() === 'A'
    ) {
      return 'A';
    } else {
      return name.charAt(0).toUpperCase();
    }
  };

  const renderItem = ({ item, index }: { item: any; index: number }) => {
    const currentLetter = getFirstLetter(item.name.common);
    const prevLetter =
      index > 0
        ? getFirstLetter(filteredCountries[index - 1].name.common)
        : null;
    const showLetter = index === 0 || currentLetter !== prevLetter;
    return (
      <React.Fragment>
        {showLetter && <Text style={styles.letterHeader}>{currentLetter}</Text>}
        <View style={styles.item}>
          <View style={styles.imageWrapper}>
            <Image
              source={{
                uri: `https://flagcdn.com/w2560/${
                  countries[item['name']['common']]
                }.png`,
              }}
              style={styles.image}
            />
          </View>
          <View style={styles.wrapper}>
            <TouchableOpacity
              onPress={() => setAsFavourite(item['name']['common'])}
            >
              <IconSymbol
                style={styles.icon}
                size={28}
                name={
                  favourites.includes(item['name']['common'])
                    ? 'heart.fill'
                    : 'heart'
                }
                color={'red'}
              />
            </TouchableOpacity>

            <Text style={styles.title}>{item['name']['common']}</Text>
          </View>
        </View>
      </React.Fragment>
    );
  };

  return (
    <View style={styles.page}>
      <SearchBar
        style={styles.search}
        value={search}
        onChangeText={setSearch}
      />
      <FlashList
        contentContainerStyle={styles.container}
        data={filteredCountries}
        estimatedItemSize={50}
        renderItem={renderItem}
        ListFooterComponent={
          <Image
            source={require('@/assets/images/capes.png')}
            style={{ width: '100%', height: 300, marginBottom: 150 }}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    backgroundColor: '#fff',
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
    aspectRatio: 1,
    objectFit: 'contain',
    marginLeft: 10,
  },
  imageWrapper: {
    width: '25%',
    ...(typeof SHADOW === 'object' ? SHADOW : {}),
  },
  wrapper: {
    flex: 1,
    height: '100%',
  },
  title: {
    marginLeft: 20,
    fontSize: 20,
    paddingRight: 5,
    marginTop: -5,
  },
  icon: {
    alignSelf: 'flex-end',
    margin: 7,
  },
  letterHeader: {
    fontWeight: 'bold',
    fontSize: 28,
    marginTop: 15,
    marginBottom: 5,
    alignSelf: 'flex-start',
    color: COLOURS.darkGrey,
    marginLeft: 10,
  },
  search: {
    width: '95%',
  },
});
