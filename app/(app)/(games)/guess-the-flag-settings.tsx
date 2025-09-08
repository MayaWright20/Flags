import SwitchBtn from '@/components/buttons/switch';
import useProfile from '@/hooks/useProfile';
import { Image, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function GuessTheFlagSettingScreen() {
  const { isGuessTheFlagWriteAnswer, setIsGuessTheFlagWriteAnswer } =
    useProfile();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require('@/assets/images/settings.png')}
          style={styles.image}
        />
        <SwitchBtn
          onValueChange={setIsGuessTheFlagWriteAnswer}
          falseColor={'#767577'}
          trueColor={'#3bea06'}
          value={isGuessTheFlagWriteAnswer}
          label={'Write the answer'}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: '35%',
    marginBottom: 30,
    alignSelf: 'center',
    marginHorizontal: 10,
  },
  scrollView: {
    marginHorizontal: 10,
    paddingBottom: 100,
  },
  title: {
    marginLeft: 10,
    marginVertical: 15,
    fontSize: 20,
    fontWeight: '600',
  },
  userNames: {
    marginLeft: 10,
    fontSize: 18,
    marginBottom: 10,
  },
  scrollViewContents: {
    height: '100%',
  },
});
