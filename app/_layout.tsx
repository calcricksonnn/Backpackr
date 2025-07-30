import { Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';

export default function RootLayout() {
  return (
    <PaperProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="groups/[id]" options={{ title: 'Group Details' }} />
        <Stack.Screen name="groups/create" options={{ title: 'Create Group' }} />
        <Stack.Screen name="groups/chat/[id]" options={{ title: 'Group Chat' }} />
        <Stack.Screen name="events/[id]" options={{ title: 'Event Details' }} />
        <Stack.Screen name="events/create" options={{ title: 'Create Event' }} />
      </Stack>
    </PaperProvider>
  );
}