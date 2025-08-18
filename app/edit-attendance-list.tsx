import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import { supabase } from './supabaseClient';

const NAVY = '#001F54';

interface AttendanceRecord {
  date: string;
  educational_level: string;
  subject: string;
}

export default function EditAttendanceList() {
  const router = useRouter();
  const { educationalLevel } = useLocalSearchParams<{ educationalLevel: string }>();
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState<AttendanceRecord | null>(null);
  const [expandedRecord, setExpandedRecord] = useState<AttendanceRecord | null>(null);

  const handleEdit = (record: AttendanceRecord) => {
    router.push({
      pathname: '/edit-attendance',
      params: {
        date: record.date,
        educational_level: record.educational_level,
        subject: record.subject,
      },
    });
  };

  const handleDelete = (record: AttendanceRecord) => {
    setRecordToDelete(record);
    setModalVisible(true);
  };

  const confirmDelete = async () => {
    if (!recordToDelete) return;

    const { error } = await supabase
      .from('attendance')
      .delete()
      .match({
        date: recordToDelete.date,
        educational_level: recordToDelete.educational_level,
        subject: recordToDelete.subject,
      });

    if (error) {
      console.error('Error deleting record:', error);
    } else {
      setRecords(
        records.filter(
          (r) =>
            !(
              r.date === recordToDelete.date &&
              r.educational_level === recordToDelete.educational_level &&
              r.subject === recordToDelete.subject
            )
        )
      );
    }
    setModalVisible(false);
    setRecordToDelete(null);
    setExpandedRecord(null); // Collapse the item after deletion
  };

  const cancelDelete = () => {
    setModalVisible(false);
    setRecordToDelete(null);
  };

  useEffect(() => {
    const fetchRecords = async () => {
      if (!educationalLevel) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('attendance')
        .select('date, educational_level, subject')
        .eq('educational_level', educationalLevel)
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
  }, [educationalLevel]);

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
            onPress={() => router.push({ pathname: '/class-attendance', params: { initialView: 'levels' } })}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="arrow-back" size={28} color={'#111'} />
          </TouchableOpacity>
          <Text style={styles.pageTitle}>Saved Attendance Records</Text>
        </View>
        <View style={styles.listSection}>
          {records.length === 0 ? (
            <Text style={styles.emptyText}>No attendance records found.</Text>
          ) : (
            records.map((record, index) => {
              const isExpanded =
                expandedRecord &&
                expandedRecord.date === record.date &&
                expandedRecord.subject === record.subject;
              return (
                <View key={index} style={styles.recordItem}>
                  <TouchableOpacity
                    style={styles.subjectBtn}
                    onPress={() => setExpandedRecord(isExpanded ? null : record)}
                    activeOpacity={0.8}
                  >
                    {isExpanded && (
                      <View style={styles.iconsContainer}>
                        <TouchableOpacity onPress={() => handleEdit(record)} style={styles.iconButton}>
                          <Ionicons name="pencil-outline" size={22} color="#fff" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleDelete(record)} style={styles.iconButton}>
                          <Ionicons name="trash-outline" size={22} color="#fff" />
                        </TouchableOpacity>
                      </View>
                    )}
                    <Text style={styles.subjectBtnText}>{`${record.date} - ${record.educational_level} - ${record.subject}`}</Text>
                  </TouchableOpacity>
                </View>
              );
            })
          )}
        </View>
      </ScrollView>
      <DeleteConfirmationModal
        visible={modalVisible}
        onCancel={cancelDelete}
        onConfirm={confirmDelete}
      />
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
  recordItem: {
    marginBottom: 16,
  },
  subjectBtn: {
    backgroundColor: NAVY,
    borderRadius: 8,
    padding: 18,
    alignItems: 'center',
  },
  iconsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 8,
  },
  iconButton: {
    marginLeft: 16,
    padding: 4,
  },
  subjectBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    width: '100%',
  },
  emptyText: {
    color: '#888',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 32,
  },
});
