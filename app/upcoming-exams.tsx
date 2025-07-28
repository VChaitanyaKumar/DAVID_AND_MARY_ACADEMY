import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

const educationalLevels = ['Play Group', 'Pre KG', 'Junior KG', 'Senior KG'];

const examsByLevel = {
  'Play Group': [
    {
      id: 1,
      subject: 'Mathematics',
      examTitle: 'Numbers 1-10',
      date: 'March 15, 2024 • 9:00 AM',
      daysLeft: '2 days left',
      duration: '1 hour',
      color: '#f59e0b',
      tagColor: '#fde68a',
      tagTextColor: '#374151'
    },
    {
      id: 2,
      subject: 'Story Time',
      examTitle: 'Short Story Recitation',
      date: 'March 18, 2024 • 10:00 AM',
      daysLeft: '5 days left',
      duration: '30 min',
      color: '#8b5cf6',
      tagColor: '#ddd6fe',
      tagTextColor: '#374151'
    }
  ],
  'Pre KG': [
    {
      id: 3,
      subject: 'English',
      examTitle: 'Alphabet Recognition',
      date: 'March 16, 2024 • 11:00 AM',
      daysLeft: '3 days left',
      duration: '1 hour',
      color: '#3b82f6',
      tagColor: '#bfdbfe',
      tagTextColor: '#374151'
    }
  ],
  'Junior KG': [
    {
      id: 4,
      subject: 'Science',
      examTitle: 'Plants and Animals',
      date: 'March 20, 2024 • 1:00 PM',
      daysLeft: '7 days left',
      duration: '1.5 hours',
      color: '#22c55e',
      tagColor: '#bbf7d0',
      tagTextColor: '#374151'
    }
  ],
  'Senior KG': [
    {
      id: 5,
      subject: 'Mathematics',
      examTitle: 'Addition and Subtraction',
      date: 'March 22, 2024 • 2:00 PM',
      daysLeft: '9 days left',
      duration: '2 hours',
      color: '#8b5cf6',
      tagColor: '#ddd6fe',
      tagTextColor: '#374151'
    }
  ]
};

function getClassColor(className: string) {
  const classColorMap: { [key: string]: string } = {
    'Play Group': '#f59e0b', // Orange
    'Pre KG': '#3b82f6',     // Blue
    'Junior KG': '#22c55e',  // Green
    'Senior KG': '#8b5cf6',  // Purple
  };
  return classColorMap[className] || '#6b7280';
}

export default function UpcomingExamsScreen() {
  const [selectedLevel, setSelectedLevel] = useState<keyof typeof examsByLevel | null>(null);

  const handleAddExam = () => {
    router.push('/add-exam' as any);
  };

  const handleBack = () => {
    if (selectedLevel) setSelectedLevel(null);
    else router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/(tabs)/home')} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#374151" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Upcoming Exams</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerIcon} onPress={() => console.log('Calendar pressed')}>
            <Ionicons name="calendar" size={24} color="#374151" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIcon} onPress={() => console.log('Menu pressed')}>
            <Ionicons name="menu" size={24} color="#374151" />
          </TouchableOpacity>
        </View>
      </View>
      {selectedLevel ? (
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {examsByLevel[selectedLevel].map((exam: typeof examsByLevel["Play Group"][0]) => (
            <View key={exam.id} style={[styles.examCard, { borderLeftColor: exam.color, borderLeftWidth: 6, backgroundColor: '#f9fafb' }]}> 
              <View style={styles.examHeaderRow}>
                <View style={[styles.examIconCircle, { backgroundColor: exam.color + '22' }]}> 
                  <Ionicons name="school" size={28} color={exam.color} />
                </View>
                <View style={styles.examHeaderText}>
                  <Text style={styles.examSubject}>{exam.subject}</Text>
                  <Text style={styles.examTitle}>{exam.examTitle}</Text>
                </View>
                <View style={[styles.examDateBadge, { backgroundColor: exam.tagColor }]}> 
                  <Ionicons name="calendar" size={14} color={exam.tagTextColor} />
                  <Text style={[styles.examDateText, { color: exam.tagTextColor }]}>{exam.daysLeft}</Text>
                </View>
              </View>
              <View style={styles.examDetailsRow}>
                <View style={styles.examDetailItem}>
                  <Ionicons name="calendar" size={16} color="#6b7280" />
                  <Text style={styles.examDetailText}>{exam.date}</Text>
                </View>
                <View style={styles.examDetailItem}>
                  <Ionicons name="time" size={16} color="#374151" />
                  <Text style={styles.examDetailText}>{exam.duration}</Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      ) : (
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {educationalLevels.map((level) => (
            <TouchableOpacity
              key={level}
              style={styles.levelCard}
              onPress={() => setSelectedLevel(level as keyof typeof examsByLevel)}
            >
              <View style={styles.levelCardContent}>
                <View style={styles.levelCardLeft}>
                  <View style={[styles.levelIconContainer, { backgroundColor: getClassColor(level) }]}> 
                    <Ionicons name="school" size={24} color="white" />
                  </View>
                  <View style={styles.levelCardText}>
                    <Text style={styles.levelCardTitle}>{level}</Text>
                    <Text style={styles.levelCardSubtitle}>View exams</Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#6b7280" />
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
      {/* Floating Action Button */}
      {selectedLevel && (
        <TouchableOpacity style={styles.fab} onPress={() => router.push({ pathname: '/add-exam' as any, params: { educationalLevel: selectedLevel } })}>
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#374151',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    padding: 4,
    marginLeft: 12,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  examCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
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
  examHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  subjectSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  subjectDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  subjectName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#374151',
  },
  daysLeftTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  daysLeftText: {
    fontSize: 12,
    fontWeight: '600',
  },
  examTitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 0,
    lineHeight: 20,
  },
  examDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  dateText: {
    fontSize: 14,
    color: '#6b7280',
    marginLeft: 4,
  },
  durationSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  durationText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#374151',
    marginLeft: 4,
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
  examHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  examIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  examHeaderText: {
    flex: 1,
  },
  examSubject: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 2,
  },
  examDateBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 10,
  },
  examDateText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  examDetailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  examDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  examDetailText: {
    fontSize: 13,
    color: '#6b7280',
    marginLeft: 6,
  },
  levelCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
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
}); 