import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView, 
  SafeAreaView, 
  StatusBar,
  Switch
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function ReminderSettingsScreen() {
  const [masterNotifications, setMasterNotifications] = useState(true);
  const [class15min, setClass15min] = useState(true);
  const [class5min, setClass5min] = useState(false);
  const [assignment1day, setAssignment1day] = useState(true);
  const [assignment3hours, setAssignment3hours] = useState(false);
  const [exam1week, setExam1week] = useState(true);
  const [exam1day, setExam1day] = useState(true);
  const [exam30min, setExam30min] = useState(false);
  const [sound, setSound] = useState(true);
  const [vibration, setVibration] = useState(true);

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#374151" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Reminder Settings</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Push Notifications Section */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <View style={[styles.sectionIcon, { backgroundColor: '#dbeafe' }]}>
              <Ionicons name="notifications" size={24} color="#3b82f6" />
            </View>
            <View style={styles.sectionText}>
              <Text style={styles.sectionTitle}>Push Notifications</Text>
              <Text style={styles.sectionDescription}>Manage your notification preferences</Text>
            </View>
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingText}>
              <Text style={styles.settingTitle}>Master Notifications</Text>
              <Text style={styles.settingDescription}>Enable all reminder notifications</Text>
            </View>
            <Switch
              value={masterNotifications}
              onValueChange={setMasterNotifications}
              trackColor={{ false: '#d1d5db', true: '#3b82f6' }}
              thumbColor={masterNotifications ? '#ffffff' : '#ffffff'}
            />
          </View>
        </View>

        {/* Class Reminders Section */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <View style={[styles.sectionIcon, { backgroundColor: '#dcfce7' }]}>
              <Ionicons name="leaf" size={24} color="#22c55e" />
            </View>
            <View style={styles.sectionText}>
              <Text style={styles.sectionTitle}>Class Reminders</Text>
            </View>
          </View>
          
          <View style={styles.subsection}>
            <Text style={styles.subsectionTitle}>Class Notifications</Text>
            <Text style={styles.subsectionDescription}>Get notified before classes start</Text>
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingText}>
              <Text style={styles.settingTitle}>15 minutes before</Text>
              <Text style={styles.settingDescription}>Early reminder for preparation</Text>
            </View>
            <Switch
              value={class15min}
              onValueChange={setClass15min}
              trackColor={{ false: '#d1d5db', true: '#3b82f6' }}
              thumbColor={class15min ? '#ffffff' : '#ffffff'}
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingText}>
              <Text style={styles.settingTitle}>5 minutes before</Text>
              <Text style={styles.settingDescription}>Last minute reminder</Text>
            </View>
            <Switch
              value={class5min}
              onValueChange={setClass5min}
              trackColor={{ false: '#d1d5db', true: '#3b82f6' }}
              thumbColor={class5min ? '#ffffff' : '#ffffff'}
            />
          </View>
        </View>

        {/* Assignment Reminders Section */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <View style={[styles.sectionIcon, { backgroundColor: '#fed7aa' }]}>
              <Ionicons name="document-text" size={24} color="#f97316" />
            </View>
            <View style={styles.sectionText}>
              <Text style={styles.sectionTitle}>Assignment Reminders</Text>
            </View>
          </View>
          
          <View style={styles.subsection}>
            <Text style={styles.subsectionTitle}>Assignment Due Dates</Text>
            <Text style={styles.subsectionDescription}>Never miss a deadline</Text>
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingText}>
              <Text style={styles.settingTitle}>1 day before</Text>
              <Text style={styles.settingDescription}>Plan your work ahead</Text>
            </View>
            <Switch
              value={assignment1day}
              onValueChange={setAssignment1day}
              trackColor={{ false: '#d1d5db', true: '#3b82f6' }}
              thumbColor={assignment1day ? '#ffffff' : '#ffffff'}
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingText}>
              <Text style={styles.settingTitle}>3 hours before</Text>
              <Text style={styles.settingDescription}>Final reminder</Text>
            </View>
            <Switch
              value={assignment3hours}
              onValueChange={setAssignment3hours}
              trackColor={{ false: '#d1d5db', true: '#3b82f6' }}
              thumbColor={assignment3hours ? '#ffffff' : '#ffffff'}
            />
          </View>
        </View>

        {/* Exam Reminders Section */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <View style={[styles.sectionIcon, { backgroundColor: '#fecaca' }]}>
              <Ionicons name="school" size={24} color="#ef4444" />
            </View>
            <View style={styles.sectionText}>
              <Text style={styles.sectionTitle}>Exam Reminders</Text>
            </View>
          </View>
          
          <View style={styles.subsection}>
            <Text style={styles.subsectionTitle}>Exam Notifications</Text>
            <Text style={styles.subsectionDescription}>Stay prepared for exams</Text>
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingText}>
              <Text style={styles.settingTitle}>1 week before</Text>
              <Text style={styles.settingDescription}>Start your study plan</Text>
            </View>
            <Switch
              value={exam1week}
              onValueChange={setExam1week}
              trackColor={{ false: '#d1d5db', true: '#3b82f6' }}
              thumbColor={exam1week ? '#ffffff' : '#ffffff'}
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingText}>
              <Text style={styles.settingTitle}>1 day before</Text>
              <Text style={styles.settingDescription}>Final preparation reminder</Text>
            </View>
            <Switch
              value={exam1day}
              onValueChange={setExam1day}
              trackColor={{ false: '#d1d5db', true: '#3b82f6' }}
              thumbColor={exam1day ? '#ffffff' : '#ffffff'}
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingText}>
              <Text style={styles.settingTitle}>30 minutes before</Text>
              <Text style={styles.settingDescription}>Time to head to exam</Text>
            </View>
            <Switch
              value={exam30min}
              onValueChange={setExam30min}
              trackColor={{ false: '#d1d5db', true: '#3b82f6' }}
              thumbColor={exam30min ? '#ffffff' : '#ffffff'}
            />
          </View>
        </View>

        {/* Additional Settings Section */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <View style={[styles.sectionIcon, { backgroundColor: '#ede9fe' }]}>
              <Ionicons name="settings" size={24} color="#8b5cf6" />
            </View>
            <View style={styles.sectionText}>
              <Text style={styles.sectionTitle}>Additional Settings</Text>
            </View>
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingText}>
              <Text style={styles.settingTitle}>Sound</Text>
              <Text style={styles.settingDescription}>Play notification sound</Text>
            </View>
            <Switch
              value={sound}
              onValueChange={setSound}
              trackColor={{ false: '#d1d5db', true: '#3b82f6' }}
              thumbColor={sound ? '#ffffff' : '#ffffff'}
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingText}>
              <Text style={styles.settingTitle}>Vibration</Text>
              <Text style={styles.settingDescription}>Vibrate on notifications</Text>
            </View>
            <Switch
              value={vibration}
              onValueChange={setVibration}
              trackColor={{ false: '#d1d5db', true: '#3b82f6' }}
              thumbColor={vibration ? '#ffffff' : '#ffffff'}
            />
          </View>
        </View>
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
    paddingTop: 20,
  },
  sectionCard: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  sectionText: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 2,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#6b7280',
  },
  subsection: {
    marginBottom: 16,
  },
  subsectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 2,
  },
  subsectionDescription: {
    fontSize: 14,
    color: '#6b7280',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 14,
    color: '#6b7280',
  },
}); 