import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, StatusBar, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';

export default function AddClassScreen() {
  const [subject, setSubject] = useState('');
  const [day, setDay] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [teacherName, setTeacherName] = useState('');
  const [selectedColor, setSelectedColor] = useState('#3b82f6');
  const [educationalLevel, setEducationalLevel] = useState('Play Group');

  // Get educational level from route params
  const params = useLocalSearchParams();
  const routeEducationalLevel = params?.educationalLevel as string || 'Play Group';

  // Set educational level from route params
  useEffect(() => {
    if (routeEducationalLevel) {
      setEducationalLevel(routeEducationalLevel);
    }
  }, [routeEducationalLevel]);

  const colors = [
    '#3b82f6', '#22c55e', '#f97316', '#ef4444', '#8b5cf6', '#fbbf24',
  ];

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const educationalLevels = ['Play Group', 'Pre KG', 'Junior KG', 'Senior KG'];

  const handleSaveClass = () => {
    // Validate required fields
    if (!subject || !day || !startTime || !endTime) {
      alert('Please fill in all required fields');
      return;
    }
    
    console.log('Saving class:', { 
      educationalLevel, 
      subject, 
      day, 
      startTime, 
      endTime, 
      teacherName, 
      selectedColor 
    });
    router.back();
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleCancel}>
          <Ionicons name="arrow-back" size={24} color="#374151" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Class</Text>
        <View style={styles.placeholder} />
      </View>

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

        {/* Information Box */}
        <View style={styles.infoCard}>
          <View style={styles.infoHeader}>
            <View style={styles.infoIcon}>
              <Ionicons name="information-circle" size={20} color="white" />
            </View>
            <Text style={styles.infoTitle}>Class Information</Text>
          </View>
          <Text style={styles.infoText}>
            Choose a color to easily identify your class in the timetable. All fields except teacher name are required.
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.saveButton} onPress={handleSaveClass}>
            <Ionicons name="save" size={20} color="white" />
            <Text style={styles.saveButtonText}>Save Class</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>

          {/* Edit Class Button */}
          <TouchableOpacity style={styles.editButton} onPress={() => router.push({ pathname: '/edit-class' as any, params: { educationalLevel } })}>
            <Ionicons name="create" size={20} color="white" />
            <Text style={styles.editButtonText}>Edit Class</Text>
          </TouchableOpacity>

          {/* Delete Class Button */}
          <TouchableOpacity style={styles.deleteButton} onPress={() => router.push({ pathname: '/delete-class' as any, params: { educationalLevel } })}>
            <Ionicons name="trash" size={20} color="white" />
            <Text style={styles.deleteButtonText}>Delete Class</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    paddingTop: 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#374151',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  formCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  fieldContainer: {
    marginBottom: 20,
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
  fieldLabel: {
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
    backgroundColor: 'white',
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  timeField: {
    flex: 0.48,
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginTop: 8,
    gap: 12,
  },
  colorCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginBottom: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedColor: {
    borderColor: '#374151',
  },
  infoCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#374151',
  },
  infoText: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
  buttonContainer: {
    gap: 12,
    marginBottom: 100,
  },
  saveButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  cancelButton: {
    backgroundColor: 'white',
    borderRadius: 12,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: '#d1d5db',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#6b7280',
    fontSize: 16,
    fontWeight: '500',
  },
  editButton: {
    backgroundColor: '#4f46e5',
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  editButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  deleteButton: {
    backgroundColor: '#ef4444',
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
}); 