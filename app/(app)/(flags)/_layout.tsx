import { Stack, useGlobalSearchParams } from 'expo-router';

export default function MySuppersLayout() {
  const { id } = useGlobalSearchParams();
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          headerTitle: 'World Flags',
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
