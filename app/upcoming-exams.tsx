import { Ionicons } from '@expo/vector-icons';
import { router, useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { supabase } from './supabaseClient';

// Static list of educational levels
const educationalLevels = ['Play Group', 'Pre KG', 'Junior KG', 'Senior KG'];

// Define the structure of an exam object
interface Exam {
  id: string;
  exam_name: string;
  subject: string;
  exam_type: string;
  exam_date: string;
  exam_time: string;
  duration: number;
  notes: string;
  educational_level: string;
}

// Function to get a color for each education level
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
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch exams from Supabase for the selected educational level
  const fetchExams = useCallback(async (level: string) => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from('exams')
        .select('*')
        .eq('educational_level', level)
        .order('exam_date', { ascending: true });

      if (error) {
        throw error;
      }
      setExams(data || []);
    } catch (err) {
      setError('Failed to fetch exams. Please try again.');
      console.error('Error fetching exams:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Refetch exams when the screen is focused
  useFocusEffect(
    useCallback(() => {
      if (selectedLevel) {
        fetchExams(selectedLevel);
      }
    }, [selectedLevel, fetchExams])
  );

  // Handle selecting an educational level
  const handleSelectLevel = (level: string) => {
    setSelectedLevel(level);
    fetchExams(level);
  };

  // Navigate back or deselect the current level
  const handleBack = () => {
    if (selectedLevel) {
      setSelectedLevel(null);
      setExams([]);
      setError(null);
    } else {
      router.back();
    }
  };

  // Handle deleting an exam
  const handleDelete = async (examId: string) => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this exam?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const { error } = await supabase
                .from('exams')
                .delete()
                .eq('id', examId);

              if (error) {
                throw error;
              }

              // Refresh the exam list
              if (selectedLevel) {
                fetchExams(selectedLevel);
              }
            } catch (err) {
              setError('Failed to delete exam. Please try again.');
              console.error('Error deleting exam:', err);
            }
          },
        },
      ]
    );
  };

  // Handle editing an exam
  const handleEdit = (exam: Exam) => {
    router.push({
      pathname: '/edit-exam',
      params: { exam: JSON.stringify(exam) },
    } as any);
  };

  // Format date and time for display
  const formatDateTime = (date: string, time: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    const formattedDate = new Date(date).toLocaleDateString(undefined, options);
    const formattedTime = new Date(`1970-01-01T${time}Z`).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
    return `${formattedDate} • ${formattedTime}`;
  };

  // Calculate days left until the exam
  const getDaysLeft = (date: string) => {
    const examDate = new Date(date);
    const today = new Date();
    const diffTime = examDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return 'Past';
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return '1 day left';
    return `${diffDays} days left`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#374151" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Upcoming Exams</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerIcon}>
            <Ionicons name="calendar" size={24} color="#374151" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIcon}>
            <Ionicons name="menu" size={24} color="#374151" />
          </TouchableOpacity>
        </View>
      </View>

      {selectedLevel ? (
        // Exams View
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {loading ? (
            <ActivityIndicator size="large" color="#3b82f6" style={{ marginTop: 20 }} />
          ) : error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : exams.length === 0 ? (
            <Text style={styles.noExamsText}>No upcoming exams for {selectedLevel}.</Text>
          ) : (
            exams.map((exam) => (
              <View key={exam.id} style={[styles.examCard, { borderLeftColor: getClassColor(selectedLevel) }]}>
                <View style={styles.examCardHeader}>
                  <View style={styles.examCardHeaderLeft}>
                    <View style={[styles.examIconCircle, { backgroundColor: getClassColor(selectedLevel) + '22' }]}>
                      <Ionicons name="school-outline" size={24} color={getClassColor(selectedLevel)} />
                    </View>
                    <View>
                      <Text style={styles.examSubject}>{exam.subject}</Text>
                      <Text style={styles.examTitle}>{exam.exam_name}</Text>
                    </View>
                  </View>
                  <View style={styles.examCardHeaderRight}>
                    <View style={styles.examActions}>
                      <TouchableOpacity onPress={() => handleEdit(exam)} style={styles.actionButton}>
                        <Ionicons name="pencil" size={18} color="#3b82f6" />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => handleDelete(exam.id)} style={styles.actionButton}>
                        <Ionicons name="trash" size={18} color="#ef4444" />
                      </TouchableOpacity>
                    </View>
                    <View style={[styles.examDateBadge, { backgroundColor: '#fef3c7' }]}>
                      <Ionicons name="calendar-outline" size={14} color="#92400e" />
                      <Text style={[styles.examDateText, { color: '#92400e' }]}>{getDaysLeft(exam.exam_date)}</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.examDetailsRow}>
                  <View style={styles.examDetailItem}>
                    <Ionicons name="calendar-outline" size={16} color="#6b7280" />
                    <Text style={styles.examDetailText}>{formatDateTime(exam.exam_date, exam.exam_time)}</Text>
                  </View>
                  <View style={styles.examDetailItem}>
                    <Ionicons name="time-outline" size={16} color="#6b7280" />
                    <Text style={styles.examDetailText}>{exam.duration} hours</Text>
                  </View>
                </View>
                {exam.notes && (
                  <View style={styles.notesContainer}>
                    <Ionicons name="document-text-outline" size={16} color="#6b7280" />
                    <Text style={styles.notesText}>{exam.notes}</Text>
                  </View>
                )}
              </View>
            ))
          )}
        </ScrollView>
      ) : (
        // Education Levels View
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {educationalLevels.map((level) => (
            <TouchableOpacity
              key={level}
              style={styles.levelCard}
              onPress={() => handleSelectLevel(level)}
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

      {/* Floating Action Button to Add Exam */}
      {selectedLevel && (
        <TouchableOpacity
          style={styles.fab}
          onPress={() => router.push({ pathname: '/add-exam', params: { educationalLevel: selectedLevel } })}
        >
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
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderLeftWidth: 5,
  },
  examCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  examCardHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  examCardHeaderRight: {
    alignItems: 'flex-end',
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
  examTitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  examDateBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 8,
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
  notesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#f3f4f6',
    padding: 8,
    borderRadius: 8,
  },
  notesText: {
    fontSize: 13,
    color: '#4b5563',
    marginLeft: 8,
    flex: 1,
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
  errorText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: 'red',
  },
  noExamsText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#6b7280',
  },
  examActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    padding: 4,
    marginLeft: 8,
  },
});
