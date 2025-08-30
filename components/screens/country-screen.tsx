// app/SeychellesScreen.tsx
import { COLOURS } from '@/constants/colours';
import { SHADOW } from '@/constants/styles';
import { useWikipediaSummary } from '@/hooks/useWikipedia';
import React from 'react';
import {
  ActivityIndicator,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function CountryScreen({
  countryName,
}: {
  countryName: string;
}) {
  const { data, loading, error } = useWikipediaSummary(countryName);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.muted}>Loading facts…</Text>
      </View>
    );
  }

  if (error || !data) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>
          Couldn’t load Wikipedia: {error ?? 'no data'}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.page}>
      <ScrollView contentContainerStyle={styles.container}>
        {data.thumbnail?.source ? (
          <Image
            source={{ uri: data.thumbnail.source }}
            style={styles.thumb}
            resizeMode="cover"
          />
        ) : null}

        <Text style={styles.title}>{data.title}</Text>
        {!!data.description && (
          <Text style={styles.subtitle}>{data.description}</Text>
        )}
        {!!data.extract && <Text style={styles.body}>{data.extract}</Text>}

        {data.content_urls?.mobile?.page && (
          <Text
            style={styles.link}
            onPress={() => Linking.openURL(data.content_urls!.mobile!.page!)}
          >
            Read full article on Wikipedia →
          </Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'white',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  container: {
    padding: 20,
    backgroundColor: 'white',
    paddingBottom: 150,
  },
  thumb: {
    width: '100%',
    height: 220,
    borderRadius: 12,
    marginBottom: 16,
    ...SHADOW,
    borderWidth: 1,
    borderColor: COLOURS.lightGrey,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
    marginBottom: 12,
  },
  body: {
    fontSize: 16,
    lineHeight: 22,
  },
  link: {
    marginTop: 18,
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  muted: {
    marginTop: 8,
    opacity: 0.6,
  },
  error: {
    color: 'crimson',
    textAlign: 'center',
    paddingHorizontal: 16,
  },
});
