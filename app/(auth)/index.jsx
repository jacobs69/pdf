// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
// import { useRouter } from 'expo-router';

// export default function EmailInput() {
//   const [email, setEmail] = useState('');
//   const router = useRouter();

//   const handleContinue = () => {
//     if (email.trim()) {
//       router.push({
//         pathname: '/(auth)/login',
//         params: { email: email }
//       });
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <StatusBar barStyle="light-content" />
      
//       {/* Back Button */}
//       <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
//         <Text style={styles.backIcon}>‹</Text>
//       </TouchableOpacity>

//       {/* Header Text */}
//       <View style={styles.headerContainer}>
//         <Text style={styles.headerText}>What's your</Text>
//         <Text style={styles.headerText}>email</Text>
//         <Text style={styles.headerText}>address?</Text>
//       </View>

//       {/* Email Input */}
//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>YOUR EMAIL</Text>
//         <View style={styles.inputWrapper}>
//           <TextInput
//             style={styles.input}
//             value={email}
//             onChangeText={setEmail}
//             placeholder="arpit@liyantis.com"
//             placeholderTextColor="#6b7280"
//             keyboardType="email-address"
//             autoCapitalize="none"
//           />
//           {email.length > 0 && (
//             <TouchableOpacity 
//               style={styles.clearButton}
//               onPress={() => setEmail('')}
//             >
//               <Text style={styles.clearIcon}>×</Text>
//             </TouchableOpacity>
//           )}
//         </View>
//       </View>

//       {/* Continue Button */}
//       <TouchableOpacity 
//         style={styles.continueButton}
//         onPress={handleContinue}
//       >
//         <Text style={styles.emailIcon}>✉</Text>
//         <Text style={styles.continueText}>Continue with Email</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#1a1d2e',
//     paddingHorizontal: 24,
//     paddingTop: 60,
//   },
//   backButton: {
//     width: 40,
//     height: 40,
//     justifyContent: 'center',
//     marginBottom: 30,
//   },
//   backIcon: {
//     color: '#fff',
//     fontSize: 36,
//     fontWeight: '300',
//   },
//   headerContainer: {
//     marginBottom: 50,
//   },
//   headerText: {
//     color: '#fff',
//     fontSize: 38,
//     fontWeight: '300',
//     lineHeight: 46,
//   },
//   inputContainer: {
//     marginBottom: 30,
//   },
//   label: {
//     color: '#6b7280',
//     fontSize: 11,
//     fontWeight: '600',
//     letterSpacing: 1,
//     marginBottom: 12,
//   },
//   inputWrapper: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderBottomWidth: 1,
//     borderBottomColor: '#374151',
//     paddingBottom: 12,
//   },
//   input: {
//     flex: 1,
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   clearButton: {
//     width: 20,
//     height: 20,
//     borderRadius: 10,
//     backgroundColor: '#374151',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   clearIcon: {
//     color: '#9ca3af',
//     fontSize: 16,
//     lineHeight: 18,
//   },
//   continueButton: {
//     backgroundColor: '#EEFB73',
//     borderRadius: 25,
//     paddingVertical: 16,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   emailIcon: {
//     fontSize: 18,
//     marginRight: 8,
//   },
//   continueText: {
//     color: '#1a1d2e',
//     fontSize: 16,
//     fontWeight: '600',
//   },
// });