import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, Animated, Alert } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { supabase } from './supabaseClient';
import { router } from 'expo-router';

const SignUpScreen = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    setError('');
    if (!agree) {
      setError('You must agree to the Terms and Privacy Policy.');
      return;
    }
    if (!fullName || !email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });
    setLoading(false);
    if (error) {
      Alert.alert('Sign Up Failed', error.message);
    } else {
      Alert.alert('Success', 'Account created! Please sign in.');
      router.push('/sign-in');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <View style={styles.container}>
          {/* Top blue cap icon */}
          <View style={styles.capSquareWrapper}>
            <View style={styles.capSquare}>
              <MaterialCommunityIcons name="school-outline" size={36} color="#fff" />
            </View>
          </View>

          {/* Title and subtitle */}
          <Text style={styles.title}>Create an Account</Text>
          <Text style={styles.subtitle}>Start your learning journey today</Text>

          {/* Full Name */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your full name"
              value={fullName}
              onChangeText={setFullName}
            />
          </View>

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

          {/* Password */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordRow}>
              <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder="Create a password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={22} color="#888" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Confirm Password */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Confirm Password</Text>
            <View style={styles.passwordRow}>
              <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder="Confirm your password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
              />
              <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.eyeIcon}>
                <Ionicons name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'} size={22} color="#888" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Terms and Privacy Policy */}
          <View style={styles.checkboxRow}>
            <TouchableOpacity onPress={() => setAgree(!agree)} style={styles.checkbox}>
              {agree && <Ionicons name="checkmark" size={16} color="#2563eb" />}
            </TouchableOpacity>
            <Text style={styles.termsText}>
              I agree to the <Text style={styles.link}>Terms</Text> and <Text style={styles.link}>Privacy Policy</Text>
            </Text>
          </View>

          {/* Error message */}
          {error ? <Text style={styles.error}>{error}</Text> : null}

          {/* Sign Up button */}
          <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp} disabled={loading}>
            <Text style={styles.signUpButtonText}>Sign Up</Text>
          </TouchableOpacity>

          {/* Divider */}
          <Text style={styles.or}>or</Text>

          {/* Google button */}
          <TouchableOpacity style={styles.googleButton}>
            <Ionicons name="logo-google" size={20} color="#ea4335" style={{ marginRight: 8 }} />
            <Text style={styles.googleText}>Continue with Google</Text>
          </TouchableOpacity>

          {/* Bottom sign in */}
          <View style={styles.bottomRow}>
            <Text style={styles.bottomText}>Already have an account?</Text>
            <TouchableOpacity onPress={() => router.push('/sign-in')}>
              <Text style={styles.signInLink}>Sign in instead</Text>
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
    paddingHorizontal: 24,
    paddingTop: 48, // increased from 18
    backgroundColor: '#fff',
    alignItems: 'stretch',
  },
  capSquareWrapper: {
    alignItems: 'center',
    marginBottom: 18,
    marginTop: 8,
  },
  capSquare: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: '#2563eb',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 0,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 18,
  },
  inputGroup: {
    marginBottom: 10,
  },
  label: {
    fontSize: 13,
    color: '#222',
    marginBottom: 4,
    marginTop: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
    backgroundColor: '#f8fafc',
  },
  passwordRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eyeIcon: {
    padding: 8,
    marginLeft: -36,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 2,
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
  termsText: {
    fontSize: 13,
    color: '#222',
  },
  link: {
    color: '#2563eb',
    textDecorationLine: 'underline',
  },
  error: {
    color: 'red',
    fontSize: 13,
    marginBottom: 8,
    textAlign: 'center',
  },
  signUpButton: {
    backgroundColor: '#2563eb',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 10,
  },
  signUpButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
  or: {
    textAlign: 'center',
    color: '#888',
    marginVertical: 8,
    fontSize: 14,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 18,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  googleText: {
    fontSize: 15,
    color: '#222',
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 8,
  },
  bottomText: {
    fontSize: 13,
    color: '#222',
    marginRight: 4,
  },
  signInLink: {
    fontSize: 13,
    color: '#2563eb',
    textDecorationLine: 'underline',
  },
});

export default SignUpScreen; 