import { Stack, useGlobalSearchParams } from 'expo-router';

export default function FavouritesLayout() {
  const { id } = useGlobalSearchParams();
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          headerTitle: 'Favourites',
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          headerShown: true,
          headerTitle: `${id}`,
          headerBackTitle: 'back',
        }}
      />
    </Stack>
  );
}
