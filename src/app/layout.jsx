import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { auth } from '../firebase/config';
import { useRouter } from 'expo-router';

export default function RootLayout() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        router.push('/(drawer)/(tabs)/chat');
      }
      else{
        router.push('/login');
      }
    });

    return unsubscribe;
  }, []);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(drawer)" />
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
    </Stack>
  );
}