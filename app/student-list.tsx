import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams, useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator, Alert, Image, Modal, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Student } from './data/students';
import { supabase } from './supabaseClient';

export default function StudentListScreen() {
  const { level } = useLocalSearchParams<{ level: string }>();
  const [selectedTab, setSelectedTab] = useState<'boys' | 'girls'>('boys');
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState<Student | null>(null);

    useFocusEffect(
    useCallback(() => {
      const fetchStudents = async () => {
        if (!level) return;
        setLoading(true);
        setError(null);

        const { data, error } = await supabase
          .from('students')
          .select('id, first_name, last_name, date_of_birth, gender, photo_url, roll_number')
          .eq('educational_level', level);

        if (error) {
          console.error('Error fetching students:', error);
          setError('Failed to fetch students. Please try again.');
        } else {
          const formattedStudents = data.map((student: any) => {
            const age = student.date_of_birth
              ? new Date().getFullYear() - new Date(student.date_of_birth).getFullYear()
              : 0;

            return {
              id: student.id,
              firstName: student.first_name,
              lastName: student.last_name,
              dateOfBirth: student.date_of_birth,
              gender: student.gender,
              photoUrl: student.photo_url,
              rollNumber: student.roll_number,
              age,
            } as Student;
          });
          setStudents(formattedStudents);
        }
        setLoading(false);
      };

      fetchStudents();
    }, [level])
  );

  const boys = students.filter((s) => s.gender === 'Male');
  const girls = students.filter((s) => s.gender === 'Female');

    const handleStudentPress = (studentId: string) => {
    router.push({ pathname: '/student-profile', params: { id: studentId } });
  };

  const handleDeletePress = (student: Student) => {
    setStudentToDelete(student);
    setDeleteModalVisible(true);
  };

  const confirmDelete = async () => {
    if (!studentToDelete) return;

    const { error } = await supabase.from('students').delete().eq('id', studentToDelete.id);

    if (error) {
      Alert.alert('Error', 'Failed to delete student.');
    } else {
      setStudents((prevStudents) => prevStudents.filter((s) => s.id !== studentToDelete.id));
      Alert.alert('Success', 'Student deleted successfully.');
    }

    setDeleteModalVisible(false);
    setStudentToDelete(null);
  };

  const renderStudent = (student: Student) => (
    <TouchableOpacity
      key={student.id}
      style={styles.studentCard}
      onPress={() => handleStudentPress(student.id)}
    >
      <View style={styles.studentAvatar}>
        {student.photoUrl ? (
          <Image source={{ uri: student.photoUrl }} style={styles.studentPhoto} />
        ) : (
          <Ionicons
            name={student.gender === 'Male' ? 'male' : 'female'}
            size={24}
            color={student.gender === 'Male' ? '#3b82f6' : '#ec4899'}
          />
        )}
      </View>
      <View style={styles.studentInfo}>
        <Text style={styles.studentName}>{`${student.firstName} ${student.lastName}`}</Text>
        <Text style={styles.studentDetails}>Roll No: {student.rollNumber}</Text>
        <Text style={styles.studentDetails}>Age: {student.age} years</Text>
      </View>
      
      <View style={styles.actionsContainer}>
        <TouchableOpacity onPress={() => router.push({ pathname: '/edit-student', params: { id: student.id } })} style={styles.actionButton}>
          <Ionicons name="pencil" size={20} color="#3b82f6" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDeletePress(student)} style={styles.actionButton}>
          <Ionicons name="trash" size={20} color="#ef4444" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1e3a8a" />
      
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{level}</Text>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'boys' && styles.activeTab]}
          onPress={() => setSelectedTab('boys')}
        >
          <Ionicons 
            name="person" 
            size={20} 
            color={selectedTab === 'boys' ? '#3b82f6' : '#9ca3af'} 
          />
          <Text style={[styles.tabText, selectedTab === 'boys' && styles.activeTabText]}>
            Boys ({boys.length})
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'girls' && styles.activeTab]}
          onPress={() => setSelectedTab('girls')}
        >
          <Ionicons 
            name="person" 
            size={20} 
            color={selectedTab === 'girls' ? '#ec4899' : '#9ca3af'} 
          />
          <Text style={[styles.tabText, selectedTab === 'girls' && styles.activeTabText]}>
            Girls ({girls.length})
          </Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#1e3a8a" style={{ marginTop: 20 }} />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.studentsContainer}>
            {(selectedTab === 'boys' ? boys : girls).map(renderStudent)}
          </View>
          
          {(selectedTab === 'boys' ? boys : girls).length === 0 && (
            <Text style={styles.emptyText}>No students found in this category.</Text>
          )}
        </ScrollView>
      )}

            <TouchableOpacity 
        style={styles.fab}
        onPress={() => router.push({ pathname: '/add-student', params: { level } })}
      >
        <Ionicons name="add" size={32} color="white" />
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={isDeleteModalVisible}
        onRequestClose={() => setDeleteModalVisible(false)}
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Delete Student</Text>
            <Text style={styles.modalMessage}>
              Are you sure you want to delete {studentToDelete?.firstName} {studentToDelete?.lastName}'s details?
            </Text>
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setDeleteModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.deleteButton]}
                onPress={confirmDelete}
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    backgroundColor: '#1e3a8a',
    borderRadius: 28,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e3a8a',
    paddingHorizontal: 20,
    paddingVertical: 15,
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    flex: 1,
    textAlign: 'center',
  },
  headerSpacer: {
    width: 40,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 12,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  activeTab: {
    backgroundColor: '#f1f5f9',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#9ca3af',
  },
  activeTabText: {
    color: '#1f2937',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  studentsContainer: {
    gap: 12,
    paddingBottom: 20,
  },
  studentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  studentAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  studentInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  studentPhoto: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
    backgroundColor: '#e5e7eb',
  },
  studentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  studentDetails: {
    fontSize: 13,
    color: '#6b7280',
    marginTop: 2,
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    position: 'absolute',
    top: 10,
    right: 10,
  },
  actionButton: {
    padding: 6,
    marginLeft: 8,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#6b7280',
  },
  errorText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#ef4444',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#e5e7eb',
  },
  cancelButtonText: {
    color: '#374151',
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#ef4444',
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
