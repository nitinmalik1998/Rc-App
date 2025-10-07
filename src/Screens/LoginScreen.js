import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const LoginScreen = ({ navigation }) => {
   const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleLogin = () => {
    // Reset errors
    setEmailError('');
    setPasswordError('');

    let isValid = true;

    if (!email.trim()) {
      setEmailError('Kindly fill the Email/Phone');
      isValid = false;
    }

    if (!password.trim()) {
      setPasswordError('Kindly fill the Password');
      isValid = false;
    }

    if (isValid) {
      // Navigate to Dashboard
      navigation.replace('Dashboard');
    }
  };

  // Functions to reset errors when user types
  const handleEmailChange = (text) => {
    setEmail(text);
    if (emailError) setEmailError('');
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    if (passwordError) setPasswordError('');
  };

  return (
    <View style={[styles.container,{ paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      {/* Header with Linear Gradient */}
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <LinearGradient
        colors={['#7E5EA9', '#20AEBC']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.titleContainer}>
        <Text style={styles.title}>Makroo Motor Corp.</Text>
      </LinearGradient>

      <Text style={styles.subtitle}>Welcome Back</Text>

      {/* Email/Phone Input */}
      <View style={styles.inputContainer}>
        <View style={[styles.inputBox, emailError ? styles.inputError : null]}>
          <TextInput
            placeholder="Email/Phone"
            placeholderTextColor="#aaa"
            style={styles.inputText}
            value={email}
            onChangeText={handleEmailChange}
          />
        </View>
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <View style={[styles.inputBox, passwordError ? styles.inputError : null]}>
          <TextInput
            placeholder="Password"
            placeholderTextColor="#aaa"
            style={styles.inputText}
            secureTextEntry
            value={password}
            onChangeText={handlePasswordChange}
          />
        </View>
        {passwordError ? (
          <Text style={styles.errorText}>{passwordError}</Text>
        ) : null}
      </View>

      {/* Forgot Password */}
      <TouchableOpacity>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>

      {/* Login Button */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <LinearGradient
          colors={['#7E5EA9', '#20AEBC']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradientButton}>
          <Text style={styles.loginText}>Login</Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* Sign Up Section */}
      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Don't have an account? </Text>
        <TouchableOpacity>
          <Text style={styles.signupLink}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {  padding: 25, flex: 1 },
  titleContainer: {
    marginBottom: '30%',
    alignSelf: 'center',
    width: '120%',
    padding: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { fontSize: 22, color: '#fff', textAlign: 'center',fontFamily:"Inter_28pt-SemiBold" },
  subtitle: {
    fontSize: 20,
    marginBottom: 30,
    color: '#333',
    alignSelf: 'center',
    fontFamily:"Inter_28pt-Medium"
  },
  inputContainer: { marginBottom: 5 },
  inputBox: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
    justifyContent: 'center',
    paddingHorizontal: 15,
    marginBottom: 5,
  },
  inputError: { borderColor: '#ff0000', borderWidth: 1.5 },
  inputText: { color: '#333', fontSize: 16,fontFamily:"Inter_28pt-Regular" },
  errorText: { color: '#ff0000', fontSize: 12, marginLeft: 5, marginBottom: 10,fontFamily:"Inter_28pt-Regular" },
  forgotPassword: {
    alignSelf: 'flex-start',
    marginBottom: 30,
    color: 'black',
    fontSize: 14,
    fontFamily:"Inter_28pt-Medium"
  },
  loginButton: {
    width: '100%',
    height: 50,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 10,
  },
  gradientButton: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: { color: '#fff', fontSize: 16,fontFamily:"Inter_28pt-Medium"  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
  },
  signupText: { color: '#666', fontSize: 15,fontFamily:"Inter_28pt-Medium" },
  signupLink: { color: '#7E5EA9', fontSize: 15, fontFamily:"Inter_28pt-SemiBold" },
});

export default LoginScreen;
