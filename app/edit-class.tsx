import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, StatusBar, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

// Restore initialClasses and previous flat class list logic
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

const colors = [
  '#3b82f6', '#22c55e', '#f97316', '#ef4444', '#8b5cf6', '#fbbf24',
];

const educationalLevels = ['Play Group', 'Pre KG', 'Junior KG', 'Senior KG'];

// Add a type for class objects
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

export default function EditClassScreen() {
  const [classes, setClasses] = useState<ClassItem[]>(initialClasses);
  const [editMode, setEditMode] = useState(false);
  const [editingClass, setEditingClass] = useState<ClassItem | null>(null);

  // Form state
  const [educationalLevel, setEducationalLevel] = useState('Play Group');
  const [subject, setSubject] = useState('');
  const [day, setDay] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [teacherName, setTeacherName] = useState('');
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  const handleEdit = (cls: ClassItem) => {
    setEditMode(true);
    setEditingClass(cls);
    setEducationalLevel(cls.educationalLevel);
    setSubject(cls.subject);
    setDay(cls.day);
    setStartTime(cls.startTime);
    setEndTime(cls.endTime);
    setTeacherName(cls.teacherName);
    setSelectedColor(cls.color);
  };

  const handleSave = () => {
    if (!subject || !day || !startTime || !endTime) {
      Alert.alert('Validation', 'Please fill in all required fields');
      return;
    }
    if (!editingClass) return;
    const updatedClass: ClassItem = {
      ...editingClass,
      educationalLevel,
      subject,
      day,
      startTime,
      endTime,
      teacherName,
      color: selectedColor,
    };
    setClasses((prev) => prev.map((cls: ClassItem) => (cls.id === updatedClass.id ? updatedClass : cls)));
    setEditMode(false);
    setEditingClass(null);
    Alert.alert('Success', 'Class updated successfully');
  };

  const handleCancel = () => {
    if (editMode) {
      setEditMode(false);
      setEditingClass(null);
    } else {
      router.back();
    }
  };

  // --- UI ---
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleCancel}>
          <Ionicons name="arrow-back" size={24} color="#374151" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{editMode ? 'Edit Class' : 'Edit Classes'}</Text>
        <View style={styles.placeholder} />
      </View>
      {!editMode ? (
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {educationalLevels.map((level) => (
            <View key={level} style={{ marginBottom: 24 }}>
              <Text style={styles.levelSectionHeader}>{level}</Text>
              {classes.filter(cls => cls.educationalLevel === level).length === 0 ? (
                <Text style={styles.emptyStateText}>No classes for {level}</Text>
              ) : (
                classes.filter(cls => cls.educationalLevel === level).map((cls: ClassItem) => (
                  <View key={cls.id} style={styles.classCard}>
                    <View style={styles.classInfoRow}>
                      <View style={[styles.classIcon, { backgroundColor: cls.color }]}> 
                        <Ionicons name="school" size={20} color="white" />
                      </View>
                      <View style={styles.classTextInfo}>
                        <Text style={styles.classTitle}>{cls.subject}</Text>
                        <Text style={styles.classSubtitle}>{cls.day} • {cls.startTime}-{cls.endTime}</Text>
                      </View>
                      <TouchableOpacity style={styles.editIconBtn} onPress={() => handleEdit(cls)}>
                        <Ionicons name="pencil" size={20} color="#4f46e5" />
                      </TouchableOpacity>
                    </View>
                  </View>
                ))
              )}
            </View>
          ))}
        </ScrollView>
      ) : (
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Main Form Card */}
          <View style={styles.formCard}>
            {/* Educational Level Field */}
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Educational Level</Text>
              <View style={styles.levelSelector}>
                {educationalLevels.map((level) => (
                  <TouchableOpacity
                    key={level}
                    style={[
                      styles.levelButton,
                      educationalLevel === level && styles.selectedLevelButton
                    ]}
                    onPress={() => setEducationalLevel(level)}
                  >
                    <Text style={[
                      styles.levelButtonText,
                      educationalLevel === level && styles.selectedLevelButtonText
                    ]}>
                      {level}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            {/* Subject Field */}
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Subject</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Enter subject name"
                value={subject}
                onChangeText={setSubject}
              />
            </View>
            {/* Day Field */}
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Day</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Select day"
                value={day}
                onChangeText={setDay}
              />
            </View>
            {/* Time Fields */}
            <View style={styles.timeContainer}>
              <View style={styles.timeField}>
                <Text style={styles.fieldLabel}>Start Time</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="09:00"
                  value={startTime}
                  onChangeText={setStartTime}
                />
              </View>
              <View style={styles.timeField}>
                <Text style={styles.fieldLabel}>End Time</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="10:30"
                  value={endTime}
                  onChangeText={setEndTime}
                />
              </View>
            </View>
            {/* Teacher Name Field */}
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Teacher Name (Optional)</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Enter teacher name"
                value={teacherName}
                onChangeText={setTeacherName}
              />
            </View>
            {/* Color Selection */}
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Color</Text>
              <View style={styles.colorGrid}>
                {colors.map((color, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.colorCircle,
                      { backgroundColor: color },
                      selectedColor === color && styles.selectedColor
                    ]}
                    onPress={() => setSelectedColor(color)}
                  >
                    {selectedColor === color && (
                      <Ionicons name="checkmark" size={16} color="white" />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
          {/* Save Button */}
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Ionicons name="save" size={20} color="white" />
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

// ... (reuse styles from Add Class or define similar styles here)

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
    flex: 1,
    textAlign: 'center',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  classCard: {
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
    padding: 16,
  },
  classInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  classIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  classTextInfo: {
    flex: 1,
  },
  classTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  classSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
  },
  editIconBtn: {
    padding: 8,
  },
  formCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  levelSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  levelButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d1d5db',
    backgroundColor: 'white',
  },
  selectedLevelButton: {
    backgroundColor: '#1e3a8a',
    borderColor: '#1e3a8a',
  },
  levelButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
  },
  selectedLevelButtonText: {
    color: 'white',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    color: '#374151',
    backgroundColor: 'white',
  },
  timeContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  timeField: {
    flex: 1,
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  colorCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedColor: {
    borderWidth: 2,
    borderColor: '#1e3a8a',
  },
  saveButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 16,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  levelSectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 12,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 10,
  },
  daySectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 8,
  },
}); 