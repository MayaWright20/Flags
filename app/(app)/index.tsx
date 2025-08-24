import useCountries from '@/hooks/useCountries';
import { countries } from '@/lib/country-codes';
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
} from 'react-native';

export default function HomeScreen() {
  const { loading, allCountries } = useCountries();

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <>
          {allCountries && (
            <>
              <Image
                source={{
                  uri: `https://flagcdn.com/w2560/${
                    countries[allCountries[0]['name']['common']]
                  }.png`,
                }}
                style={{ width: '100%', height: 200 }}
              />
              <Text>{allCountries[0]['name']['common']}</Text>
            </>
          )}
        </>
      )}
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
