import FavouriteIcon from '@/components/buttons/favourite-icon';
import TextInputComponent from '@/components/text-inputs/text-input';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { COLOURS } from '@/constants/colours';
import { SHADOW } from '@/constants/styles';
import useCountries from '@/hooks/useCountries';
import useProfile from '@/hooks/useProfile';
import { countries } from '@/lib/country-codes';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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

export default function GuessFlagScreen() {
  const { allCountries } = useCountries();
  const { isGuessTheFlagWriteAnswer } = useProfile();

  const allCountriesCount = useMemo(
    () => allCountries && allCountries.length,
    [allCountries]
  );

  const explosion = useRef<any>(null);

  const [randomInts, setRadomInts] = useState([0, 10, 130, 112]);
  const [correctAnswerInt, setCorrectAnswerInt] = useState(
    Math.floor(Math.random() * 4)
  );
  const [showAnswer, setShowAnswer] = useState(false);
  const [itemPressed, setItemPressed] = useState<null | number>(null);
  const [writtenAnswer, setWrittenAnswer] = useState('');
  const [isWrittenInputEditable, setIsWrittenInputEditable] = useState(true);
  const [clearWrittenInput, setClearWrittenInput] = useState(false);
  const [writtenAnswerCTATitle, setWrittenAnswerCTATitle] =
    useState('Reveal Answer');

  let correctAnswer = '';

  if (allCountries) {
    correctAnswer =
      allCountries[randomInts[correctAnswerInt]]['name']['common'];
  }

  useEffect(() => {
    if (isGuessTheFlagWriteAnswer) {
      if (writtenAnswer.trim() !== '') {
        setShowAnswer(true);
      } else {
        setShowAnswer(false);
      }
    }
    if (clearWrittenInput === true) {
      setClearWrittenInput(false);
    }
  }, [isGuessTheFlagWriteAnswer, writtenAnswer, clearWrittenInput]);

  const confettiHandler = () => {
    if (explosion && explosion.current) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      explosion.current.start();
    }
  };

  const nextQuestionHandler = useCallback(() => {
    setItemPressed(null);

    if (allCountries) {
      setRadomInts([
        Math.floor(Math.random() * allCountriesCount),
        Math.floor(Math.random() * allCountriesCount),
        Math.floor(Math.random() * allCountriesCount),
        Math.floor(Math.random() * allCountriesCount),
      ]);
    }
    setCorrectAnswerInt(Math.floor(Math.random() * 4));
    setShowAnswer(false);
  }, [allCountries]);

  const guessAnswerHandler = (isCorrect?: boolean, itemPress?: number) => {
    if (itemPress !== null && itemPress !== undefined) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
      setItemPressed(itemPress);
    }
    if (isCorrect) {
      confettiHandler();
    }

    setShowAnswer(true);
  };

  const settingsNavigator = () => {
    router.push('/(app)/(games)/guess-the-flag-settings');
  };

  const isWriteAnswerCTAHandler = useCallback(() => {
    if (writtenAnswerCTATitle === 'Reveal Answer') {
      setIsWrittenInputEditable(false);
      if (writtenAnswer.trim().toLowerCase() === correctAnswer.toLowerCase()) {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
        confettiHandler();
      }
      setWrittenAnswerCTATitle('Next Flag');
    } else if (writtenAnswerCTATitle === 'Next Flag') {
      setWrittenAnswerCTATitle('Reveal Answer');
      setIsWrittenInputEditable(true);
      setWrittenAnswer('');
      setClearWrittenInput(true);
      nextQuestionHandler();
    }
  }, [writtenAnswerCTATitle]);

  return (
    <View style={styles.page}>
      <ScrollView contentContainerStyle={styles.scrollview}>
        <SafeAreaView style={styles.container}>
          {allCountries && (
            <View style={styles.imageWrapper}>
              {correctAnswer && (
                <>
                  <View style={styles.iconsWrapper}>
                    <TouchableOpacity onPress={settingsNavigator}>
                      <IconSymbol size={35} name={'gearshape'} color={'grey'} />
                    </TouchableOpacity>
                    <FavouriteIcon
                      disabled={!showAnswer}
                      size={35}
                      favouritedItem={correctAnswer}
                      styles={styles.icon}
                    />
                  </View>
                  <Image
                    source={{
                      uri: `https://flagcdn.com/w2560/${countries[correctAnswer]}.png`,
                    }}
                    style={styles.image}
                  />
                </>
              )}
            </View>
          )}
          <View style={styles.itemsWrapper}>
            {allCountries &&
              !isGuessTheFlagWriteAnswer &&
              randomInts.map((item, index) => {
                if (index === correctAnswerInt) {
                  return (
                    <TouchableOpacity
                      key={index}
                      style={styles.item}
                      disabled={showAnswer}
                      onPress={() => guessAnswerHandler(true)}
                    >
                      <Text
                        style={[
                          styles.title,
                          { color: showAnswer ? COLOURS.green : 'black' },
                        ]}
                      >
                        {correctAnswer}
                      </Text>
                    </TouchableOpacity>
                  );
                } else {
                  return (
                    <TouchableOpacity
                      style={styles.item}
                      key={index}
                      disabled={showAnswer}
                      onPress={() => guessAnswerHandler(false, index)}
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
            {isGuessTheFlagWriteAnswer && (
              <>
                {writtenAnswerCTATitle === 'Next Flag' && (
                  <Text style={[styles.title]}>{correctAnswer}</Text>
                )}
                <TextInputComponent
                  borderColor="transparent"
                  placeholder={'Guess the answer...'}
                  onChangeText={(value) => setWrittenAnswer(value)}
                  clear={clearWrittenInput}
                  editable={isWrittenInputEditable}
                />
              </>
            )}
            <TouchableOpacity
              disabled={!showAnswer}
              style={[
                styles.button,
                { backgroundColor: showAnswer ? 'black' : COLOURS.lightGrey },
              ]}
              onPress={
                isGuessTheFlagWriteAnswer
                  ? isWriteAnswerCTAHandler
                  : nextQuestionHandler
              }
            >
              <Text style={[styles.title, styles.buttonText]}>
                {isGuessTheFlagWriteAnswer ? writtenAnswerCTATitle : 'Continue'}
              </Text>
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
    marginBottom: '35%',
  },
  imageWrapper: {
    flex: 1,
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
  iconsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  icon: {
    alignSelf: 'flex-end',
    // margin: 15,
    // position: 'relative',
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
