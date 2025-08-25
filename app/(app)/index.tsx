import { IconSymbol } from '@/components/ui/IconSymbol';
import { COLOURS } from '@/constants/colours';
import { SHADOW } from '@/constants/styles';
import useCountries from '@/hooks/useCountries';
import { countries } from '@/lib/country-codes';
import * as Haptics from 'expo-haptics';
import { useRef, useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';

export default function HomeScreen() {
  const { allCountries } = useCountries();
  const explosion = useRef(null);
  const [randomInts, setRadomInts] = useState([0, 10, 130, 112]);
  const [correctAnswerInt, setCorrectAnswerInt] = useState(
    Math.floor(Math.random() * 4)
  );
  const [isShowAnswer, setIsShowAnswer] = useState(false);
  const [itemPressed, setItemPressed] = useState<null | number>(null);

  const onPress = (isCorrect: boolean, itemPress?: number) => {
    if (itemPress !== null && itemPress !== undefined) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
      setItemPressed(itemPress);
    }
    if (explosion && explosion.current && isCorrect) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      explosion.current.start();
    }
    setIsShowAnswer(true);
  };

  const nextQuestionHandler = () => {
    setItemPressed(null);
    if (allCountries) {
      setRadomInts([
        Math.floor(Math.random() * allCountries.length),
        Math.floor(Math.random() * allCountries.length),
        Math.floor(Math.random() * allCountries.length),
        Math.floor(Math.random() * allCountries.length),
      ]);
    }
    setCorrectAnswerInt(Math.floor(Math.random() * 4));
    setIsShowAnswer(false);
  };

  return (
    <View style={styles.page}>
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
                      allCountries[randomInts[correctAnswerInt]]['name'][
                        'common'
                      ]
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
                    <TouchableOpacity
                      key={index}
                      style={styles.item}
                      disabled={isShowAnswer}
                      onPress={() => onPress(true)}
                    >
                      <Text
                        style={[
                          styles.title,
                          { color: isShowAnswer ? COLOURS.green : 'black' },
                        ]}
                      >
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
                    <TouchableOpacity
                      style={styles.item}
                      key={index}
                      disabled={isShowAnswer}
                      onPress={() => onPress(false, index)}
                    >
                      <Text
                        style={[
                          styles.title,
                          { color: itemPressed === index ? 'red' : 'black' },
                        ]}
                      >
                        {allCountries[randomInts[index]]['name']['common']}
                      </Text>
                    </TouchableOpacity>
                  );
                }
              })}
            <TouchableOpacity
              disabled={!isShowAnswer}
              style={[
                styles.button,
                { backgroundColor: isShowAnswer ? 'black' : COLOURS.lightGrey },
              ]}
              onPress={nextQuestionHandler}
            >
              <Text style={[styles.title, styles.buttonText]}>Continue</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ScrollView>
      <ConfettiCannon
        autoStart={false}
        ref={explosion}
        count={200}
        origin={{ x: -10, y: 0 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'white',
  },
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
    width: '100%',
    height: 'auto',
    alignSelf: 'center',
    objectFit: 'contain',
    ...SHADOW,
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
