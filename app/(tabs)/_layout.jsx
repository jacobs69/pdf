import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

export default function RootLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          animation: 'slide_from_right',
          animationDuration: 300,
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          contentStyle: { backgroundColor: '#181A20' },
          animationTypeForReplace: 'push',
          customAnimationOnGesture: true,
          fullScreenGestureEnabled: true,
          // Prevent white flash during transitions
          cardStyle: { backgroundColor: '#181A20' },
          cardOverlayEnabled: false,
        }}
      >
        <Stack.Screen 
          name="index" 
          options={{ 
            headerShown: false,
            animation: 'fade',
            animationDuration: 400,
            gestureEnabled: false,
            cardStyle: { backgroundColor: '#181A20' },
          }} 
        />
        <Stack.Screen 
          name="SplashScreen" 
          options={{ 
            headerShown: false,
            animation: 'fade',
            animationDuration: 400,
            gestureEnabled: false,
            cardStyle: { backgroundColor: '#181A20' },
          }} 
        />
        <Stack.Screen 
          name="onboarding" 
          options={{ 
            headerShown: false,
            animation: 'fade',
            animationDuration: 400,
            gestureEnabled: false,
            cardStyle: { backgroundColor: '#181A20' },
          }} 
        />
        <Stack.Screen 
          name="boarding" 
          options={{ 
            headerShown: false,
            animation: 'slide_from_right',
            animationDuration: 300,
            gestureEnabled: true,
            cardStyle: { backgroundColor: '#181A20' },
          }} 
        />
        <Stack.Screen 
          name="boardingSlideshow" 
          options={{ 
            headerShown: false,
            animation: 'slide_from_right',
            animationDuration: 300,
            gestureEnabled: true,
            cardStyle: { backgroundColor: '#181A20' },
          }} 
        />
        <Stack.Screen 
          name="boarding1" 
          options={{ 
            headerShown: false,
            animation: 'slide_from_right',
            animationDuration: 300,
            gestureEnabled: true,
            cardStyle: { backgroundColor: '#181A20' },
          }} 
        />
        <Stack.Screen 
          name="boarding2" 
          options={{ 
            headerShown: false,
            animation: 'slide_from_right',
            animationDuration: 300,
            gestureEnabled: true,
            cardStyle: { backgroundColor: '#181A20' },
          }} 
        />
        <Stack.Screen 
          name="boarding3" 
          options={{ 
            headerShown: false,
            animation: 'slide_from_right',
            animationDuration: 300,
            gestureEnabled: true,
            cardStyle: { backgroundColor: '#181A20' },
          }} 
        />
        <Stack.Screen 
          name="email" 
          options={{ 
            headerShown: false,
            animation: 'slide_from_right',
            animationDuration: 300,
            gestureEnabled: true,
            cardStyle: { backgroundColor: '#181A20' },
          }} 
        />
        <Stack.Screen 
          name="login" 
          options={{ 
            headerShown: false,
            animation: 'slide_from_right',
            animationDuration: 300,
            gestureEnabled: true,
            cardStyle: { backgroundColor: '#181A20' },
          }} 
        />
        <Stack.Screen 
          name="signup" 
          options={{ 
            headerShown: false,
            animation: 'slide_from_right',
            animationDuration: 300,
            gestureEnabled: true,
            cardStyle: { backgroundColor: '#181A20' },
          }} 
        />
        <Stack.Screen 
          name="home" 
          options={{ 
            headerShown: false,
            animation: 'slide_from_right',
            animationDuration: 300,
            gestureEnabled: false,
            cardStyle: { backgroundColor: '#181A20' },
          }} 
        />
        <Stack.Screen 
          name="home2" 
          options={{ 
            headerShown: false,
            animation: 'slide_from_right',
            animationDuration: 300,
            gestureEnabled: false,
            cardStyle: { backgroundColor: '#181A20' },
          }} 
        />
        <Stack.Screen 
          name="Profile" 
          options={{ 
            headerShown: false,
            animation: 'slide_from_right',
            animationDuration: 300,
            gestureEnabled: false,
            cardStyle: { backgroundColor: '#181A20' },
          }} 
        />
        <Stack.Screen 
          name="dashboard" 
          options={{ 
            headerShown: false,
            animation: 'slide_from_right',
            animationDuration: 300,
            gestureEnabled: true,
            cardStyle: { backgroundColor: '#181A20' },
          }} 
        />
        <Stack.Screen 
          name="timeline" 
          options={{ 
            headerShown: false,
            animation: 'slide_from_bottom',
            animationDuration: 300,
            presentation: 'modal',
            gestureEnabled: true,
            gestureDirection: 'vertical',
            cardStyle: { backgroundColor: '#181A20' },
          }} 
        />
        <Stack.Screen 
          name="form1" 
          options={{ 
            headerShown: false,
            animation: 'slide_from_right',
            animationDuration: 300,
            gestureEnabled: true,
            cardStyle: { backgroundColor: '#181A20' },
          }} 
        />
        <Stack.Screen 
          name="form2" 
          options={{ 
            headerShown: false,
            animation: 'slide_from_right',
            animationDuration: 300,
            gestureEnabled: true,
            cardStyle: { backgroundColor: '#181A20' },
          }} 
        />
        <Stack.Screen 
          name="form3" 
          options={{ 
            headerShown: false,
            animation: 'slide_from_right',
            animationDuration: 300,
            gestureEnabled: true,
            cardStyle: { backgroundColor: '#181A20' },
          }} 
        />
        <Stack.Screen 
          name="form4" 
          options={{ 
            headerShown: false,
            animation: 'slide_from_right',
            animationDuration: 300,
            gestureEnabled: true,
            cardStyle: { backgroundColor: '#181A20' },
          }} 
        />
        <Stack.Screen 
          name="contactSupport" 
          options={{ 
            headerShown: false,
            animation: 'slide_from_right',
            animationDuration: 300,
            contentStyle: { backgroundColor: '#181A20' },
            cardStyle: { backgroundColor: '#181A20' },
            gestureEnabled: true,
          }} 
        />
        <Stack.Screen 
          name="appSettings" 
          options={{ 
            headerShown: false,
            animation: 'slide_from_right',
            animationDuration: 300,
            contentStyle: { backgroundColor: '#181A20' },
            cardStyle: { backgroundColor: '#181A20' },
            gestureEnabled: true,
          }} 
        />
        <Stack.Screen 
          name="homeRouter" 
          options={{ 
            headerShown: false,
            animation: 'fade',
            animationDuration: 250,
            gestureEnabled: false,
            cardStyle: { backgroundColor: '#181A20' },
          }} 
        />
      </Stack>
      <StatusBar style="light" />
    </>
  );
}
