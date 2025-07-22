import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, StatusBar, Alert, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useRouter, useFocusEffect } from 'expo-router';
import * as DocumentPicker from 'expo-document-picker';

function TaskDetails({ task, onBack }: { task: any, onBack: () => void }) {
  const [text, setText] = React.useState('');
  const [file, setFile] = React.useState<any>(null);

  if (!task) return null;

  const handleSubmit = () => {
    Alert.alert('Task Submitted', 'Your task has been submitted successfully!');
  };

  const handleFilePick = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: '*/*' });
      if (!result.canceled && result.assets && result.assets.length > 0) {
        setFile(result.assets[0]);
      }
    } catch (e) {
      Alert.alert('Error', 'Could not pick file.');
    }
  };

  return (
    <View style={styles.detailsContainer}>
      <TouchableOpacity style={styles.detailsBackButton} onPress={onBack}>
        <Ionicons name="arrow-back" size={24} color="#374151" />
      </TouchableOpacity>
      <View style={styles.detailsHeader}>
        <View style={[styles.detailsIcon, { backgroundColor: `${task.subjectColor}20` }]}> 
          <Ionicons name={task.subjectIcon as any} size={32} color={task.subjectColor} />
        </View>
        <Text style={[styles.detailsSubject, { color: task.subjectColor }]}>{task.subject}</Text>
      </View>
      <Text style={styles.detailsTitle}>{task.title}</Text>
      <Text style={styles.detailsDue}>{task.dueInfo}</Text>
      <View style={styles.detailsDivider} />
      <Text style={styles.detailsClass}>Class: <Text style={{ fontWeight: 'bold' }}>{task.class}</Text></Text>
      <Text style={styles.detailsStatus}>Status: <Text style={{ fontWeight: 'bold', color: task.status === 'overdue' ? '#ef4444' : (task.status === 'due' ? '#f59e0b' : '#22c55e') }}>{task.status}</Text></Text>
      <Text style={styles.sectionHeading}>Submit Text</Text>
      <TextInput
        style={styles.textArea}
        placeholder="Enter your Answer"
        value={text}
        onChangeText={setText}
        multiline
        numberOfLines={4}
      />
      <Text style={styles.orText}>OR</Text>
      <Text style={styles.sectionHeading}>Submit File</Text>
      <TouchableOpacity style={styles.uploadButton} onPress={handleFilePick}>
        <Ionicons name="cloud-upload" size={20} color="#3b82f6" />
        <Text style={styles.uploadButtonText}>{file ? file.name : 'Upload File'}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit Task</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function TasksScreen() {
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState('Today');
  const [expandedClass, setExpandedClass] = useState<string | null>(null);
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [selectedClass, setSelectedClass] = useState<string | null>(null);

  useFocusEffect(
    React.useCallback(() => {
      setSelectedTask(null);
      setSelectedClass(null);
      setExpandedClass(null);
    }, [])
  );

  const filters = ['All', 'Today', 'Overdue', 'Upcoming'];
  const educationalLevels = ['Play Group', 'Pre KG', 'Junior KG', 'Senior KG'];

  const getSubjectIcon = (subject: string) => {
    const iconMap: { [key: string]: string } = {
      'Mathematics': 'calculator',
      'English': 'book',
      'Hindi': 'language',
      'Science': 'flask',
      'Art & Craft': 'brush',
      'Music': 'musical-notes',
      'Physical Education': 'fitness',
      'Computer': 'laptop',
      'Story Time': 'library',
      'Rhymes': 'musical-note',
      'Drawing': 'color-palette',
      'Coloring': 'color-palette',
      'Building Blocks': 'cube',
      'Puzzle': 'puzzle',
      'Dance': 'body',
      'Yoga': 'leaf',
      'Outdoor Play': 'sunny',
      'Indoor Games': 'game-controller',
      'Sand Play': 'water',
      'Water Play': 'water',
      'Show & Tell': 'mic',
      'Phonics': 'text',
      'Counting': 'calculator',
      'Shapes': 'triangle',
      'Colors': 'color-palette',
      'Letters': 'text',
      'Numbers': 'calculator',
      'Words': 'text',
      'Addition': 'add-circle',
      'Reading': 'book',
      'Writing': 'create',
      'Environmental Studies': 'earth',
      'General Knowledge': 'bulb',
      'Grammar': 'text',
      'Composition': 'document-text',
      'Problem Solving': 'analytics',
      'Mental Math': 'calculator',
      'Public Speaking': 'mic',
      'Quiz': 'help-circle',
      'Cultural Activities': 'people',
      'Geography': 'map',
      'History': 'time',
      'Economics': 'trending-up',
      'Biology': 'leaf',
      'Chemistry': 'flask',
      'Physics': 'flash',
      'Computer Science': 'laptop',
      'Art & Design': 'brush',
      'Music & Dance': 'musical-notes',
      'Sports': 'football',
      'Creative Art': 'color-palette',
      'Craft Work': 'cut',
      'Clay Work': 'hand-left',
      'Paper Craft': 'document',
      'Advanced Art': 'color-palette',
      'Craft & Design': 'cut',
      'Advanced Craft': 'cut',
      'Creative Design': 'color-palette',
      'Art Exhibition': 'trophy',
    };
    return iconMap[subject] || 'document';
  };

  const getSubjectColor = (subject: string) => {
    const colorMap: { [key: string]: string } = {
      'Mathematics': '#3b82f6',
      'English': '#8b5cf6',
      'Hindi': '#8b5cf6',
      'Science': '#22c55e',
      'Art & Craft': '#ec4899',
      'Music': '#ec4899',
      'Physical Education': '#ef4444',
      'Computer': '#06b6d4',
      'Story Time': '#8b5cf6',
      'Rhymes': '#ec4899',
      'Drawing': '#ec4899',
      'Coloring': '#ec4899',
      'Building Blocks': '#22c55e',
      'Puzzle': '#22c55e',
      'Dance': '#ec4899',
      'Yoga': '#ef4444',
      'Outdoor Play': '#ef4444',
      'Indoor Games': '#ef4444',
      'Sand Play': '#f59e0b',
      'Water Play': '#06b6d4',
      'Show & Tell': '#8b5cf6',
      'Phonics': '#8b5cf6',
      'Counting': '#3b82f6',
      'Shapes': '#3b82f6',
      'Colors': '#ec4899',
      'Letters': '#8b5cf6',
      'Numbers': '#3b82f6',
      'Words': '#8b5cf6',
      'Addition': '#3b82f6',
      'Reading': '#8b5cf6',
      'Writing': '#8b5cf6',
      'Environmental Studies': '#22c55e',
      'General Knowledge': '#06b6d4',
      'Grammar': '#8b5cf6',
      'Composition': '#8b5cf6',
      'Problem Solving': '#3b82f6',
      'Mental Math': '#3b82f6',
      'Public Speaking': '#8b5cf6',
      'Quiz': '#06b6d4',
      'Cultural Activities': '#ec4899',
      'Geography': '#f59e0b',
      'History': '#ef4444',
      'Economics': '#06b6d4',
      'Biology': '#22c55e',
      'Chemistry': '#22c55e',
      'Physics': '#f97316',
      'Computer Science': '#06b6d4',
      'Art & Design': '#ec4899',
      'Music & Dance': '#ec4899',
      'Sports': '#ef4444',
      'Creative Art': '#ec4899',
      'Craft Work': '#ec4899',
      'Clay Work': '#ec4899',
      'Paper Craft': '#ec4899',
      'Advanced Art': '#ec4899',
      'Craft & Design': '#ec4899',
      'Advanced Craft': '#ec4899',
      'Creative Design': '#ec4899',
      'Art Exhibition': '#ec4899',
    };
    return colorMap[subject] || '#6b7280';
  };

  const getClassColor = (className: string) => {
    const classColorMap: { [key: string]: string } = {
      'Play Group': '#f59e0b', // Orange
      'Pre KG': '#3b82f6',     // Blue
      'Junior KG': '#22c55e',  // Green
      'Senior KG': '#8b5cf6',  // Purple
    };
    return classColorMap[className] || '#6b7280';
  };

  const allTasks = {
    Today: [
    {
      id: 1,
      subject: 'Mathematics',
        title: 'Complete Number Writing Practice',
        dueInfo: 'Due: Today, 11:00 AM',
      status: 'due',
        class: 'Pre KG'
    },
    {
      id: 2,
        subject: 'English',
        title: 'Phonics Sound Practice',
        dueInfo: 'Due: Today, 2:00 PM',
        status: 'due',
        class: 'Junior KG'
    },
    {
      id: 3,
        subject: 'Art & Craft',
        title: 'Complete Clay Modeling Project',
        dueInfo: 'Due: Today, 4:00 PM',
        status: 'due',
        class: 'Senior KG'
    },
    {
      id: 4,
        subject: 'Story Time',
        title: 'Read Picture Book Assignment',
        dueInfo: 'Due: Today, 5:00 PM',
        status: 'due',
        class: 'Play Group'
      },
      {
        id: 5,
        subject: 'Physical Education',
        title: 'Yoga Exercise Practice',
        dueInfo: 'Due: Today, 6:00 PM',
        status: 'due',
        class: 'Pre KG'
      },
    ],
    Overdue: [
      {
        id: 6,
        subject: 'Drawing',
        title: 'Complete Coloring Assignment',
        dueInfo: 'Overdue: Yesterday, 3:00 PM',
        status: 'overdue',
        class: 'Play Group'
      },
      {
        id: 7,
        subject: 'Rhymes',
        title: 'Learn New Nursery Rhyme',
        dueInfo: 'Overdue: 2 days ago',
        status: 'overdue',
        class: 'Pre KG'
      },
      {
        id: 8,
        subject: 'Building Blocks',
        title: 'Complete Tower Building Task',
        dueInfo: 'Overdue: 3 days ago',
        status: 'overdue',
        class: 'Play Group'
      },
      {
        id: 9,
        subject: 'Hindi',
        title: 'Letter Writing Practice',
        dueInfo: 'Overdue: 1 week ago',
        status: 'overdue',
        class: 'Junior KG'
      },
      {
        id: 10,
        subject: 'Science',
        title: 'Nature Observation Report',
        dueInfo: 'Overdue: 2 weeks ago',
        status: 'overdue',
        class: 'Senior KG'
      },
    ],
    Upcoming: [
      {
        id: 11,
        subject: 'Counting',
        title: 'Number Recognition Practice',
        dueInfo: 'Due: Tomorrow, 9:00 AM',
        status: 'upcoming',
        class: 'Pre KG'
      },
      {
        id: 12,
        subject: 'Reading',
        title: 'Simple Word Reading',
        dueInfo: 'Due: Tomorrow, 2:00 PM',
        status: 'upcoming',
        class: 'Junior KG'
      },
      {
        id: 13,
        subject: 'Grammar',
        title: 'Basic Grammar Rules',
        dueInfo: 'Due: Day after tomorrow, 10:00 AM',
        status: 'upcoming',
        class: 'Senior KG'
      },
      {
        id: 14,
        subject: 'Computer',
        title: 'Basic Computer Skills',
        dueInfo: 'Due: This Friday, 3:00 PM',
        status: 'upcoming',
        class: 'Senior KG'
      },
      {
        id: 15,
        subject: 'Music',
        title: 'Learn New Song',
        dueInfo: 'Due: Next Monday, 4:00 PM',
        status: 'upcoming',
        class: 'Junior KG'
      },
      {
        id: 16,
        subject: 'Dance',
        title: 'Dance Step Practice',
        dueInfo: 'Due: Next Tuesday, 2:00 PM',
        status: 'upcoming',
        class: 'Pre KG'
      },
      {
        id: 17,
        subject: 'Environmental Studies',
        title: 'Plant Growth Observation',
        dueInfo: 'Due: Next Wednesday, 11:00 AM',
        status: 'upcoming',
        class: 'Senior KG'
      },
    ],
    All: [
      {
        id: 1,
        subject: 'Mathematics',
        title: 'Complete Number Writing Practice',
        dueInfo: 'Due: Today, 11:00 AM',
        status: 'due',
        class: 'Pre KG'
      },
      {
        id: 2,
        subject: 'English',
        title: 'Phonics Sound Practice',
        dueInfo: 'Due: Today, 2:00 PM',
        status: 'due',
        class: 'Junior KG'
      },
      {
        id: 6,
        subject: 'Drawing',
        title: 'Complete Coloring Assignment',
        dueInfo: 'Overdue: Yesterday, 3:00 PM',
        status: 'overdue',
        class: 'Play Group'
      },
      {
        id: 7,
        subject: 'Rhymes',
        title: 'Learn New Nursery Rhyme',
        dueInfo: 'Overdue: 2 days ago',
      status: 'overdue',
        class: 'Pre KG'
      },
      {
        id: 11,
        subject: 'Counting',
        title: 'Number Recognition Practice',
        dueInfo: 'Due: Tomorrow, 9:00 AM',
        status: 'upcoming',
        class: 'Pre KG'
      },
      {
        id: 12,
        subject: 'Reading',
        title: 'Simple Word Reading',
        dueInfo: 'Due: Tomorrow, 2:00 PM',
        status: 'upcoming',
        class: 'Junior KG'
      },
      {
        id: 13,
        subject: 'Grammar',
        title: 'Basic Grammar Rules',
        dueInfo: 'Due: Day after tomorrow, 10:00 AM',
        status: 'upcoming',
        class: 'Senior KG'
      },
    ]
  };

  const getCurrentTasks = () => {
    return allTasks[selectedFilter as keyof typeof allTasks] || [];
  };

  const getTasksByClass = (className: string) => {
    const currentTasks = getCurrentTasks();
    return currentTasks.filter(task => task.class === className);
  };

  const toggleClassExpansion = (className: string) => {
    setExpandedClass(prev => (prev === className ? null : className));
  };

  if (selectedTask) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        <TaskDetails task={selectedTask} onBack={() => setSelectedTask(null)} />
      </SafeAreaView>
    );
  }

  if (selectedClass) {
    const classTasks = getTasksByClass(selectedClass);
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerLeft} onPress={() => setSelectedClass(null)}>
            <Ionicons name="arrow-back" size={24} color="#374151" />
          </TouchableOpacity>
          <View style={styles.headerTitleWrapper}>
            <Text style={styles.headerTitle}>{selectedClass}</Text>
          </View>
          <TouchableOpacity style={styles.filterButtonIcon}>
            <Ionicons name="filter" size={22} color="#374151" />
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {classTasks.length > 0 ? classTasks.map((task) => {
            const subjectColor = getSubjectColor(task.subject);
            const subjectIcon = getSubjectIcon(task.subject);
            return (
              <TouchableOpacity
                key={task.id}
                style={styles.timetableCard}
                onPress={() => setSelectedTask({ ...task, subjectColor, subjectIcon })}
              >
                <View style={[styles.timetableIcon, { backgroundColor: subjectColor + '20' }]}> 
                  <Ionicons name={subjectIcon as any} size={28} color={subjectColor} />
                </View>
                <View style={styles.timetableInfo}>
                  <Text style={styles.timetableClassName}>{task.subject}</Text>
                  <Text style={styles.timetableTaskTitle}>{task.title}</Text>
                </View>
                <Ionicons name="chevron-forward" size={22} color="#b0b4bb" />
              </TouchableOpacity>
            );
          }) : (
            <View style={styles.emptyState}>
              <Ionicons name="checkmark-circle" size={48} color="#d1d5db" />
              <Text style={styles.emptyStateText}>No tasks for {selectedClass}</Text>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      {/* Header */}
      <View style={styles.header}>
        {selectedClass === null && (
          <TouchableOpacity style={styles.backButton} onPress={() => router.push('/(tabs)/home') }>
            <Ionicons name="arrow-back" size={24} color="#374151" />
          </TouchableOpacity>
        )}
        <View style={styles.headerTitleWrapper}>
        <Text style={styles.headerTitle}>Tasks</Text>
        </View>
        <TouchableOpacity style={styles.filterButtonIcon}>
          <Ionicons name="filter" size={22} color="#374151" />
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
      {/* Task Cards by Educational Level (Timetable style) */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {educationalLevels.map((className) => {
          const classTasks = getTasksByClass(className);
          const firstTask = classTasks[0];
          return (
              <TouchableOpacity 
              key={className}
              style={styles.timetableCard}
              onPress={() => setSelectedClass(className)}
              >
              <View style={[styles.timetableIcon, { backgroundColor: getClassColor(className) + '20' }]}> 
                <Ionicons name="school" size={28} color={getClassColor(className)} />
                  </View>
              <View style={styles.timetableInfo}>
                <Text style={styles.timetableClassName}>{className}</Text>
                <Text style={styles.timetableTaskTitle}>{firstTask ? firstTask.title : 'No tasks'}</Text>
                  </View>
              <Ionicons name="chevron-forward" size={22} color="#b0b4bb" />
              </TouchableOpacity>
          );
                })}
      </ScrollView>
      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab} onPress={() => router.push('/add-task' as any)}>
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>
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
    width: 40,
  },
  headerTitleWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#374151',
    textAlign: 'center',
  },
  filterIconButton: {
    padding: 8,
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 8,
    justifyContent: 'flex-start',
    backgroundColor: '#f8fafc',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: 'white',
    marginRight: 6,
  },
  selectedFilterButton: {
    backgroundColor: 'white',
    borderColor: '#2563eb',
    shadowColor: 'transparent',
    elevation: 0,
  },
  filterText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#64748b',
  },
  selectedFilterText: {
    color: '#2563eb',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  classSection: {
    marginBottom: 18,
  },
  classHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f4f7fb',
    borderRadius: 16,
    padding: 18,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e0e7ef',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  classHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  classIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  classInfo: {
    flex: 1,
  },
  className: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 2,
  },
  taskCount: {
    fontSize: 14,
    color: '#94a3b8',
    fontWeight: '500',
  },
  classTasks: {
    paddingLeft: 16,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#9ca3af',
    marginTop: 12,
    textAlign: 'center',
  },
  taskCard: {
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
  taskHeader: {
    marginBottom: 8,
  },
  subjectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  subjectIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subjectInfo: {
    marginLeft: 12,
    flex: 1,
  },
  subjectText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  classText: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  subjectBorder: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#e5e7eb',
    marginTop: 4,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 8,
    lineHeight: 22,
  },
  dueInfo: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  completedText: {
    color: '#22c55e',
  },
  urgentText: {
    color: '#ef4444',
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#374151',
    marginTop: 8,
    marginBottom: 8,
  },
  orText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 4,
  },

  fab: {
    position: 'absolute',
    bottom: 40,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#3b82f6',
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
  detailsContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  detailsBackButton: {
    marginBottom: 20,
  },
  detailsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  detailsIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  detailsSubject: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  detailsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detailsDue: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 20,
  },
  detailsDivider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginBottom: 20,
  },
  detailsClass: {
    fontSize: 16,
    marginBottom: 10,
  },
  detailsStatus: {
    fontSize: 16,
    marginBottom: 20,
  },
  textArea: {
    height: 100,
    borderColor: '#d1d5db',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    fontSize: 14,
    color: '#374151',
    backgroundColor: '#f9fafb',
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eff6ff',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  uploadButtonText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#3b82f6',
    fontWeight: '500',
  },
  submitButton: {
    backgroundColor: '#3b82f6',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  timetableCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 18,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e0e7ef',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  timetableIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  timetableInfo: {
    flex: 1,
  },
  timetableClassName: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 2,
  },
  timetableTaskTitle: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  backButton: {
    width: 40,
  },
  filterButtonIcon: {
    padding: 8,
  },
}); 