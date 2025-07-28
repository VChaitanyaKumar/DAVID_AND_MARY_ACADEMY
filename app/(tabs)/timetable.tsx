import { Ionicons } from '@expo/vector-icons';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { supabase } from '../supabaseClient';

export default function TimetableScreen() {
  const [selectedDay, setSelectedDay] = useState('Mon');
  const [selectedLevel, setSelectedLevel] = useState('Play Group');
  const [showLevels, setShowLevels] = useState(true);
  const [classes, setClasses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const params = useLocalSearchParams();
  const refreshFlag = params?.refresh as string;

  const fetchClasses = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('classes')
        .select('*')
        .eq('day', getDayName(selectedDay))
        .eq('level', selectedLevel)
        .order('start_time', { ascending: true });
      if (error) throw error;
      setClasses(data || []);
    } catch (error) {
      console.error('Error fetching classes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchClasses();
    }, [selectedDay, selectedLevel, refreshFlag])
  );

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const educationalLevels = ['Play Group', 'Pre KG', 'Junior KG', 'Senior KG'];
  
  const getClassColor = (className: string) => {
    const classColorMap: { [key: string]: string } = {
      'Play Group': '#f59e0b', // Orange
      'Pre KG': '#3b82f6',     // Blue
      'Junior KG': '#22c55e',  // Green
      'Senior KG': '#8b5cf6',  // Purple
    };
    return classColorMap[className] || '#6b7280';
  };

  const getDayName = (day: string) => {
    const dayNames = {
      'Mon': 'Monday',
      'Tue': 'Tuesday', 
      'Wed': 'Wednesday',
      'Thu': 'Thursday',
      'Fri': 'Friday',
      'Sat': 'Saturday'
    };
    return dayNames[day as keyof typeof dayNames] || day;
  };

  const handleAddClass = () => {
    router.push({
      pathname: '/add-class' as any,
      params: { educationalLevel: selectedLevel }
    });
  };

  const handleLevelSelect = (level: string) => {
    setSelectedLevel(level);
    setShowLevels(false);
    // No fetchClasses needed
  };

  const handleBackToLevels = () => {
    setShowLevels(true);
  };

  const handleDaySelect = (day: string) => {
    setSelectedDay(day);
    // No fetchClasses needed
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      
      {/* Header */}
      <View style={styles.header}>
        {showLevels ? (
          <TouchableOpacity style={styles.backButton} onPress={() => router.push('/(tabs)/home')}>
            <Ionicons name="arrow-back" size={24} color="#374151" />
          </TouchableOpacity>
        ) : (
            <TouchableOpacity style={styles.backButton} onPress={handleBackToLevels}>
          <Ionicons name="arrow-back" size={24} color="#374151" />
        </TouchableOpacity>
          )}
        <View style={styles.headerTitleWrapper}>
          <Text style={styles.headerTitle} numberOfLines={1} ellipsizeMode="tail">
          {showLevels ? 'Timetable' : selectedLevel}
        </Text>
        </View>
        <View style={styles.headerRight}>
        <TouchableOpacity style={styles.settingsButton}>
          <Ionicons name="settings" size={24} color="#374151" />
        </TouchableOpacity>
        </View>
      </View>

      {showLevels ? (
        // Show Educational Levels
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {educationalLevels.map((level) => (
            <TouchableOpacity
              key={level}
              style={styles.levelCard}
              onPress={() => handleLevelSelect(level)}
            >
              <View style={styles.levelCardContent}>
                <View style={styles.levelCardLeft}>
                  <View style={[styles.levelIconContainer, { backgroundColor: getClassColor(level) }]}>
                    <Ionicons name="school" size={24} color="white" />
                  </View>
                  <View style={styles.levelCardText}>
                    <Text style={styles.levelCardTitle}>{level}</Text>
                    <Text style={styles.levelCardSubtitle}>View timetable</Text>
                  </View>
                </View>
                {/* Removed the chevron-forward arrow icon here */}
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (
        // Show Specific Timetable
        <>
      {/* Day Selector */}
      <View style={styles.daySelector}>
        {days.map((day) => (
          <TouchableOpacity
            key={day}
            style={[
              styles.dayButton,
              selectedDay === day && styles.selectedDayButton
            ]}
            onPress={() => handleDaySelect(day)}
          >
            <Text style={[
              styles.dayText,
              selectedDay === day && styles.selectedDayText
            ]}>
              {day}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Date and Info */}
      <View style={styles.dateSection}>
            <Text style={styles.dateTitle}>{getDayName(selectedDay)}, March 15</Text>
            <Text style={styles.classCount}>{classes.length} classes today</Text>
      </View>

      {/* Class Cards */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading classes...</Text>
          </View>
        ) : classes.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="calendar-outline" size={48} color="#9ca3af" />
            <Text style={styles.emptyTitle}>No classes scheduled</Text>
            <Text style={styles.emptySubtitle}>Add a class to get started</Text>
          </View>
        ) : (
          classes.map((classItem) => (
            <View
              key={classItem.id}
              style={styles.classCardModern}
            >
              <View style={styles.classHeaderModern}>
                <Text style={styles.subjectTextModern}>{classItem.subject}</Text>
                <View style={styles.tagModern}>
                  <Text style={styles.tagTextModern}>Class</Text>
                </View>
              </View>
              <View style={styles.classDetailsModern}>
                <View style={styles.detailRowModern}>
                  <Ionicons name="time" size={16} color="#64748b" />
                  <Text style={styles.detailTextModern}>
                    {classItem.start_time} - {classItem.end_time}
                  </Text>
                </View>
                {classItem.teacher_name && (
                  <View style={styles.detailRowModern}>
                    <Ionicons name="person" size={16} color="#64748b" />
                    <Text style={styles.detailTextModern}>{classItem.teacher_name}</Text>
                  </View>
                )}
              </View>
            </View>
          ))
        )}
      </ScrollView>
        </>
      )}

      {/* Restore the FAB after the ScrollView, only when !showLevels */}
      {!showLevels && (
        <TouchableOpacity style={styles.fab} onPress={handleAddClass}>
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      )}
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headerRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  backButton: {
    padding: 8,
    zIndex: 10,
    position: 'relative',
  },
  headerTitleWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 0,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#374151',
    textAlign: 'center',
  },
  settingsButton: {
    padding: 8,
  },
  levelSelector: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  levelButton: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    flex: 1,
    marginHorizontal: 1,
    alignItems: 'center',
  },
  selectedLevelButton: {
    backgroundColor: '#1e3a8a',
    borderColor: '#1e3a8a',
  },
  levelText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#6b7280',
    textAlign: 'center',
  },
  selectedLevelText: {
    color: 'white',
  },
  daySelector: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dayButton: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 6,
    marginHorizontal: 2,
    borderRadius: 16,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedDayButton: {
    backgroundColor: '#1e3a8a',
    borderColor: '#1e3a8a',
  },
  dayText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#6b7280',
  },
  selectedDayText: {
    color: 'white',
  },
  dateSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  dateTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 4,
  },
  classCount: {
    fontSize: 16,
    color: '#6b7280',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  classCard: {
    padding: 20,
    borderRadius: 16,
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
  classHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  subjectText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#374151',
    flex: 1,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'white',
  },
  classDetails: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 16,
    color: '#6b7280',
    marginLeft: 8,
  },
  levelCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
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
  levelCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  levelCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  levelIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  levelCardText: {
    flex: 1,
  },
  levelCardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 2,
  },
  levelCardSubtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  fab: {
    position: 'absolute',
    bottom: 40,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#1e3a8a',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    fontSize: 16,
    color: '#6b7280',
    marginTop: 12,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginTop: 16,
    marginBottom: 4,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
  classCardModern: {
    backgroundColor: '#f6faff',
    borderRadius: 16,
    marginBottom: 20,
    padding: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 2,
    borderColor: '#e0e7ef',
  },
  classHeaderModern: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  subjectTextModern: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#22223b',
  },
  tagModern: {
    backgroundColor: '#2563eb',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tagTextModern: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  classDetailsModern: {
    marginTop: 4,
    gap: 8,
  },
  detailRowModern: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  detailTextModern: {
    fontSize: 16,
    color: '#22223b',
    marginLeft: 8,
  },
}); 