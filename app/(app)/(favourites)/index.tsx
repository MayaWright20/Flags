import { IconSymbol } from '@/components/ui/IconSymbol';
import { countries } from '@/lib/country-codes';
import { supabase } from '@/lib/supabase';
import { FlashList } from '@shopify/flash-list';
import { Session } from '@supabase/supabase-js';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function FavouritesScreen() {
  const [session, setSession] = useState<Session | null>(null);
  const [favourites, setFavourites] = useState<string[]>([]);

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

  async function updateProfile({ favourites }: { favourites?: string[] | [] }) {
    try {
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

  const renderItem = ({ item, index }: { item: any; index: number }) => {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.itemWrapper}>
          {countries && (
            <>
              <TouchableOpacity
                onPress={() => setAsFavourite(item)}
                style={styles.icon}
              >
                <IconSymbol
                  size={28}
                  name={favourites.includes(item) ? 'heart.fill' : 'heart'}
                  color={'red'}
                />
              </TouchableOpacity>
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
    );
  };

  return (
    <SafeAreaView
      style={[
        styles.page,
        { justifyContent: favourites.length <= 0 ? 'center' : 'flex-start' },
      ]}
    >
      {favourites.length <= 0 && (
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
      {favourites.length > 0 && (
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
    padding: 5,
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
    width: '95%',
    justifyContent: 'center',
    backgroundColor: 'pink',
    aspectRatio: 1,
    marginBottom: 5,
    position: 'relative',
    objectFit: 'scale-down',
  },
  itemImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  icon: {
    position: 'absolute',
    zIndex: 2,
    top: 0,
    alignSelf: 'flex-end',
    mixBlendMode: 'difference',
    margin: 5,
  },
});
