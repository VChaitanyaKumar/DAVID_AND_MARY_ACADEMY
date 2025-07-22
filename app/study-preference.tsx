import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, StatusBar, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function StudyPreferenceScreen() {
  const [notifications, setNotifications] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(false);
  const [autoSave, setAutoSave] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [selectedFontSize, setSelectedFontSize] = useState('Medium');

  const languages = ['English', 'Hindi', 'Gujarati', 'Marathi'];
  const fontSizes = ['Small', 'Medium', 'Large', 'Extra Large'];

  const preferenceItems = [
    {
      id: 'notifications',
      title: 'Study Reminders',
      description: 'Get notified about upcoming study sessions',
      type: 'switch',
      value: notifications,
      onValueChange: setNotifications,
      icon: 'notifications'
    },
    {
      id: 'sound',
      title: 'Sound Effects',
      description: 'Play sounds for interactions and notifications',
      type: 'switch',
      value: soundEnabled,
      onValueChange: setSoundEnabled,
      icon: 'volume-high'
    },
    {
      id: 'vibration',
      title: 'Vibration',
      description: 'Vibrate on notifications and interactions',
      type: 'switch',
      value: vibrationEnabled,
      onValueChange: setVibrationEnabled,
      icon: 'phone-portrait'
    },
    {
      id: 'autoSave',
      title: 'Auto Save',
      description: 'Automatically save your progress',
      type: 'switch',
      value: autoSave,
      onValueChange: setAutoSave,
      icon: 'save'
    },
    {
      id: 'darkMode',
      title: 'Dark Mode',
      description: 'Use dark theme for better reading',
      type: 'switch',
      value: darkMode,
      onValueChange: setDarkMode,
      icon: 'moon'
    }
  ];

  const handleSave = () => {
    // TODO: Save preferences to backend
    console.log('Preferences saved:', {
      notifications,
      soundEnabled,
      vibrationEnabled,
      autoSave,
      darkMode,
      selectedLanguage,
      selectedFontSize
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
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Switch Preferences */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>General Settings</Text>
          {preferenceItems.map((item) => (
            <View key={item.id} style={styles.preferenceItem}>
              <View style={styles.preferenceLeft}>
                <View style={styles.iconContainer}>
                  <Ionicons name={item.icon as any} size={20} color="#3b82f6" />
                </View>
                <View style={styles.preferenceText}>
                  <Text style={styles.preferenceTitle}>{item.title}</Text>
                  <Text style={styles.preferenceDescription}>{item.description}</Text>
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

        {/* Language Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Language</Text>
          <Text style={styles.sectionDescription}>Choose your preferred language</Text>
          <View style={styles.optionsContainer}>
            {languages.map((language) => (
              <TouchableOpacity
                key={language}
                style={[
                  styles.optionCard,
                  selectedLanguage === language && styles.selectedOption
                ]}
                onPress={() => setSelectedLanguage(language)}
              >
                <Text style={[
                  styles.optionText,
                  selectedLanguage === language && styles.selectedOptionText
                ]}>
                  {language}
                </Text>
                {selectedLanguage === language && (
                  <Ionicons name="checkmark-circle" size={20} color="#3b82f6" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Font Size Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Font Size</Text>
          <Text style={styles.sectionDescription}>Choose comfortable text size</Text>
          <View style={styles.optionsContainer}>
            {fontSizes.map((size) => (
              <TouchableOpacity
                key={size}
                style={[
                  styles.optionCard,
                  selectedFontSize === size && styles.selectedOption
                ]}
                onPress={() => setSelectedFontSize(size)}
              >
                <Text style={[
                  styles.optionText,
                  selectedFontSize === size && styles.selectedOptionText
                ]}>
                  {size}
                </Text>
                {selectedFontSize === size && (
                  <Ionicons name="checkmark-circle" size={20} color="#3b82f6" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Ionicons name="save" size={20} color="white" />
          <Text style={styles.saveButtonText}>Save Preferences</Text>
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
  preferenceItem: {
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
  preferenceLeft: {
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
  preferenceText: {
    flex: 1,
  },
  preferenceTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 2,
  },
  preferenceDescription: {
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