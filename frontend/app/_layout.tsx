import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { router, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { useUserStore } from './app_components/store/users';
import { Post } from './app_components/models/Post';
import { TouchableOpacity, Text } from 'react-native';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        <Stack.Screen name="create_post" options={{ presentation: 'modal', title: 'New Post' }} />
        <Stack.Screen
          name="chat_screen"
          options={({ route }) => {
            // parse postData
            const post: Post | null = route.params && (route.params as { postData: string }).postData
              ? JSON.parse((route.params as { postData: string }).postData)
              : null;

            // get users from Zustand store
            const users = useUserStore.getState().users;

            // find the user object
            const user = post ? users.find(u => u.id === post.userId) : null;

            return {
              presentation: 'modal',

              // ✅ custom header component
              headerTitle: () => {
                if (!user) return null;

                return (
                  <TouchableOpacity onPress={() => router.push({
                    pathname: "../../profile_screen",
                    params: { userId: user.id },
                  })}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#007AFF' }}>
                      {user.name}
                    </Text>
                  </TouchableOpacity>
                );
              },

            };
          }}
        />
        <Stack.Screen
          name="profile_screen"
          options={{
            title: "Profile", // hide the entire header
          }}
        />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
