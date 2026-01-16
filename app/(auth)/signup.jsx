import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar, ScrollView, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from "../../store/authStore";

export default function Signup() {
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { register, isLoading } = useAuthStore();

  const handleSignup = async () => {
    const result = await register(
      firstName,
      middleName,
      lastName,
      email,
      password
    );

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

      <KeyboardAvoidingView 
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Back Button */}
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Image
              source={require("../../assets/images/png/back button png.png")}
              style={{ width: 24, height: 24 }}
              resizeMode="contain"
            />
          </TouchableOpacity>

          {/* Header Text */}
          <Text style={styles.headerText}>Sign up</Text>

          {/* First Name Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>FIRST NAME</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                value={firstName}
                onChangeText={setFirstName}
                placeholder="Arpit"
                placeholderTextColor="#6b7280"
                autoCapitalize="words"
              />
            </View>
          </View>

          {/* Middle Name Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>MIDDLE NAME</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                value={middleName}
                onChangeText={setMiddleName}
                placeholder="Aryan"
                placeholderTextColor="#6b7280"
                autoCapitalize="words"
              />
            </View>
          </View>

          {/* Last Name Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>LAST NAME</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                value={lastName}
                onChangeText={setLastName}
                placeholder="Gupta"
                placeholderTextColor="#6b7280"
                autoCapitalize="words"
              />
            </View>
          </View>

          {/* Email Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>YOUR EMAIL</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="email@gmail.com"
                placeholderTextColor="#6b7280"
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
                placeholder="HD#729hmGk-J~l"
                placeholderTextColor="#6b7280"
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity 
                style={styles.eyeButton}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Text style={styles.eyeIcon}>{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Forgot Password Link */}
          <TouchableOpacity style={styles.forgotContainer}>
            <Text style={styles.forgotText}>Forgot password?</Text>
          </TouchableOpacity>

          {/* Sign Up Button */}
          <TouchableOpacity 
            style={styles.signupButton}
            onPress={handleSignup}
            disabled={isLoading}
          >
            <Text style={styles.signupButtonText}>
              {isLoading ? 'Signing up...' : 'Sign up'}
            </Text>
          </TouchableOpacity>

          {/* Login Link */}
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
              <Text style={styles.loginLink}>Log in</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181A20',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  gradientTopLeft: {
    position: 'absolute',
    top: -100,
    left: -120,
    width: 340,
    height: 340,
    opacity: 0.1,
  },
  gradientBottomRight: {
    position: 'absolute',
    bottom: -100,
    right: -120,
    width: 340,
    height: 340,
    opacity: 0.08,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 40,
    paddingTop: 20,
    paddingBottom: 40,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    marginBottom: 15,
    marginLeft: -16,
    zIndex: 10,
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
    opacity: 1,
  },
  eyeButton: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
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
  signupButton: {
    backgroundColor: '#F1FE74',
    borderRadius: 25,
    width: 293,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 16,
    alignSelf: 'center',
  },
  signupButtonText: {
    color: '#181A20',
    fontSize: 16,
    fontWeight: '600',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 0,
  },
  loginText: {
    color: '#6b7280',
    fontSize: 14,
  },
  loginLink: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '400',
  },
});