import { Stack, useRouter } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";

import { useAuthStore } from "../store/authStore";
import { useProjectStore } from "../store/projectStore";

export default function RootLayout() {
  const router = useRouter();
  const { checkAuth, token, isCheckingAuth } = useAuthStore();
  const { initializeStore } = useProjectStore();

  useEffect(() => {
    checkAuth();
    initializeStore();
  }, []);

  useEffect(() => {
    if (isCheckingAuth) return;

    if (!token) {
      router.replace("/(auth)/onboarding");
    } else {
      router.replace("/(tabs)/home");
    }
  }, [token, isCheckingAuth]);

  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ 
        headerShown: false,
        contentStyle: { backgroundColor: '#181A20' },
        cardStyle: { backgroundColor: '#181A20' }
      }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
      </Stack>
      <StatusBar style="light" backgroundColor="transparent" translucent={true} />
    </SafeAreaProvider>
  );
}
