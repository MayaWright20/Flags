import useProfile from '@/hooks/useProfile';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';

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
        <View style={styles.switchWrapper}>
          <Switch
            trackColor={{ false: '#767577', true: '#3bea06' }}
            ios_backgroundColor="#3e3e3e"
            onValueChange={setIsGuessTheFlagWriteAnswer}
            value={isGuessTheFlagWriteAnswer}
          />
          <Text style={styles.switchTitle}>Write the answer</Text>
        </View>
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
    marginHorizontal: 10,
  },
  image: {
    width: '100%',
    height: '30%',
    marginVertical: 10,
    marginBottom: 30,
  },
  switchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  switchTitle: {
    marginLeft: 10,
    fontSize: 18,
  },
});
