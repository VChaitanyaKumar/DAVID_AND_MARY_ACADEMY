import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { supabase } from './supabaseClient';
import { router } from 'expo-router';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    setError('');
    setSuccess('');
    if (!email) {
      setError('Please enter your email.');
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      setSuccess('Password reset link sent! Check your email.');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <View style={styles.container}>
          {/* Title and subtitle */}
          <Text style={styles.title}>Forgot Password?</Text>
          <Text style={styles.subtitle}>Enter your email to receive a password reset link</Text>

          {/* Email */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email Address</Text>
            <View style={styles.inputRow}>
              <Feather name="mail" size={20} color="#888" style={{ marginLeft: 10, marginRight: 8 }} />
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>
          </View>

          {/* Error or Success message */}
          {error ? <Text style={styles.error}>{error}</Text> : null}
          {success ? <Text style={styles.success}>{success}</Text> : null}

          {/* Send Reset Link button */}
          <TouchableOpacity style={styles.resetButton} onPress={handleReset} disabled={loading}>
            <Feather name="send" size={20} color="#fff" style={{ marginRight: 8 }} />
            <Text style={styles.resetButtonText}>Send Reset Link</Text>
          </TouchableOpacity>

          {/* Sign in link */}
          <View style={styles.signInRow}>
            <Text style={styles.signInText}>Remembered your password? </Text>
            <TouchableOpacity onPress={() => router.push('/sign-in')}>
              <Text style={styles.signInLink}>Sign in</Text>
            </TouchableOpacity>
          </View>

          {/* Decorative icons at the bottom */}
          <View style={styles.bottomIconsRow}>
            <Feather name="shield" size={22} color="#cbd5e1" style={styles.bottomIcon} />
            <Ionicons name="flash-outline" size={22} color="#2563eb" style={styles.bottomIcon} />
            <Ionicons name="heart-outline" size={22} color="#ef4444" style={styles.bottomIcon} />
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
    paddingTop: 0, // remove top padding
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center', // center vertically
  },
  title: {
    fontSize: 26,
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
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    backgroundColor: '#f8fafc',
    paddingRight: 8,
    marginBottom: 2,
  },
  input: {
    flex: 1,
    padding: 12,
    fontSize: 16,
    backgroundColor: 'transparent',
  },
  error: {
    color: 'red',
    fontSize: 13,
    marginBottom: 8,
    textAlign: 'center',
  },
  success: {
    color: '#22c55e',
    fontSize: 13,
    marginBottom: 8,
    textAlign: 'center',
  },
  resetButton: {
    backgroundColor: '#2563eb',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 18,
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
  signInRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  signInText: {
    fontSize: 14,
    color: '#222',
  },
  signInLink: {
    fontSize: 14,
    color: '#2563eb',
    textDecorationLine: 'underline',
    marginLeft: 2,
  },
  bottomIconsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  bottomIcon: {
    marginHorizontal: 16,
  },
});

export default ForgotPasswordScreen; 