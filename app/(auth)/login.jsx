import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from "../../store/authStore";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { login, isLoading } = useAuthStore();

  const handleLogin = async () => {
    const result = await login(email, password);
    if (!result.success) {
      alert(result.error);
      return;
    }
    router.replace("/(tabs)/home");
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      {/* Gradient Top Left */}
      <Image
        source={require("../../assets/images/png/Gradient  Top Left.png")}
        style={styles.gradientTopLeft}
        resizeMode="cover"
      />

      {/* Gradient Bottom Right */}
      <Image
        source={require("../../assets/images/png/Gradient Bottom Right.png")}
        style={styles.gradientBottomRight}
        resizeMode="cover"
      />

      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Image
          source={require("../../assets/images/png/back button png.png")}
          style={{ width: 24, height: 24 }}
          resizeMode="contain"
        />
      </TouchableOpacity>

      {/* Header Text */}
      <Text style={styles.headerText}>Login</Text>

      {/* Spacer */}
      <View style={styles.spacer} />

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>YOUR EMAIL</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="email@gmail.com"
            placeholderTextColor="#FFFFFF"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>YOUR PASSWORD</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Enter password"
            placeholderTextColor="#FFFFFF"
            secureTextEntry={!showPassword}
            autoCapitalize="none"
          />
          <TouchableOpacity
            style={styles.eyeButton}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Ionicons
              name={showPassword ? "eye" : "eye-off"}
              size={20}
              color="#888888"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Forgot Password Link */}
      <TouchableOpacity style={styles.forgotContainer}>
        <Text style={styles.forgotText}>Forgot password?</Text>
      </TouchableOpacity>

      {/* Login Button */}
      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleLogin}
        disabled={isLoading}
      >
        <Text style={styles.loginButtonText}>
          {isLoading ? 'Logging in...' : 'Login'}
        </Text>
      </TouchableOpacity>

      {/* Sign up Link */}
      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => router.push('/(auth)/signup')}>
          <Text style={styles.signupLink}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181A20',
    paddingHorizontal: 40,
    paddingTop: 20,
  },
  gradientTopLeft: {
    position: 'absolute',
    top: -100,
    left: -120,
    width: 340,
    height: 340,
    opacity: 0.2,
  },
  gradientBottomRight: {
    position: 'absolute',
    bottom: -100,
    right: -120,
    width: 340,
    height: 340,
    opacity: 0.15,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    marginBottom: 15,
    marginLeft: -16,
  },
  backIcon: {
    color: '#fff',
    fontSize: 36,
    fontWeight: '300',
  },
  headerText: {
    color: '#fff',
    fontSize: 38,
    fontWeight: '300',
    marginBottom: 10,
  },
  spacer: {
    width: 52,
    height: 21,
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    color: 'rgba(245, 245, 245, 0.5)',
    fontSize: 10,
    fontFamily: 'Inter-Bold',
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 0,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
    paddingBottom: 8,
  },
  input: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    fontWeight: '600',
    opacity: 10,
  },
  eyeButton: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eyeIcon: {
    fontSize: 18,
    opacity: 0.5,
  },
  forgotContainer: {
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  forgotText: {
    color: '#F1FE74',
    fontSize: 13,
    fontFamily: 'Inter-Light',
    fontWeight: '300',
  },
  loginButton: {
    backgroundColor: '#F1FE74',
    borderRadius: 25,
    width: 293,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    alignSelf: 'center',
  },
  loginButtonText: {
    color: '#181A20',
    fontSize: 16,
    fontWeight: '600',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 0,
  },
  signupText: {
    color: '#6b7280',
    fontSize: 14,
  },
  signupLink: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '400',
  },
});
