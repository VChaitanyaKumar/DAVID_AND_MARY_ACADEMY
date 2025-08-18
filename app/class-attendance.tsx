import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';
import React, { useContext, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Modal, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AttendanceContext } from './attendance-context';
import { supabase } from './supabaseClient';

const NAVY = '#001F54';
const GREEN = '#16a34a';
const RED = '#dc2626';

const SUBJECTS = [
  'Basic of Geometry Class',
  'English Language',
  'Science',
  'Mathematics',
];

type Student = {
  roll: number;
  name: string;
};

type AttendanceRecord = Student & {
  status: 'present' | 'absent' | null;
};

const MOCK_STUDENTS: Student[] = [];

const LIGHT_BG = '#F8FAFF';
const HEADER_BG = '#F0F4FF';
const CARD_TOTAL_BG = '#E3EDFF';
const CARD_PRESENT_BG = '#E6F9ED';
const CARD_ABSENT_BG = '#FFE6E6';
const SECTION_LABEL = '#274690';

function formatDate(date: Date) {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export default function MarkAttendance() {
  const router = useRouter();
  const { savedAttendanceBySubject, setSavedAttendanceBySubject } = useContext(AttendanceContext);
  const [date, setDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(SUBJECTS[0]);
  const [subjectDropdown, setSubjectDropdown] = useState(false);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>(
    MOCK_STUDENTS.map((s) => ({ ...s, status: null }))
  );
  const [isEditMode, setIsEditMode] = useState(false);
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [newStudent, setNewStudent] = useState({ roll: '', name: '' });
  const [selectedStudent, setSelectedStudent] = useState<AttendanceRecord | null>(null);
  const [showEditStudentModal, setShowEditStudentModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState<AttendanceRecord | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const presentCount = attendance.filter((s) => s.status === 'present').length;
  const absentCount = attendance.filter((s) => s.status === 'absent').length;

  const handleAttendance = (roll: number, status: 'present' | 'absent') => {
    setAttendance((prev) =>
      prev.map((s) =>
        s.roll === roll ? { ...s, status: status } : s
      )
    );
  };

  const handleAddStudent = () => {
    if (!newStudent.roll || !newStudent.name) {
      Alert.alert('Error', 'Please enter both roll number and student name');
      return;
    }

    // Check if roll number already exists
    if (attendance.some(s => s.roll === parseInt(newStudent.roll))) {
      Alert.alert('Error', 'A student with this roll number already exists');
      return;
    }

    const newStudentObj = {
      roll: parseInt(newStudent.roll),
      name: newStudent.name,
      status: 'present' as const // Default status is 'present'
    };

    setAttendance(prev => [...prev, newStudentObj]);
    setNewStudent({ roll: '', name: '' });
    setShowAddStudentModal(false);
  };

  const handleSelectStudent = (student: AttendanceRecord) => {
    if (selectedStudent && selectedStudent.roll === student.roll) {
      setSelectedStudent(null); // Deselect if tapped again
    } else {
      setSelectedStudent(student);
    }
  };

  const handleOpenEditModal = () => {
    if (!selectedStudent) return;
    setEditingStudent({ ...selectedStudent });
    setShowEditStudentModal(true);
  };

  const handleUpdateStudent = () => {
    if (!editingStudent) return;

    setAttendance(prev => 
      prev.map(s => s.roll === editingStudent.roll ? { ...s, name: editingStudent.name } : s)
    );
    setShowEditStudentModal(false);
    setSelectedStudent(null);
    setEditingStudent(null);
  };

  const handleDeleteStudent = () => {
    if (!selectedStudent) return;

    Alert.alert(
      'Delete Student',
      'Are you sure you want to delete this student?',
      [
        { text: 'CANCEL', style: 'cancel' },
        {
          text: 'DELETE',
          style: 'destructive',
          onPress: () => {
            setAttendance(prev => prev.filter(s => s.roll !== selectedStudent.roll));
            setSelectedStudent(null);
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleSubmit = async () => {
    const allMarked = attendance.every(s => s.status === 'present' || s.status === 'absent');
    if (!allMarked) {
      Alert.alert('Incomplete Attendance', 'Please mark Present or Absent for all students.');
      return;
    }
    setIsSubmitting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      const educational_level = 'Your-Educational-Level'; // Placeholder
      const formattedDate = date.toISOString().split('T')[0];

      // First, delete existing records for this user, date, level, and subject
      const { error: deleteError } = await supabase
        .from('attendance')
        .delete()
        .eq('user_id', user.id)
        .eq('date', formattedDate)
        .eq('educational_level', educational_level)
        .eq('subject', selectedSubject);

      if (deleteError) {
        throw deleteError;
      }

      // Then, insert the new records
      const records = attendance.map(s => ({
        date: formattedDate,
        educational_level: educational_level,
        subject: selectedSubject,
        student_roll: s.roll,
        student_name: s.name,
        status: s.status,
        user_id: user.id,
      }));

      const { error: insertError } = await supabase.from('attendance').insert(records);

      if (insertError) {
        throw insertError;
      }

      Alert.alert('Success', 'Attendance submitted successfully!');
      router.back();
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to submit attendance');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditAttendance = () => {
    router.push('/edit-attendance-list');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 24 }}>
        {/* Header Row with Back Arrow and Title */}
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={styles.backArrow}
            onPress={() => router.back()}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="arrow-back" size={28} color={'#111'} />
          </TouchableOpacity>
          <Text style={styles.pageTitle} numberOfLines={1} ellipsizeMode="tail">Student Attendance</Text>
        </View>
        {/* Total Card (Total number of students) */}
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 12, marginTop: 8 }}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryNumberTotal}>{attendance.length}</Text>
            <Text style={styles.totalLabel}>Total Students</Text>
          </View>
        </View>
        {/* Present/Absent Summary */}
        <View style={styles.summaryRow}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryNumberGreen}>{presentCount.toString().padStart(2, '0')}</Text>
            <Text style={styles.totalLabel}>Present</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryNumberRed}>{absentCount.toString().padStart(2, '0')}</Text>
            <Text style={styles.totalLabel}>Absent</Text>
          </View>
        </View>
        {/* Calendar and Subject Selection */}
        <View style={styles.calendarSection}>
          <Text style={styles.calendarLabel}>Date</Text>
          <TouchableOpacity style={styles.calendarBtn} onPress={() => setShowDate(true)}>
            <Ionicons name="calendar-outline" size={18} color={NAVY} style={{ marginRight: 6 }} />
            <Text style={styles.calendarBtnText}>{formatDate(date)}</Text>
          </TouchableOpacity>
          {showDate && (
            <DateTimePicker
              value={date}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={(_, selected) => {
                setShowDate(false);
                if (selected) setDate(selected);
              }}
            />
          )}
          <View style={styles.section}>
            <View style={styles.subjectHeaderContainer}>
              <Text style={styles.sectionLabel}>Subject</Text>
            </View>
            <TouchableOpacity style={styles.dropdown} onPress={() => setSubjectDropdown(!subjectDropdown)} activeOpacity={0.7}>
              <Text style={styles.subjectDropdownText}>{selectedSubject}</Text>
              <Ionicons name={subjectDropdown ? 'chevron-up' : 'chevron-down'} size={20} color={NAVY} />
            </TouchableOpacity>
            {subjectDropdown && (
              <View style={styles.subjectDropdownList}>
                {SUBJECTS.map((subj) => (
                  <TouchableOpacity
                    key={subj}
                    style={styles.subjectDropdownItem}
                    onPress={() => {
                      setSelectedSubject(subj);
                      setSubjectDropdown(false);
                    }}
                  >
                    <Text style={styles.subjectDropdownItemText}>{subj}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </View>
        {/* Student Details Header */}
        <View style={styles.studentDetailsHeader}>
          <Text style={styles.studentDetailsLabel}>Student Details</Text>
          <TouchableOpacity style={styles.addStudentBtn} onPress={() => setShowAddStudentModal(true)}>
            <Ionicons name="add-circle" size={28} color={NAVY} />
          </TouchableOpacity>
        </View>
        <View style={styles.listHeaderRow}>
          <Text style={styles.listHeaderColRoll}>Roll No.</Text>
          <Text style={styles.listHeaderColName}>Student Name</Text>
          <Text style={styles.listHeaderColStatus}>Status</Text>
        </View>
        <FlatList
          data={attendance}
          keyExtractor={(item) => item.roll.toString()}
          renderItem={({ item }) => {
            const isSelected = selectedStudent && selectedStudent.roll === item.roll;
            return (
              <TouchableOpacity onPress={() => handleSelectStudent(item)} activeOpacity={0.7}>
                <View style={[styles.studentRow, isSelected && styles.selectedStudentRow]}>
                  <Text style={styles.studentRoll}>{item.roll.toString().padStart(2, '0')}</Text>
                  <Text style={styles.studentName}>{item.name}</Text>
                  
                  <View style={styles.rightContainer}>
                    {isSelected && (
                      <View style={styles.rowActionsContainer}>
                        <TouchableOpacity style={styles.rowActionButton} onPress={handleOpenEditModal}>
                          <Ionicons name="pencil" size={18} color={NAVY} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.rowActionButton} onPress={handleDeleteStudent}>
                          <Ionicons name="trash" size={18} color={RED} />
                        </TouchableOpacity>
                      </View>
                    )}
                    <View style={styles.statusBtnsRow}>
                      <TouchableOpacity
                        style={[styles.circleBtn, item.status === 'present' && styles.circleBtnPresent, item.status === null && styles.circleBtnUnselected]}
                        onPress={() => handleAttendance(item.roll, 'present')}
                        activeOpacity={0.8}
                      >
                        <Text style={[styles.circleBtnText, item.status === 'present' && styles.circleBtnTextActive, item.status === null && styles.circleBtnTextUnselected]}>P</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[styles.circleBtn, item.status === 'absent' && styles.circleBtnAbsent, item.status === null && styles.circleBtnUnselected]}
                        onPress={() => handleAttendance(item.roll, 'absent')}
                        activeOpacity={0.8}
                      >
                        <Text style={[styles.circleBtnText, item.status === 'absent' && styles.circleBtnTextActive, item.status === null && styles.circleBtnTextUnselected]}>A</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
          scrollEnabled={false}
        />
        {/* Submit Section */}
        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.submitBtnText}>Confirm & Submit Attendance</Text>
          )}
        </TouchableOpacity>
      </ScrollView>

      {/* Edit Student Modal */}
      <Modal
        visible={showEditStudentModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowEditStudentModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Student</Text>
            
            <Text style={styles.inputLabel}>Roll Number</Text>
            <TextInput
              style={[styles.input, { backgroundColor: '#f0f0f0' }]}
              value={editingStudent?.roll.toString()}
              editable={false} // Roll number is not editable
            />
            
            <Text style={styles.inputLabel}>Student Name</Text>
            <TextInput
              style={styles.input}
              value={editingStudent?.name}
              onChangeText={(text) => setEditingStudent(prev => prev ? { ...prev, name: text } : null)}
              placeholder="Enter student name"
              placeholderTextColor="#999"
            />
            
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowEditStudentModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalButton, styles.addButton]}
                onPress={handleUpdateStudent}
              >
                <Text style={styles.addButtonText}>Update</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Add Student Modal */}
      <Modal
        visible={showAddStudentModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowAddStudentModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Student</Text>
            
            <Text style={styles.inputLabel}>Roll Number</Text>
            <TextInput
              style={styles.input}
              value={newStudent.roll}
              onChangeText={(text) => setNewStudent({...newStudent, roll: text})}
              placeholder="Enter roll number"
              keyboardType="number-pad"
              placeholderTextColor="#999"
            />
            
            <Text style={styles.inputLabel}>Student Name</Text>
            <TextInput
              style={styles.input}
              value={newStudent.name}
              onChangeText={(text) => setNewStudent({...newStudent, name: text})}
              placeholder="Enter student name"
              placeholderTextColor="#999"
            />
            
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowAddStudentModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalButton, styles.addButton]}
                onPress={handleAddStudent}
              >
                <Text style={styles.addButtonText}>Add Student</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Header and Summary Cards
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 18,
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  pageTitle: {
    color: '#111',
    fontWeight: 'bold',
    fontSize: 20,
    flex: 1,
    textAlign: 'left',
    marginLeft: 16,
    flexShrink: 1,
  },
  backArrow: {
    padding: 6,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 8,
    marginBottom: 18,
    alignItems: 'center',
  },
  summaryCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 14,
    alignItems: 'center',
    marginHorizontal: 6,
    paddingVertical: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    minWidth: 90,
    minHeight: 110,
    justifyContent: 'center',
  },
  summaryNumberTotal: {
    color: NAVY,
    fontWeight: 'bold',
    fontSize: 32,
  },
  summaryNumberGreen: {
    color: GREEN,
    fontWeight: 'bold',
    fontSize: 32,
  },
  summaryNumberRed: {
    color: RED,
    fontWeight: 'bold',
    fontSize: 32,
  },
  totalLabel: {
    color: '#111',
    fontSize: 16,
    fontWeight: '500',
    marginTop: 2,
  },

  // Date and Subject Section
  calendarSection: {
    marginHorizontal: 18,
    marginBottom: 18,
  },
  section: {
    marginBottom: 16,
  },
  sectionLabel: {
    color: '#111',
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 4,
  },
  calendarBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 8,
  },
  calendarBtnText: {
    color: NAVY,
    fontWeight: '600',
    fontSize: 15,
  },
  subjectHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    justifyContent: 'space-between',
  },
  subjectDropdownText: {
    color: NAVY,
    fontWeight: '600',
    fontSize: 15,
    flex: 1,
  },
  subjectDropdownList: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginTop: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  subjectDropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  subjectDropdownItemText: {
    color: NAVY,
    fontSize: 15,
    fontWeight: '500',
  },

  // Student List
  studentDetailsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 12,
    marginHorizontal: 18,
    paddingBottom: 8,
  },
  studentDetailsLabel: {
    color: '#111',
    fontWeight: 'bold',
    fontSize: 18,
  },
  addStudentBtn: {
    padding: 4,
  },
  listHeaderRow: {
    flexDirection: 'row',
    paddingHorizontal: 18,
    paddingVertical: 8,
    backgroundColor: '#f3f4f6',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginHorizontal: 12,
    marginBottom: 2,
  },
  listHeaderColRoll: {
    width: 60,
    color: NAVY,
    fontWeight: 'bold',
    fontSize: 13,
  },
  listHeaderColName: {
    flex: 1,
    color: NAVY,
    fontWeight: 'bold',
    fontSize: 13,
    marginLeft: 14,
  },
  listHeaderColStatus: {
    width: 90,
    color: NAVY,
    fontWeight: 'bold',
    fontSize: 13,
    textAlign: 'center',
  },
  studentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1',
    marginHorizontal: 12,
    backgroundColor: '#fff',
  },
  selectedStudentRow: {
    backgroundColor: '#E3EDFF',
    borderColor: NAVY,
    borderWidth: 1.5,
  },
  studentRoll: {
    width: 60,
    color: '#111',
    fontWeight: '600',
    fontSize: 15,
  },
  studentName: {
    flex: 1,
    color: '#111',
    fontSize: 15,
    fontWeight: '500',
    marginLeft: 14,
  },
  rightContainer: {
    flexDirection: 'column',
  },
  rowActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 4,
  },
  rowActionButton: {
    padding: 6,
  },
  statusBtnsRow: {
    width: 90,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleBtn: {
    minWidth: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: NAVY,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
  },
  circleBtnPresent: {
    backgroundColor: GREEN,
    borderColor: GREEN,
  },
  circleBtnAbsent: {
    backgroundColor: RED,
    borderColor: RED,
  },
  circleBtnUnselected: {
    backgroundColor: '#fff',
    borderColor: NAVY,
  },
  circleBtnText: {
    fontWeight: 'bold',
    fontSize: 13,
  },
  circleBtnTextActive: {
    color: '#fff',
  },
  circleBtnTextUnselected: {
    color: '#111',
  },

  // Submit Button
  submitBtn: {
    backgroundColor: NAVY,
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: 'center',
    marginHorizontal: 18,
    marginTop: 18,
    marginBottom: 30,
  },
  submitBtnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },

  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    width: '100%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: NAVY,
    textAlign: 'center',
  },
  inputLabel: {
    fontSize: 14,
    color: NAVY,
    marginBottom: 6,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    color: '#333',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    marginLeft: 10,
    minWidth: 100,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
  },
  addButton: {
    backgroundColor: NAVY,
  },
  cancelButtonText: {
    color: '#555',
    fontWeight: '500',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '500',
  },
}); 