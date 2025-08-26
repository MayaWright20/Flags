import { Stack } from 'expo-router';

export default function GamesLayout() {
  return (
    <Stack screenOptions={{ headerBackTitle: 'back' }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="guess-the-flag"
        options={{ headerShown: true, headerTitle: 'Guess the Flag' }}
      />
      <Stack.Screen
        name="guess-the-flag-settings"
        options={{ headerShown: true, headerTitle: 'Guess the Flag' }}
      />
    </Stack>
  );
}
