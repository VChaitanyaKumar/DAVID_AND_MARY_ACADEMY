import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Switch, ScrollView, Image } from 'react-native';
import { Ionicons, MaterialIcons, MaterialCommunityIcons, Feather, FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '../context/ThemeContext';

export default function ProfileScreen() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const isDark = theme.mode === 'dark';

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.headerRow, { backgroundColor: theme.colors.card, borderBottomColor: theme.colors.border }]}>
        <TouchableOpacity onPress={() => router.push('/(tabs)/home')}>
          <Ionicons name="arrow-back" size={24} color={theme.colors.icon} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Profile & Settings</Text>
        <TouchableOpacity>
          <MaterialIcons name="edit" size={24} color={theme.colors.icon} />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.profileSection}>
          <View style={[styles.avatarWrapper, { backgroundColor: theme.colors.accent }]}>
            <Ionicons name="person" size={64} color="#fff" style={styles.avatarIcon} />
            <View style={[styles.cameraIconWrapper, { backgroundColor: theme.colors.accent, borderColor: theme.colors.card }]}>
              <Ionicons name="camera" size={18} color="#fff" />
            </View>
          </View>
          <Text style={[styles.profileName, { color: theme.colors.text }]}>John Doe</Text>
          <Text style={[styles.profileInfo, { color: theme.colors.subtitle }]}>Computer Science • Class of 2025</Text>
        </View>
        <View style={[styles.card, { backgroundColor: theme.colors.card, shadowColor: isDark ? '#000' : '#000' }]}>
          <View style={styles.cardItem}>
            <MaterialCommunityIcons name="weather-night" size={24} color={theme.colors.accent} style={styles.cardIcon} />
            <View style={styles.cardTextWrapper}>
              <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Dark Mode</Text>
              <Text style={[styles.cardSubtitle, { color: theme.colors.subtitle }]}>Toggle dark theme</Text>
            </View>
            <Switch value={isDark} onValueChange={toggleTheme} />
          </View>
          <TouchableOpacity style={styles.cardItem} onPress={() => router.push('/notifications')}>
            <Ionicons name="notifications" size={24} color={theme.colors.primary} style={styles.cardIcon} />
            <View style={styles.cardTextWrapper}>
              <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Notifications</Text>
              <Text style={[styles.cardSubtitle, { color: theme.colors.subtitle }]}>Manage notification preferences</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={theme.colors.subtitle} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.cardItem} onPress={() => router.push('/feedback')}>
            <Feather name="message-circle" size={24} color="#27ae60" style={styles.cardIcon} />
            <View style={styles.cardTextWrapper}>
              <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Feedback</Text>
              <Text style={[styles.cardSubtitle, { color: theme.colors.subtitle }]}>Send us your thoughts</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={theme.colors.subtitle} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.cardItem} onPress={() => router.push('/reminder-settings')}>
            <MaterialIcons name="settings" size={24} color={theme.colors.accent} style={styles.cardIcon} />
            <View style={styles.cardTextWrapper}>
              <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Settings</Text>
              <Text style={[styles.cardSubtitle, { color: theme.colors.subtitle }]}>Customize your app experience</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={theme.colors.subtitle} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.cardItem} onPress={() => router.push('/privacy-security')}>
            <MaterialIcons name="security" size={24} color={theme.colors.danger} style={styles.cardIcon} />
            <View style={styles.cardTextWrapper}>
              <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Privacy & Security</Text>
              <Text style={[styles.cardSubtitle, { color: theme.colors.subtitle }]}>Manage your privacy settings</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={theme.colors.subtitle} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.cardItem} onPress={() => router.push('/help-support')}>
            <Feather name="help-circle" size={24} color="#16a085" style={styles.cardIcon} />
            <View style={styles.cardTextWrapper}>
              <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Help & Support</Text>
              <Text style={[styles.cardSubtitle, { color: theme.colors.subtitle }]}>Get help when you need it</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={theme.colors.subtitle} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.cardItem} onPress={() => router.push('/about')}>
            <MaterialIcons name="info" size={24} color={theme.colors.accent} style={styles.cardIcon} />
            <View style={styles.cardTextWrapper}>
              <Text style={[styles.cardTitle, { color: theme.colors.text }]}>About</Text>
              <Text style={[styles.cardSubtitle, { color: theme.colors.subtitle }]}>App version and info</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={theme.colors.subtitle} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={[styles.logoutButton, { borderColor: theme.colors.danger, backgroundColor: theme.colors.card }]}>
          <FontAwesome5 name="sign-out-alt" size={20} color={theme.colors.danger} />
          <Text style={[styles.logoutText, { color: theme.colors.danger }]}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#374151',
    flex: 1,
    textAlign: 'center',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarWrapper: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#8e44ad',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    position: 'relative',
  },
  avatarIcon: {
    alignSelf: 'center',
  },
  cameraIconWrapper: {
    position: 'absolute',
    bottom: 6,
    right: 6,
    backgroundColor: '#8e44ad',
    borderRadius: 12,
    padding: 2,
    borderWidth: 2,
    borderColor: '#fff',
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 2,
  },
  profileInfo: {
    fontSize: 15,
    color: '#888',
    marginBottom: 8,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 4,
    marginBottom: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  cardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  cardIcon: {
    marginRight: 16,
  },
  cardTextWrapper: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#222',
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#888',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e74c3c',
    borderRadius: 12,
    paddingVertical: 12,
    marginHorizontal: 16,
  },
  logoutText: {
    color: '#e74c3c',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },
}); 