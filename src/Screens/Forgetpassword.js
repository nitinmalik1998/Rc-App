import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Forgetpassword = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [formData, setFormData] = useState({
    email_phone: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({
    email_phone: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);

  // Load user data from AsyncStorage when component mounts
  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const userDataString = await AsyncStorage.getItem('userData');
      if (userDataString) {
        const parsedUserData = JSON.parse(userDataString);
        setUserData(parsedUserData);
        
        // Pre-fill email/phone field with user's data
        const userIdentifier = parsedUserData.email || parsedUserData.phone || '';
        setFormData(prev => ({
          ...prev,
          email_phone: userIdentifier
        }));
      }
    } catch (error) {
      console.log('Error loading user data:', error);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      email_phone: '',
      password: '',
      confirmPassword: '',
    };

    if (!formData.email_phone.trim()) {
      newErrors.email_phone = 'Kindly fill the Email/Phone';
      isValid = false;
    } else {
      // Validate if it's email or phone
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^[0-9]{10,15}$/;
      
      if (!emailRegex.test(formData.email_phone) && !phoneRegex.test(formData.email_phone)) {
        newErrors.email_phone = 'Please enter a valid email or phone number';
        isValid = false;
      }
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Kindly fill the New Password';
      isValid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
      isValid = false;
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = 'Kindly confirm your password';
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleResetPassword = async () => {
    if (!validateForm()) return;

    setLoading(true);

    try {
      // Get user ID from AsyncStorage if available
      let userId = '';
      try {
        userId = await AsyncStorage.getItem('userId');
      } catch (error) {
        console.log('Error getting user ID from storage:', error);
      }

      // Create FormData
      const data = new FormData();
      
      // Use email/phone for identification
      data.append('email_phone', formData.email_phone.trim());
      data.append('password', formData.password.trim());
      
      // Include user_id if available (for additional verification)
      if (userId) {
        data.append('user_id', userId);
      }

      // API configuration
      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://argosmob.uk/makroo/public/api/v1/auth/change-password',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data: data,
        timeout: 10000, // 10 seconds timeout
      };

      // Make API call
      const response = await axios(config);

      // Handle successful password change
      console.log('Password Change Response:', response.data);
      
      // Improved response handling - check multiple possible success indicators
      if (response.data.success === true || 
          response.data.status === 'success' || 
          response.data.message?.toLowerCase().includes('success') ||
          response.status === 200) {
        
        Alert.alert(
          'Success',
          'Password changed successfully!',
          [
            {
              text: 'OK',
              onPress: () => navigation.navigate('LoginScreen')
            }
          ]
        );
      } else {
        // Handle API error response
        const errorMessage = response.data.message || 
                           response.data.error || 
                           'Unable to change password. Please try again.';
        Alert.alert('Password Change Failed', errorMessage);
      }
    } catch (error) {
      // Handle network or server errors
      console.log('Password Change Error:', error);
      
      if (error.response) {
        // Server responded with error status
        const errorMessage = error.response.data?.message || 
                           error.response.data?.error || 
                           `Password change failed (${error.response.status}). Please try again.`;
        Alert.alert('Password Change Failed', errorMessage);
      } else if (error.request) {
        // Network error
        Alert.alert('Network Error', 'Please check your internet connection and try again.');
      } else {
        // Other errors
        Alert.alert('Error', 'Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Function to clear the pre-filled email/phone
  const clearPrefilledData = () => {
    setFormData(prev => ({
      ...prev,
      email_phone: ''
    }));
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      
      {/* Header with Linear Gradient */}
      <LinearGradient
        colors={['#7E5EA9', '#20AEBC']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.titleContainer}>
        <Text style={styles.title}>Makroo Motor Corp.</Text>
      </LinearGradient>

      <Text style={styles.subtitle}>Reset Password</Text>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {/* Info Text if user data is pre-filled */}
        {userData && formData.email_phone && (
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>
              Using your account email/phone. {' '}
              <Text style={styles.clearText} onPress={clearPrefilledData}>
                Clear
              </Text>
            </Text>
          </View>
        )}

        {/* Email/Phone Input */}
        <View style={styles.inputContainer}>
          <View style={[styles.inputBox, errors.email_phone ? styles.inputError : null]}>
            <TextInput
              placeholder="Email or Phone Number"
              placeholderTextColor="#aaa"
              style={styles.inputText}
              value={formData.email_phone}
              onChangeText={(text) => handleInputChange('email_phone', text)}
              editable={!loading}
              autoCapitalize="none"
              keyboardType="default"
              autoComplete="email"
            />
          </View>
          {errors.email_phone ? <Text style={styles.errorText}>{errors.email_phone}</Text> : null}
        </View>

        {/* New Password Input */}
        <View style={styles.inputContainer}>
          <View style={[styles.inputBox, errors.password ? styles.inputError : null]}>
            <TextInput
              placeholder="New Password"
              placeholderTextColor="#aaa"
              style={styles.inputText}
              secureTextEntry
              value={formData.password}
              onChangeText={(text) => handleInputChange('password', text)}
              editable={!loading}
              autoCapitalize="none"
            />
          </View>
          {errors.password ? (
            <Text style={styles.errorText}>{errors.password}</Text>
          ) : null}
        </View>

        {/* Confirm Password Input */}
        <View style={styles.inputContainer}>
          <View style={[styles.inputBox, errors.confirmPassword ? styles.inputError : null]}>
            <TextInput
              placeholder="Confirm New Password"
              placeholderTextColor="#aaa"
              style={styles.inputText}
              secureTextEntry
              value={formData.confirmPassword}
              onChangeText={(text) => handleInputChange('confirmPassword', text)}
              editable={!loading}
              autoCapitalize="none"
            />
          </View>
          {errors.confirmPassword ? (
            <Text style={styles.errorText}>{errors.confirmPassword}</Text>
          ) : null}
        </View>

        {/* Password Requirements */}
        <View style={styles.requirementsContainer}>
          <Text style={styles.requirementsTitle}>Password Requirements:</Text>
          <Text style={styles.requirementItem}>• At least 8 characters long</Text>
          <Text style={styles.requirementItem}>• Use a combination of letters and numbers</Text>
          <Text style={styles.requirementItem}>• Avoid common words</Text>
        </View>

        {/* Reset Password Button */}
        <TouchableOpacity 
          style={[styles.resetButton, loading && styles.disabledButton]} 
          onPress={handleResetPassword}
          disabled={loading}
        >
          <LinearGradient
            colors={['#7E5EA9', '#20AEBC']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientButton}>
            {loading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text style={styles.resetButtonText}>Reset Password</Text>
            )}
          </LinearGradient>
        </TouchableOpacity>

        {/* Back to Login Section */}
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Remember your password? </Text>
          <TouchableOpacity 
            onPress={() => navigation.replace('LoginScreen')} 
            disabled={loading}
          >
            <Text style={[styles.loginLink, loading && styles.disabledText]}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {  
    padding: 25, 
    flex: 1,
    backgroundColor: 'white',
  },
  scrollView: {
    flex: 1,
  },
  titleContainer: {
    marginBottom: '5%',
    alignSelf: 'center',
    width: '120%',
    padding: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { 
    fontSize: 22, 
    color: '#fff', 
    textAlign: 'center',
    fontFamily: "Inter_28pt-SemiBold" 
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 15,
    color: '#333',
    alignSelf: 'center',
    fontFamily: "Inter_28pt-Medium"
  },
  infoContainer: {
    backgroundColor: '#e8f4fd',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#20AEBC',
  },
  infoText: {
    color: '#333',
    fontSize: 14,
    fontFamily: "Inter_28pt-Regular"
  },
  clearText: {
    color: '#7E5EA9',
    fontWeight: 'bold',
    fontFamily: "Inter_28pt-SemiBold"
  },
  inputContainer: { 
    marginBottom: 5 
  },
  inputBox: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
    justifyContent: 'center',
    paddingHorizontal: 15,
    marginBottom: 5,
    backgroundColor: 'white',
  },
  inputError: { 
    borderColor: '#ff0000', 
    borderWidth: 1.5 
  },
  inputText: { 
    color: '#333', 
    fontSize: 16,
    fontFamily: "Inter_28pt-Regular" 
  },
  errorText: { 
    color: '#ff0000', 
    fontSize: 12, 
    marginLeft: 5, 
    marginBottom: 10,
    fontFamily: "Inter_28pt-Regular" 
  },
  requirementsContainer: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  requirementsTitle: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
    fontFamily: "Inter_28pt-SemiBold"
  },
  requirementItem: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
    fontFamily: "Inter_28pt-Regular"
  },
  resetButton: {
    width: '100%',
    height: 50,
    borderRadius: 8,
    overflow: 'hidden',
    marginTop: 10,
    marginBottom: 10,
  },
  gradientButton: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resetButtonText: { 
    color: '#fff', 
    fontSize: 16,
    fontFamily: "Inter_28pt-Medium"  
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom:50
  },
  loginText: { 
    color: '#666', 
    fontSize: 15,
    fontFamily: "Inter_28pt-Medium" 
  },
  loginLink: { 
    color: '#7E5EA9', 
    fontSize: 15, 
    fontFamily: "Inter_28pt-SemiBold" 
  },
  disabledButton: {
    opacity: 0.6,
  },
  disabledText: {
    opacity: 0.6,
  },
});

export default Forgetpassword;