import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'jotai';
import 'react-native-reanimated';
import "text-encoding";

export default function RootLayout() {
  const [loaded] = useFonts({
    dunggeunmon: require("@assets/fonts/DungGeunMo.ttf"),
    chab: require("@assets/fonts/chab.otf"),
    kotra: require("@assets/fonts/kotra.otf")
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <Provider>
      <ThemeProvider value={DefaultTheme}>
        <Stack>
          {/* <Stack.Screen name="LoginScreen" /> */}
          {/* <Stack.Screen name="RegisterScreen" /> */}
          {/* <Stack.Screen name="chat/ChatHomeScreen" /> */}
          <Stack.Screen name="chat/ChatRoomScreen" />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </Provider>

  );
}
