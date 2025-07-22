import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, SafeAreaView, ScrollView, Platform, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';
import { AttendanceContext } from './attendance-context';
import { useLocalSearchParams } from 'expo-router';

const NAVY = '#001F54';
const GREEN = '#16a34a';
const RED = '#dc2626';

const SUBJECTS = [
  'Basic of Geometry Class',
  'English Language',
  'Science',
  'Mathematics',
];

export default function EditAttendance() {
  const router = useRouter();
  const { savedAttendanceBySubject, setSavedAttendanceBySubject } = useContext(AttendanceContext);
  const { subject } = useLocalSearchParams();
  const attendanceRecord = subject && typeof subject === 'string' ? savedAttendanceBySubject[subject] : undefined;

  const [date, setDate] = useState(attendanceRecord?.date || new Date());
  const [showDate, setShowDate] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(attendanceRecord?.selectedSubject || (typeof subject === 'string' ? subject : SUBJECTS[0]));
  const [subjectDropdown, setSubjectDropdown] = useState(false);
  // Full student list
  const ALL_STUDENTS = [
    { roll: 1, name: 'Emma Johnson' },
    { roll: 2, name: 'Liam Smith' },
    { roll: 3, name: 'Sophia Davis' },
    { roll: 4, name: 'Noah Wilson' },
    { roll: 5, name: 'Ava Brown' },
    { roll: 6, name: 'Oliver Taylor' },
    { roll: 7, name: 'Lucas Lee' },
    { roll: 8, name: 'Mia Kim' },
  ];

  // Merge saved statuses with all students
  const initialAttendance = ALL_STUDENTS.map(student => {
    const saved = attendanceRecord?.attendance?.find(s => s.roll === student.roll);
    return {
      ...student,
      status: saved?.status ?? null,
    };
  });

  const [attendance, setAttendance] = useState(initialAttendance);

  const presentCount = attendance.filter((s) => s.status === 'present').length;
  const absentCount = attendance.filter((s) => s.status === 'absent').length;

  const handleAttendance = (roll: number, status: 'present' | 'absent') => {
    setAttendance((prev) =>
      prev.map((s) =>
        s.roll === roll ? { ...s, status: status } : s
      )
    );
  };

  const handleSave = () => {
    if (typeof selectedSubject !== 'string') return;
    setSavedAttendanceBySubject(prev => ({
      ...prev,
      [selectedSubject]: { date, selectedSubject, attendance },
    }));
    Alert.alert('Attendance Updated', 'Student attendance has been updated successfully.', [
      { text: 'OK', onPress: () => router.back() }
    ]);
  };

  if (!attendanceRecord) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: '#888', fontSize: 18 }}>No attendance record found for this subject.</Text>
      </SafeAreaView>
    );
  }

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
          <Text style={styles.pageTitle} numberOfLines={1} ellipsizeMode="tail">Edit Attendance</Text>
        </View>
        {/* Total Card (Total number of students) */}
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 12, marginTop: 8 }}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryNumberTotal}>{attendance.length}</Text>
            <Text style={styles.totalLabel}>Total Students</Text>
          </View>
        </View>
        {/* Calendar and Subject Selection */}
        <View style={styles.calendarSection}>
          <Text style={styles.calendarLabel}>Date</Text>
          <TouchableOpacity style={styles.calendarBtn} onPress={() => setShowDate(true)}>
            <Ionicons name="calendar-outline" size={18} color={NAVY} style={{ marginRight: 6 }} />
            <Text style={styles.calendarBtnText}>{date.toLocaleDateString('en-GB')}</Text>
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
          <Text style={styles.subjectLabel}>Subject</Text>
          <View style={styles.subjectDropdownSection}>
            <TouchableOpacity
              style={styles.subjectDropdownBtn}
              onPress={() => setSubjectDropdown((v) => !v)}
            >
              <Text style={styles.subjectDropdownText}>{selectedSubject}</Text>
              <Ionicons name={subjectDropdown ? 'chevron-up' : 'chevron-down'} size={18} color={NAVY} />
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
        {/* Student Attendance List */}
        <Text style={styles.studentDetailsLabel}>Student Details</Text>
        <View style={styles.listHeaderRow}>
          <Text style={styles.listHeaderColRoll}>Roll No.</Text>
          <Text style={styles.listHeaderColName}>Student Name</Text>
          <Text style={styles.listHeaderColStatus}>Status</Text>
        </View>
        <FlatList
          data={attendance}
          keyExtractor={(item) => item.roll.toString()}
          renderItem={({ item }) => (
            <View style={styles.studentRow}>
              <Text style={styles.studentRoll}>{item.roll.toString().padStart(2, '0')}</Text>
              <Text style={styles.studentName}>{item.name}</Text>
              <View style={styles.statusBtnsRow}>
                <TouchableOpacity
                  style={[
                    styles.circleBtn,
                    item.status === 'present' && styles.circleBtnPresent,
                    item.status === null && styles.circleBtnUnselected,
                  ]}
                  onPress={() => handleAttendance(item.roll, 'present')}
                  activeOpacity={0.8}
                >
                  <Text style={[
                    styles.circleBtnText,
                    item.status === 'present' && styles.circleBtnTextActive,
                    item.status === null && styles.circleBtnTextUnselected,
                  ]}>P</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.circleBtn,
                    item.status === 'absent' && styles.circleBtnAbsent,
                    item.status === null && styles.circleBtnUnselected,
                  ]}
                  onPress={() => handleAttendance(item.roll, 'absent')}
                  activeOpacity={0.8}
                >
                  <Text style={[
                    styles.circleBtnText,
                    item.status === 'absent' && styles.circleBtnTextActive,
                    item.status === null && styles.circleBtnTextUnselected,
                  ]}>A</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          scrollEnabled={false}
        />
        {/* Save Section */}
        <TouchableOpacity style={styles.submitBtn} onPress={handleSave}>
          <Text style={styles.submitBtnText}>Save Changes</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 18,
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  backArrow: {
    padding: 6,
  },
  pageTitle: {
    color: '#111',
    fontWeight: 'bold',
    fontSize: 20,
    flex: 1,
    textAlign: 'center',
    flexShrink: 1,
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
    marginBottom: 0,
    textAlign: 'center',
  },
  totalLabel: {
    color: '#111',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 2,
  },
  calendarSection: {
    marginHorizontal: 18,
    marginBottom: 18,
  },
  calendarLabel: {
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
  subjectLabel: {
    color: '#111',
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 10,
    marginBottom: 4,
    textAlign: 'left',
  },
  subjectDropdownSection: {
    marginTop: 2,
  },
  subjectDropdownBtn: {
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
  studentDetailsLabel: {
    color: '#111',
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 0,
    marginBottom: 4,
    textAlign: 'center',
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
  statusBtnsRow: {
    width: 90,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleBtn: {
    width: 60,
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
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  circleBtnTextActive: {
    color: '#fff',
  },
  circleBtnTextUnselected: {
    color: '#111',
  },
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
}); 