import { useRouter } from "expo-router";
import { Text, View, StyleSheet, TouchableOpacity, StatusBar, Platform, ImageBackground, Image } from "react-native";

export default function Index() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar 
        barStyle="light-content" 
        translucent 
        backgroundColor="transparent"
      />
      
      {/* Upper Half - Background Image */}
      <View style={styles.imageContainer}>
        <ImageBackground
          source={require('../assets/images/get-started-bg-png.png')}
          style={styles.backgroundImage}
          resizeMode="cover"
        />
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.subtitle}>SUPERPOWERS TO CLOSE DEALS</Text>
        <Text style={styles.title}>Turning</Text>
        <Text style={styles.title}>Agents into</Text>
        <Text style={styles.title}>Closers</Text>

        <TouchableOpacity 
          style={styles.button}
          onPress={() => router.push('/(auth)/onboarding')}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>

      {/* Arrow Image - bottom right */}
      <Image
        source={require('../assets/images/get-started-arrow.svg')} // Update this path to your arrow image
        style={styles.arrowImage}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#15171c',
    position: 'relative',
  },
  imageContainer: {
    height: '45%',
    width: '100%',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  content: {
    position: 'absolute',
    bottom: 140,
    left: 48,
    right: 24,
  },
  subtitle: {
    color: '#EEFB73',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1.5,
    marginBottom: 12,
  },
  title: {
    color: '#fff',
    fontSize: 42,
    fontWeight: '300',
    lineHeight: 50,
  },
  button: {
    backgroundColor: '#EEFB73',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 25,
    alignSelf: 'flex-start',
    marginTop: 24,
  },
  buttonText: {
    color: '#181A20',
    fontSize: 15,
    fontWeight: '600',
  },
  arrowImage: {
    position: 'absolute',
    bottom: 200,
    right: 20,
    width: 80,
    height: 80,
  },
});