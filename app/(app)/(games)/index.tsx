import CTA from '@/components/buttons/large-cta';
import { router } from 'expo-router';
import { Image, SafeAreaView, StyleSheet, View } from 'react-native';

const GAMES = [
  {
    title: 'Guess the Flag',
    onPress: () => {
      router.navigate('/guess-the-flag');
    },
  },
];

export default function GamesScreen() {
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require('@/assets/images/gaming.webp')}
          style={styles.image}
        />
        {GAMES &&
          GAMES.map((item, index) => (
            <CTA key={index} title={item.title} onPress={item.onPress} />
          ))}
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
  },
});
