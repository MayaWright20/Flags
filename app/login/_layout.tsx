import { useSession } from '@/context/authentication-context';
import { Stack } from 'expo-router';

export default function Layout() {
  const { session } = useSession();
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
