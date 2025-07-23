import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, Animated, Alert } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { supabase } from './supabaseClient';
import { router } from 'expo-router';

const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [remember, setRemember] = useState(false);

  // Animation ref for the cap
  const capAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(capAnim, {
      toValue: 1,
      useNativeDriver: true,
      friction: 5,
      tension: 80,
    }).start();
  }, []);

  const handleSignIn = async () => {
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      Alert.alert('Sign In Failed', error.message);
    } else {
      router.push('/(tabs)/home');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <View style={styles.container}>
          {/* Centered animated graduation cap icon */}
          <Animated.View
            style={[
              styles.capWrapper,
              {
                opacity: capAnim,
                transform: [
                  {
                    translateY: capAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [-30, 0],
                    }),
                  },
                  {
                    scale: capAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.7, 1],
                    }),
                  },
                ],
              },
            ]}
          >
            <MaterialCommunityIcons name="school-outline" size={64} color="#2563eb" style={{ fontWeight: 'bold' }} />
          </Animated.View>

          {/* Title and subtitle */}
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to continue your learning journey</Text>

          {/* Email */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email Address</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          {/* Password with eye icon, styled as in the uploaded image */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordInputWrapper}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Enter Your Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.passwordEyeIcon}>
                <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={22} color="#888" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Remember me and Forgot password */}
          <View style={styles.rowBetween}>
            <TouchableOpacity style={styles.checkboxRow} onPress={() => setRemember(!remember)}>
              <View style={[styles.checkbox, remember && styles.checkboxChecked]}>
                {remember && <Ionicons name="checkmark" size={14} color="#2563eb" />}
              </View>
              <Text style={styles.remember}>Remember me</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/forgot-password')}>
              <Text style={styles.forgot}>Forgot password?</Text>
            </TouchableOpacity>
          </View>

          {/* Error message */}
          {error ? <Text style={styles.error}>{error}</Text> : null}

          {/* Sign In button */}
          <TouchableOpacity style={styles.signInButton} onPress={handleSignIn} disabled={loading}>
            <Ionicons name="arrow-forward" size={20} color="#fff" style={{ marginRight: 8 }} />
            <Text style={styles.signInButtonText}>Sign In</Text>
          </TouchableOpacity>

          {/* Divider */}
          <Text style={styles.or}>Or continue with</Text>

          {/* Google button */}
          <TouchableOpacity style={styles.googleButton}>
            <Ionicons name="logo-google" size={20} color="#ea4335" style={{ marginRight: 8 }} />
            <Text style={styles.googleText}>Continue with Google</Text>
          </TouchableOpacity>

          {/* Guest button */}
          <TouchableOpacity style={styles.guestButton}>
            <Ionicons name="person-outline" size={20} color="#2563eb" style={{ marginRight: 8 }} />
            <Text style={styles.guestText}>Continue as Guest</Text>
          </TouchableOpacity>

          {/* Bottom sign up */}
          <View style={styles.bottomRow}>
            <Ionicons name="bulb-outline" size={20} color="#2563eb" style={{ marginRight: 6 }} />
            <Text style={styles.signupPrompt}>Don’t have an account?</Text>
            <TouchableOpacity onPress={() => router.push('/sign-up')}>
              <Text style={styles.signupLink}>Sign up here</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 36,
    backgroundColor: '#fff',
    alignItems: 'stretch',
  },
  capWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    marginTop: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#555',
    textAlign: 'center',
    marginBottom: 28,
  },
  inputGroup: {
    marginBottom: 18,
  },
  label: {
    fontSize: 14,
    color: '#222',
    marginBottom: 6,
    marginTop: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    backgroundColor: '#f8fafc',
  },
  passwordInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    backgroundColor: '#f8fafc',
    paddingRight: 8,
    marginBottom: 2,
  },
  passwordInput: {
    flex: 1,
    padding: 14,
    fontSize: 16,
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  passwordEyeIcon: {
    padding: 8,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 16,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 4,
    marginRight: 8,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    borderColor: '#2563eb',
    backgroundColor: '#e0e7ef',
  },
  remember: {
    fontSize: 14,
    color: '#222',
  },
  forgot: {
    fontSize: 14,
    color: '#2563eb',
    textDecorationLine: 'underline',
  },
  error: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
  signInButton: {
    backgroundColor: '#2563eb',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16, // add space below Sign In
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signInButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  or: {
    textAlign: 'center',
    color: '#888',
    marginVertical: 8, // equal space above and below
    fontSize: 14,
    marginTop: 0,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 12,
    marginBottom: 14,
    backgroundColor: '#fff',
    justifyContent: 'center',
    marginTop: 0, // remove extra space above Google button
  },
  googleText: {
    fontSize: 16,
    color: '#222',
  },
  guestButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    paddingVertical: 14,
    backgroundColor: '#fff',
  },
  guestText: {
    fontSize: 16,
    color: '#222',
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4, // further reduced
    marginBottom: 40, // further increased
  },
  signupPrompt: {
    fontSize: 15,
    color: '#222',
    marginRight: 4,
    marginLeft: 2,
  },
  signupLink: {
    fontSize: 15,
    color: '#2563eb',
    textDecorationLine: 'underline',
    marginLeft: 2,
  },
});

export default SignInScreen; 