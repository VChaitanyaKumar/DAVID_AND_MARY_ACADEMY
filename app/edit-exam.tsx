import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { supabase } from './supabaseClient';

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

export default function EditExamScreen() {
  const params = useLocalSearchParams();
  const exam = JSON.parse(params.exam as string) as Exam;

  const [subject, setSubject] = useState(exam.subject);
  const [examName, setExamName] = useState(exam.exam_name);
  const [examType, setExamType] = useState(exam.exam_type);
  const [examDate, setExamDate] = useState(new Date(exam.exam_date));
  const [examTime, setExamTime] = useState(new Date(`1970-01-01T${exam.exam_time}Z`));
  const [duration, setDuration] = useState(exam.duration.toString());
  const [notes, setNotes] = useState(exam.notes);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleUpdateExam = async () => {
    if (!subject || !examName || !examType || !duration) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }

    try {
      const { error } = await supabase
        .from('exams')
        .update({
          subject,
          exam_name: examName,
          exam_type: examType,
          exam_date: examDate.toISOString().split('T')[0],
          exam_time: examTime.toTimeString().split(' ')[0],
          duration: parseFloat(duration),
          notes,
        })
        .eq('id', exam.id);

      if (error) {
        throw error;
      }

      Alert.alert('Success', 'Exam updated successfully!');
      router.back();
    } catch (err) {
      console.error('Error updating exam:', err);
      Alert.alert('Error', 'Failed to update exam. Please try again.');
    }
  };

  const handleBack = () => {
    router.back();
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setExamDate(selectedDate);
    }
  };

  const onTimeChange = (event: any, selectedTime?: Date) => {
    setShowTimePicker(false);
    if (selectedTime) {
      setExamTime(selectedTime);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#374151" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Exam</Text>
        <TouchableOpacity style={styles.saveButton} onPress={handleUpdateExam}>
          <Ionicons name="checkmark" size={24} color="#3b82f6" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Educational Level */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Educational Level</Text>
          <View style={styles.levelSelector}>
            <View
              key={exam.educational_level}
              style={[styles.levelButton, styles.selectedLevelButton]}
            >
              <Text style={[styles.levelButtonText, styles.selectedLevelButtonText]}>
                {exam.educational_level}
              </Text>
            </View>
          </View>
        </View>

        {/* Subject */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Subject</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter subject"
            placeholderTextColor="#9ca3af"
            value={subject}
            onChangeText={setSubject}
          />
        </View>

        {/* Exam Name */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Exam Name</Text>
          <TextInput
            style={styles.textInput}
            placeholder="e.g., Final Exam - Algebra"
            placeholderTextColor="#9ca3af"
            value={examName}
            onChangeText={setExamName}
          />
        </View>

        {/* Exam Type */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Exam Type</Text>
          <TextInput
            style={styles.textInput}
            placeholder="e.g., Final, Midterm, Quiz"
            placeholderTextColor="#9ca3af"
            value={examType}
            onChangeText={setExamType}
          />
        </View>

        {/* Exam Date */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Exam Date</Text>
          <TouchableOpacity 
            style={styles.dateInput}
            onPress={() => setShowDatePicker(true)}
          >
            <Ionicons name="calendar" size={20} color="#9ca3af" />
            <Text style={styles.dateText}>
              {formatDate(examDate)}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Exam Time */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Exam Time</Text>
          <TouchableOpacity 
            style={styles.timeInput}
            onPress={() => setShowTimePicker(true)}
          >
            <Ionicons name="time" size={20} color="#9ca3af" />
            <Text style={styles.timeText}>
              {formatTime(examTime)}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Duration */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Duration</Text>
          <View style={styles.durationContainer}>
            <TextInput
              style={[styles.textInput, styles.durationInput]}
              placeholder="2.5"
              placeholderTextColor="#9ca3af"
              value={duration}
              onChangeText={setDuration}
              keyboardType="numeric"
            />
            <Text style={styles.durationUnit}>hours</Text>
          </View>
        </View>

        {/* Add Notes */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Add Notes (Optional)</Text>
          <TextInput
            style={[styles.textInput, styles.textArea]}
            placeholder="Enter any additional notes..."
            placeholderTextColor="#9ca3af"
            value={notes}
            onChangeText={setNotes}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveExamButton} onPress={handleUpdateExam}>
          <Text style={styles.saveExamButtonText}>Update Exam</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Date Picker Modal */}
      {showDatePicker && (
        <DateTimePicker
          value={examDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onDateChange}
        />
      )}

      {/* Time Picker Modal */}
      {showTimePicker && (
        <DateTimePicker
          value={examTime}
          mode="time"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onTimeChange}
        />
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#374151',
  },
  saveButton: {
    padding: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
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
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: 'white',
  },
  dateText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#374151',
  },
  timeInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: 'white',
  },
  timeText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#374151',
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  durationInput: {
    flex: 1,
    marginRight: 8,
  },
  durationUnit: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '500',
  },
  saveExamButton: {
    backgroundColor: '#1e3a8a',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 40,
  },
  saveExamButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  levelSelector: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    padding: 4,
  },
  levelButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  levelButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  selectedLevelButton: {
    backgroundColor: '#3b82f6',
  },
  selectedLevelButtonText: {
    color: 'white',
  },
});
