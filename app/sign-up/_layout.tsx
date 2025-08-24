import { useSession } from '@/context/authentication-context';
import { Stack } from 'expo-router';

export default function SignUpLayout() {
  const { session } = useSession();

  return (
    <Stack>
      <Stack.Protected guard={!session}>
        <Stack.Screen
          name="index"
          options={{ headerShown: false, animation: 'slide_from_bottom' }}
        />
        <Stack.Screen
          name="user"
          options={{ headerShown: false, animation: 'slide_from_bottom' }}
        />
      </Stack.Protected>
    </Stack>
  );
}
