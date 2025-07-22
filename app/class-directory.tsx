import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const initialClasses = [
  {
    id: 1,
    educationalLevel: 'Play Group',
    subject: 'Story Time',
    day: 'Monday',
    startTime: '09:00',
    endTime: '09:30',
    teacherName: 'Ms. Smith',
    color: '#3b82f6',
  },
  {
    id: 2,
    educationalLevel: 'Pre KG',
    subject: 'Mathematics',
    day: 'Tuesday',
    startTime: '10:00',
    endTime: '10:45',
    teacherName: 'Mr. Kumar',
    color: '#22c55e',
  },
  {
    id: 3,
    educationalLevel: 'Junior KG',
    subject: 'Art & Craft',
    day: 'Wednesday',
    startTime: '11:00',
    endTime: '11:45',
    teacherName: '',
    color: '#f97316',
  },
  {
    id: 4,
    educationalLevel: 'Senior KG',
    subject: 'Music',
    day: 'Thursday',
    startTime: '12:00',
    endTime: '12:45',
    teacherName: 'Ms. Lee',
    color: '#8b5cf6',
  },
];

interface ClassItem {
  id: number;
  educationalLevel: string;
  subject: string;
  day: string;
  startTime: string;
  endTime: string;
  teacherName: string;
  color: string;
}

export default function ClassDirectoryScreen() {
  const [classes, setClasses] = useState<ClassItem[]>(initialClasses);

  const handleEdit = (cls: ClassItem) => {
    router.push({ pathname: '/edit-class', params: { classId: cls.id } });
  };

  const handleDelete = (cls: ClassItem) => {
    Alert.alert(
      'Delete Class',
      `Are you sure you want to delete ${cls.subject} (${cls.educationalLevel})?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => setClasses(prev => prev.filter(c => c.id !== cls.id)) },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Class Directory</Text>
      <FlatList
        data={classes}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={[styles.classCard, { borderLeftColor: item.color }]}> 
            <View style={styles.classInfo}>
              <Text style={styles.level}>{item.educationalLevel}</Text>
              <Text style={styles.subject}>{item.subject}</Text>
              <Text style={styles.time}>{item.day} • {item.startTime} - {item.endTime}</Text>
              <Text style={styles.teacher}>Teacher: {item.teacherName}</Text>
            </View>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => handleEdit(item)}>
                <Ionicons name="pencil" size={22} color="#4f46e5" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(item)}>
                <Ionicons name="trash" size={22} color="#ef4444" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No classes found.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white', padding: 16 },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 16, textAlign: 'center', color: '#1e3a8a' },
  classCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    marginBottom: 12,
    padding: 16,
    borderLeftWidth: 6,
  },
  classInfo: { flex: 1 },
  level: { fontWeight: 'bold', color: '#374151' },
  subject: { fontSize: 16, color: '#1e3a8a', marginVertical: 2 },
  time: { color: '#6b7280' },
  teacher: { color: '#22c55e', marginTop: 2 },
  actions: { flexDirection: 'row', gap: 16 },
  emptyText: { textAlign: 'center', color: '#9ca3af', marginTop: 40 },
}); 