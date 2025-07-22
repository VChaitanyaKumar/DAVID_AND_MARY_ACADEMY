import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView, 
  SafeAreaView, 
  StatusBar,
  FlatList
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function NotificationsScreen() {
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filters = ['All', 'Classes', 'Events'];

  const notifications = [
    {
      id: 1,
      type: 'class',
      title: 'Mathematics Class Starting Soon',
      message: 'Your Mathematics class will begin in 15 minutes. Room 201.',
      time: '2 minutes ago',
      isRead: false,
      icon: 'time',
      color: '#3b82f6'
    },
    {
      id: 2,
      type: 'assignment',
      title: 'Physics Assignment Due Tomorrow',
      message: 'Lab Report for Quantum Mechanics is due tomorrow at 11:59 PM.',
      time: '1 hour ago',
      isRead: false,
      icon: 'document-text',
      color: '#f97316'
    },
    {
      id: 3,
      type: 'exam',
      title: 'Chemistry Final Exam Reminder',
      message: 'Your Chemistry final exam is scheduled for tomorrow at 9:00 AM.',
      time: '3 hours ago',
      isRead: true,
      icon: 'school',
      color: '#ef4444'
    },
    {
      id: 4,
      type: 'event',
      title: 'Sports Day Tomorrow',
      message: 'Annual Sports Day event will be held tomorrow. Don\'t forget your sports kit!',
      time: '5 hours ago',
      isRead: true,
      icon: 'calendar',
      color: '#22c55e'
    },
    {
      id: 5,
      type: 'class',
      title: 'English Literature Class Cancelled',
      message: 'Today\'s English Literature class has been cancelled. Check your email for details.',
      time: '1 day ago',
      isRead: true,
      icon: 'close-circle',
      color: '#6b7280'
    },
    {
      id: 6,
      type: 'assignment',
      title: 'History Essay Graded',
      message: 'Your History essay has been graded. Check your student portal for feedback.',
      time: '1 day ago',
      isRead: true,
      icon: 'checkmark-circle',
      color: '#8b5cf6'
    },
    {
      id: 7,
      type: 'exam',
      title: 'Mathematics Midterm Results',
      message: 'Your Mathematics midterm results are now available in the student portal.',
      time: '2 days ago',
      isRead: true,
      icon: 'analytics',
      color: '#06b6d4'
    },
    {
      id: 8,
      type: 'event',
      title: 'Parent-Teacher Meeting',
      message: 'Parent-Teacher meeting scheduled for next Friday at 3:00 PM.',
      time: '3 days ago',
      isRead: true,
      icon: 'people',
      color: '#f59e0b'
    }
  ];

  const getFilteredNotifications = () => {
    if (selectedFilter === 'All') {
      return notifications;
    }
    return notifications.filter(notification => {
      switch (selectedFilter) {
        case 'Classes':
          return notification.type === 'class';
        case 'Events':
          return notification.type === 'event';
        default:
          return true;
      }
    });
  };

  const handleBack = () => {
    router.back();
  };

  const handleMarkAllRead = () => {
    // TODO: Mark all notifications as read
    console.log('Mark all as read');
  };

  const handleNotificationPress = (notification: any) => {
    // TODO: Handle notification press - navigate to relevant page
    console.log('Notification pressed:', notification.title);
  };

  const renderNotification = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={[styles.notificationCard, !item.isRead && styles.unreadCard]} 
      onPress={() => handleNotificationPress(item)}
    >
      <View style={styles.notificationHeader}>
        <View style={styles.notificationLeft}>
          <View style={[styles.notificationIcon, { backgroundColor: item.color }]}>
            <Ionicons name={item.icon as any} size={20} color="white" />
          </View>
          <View style={styles.notificationContent}>
            <Text style={[styles.notificationTitle, !item.isRead && styles.unreadTitle]}>
              {item.title}
            </Text>
            <Text style={styles.notificationMessage}>{item.message}</Text>
            <Text style={styles.notificationTime}>{item.time}</Text>
          </View>
        </View>
        {!item.isRead && <View style={styles.unreadDot} />}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1e3a8a" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity style={styles.markAllButton} onPress={handleMarkAllRead}>
          <Text style={styles.markAllText}>Mark All Read</Text>
        </TouchableOpacity>
      </View>

      {/* Filter Buttons */}
      <View style={styles.filterContainer}>
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterButton,
              selectedFilter === filter && styles.selectedFilterButton
            ]}
            onPress={() => setSelectedFilter(filter)}
          >
            <Text style={[
              styles.filterText,
              selectedFilter === filter && styles.selectedFilterText
            ]}>
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Notifications List */}
      <FlatList
        data={getFilteredNotifications()}
        renderItem={renderNotification}
        keyExtractor={(item) => item.id.toString()}
        style={styles.notificationsList}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.notificationsContent}
      />
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
    backgroundColor: '#1e3a8a',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  markAllButton: {
    padding: 4,
  },
  markAllText: {
    fontSize: 14,
    color: 'white',
    fontWeight: '500',
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#d1d5db',
    backgroundColor: 'white',
  },
  selectedFilterButton: {
    backgroundColor: '#1e3a8a',
    borderColor: '#1e3a8a',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
  },
  selectedFilterText: {
    color: 'white',
  },
  notificationsList: {
    flex: 1,
  },
  notificationsContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  notificationCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  unreadCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#3b82f6',
    backgroundColor: '#f8fafc',
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  notificationLeft: {
    flexDirection: 'row',
    flex: 1,
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
  },
  unreadTitle: {
    fontWeight: 'bold',
  },
  notificationMessage: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
    marginBottom: 8,
  },
  notificationTime: {
    fontSize: 12,
    color: '#9ca3af',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#3b82f6',
    marginLeft: 8,
  },
}); 