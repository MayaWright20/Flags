import { IconSymbol } from '@/components/ui/IconSymbol';
import { COLOURS } from '@/constants/colours';
import { SHADOW } from '@/constants/styles';
import useCountries from '@/hooks/useCountries';
import { countries } from '@/lib/country-codes';
import { useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function HomeScreen() {
  const { allCountries } = useCountries();
  const [randomInts, setRadomInts] = useState([0, 10, 130, 112]);
  const [correctAnswerInt, setCorrectAnswerInt] = useState(
    Math.floor(Math.random() * 4)
  );

  console.log('correctAnswer', correctAnswerInt);

  return (
    <ScrollView contentContainerStyle={styles.scrollview}>
      <SafeAreaView style={styles.container}>
        {allCountries && (
          <View style={styles.imageWrapper}>
            <IconSymbol
              style={styles.icon}
              size={35}
              name="heart"
              color={'red'}
            />
            <Image
              source={{
                uri: `https://flagcdn.com/w2560/${
                  countries[
                    allCountries[randomInts[correctAnswerInt]]['name']['common']
                  ]
                }.png`,
              }}
              style={styles.image}
            />
          </View>
        )}
        <View style={styles.itemsWrapper}>
          {allCountries &&
            randomInts.map((item, index) => {
              if (index === correctAnswerInt) {
                return (
                  <TouchableOpacity key={index} style={styles.item}>
                    <Text style={styles.title}>
                      {
                        allCountries[randomInts[correctAnswerInt]]['name'][
                          'common'
                        ]
                      }
                    </Text>
                  </TouchableOpacity>
                );
              } else {
                return (
                  <TouchableOpacity style={styles.item} key={index}>
                    <Text style={styles.title}>
                      {allCountries[randomInts[index]]['name']['common']}
                    </Text>
                  </TouchableOpacity>
                );
              }
            })}
          <TouchableOpacity style={styles.button}>
            <Text style={[styles.title, styles.buttonText]}>Continue</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollview: {
    width: '95%',
    alignSelf: 'center',
    flex: 1,
  },
  imageWrapper: {
    flex: 1,
    marginBottom: 10,
  },
  itemsWrapper: {
    flex: 1,
  },
  image: {
    borderRadius: 15,
    flex: 1,
    width: '95%',
    height: '90%',
    alignSelf: 'center',
  },
  icon: {
    alignSelf: 'flex-end',
    margin: 15,
    position: 'relative',
  },
  item: {
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: '95%',
    borderRadius: 10,
    alignSelf: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: COLOURS.lightGrey,
    ...SHADOW,
    padding: 20,
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '700',
  },
  button: {
    backgroundColor: 'black',
    width: '50%',
    alignSelf: 'center',
    marginTop: 10,
    padding: 15,
    justifyContent: 'center',
    borderRadius: 100,
    ...SHADOW,
  },
  buttonText: {
    color: 'white',
  },
});
