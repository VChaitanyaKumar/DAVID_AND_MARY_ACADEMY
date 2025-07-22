import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { AttendanceContext } from './attendance-context';

const NAVY = '#001F54';

export default function EditAttendanceList() {
  const router = useRouter();
  const { savedAttendanceBySubject } = useContext(AttendanceContext);
  const subjects = Object.keys(savedAttendanceBySubject);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 24 }}>
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={styles.backArrow}
            onPress={() => router.back()}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="arrow-back" size={28} color={'#111'} />
          </TouchableOpacity>
          <Text style={styles.pageTitle}>Edit Attendance Records</Text>
        </View>
        <View style={styles.listSection}>
          {subjects.length === 0 ? (
            <Text style={styles.emptyText}>No attendance records found.</Text>
          ) : (
            subjects.map(subject => (
              <TouchableOpacity
                key={subject}
                style={styles.subjectBtn}
                onPress={() => router.push({ pathname: '/edit-attendance', params: { subject } })}
              >
                <Text style={styles.subjectBtnText}>{subject}</Text>
              </TouchableOpacity>
            ))
          )}
        </View>
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
  listSection: {
    marginTop: 24,
    paddingHorizontal: 18,
  },
  subjectBtn: {
    backgroundColor: NAVY,
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 18,
    marginBottom: 16,
    alignItems: 'center',
  },
  subjectBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  emptyText: {
    color: '#888',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 32,
  },
}); 