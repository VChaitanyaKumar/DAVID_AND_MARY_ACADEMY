import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, StatusBar, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function PrivacySecurityScreen() {
  const [biometricAuth, setBiometricAuth] = useState(false);
  const [twoFactorAuth, setTwoFactorAuth] = useState(true);
  const [dataSharing, setDataSharing] = useState(false);
  const [locationSharing, setLocationSharing] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);
  const [autoLock, setAutoLock] = useState(true);
  const [selectedPrivacyLevel, setSelectedPrivacyLevel] = useState('Standard');
  const [selectedDataRetention, setSelectedDataRetention] = useState('1 Year');

  const privacyLevels = ['Public', 'Standard', 'Private', 'Maximum'];
  const dataRetentionPeriods = ['30 Days', '3 Months', '6 Months', '1 Year', 'Forever'];

  const securityItems = [
    {
      id: 'biometric',
      title: 'Biometric Authentication',
      description: 'Use fingerprint or face ID to unlock app',
      type: 'switch',
      value: biometricAuth,
      onValueChange: setBiometricAuth,
      icon: 'finger-print'
    },
    {
      id: 'twoFactor',
      title: 'Two-Factor Authentication',
      description: 'Add an extra layer of security',
      type: 'switch',
      value: twoFactorAuth,
      onValueChange: setTwoFactorAuth,
      icon: 'shield-checkmark'
    },
    {
      id: 'autoLock',
      title: 'Auto Lock',
      description: 'Lock app when inactive for 5 minutes',
      type: 'switch',
      value: autoLock,
      onValueChange: setAutoLock,
      icon: 'lock-closed'
    }
  ];

  const privacyItems = [
    {
      id: 'dataSharing',
      title: 'Data Sharing',
      description: 'Allow sharing data for app improvement',
      type: 'switch',
      value: dataSharing,
      onValueChange: setDataSharing,
      icon: 'share-social'
    },
    {
      id: 'locationSharing',
      title: 'Location Services',
      description: 'Share location for relevant features',
      type: 'switch',
      value: locationSharing,
      onValueChange: setLocationSharing,
      icon: 'location'
    },
    {
      id: 'analytics',
      title: 'Analytics',
      description: 'Help improve app with usage analytics',
      type: 'switch',
      value: analyticsEnabled,
      onValueChange: setAnalyticsEnabled,
      icon: 'analytics'
    }
  ];

  const handleSave = () => {
    // TODO: Save privacy and security settings to backend
    console.log('Privacy & Security settings saved:', {
      biometricAuth,
      twoFactorAuth,
      autoLock,
      dataSharing,
      locationSharing,
      analyticsEnabled,
      selectedPrivacyLevel,
      selectedDataRetention
    });
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#374151" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Privacy & Security</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Security Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Security</Text>
          <Text style={styles.sectionDescription}>Protect your account and data</Text>
          {securityItems.map((item) => (
            <View key={item.id} style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <View style={styles.iconContainer}>
                  <Ionicons name={item.icon as any} size={20} color="#ef4444" />
                </View>
                <View style={styles.settingText}>
                  <Text style={styles.settingTitle}>{item.title}</Text>
                  <Text style={styles.settingDescription}>{item.description}</Text>
                </View>
              </View>
              <Switch
                value={item.value}
                onValueChange={item.onValueChange}
                trackColor={{ false: '#e5e7eb', true: '#ef4444' }}
                thumbColor={item.value ? '#ffffff' : '#f3f4f6'}
              />
            </View>
          ))}
        </View>

        {/* Privacy Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacy</Text>
          <Text style={styles.sectionDescription}>Control your data and privacy</Text>
          {privacyItems.map((item) => (
            <View key={item.id} style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <View style={styles.iconContainer}>
                  <Ionicons name={item.icon as any} size={20} color="#3b82f6" />
                </View>
                <View style={styles.settingText}>
                  <Text style={styles.settingTitle}>{item.title}</Text>
                  <Text style={styles.settingDescription}>{item.description}</Text>
                </View>
              </View>
              <Switch
                value={item.value}
                onValueChange={item.onValueChange}
                trackColor={{ false: '#e5e7eb', true: '#3b82f6' }}
                thumbColor={item.value ? '#ffffff' : '#f3f4f6'}
              />
            </View>
          ))}
        </View>

        {/* Privacy Level Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacy Level</Text>
          <Text style={styles.sectionDescription}>Choose how much information to share</Text>
          <View style={styles.optionsContainer}>
            {privacyLevels.map((level) => (
              <TouchableOpacity
                key={level}
                style={[
                  styles.optionCard,
                  selectedPrivacyLevel === level && styles.selectedOption
                ]}
                onPress={() => setSelectedPrivacyLevel(level)}
              >
                <Text style={[
                  styles.optionText,
                  selectedPrivacyLevel === level && styles.selectedOptionText
                ]}>
                  {level}
                </Text>
                {selectedPrivacyLevel === level && (
                  <Ionicons name="checkmark-circle" size={20} color="#3b82f6" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Data Retention Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data Retention</Text>
          <Text style={styles.sectionDescription}>How long to keep your data</Text>
          <View style={styles.optionsContainer}>
            {dataRetentionPeriods.map((period) => (
              <TouchableOpacity
                key={period}
                style={[
                  styles.optionCard,
                  selectedDataRetention === period && styles.selectedOption
                ]}
                onPress={() => setSelectedDataRetention(period)}
              >
                <Text style={[
                  styles.optionText,
                  selectedDataRetention === period && styles.selectedOptionText
                ]}>
                  {period}
                </Text>
                {selectedDataRetention === period && (
                  <Ionicons name="checkmark-circle" size={20} color="#3b82f6" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Data Management */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data Management</Text>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="download" size={20} color="#3b82f6" />
            <Text style={styles.actionButtonText}>Export My Data</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="trash" size={20} color="#ef4444" />
            <Text style={[styles.actionButtonText, { color: '#ef4444' }]}>Delete My Account</Text>
          </TouchableOpacity>
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Ionicons name="save" size={20} color="white" />
          <Text style={styles.saveButtonText}>Save Settings</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#374151',
  },
  placeholder: {
    width: 32,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#eff6ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 14,
    color: '#6b7280',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    minWidth: '48%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  selectedOption: {
    borderColor: '#3b82f6',
    backgroundColor: '#eff6ff',
  },
  optionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  selectedOptionText: {
    color: '#3b82f6',
    fontWeight: '600',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#3b82f6',
    marginLeft: 12,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1e3a8a',
    borderRadius: 12,
    paddingVertical: 16,
    marginTop: 32,
    marginBottom: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginLeft: 8,
  },
}); 