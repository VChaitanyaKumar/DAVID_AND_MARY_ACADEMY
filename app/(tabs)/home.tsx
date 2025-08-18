import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const handleTimetablePress = () => {
    router.push('/(tabs)/timetable');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1e3a8a" />
      
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity style={styles.profileButton}>
            <Ionicons name="person" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.notificationButton} onPress={() => router.push('/notifications' as any)}>
            <Ionicons name="notifications" size={24} color="white" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.greetingSection}>
          <Text style={styles.greeting}>Hi, Chaitanya👋</Text>
          <Text style={styles.welcomeText}>Welcome to David & Mary Academy</Text>
        </View>
        
        <View style={styles.searchContainer}>
          <TouchableOpacity style={styles.searchBar}>
            <Ionicons name="search" size={20} color="#9ca3af" />
            <Text style={styles.searchPlaceholder}>Search ...</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Dashboard Cards Grid */}
        <View style={styles.dashboardGrid}>
          <TouchableOpacity style={[styles.dashboardCard, styles.timetableCard]} onPress={handleTimetablePress}>
            <Ionicons name="time" size={32} color="#3b82f6" />
            <Text style={[styles.cardTitle, styles.timetableText]}>Today's Timetable</Text>
            <Text style={[styles.cardSubtitle, styles.timetableSubtext]}>Math • 10:00 AM</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.dashboardCard, styles.tasksCard]} onPress={() => router.push('/(tabs)/tasks')}>
            <Ionicons name="checkmark-circle" size={32} color="#f97316" />
            <Text style={[styles.cardTitle, styles.tasksText]}>Tasks</Text>
            <Text style={[styles.cardSubtitle, styles.tasksSubtext]}>2 assignments due</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.dashboardCard, styles.examsCard]} onPress={() => router.push('/upcoming-exams' as any)}>
            <Ionicons name="calendar" size={32} color="#22c55e" />
            <Text style={[styles.cardTitle, styles.examsText]}>Upcoming Exams</Text>
            <Text style={[styles.cardSubtitle, styles.examsSubtext]}>Science • Feb 15</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.dashboardCard, styles.notesCard]} onPress={() => router.push('/(tabs)/notes')}>
            <Ionicons name="document-text" size={32} color="#8b5cf6" />
            <Text style={[styles.cardTitle, styles.notesText]}>My Notes</Text>
            <Text style={[styles.cardSubtitle, styles.notesSubtext]}>5 notes saved</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.dashboardCard, styles.reminderCard]} onPress={() => router.push('/reminder-settings' as any)}>
          <Ionicons name="settings" size={32} color="#f97316" />
            <Text style={[styles.cardTitle, styles.reminderText]}>Reminder Settings</Text>
            <Text style={[styles.cardSubtitle, styles.reminderSubtext]}>Manage reminders</Text>
        </TouchableOpacity>

          <TouchableOpacity style={[styles.dashboardCard, styles.attendanceCard]} onPress={() => router.push('/class-attendance')}>
            <Ionicons name="clipboard-outline" size={32} color="#22c55e" />
            <Text style={[styles.cardTitle, styles.attendanceText]}>Class Attendance</Text>
            <Text style={[styles.cardSubtitle, styles.attendanceSubtext]}>Mark & view attendance</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.dashboardCard, styles.studentsDirectoryCard]} onPress={() => router.push('/class-directory' as any)}>
            <Ionicons name="people" size={32} color="#ef4444" />
            <Text style={[styles.cardTitle, styles.studentsDirectoryText]}>Students Directory</Text>
          </TouchableOpacity>
        </View>

        {/* Quick Links Section */}
        <View style={styles.quickLinksSection}>
          <Text style={styles.quickLinksTitle}>Quick Links</Text>
          
          <TouchableOpacity style={styles.quickLinkItem}>
            <Ionicons name="calendar" size={24} color="#3b82f6" />
            <View style={styles.quickLinkContent}>
              <Text style={styles.quickLinkTitle}>School Events</Text>
              <Text style={styles.quickLinkSubtitle}>Sports Day • Tomorrow</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.quickLinkItem}>
            <Ionicons name="library" size={24} color="#22c55e" />
            <View style={styles.quickLinkContent}>
              <Text style={styles.quickLinkTitle}>Library</Text>
              <Text style={styles.quickLinkSubtitle}>2 books borrowed</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.quickLinkItem}>
            <Ionicons name="people" size={24} color="#8b5cf6" />
            <View style={styles.quickLinkContent}>
              <Text style={styles.quickLinkTitle}>Student Directory</Text>
              <Text style={styles.quickLinkSubtitle}>View classmates</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 0,
  },
  header: {
    backgroundColor: '#1e3a8a',
    paddingTop: 0, // Remove top margin
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  greetingSection: {
    marginBottom: 20,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  welcomeText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  searchContainer: {
    marginBottom: 10,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchPlaceholder: {
    marginLeft: 10,
    fontSize: 16,
    color: '#9ca3af',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  dashboardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 20,
  },
  dashboardCard: {
    width: '48%',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  timetableCard: {
    backgroundColor: '#dbeafe',
  },
  tasksCard: {
    backgroundColor: '#fed7aa',
  },
  examsCard: {
    backgroundColor: '#dcfce7',
  },
  notesCard: {
    backgroundColor: '#ede9fe',
  },
  reminderCard: {
    backgroundColor: '#fef3c7',
  },
  reminderTextContainer: {
    marginLeft: 16,
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 4,
    textAlign: 'center',
  },
  cardSubtitle: {
    fontSize: 14,
    opacity: 0.8,
    textAlign: 'center',
  },
  timetableText: { color: '#1e40af' },
  timetableSubtext: { color: '#1e40af' },
  tasksText: { color: '#ea580c' },
  tasksSubtext: { color: '#ea580c' },
  examsText: { color: '#16a34a' },
  examsSubtext: { color: '#16a34a' },
  notesText: { color: '#7c3aed' },
  notesSubtext: { color: '#7c3aed' },
  reminderText: { color: '#ea580c' },
  reminderSubtext: { color: '#ea580c' },
  attendanceCard: {
    backgroundColor: '#f0fdf4',
  },
  attendanceText: { color: '#16a34a' },
  attendanceSubtext: { color: '#16a34a' },
  studentsDirectoryCard: {
    backgroundColor: '#fee2e2',
  },
  studentsDirectoryText: { color: '#b91c1c' },
  quickLinksSection: {
    marginTop: 10,
    marginBottom: 20,
  },
  quickLinksTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e3a8a',
    marginBottom: 15,
  },
  quickLinkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  quickLinkContent: {
    flex: 1,
    marginLeft: 12,
  },
  quickLinkTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 2,
  },
  quickLinkSubtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
}); 