import { useSessionStore } from '@/store/store';
import { Stack } from 'expo-router';

export default function Layout() {
  const session = useSessionStore((state: any)=> state.session);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!session}>
        <Stack.Screen
          name="index"
          options={{ headerShown: false, animation: 'slide_from_bottom' }}
        />
      </Stack.Protected>
    </Stack>
  );
}
