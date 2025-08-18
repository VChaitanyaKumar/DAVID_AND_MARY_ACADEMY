import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { supabase } from './supabaseClient';

const NAVY = '#001F54';

interface AttendanceRecord {
  date: string;
  educational_level: string;
  subject: string;
}

export default function EditAttendanceList() {
  const router = useRouter();
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecords = async () => {
      const { data, error } = await supabase
        .from('attendance')
        .select('date, educational_level, subject')
        .order('date', { ascending: false });

      if (error) {
        console.error('Error fetching attendance records:', error);
      } else {
        // Deduplicate records
        const uniqueRecords = data.reduce((acc: AttendanceRecord[], current) => {
          if (!acc.some(item => item.date === current.date && item.educational_level === current.educational_level && item.subject === current.subject)) {
            acc.push(current);
          }
          return acc;
        }, []);
        setRecords(uniqueRecords);
      }
      setLoading(false);
    };

    fetchRecords();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={NAVY} />
      </SafeAreaView>
    );
  }

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
          {records.length === 0 ? (
            <Text style={styles.emptyText}>No attendance records found.</Text>
          ) : (
            records.map((record, index) => (
              <TouchableOpacity
                key={index}
                style={styles.subjectBtn}
                onPress={() => router.push({ pathname: '/edit-attendance', params: { date: record.date, educational_level: record.educational_level, subject: record.subject } })}
              >
                <Text style={styles.subjectBtnText}>{`${record.date} - ${record.educational_level} - ${record.subject}`}</Text>
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
