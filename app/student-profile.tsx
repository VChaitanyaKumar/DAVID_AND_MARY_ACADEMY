import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams, useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Student } from './data/students';
import { supabase } from './supabaseClient';

const DetailRow = ({ label, value }: { label: string; value?: string | number | string[] }) => {
  if (!value) return null;
  return (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{Array.isArray(value) ? value.join(', ') : value}</Text>
    </View>
  );
};

const ProfileSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {children}
  </View>
);

export default function StudentProfileScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

      useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const fetchStudent = async () => {
        if (!id) return;
        setLoading(true);

        const { data, error } = await supabase
          .from('students')
          .select('id, first_name, last_name, date_of_birth, gender, photo_url, educational_level, section, roll_number, father_name, father_phone_number, mother_name, mother_phone_number, current_address')
          .eq('id', id)
          .single();

        if (!isActive) return;

        if (error) {
          console.error('Error fetching student:', error);
          setError('Failed to fetch student details.');
        } else if (data) {
          const age = data.date_of_birth
            ? new Date().getFullYear() - new Date(data.date_of_birth).getFullYear()
            : 0;

          const formattedStudent = {
            id: data.id,
            firstName: data.first_name,
            lastName: data.last_name,
            dateOfBirth: data.date_of_birth,
            gender: data.gender,
            photoUrl: data.photo_url,
            educationalLevel: data.educational_level,
            section: data.section,
            rollNumber: data.roll_number,
            fatherName: data.father_name,
            fatherPhoneNumber: data.father_phone_number,
            motherName: data.mother_name,
            motherPhoneNumber: data.mother_phone_number,
            currentAddress: data.current_address,
            age,
          } as Student;
          setStudent(formattedStudent);
          setError(null);
        }
        setLoading(false);
      };

      fetchStudent();

      return () => {
        isActive = false;
      };
    }, [id])
  );

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#1e3a8a" />
      </SafeAreaView>
    );
  }

  if (error || !student) {
    return (
      <SafeAreaView style={[styles.container, styles.center]}>
        <Text style={styles.errorText}>{error || 'Student not found.'}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#1e3a8a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Student Profile</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.profileHeader}>
          <Image
            source={{ uri: student.photoUrl || 'https://via.placeholder.com/100' }}
            style={styles.avatar}
          />
          <Text style={styles.studentName}>{`${student.firstName} ${student.lastName}`}</Text>
          <Text style={styles.studentId}>
            {student.educationalLevel} | Roll No: {student.rollNumber}
          </Text>
        </View>
        <ProfileSection title="Personal Details">
          <DetailRow label="Date of Birth" value={student.dateOfBirth} />
          <DetailRow label="Age" value={student.age} />
          <DetailRow label="Gender" value={student.gender} />
          <DetailRow label="Nationality" value={student.nationality} />
          <DetailRow label="Religion" value={student.religion} />
          <DetailRow label="Blood Group" value={student.bloodGroup} />
          <DetailRow label="Aadhar Number" value={student.aadharNumber} />
        </ProfileSection>

        <ProfileSection title="Contact Details">
          <DetailRow label="Current Address" value={student.currentAddress} />
          <DetailRow label="Phone Number" value={student.studentPhoneNumber} />
          <DetailRow label="Email" value={student.studentEmail} />
        </ProfileSection>

        <ProfileSection title="Parent/Guardian Details">
          <DetailRow label="Father's Name" value={student.fatherName} />
          <DetailRow label="Father's Phone" value={student.fatherPhoneNumber} />
          <DetailRow label="Mother's Name" value={student.motherName} />
          <DetailRow label="Mother's Phone" value={student.motherPhoneNumber} />
        </ProfileSection>
        
        <ProfileSection title="Academic Details">
          <DetailRow label="Educational Level" value={student.educationalLevel} />
          <DetailRow label="Section" value={student.section} />
          <DetailRow label="Roll Number" value={student.rollNumber} />
          <DetailRow label="Admission Date" value={student.admissionDate} />
          <DetailRow label="Status" value={student.status} />
        </ProfileSection>

        <ProfileSection title="Emergency Contact">
          <DetailRow label="Name" value={student.emergencyContactName} />
          <DetailRow label="Phone Number" value={student.emergencyContactNumber} />
          <DetailRow label="Relationship" value={student.emergencyContactRelationship} />
        </ProfileSection>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  profilePhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 10,
    borderWidth: 3,
    borderColor: '#1e3a8a',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#ef4444',
  },
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  backButton: { padding: 8 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#1e3a8a' },
  headerRight: { width: 40 },
  scrollContent: { paddingBottom: 20 },
  profileHeader: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
  },
  studentName: { fontSize: 22, fontWeight: 'bold', color: '#1f2937' },
  studentId: { fontSize: 16, color: '#6b7280', marginTop: 4 },
  section: {
    marginTop: 16,
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 16,
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingBottom: 8,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  detailLabel: { fontSize: 15, color: '#6b7280', flex: 1 },
  detailValue: { fontSize: 15, color: '#1f2937', fontWeight: '500', flex: 1, textAlign: 'right' },
});
