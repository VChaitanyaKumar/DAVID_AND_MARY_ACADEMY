import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1e3a8a" />
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity style={styles.profileButton}>
            <Ionicons name="person" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.notificationButton}>
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
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Dashboard Cards Grid */}
        <View style={styles.dashboardGrid}>
          <TouchableOpacity style={[styles.dashboardCard, styles.timetableCard]}>
            <Ionicons name="time" size={32} color="#3b82f6" />
            <Text style={[styles.cardTitle, styles.timetableText]}>Today's Timetable</Text>
            <Text style={[styles.cardSubtitle, styles.timetableSubtext]}>Math • 10:00 AM</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.dashboardCard, styles.tasksCard]}>
            <Ionicons name="checkmark-circle" size={32} color="#f97316" />
            <Text style={[styles.cardTitle, styles.tasksText]}>Tasks</Text>
            <Text style={[styles.cardSubtitle, styles.tasksSubtext]}>2 assignments due</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.dashboardCard, styles.examsCard]}>
            <Ionicons name="calendar" size={32} color="#22c55e" />
            <Text style={[styles.cardTitle, styles.examsText]}>Upcoming Exams</Text>
            <Text style={[styles.cardSubtitle, styles.examsSubtext]}>Science • Feb 15</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.dashboardCard, styles.notesCard]}>
            <Ionicons name="document-text" size={32} color="#8b5cf6" />
            <Text style={[styles.cardTitle, styles.notesText]}>My Notes</Text>
            <Text style={[styles.cardSubtitle, styles.notesSubtext]}>5 notes saved</Text>
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
              <Text style={styles.quickLinkTitle}>Class Directory</Text>
              <Text style={styles.quickLinkSubtitle}>View classmates</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
          </TouchableOpacity>
        </View>
      </ScrollView>
      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home" size={24} color="#3b82f6" />
          <Text style={[styles.navText, styles.activeNavText]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="time" size={24} color="#9ca3af" />
          <Text style={styles.navText}>Timetable</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="checkmark-circle" size={24} color="#9ca3af" />
          <Text style={styles.navText}>Tasks</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="document-text" size={24} color="#9ca3af" />
          <Text style={styles.navText}>Notes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="person" size={24} color="#9ca3af" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({  container: { 
    flex: 1,
    backgroundColor: 'white',
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
    marginBottom: 15,
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
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderRadius: 16,
    minHeight: 90,
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
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderRadius: 16,
    minHeight: 90,
  },
  attendanceText: { color: '#16a34a' },
  attendanceSubtext: { color: '#16a34a' },
  quickLinksSection: {
    marginTop: 10,
    marginBottom: 100, // Space for bottom nav
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
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 8,
  },
  navItem: {
    alignItems: 'center',
    flex: 1,
  },
  navText: {
    fontSize: 12,
    marginTop: 4,
    color: '#9ca3af',
  },
  activeNavText: {
    color: '#3b82f6',
    fontWeight: '600',
  },
}); 