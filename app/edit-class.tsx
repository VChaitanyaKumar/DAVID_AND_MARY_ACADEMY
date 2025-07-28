import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { supabase } from './supabaseClient';

export default function EditClassScreen() {
  const [subject, setSubject] = useState('');
  const [day, setDay] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [startTimePeriod, setStartTimePeriod] = useState('AM');
  const [endTimePeriod, setEndTimePeriod] = useState('AM');
  const [showStartDropdown, setShowStartDropdown] = useState(false);
  const [showEndDropdown, setShowEndDropdown] = useState(false);
  const [showDayDropdown, setShowDayDropdown] = useState(false);
  const [teacherName, setTeacherName] = useState('');
  const [selectedColor, setSelectedColor] = useState('#3b82f6');
  const [educationalLevel, setEducationalLevel] = useState('Play Group');
  const [isLoading, setIsLoading] = useState(false);
  const [classId, setClassId] = useState('');

  // Get class ID from route params
  const params = useLocalSearchParams();
  const routeClassId = params?.classId as string;

  // Fetch class data when component mounts
  useEffect(() => {
    if (routeClassId) {
      fetchClassData();
    }
  }, [routeClassId]);

  const fetchClassData = async () => {
    if (!routeClassId) return;
    
    try {
      const { data, error } = await supabase
        .from('classes')
        .select('*')
        .eq('id', routeClassId)
        .single();

      if (error) {
        console.error('Error fetching class:', error);
        Alert.alert('Error', 'Failed to load class data');
        return;
      }

      if (data) {
        setClassId(data.id);
        setSubject(data.subject);
        setDay(data.day);
        setTeacherName(data.teacher_name || '');
        setSelectedColor(data.color);
        setEducationalLevel(data.level);

        // Convert 24-hour format to 12-hour format for display
        const startTimeData = convertTo12Hour(data.start_time);
        const endTimeData = convertTo12Hour(data.end_time);
        
        setStartTime(startTimeData.time);
        setStartTimePeriod(startTimeData.period);
        setEndTime(endTimeData.time);
        setEndTimePeriod(endTimeData.period);
      }
    } catch (error) {
      console.error('Error fetching class:', error);
      Alert.alert('Error', 'Failed to load class data');
    }
  };

  const colors = [
    '#3b82f6', '#22c55e', '#f97316', '#ef4444', '#8b5cf6', '#fbbf24',
  ];

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const educationalLevels = ['Play Group', 'Pre KG', 'Junior KG', 'Senior KG'];
  const timePeriods = ['AM', 'PM'];

  const handlePeriodSelection = (period: string, isStartTime: boolean) => {
    if (isStartTime) {
      setStartTimePeriod(period);
      setShowStartDropdown(false);
    } else {
      setEndTimePeriod(period);
      setShowEndDropdown(false);
    }
  };

  const handleDaySelection = (selectedDay: string) => {
    setDay(selectedDay);
    setShowDayDropdown(false);
  };

  // Helper function to convert 12-hour format to 24-hour format
  const convertTo24Hour = (time: string, period: string): string => {
    if (!time || !period) return '';
    
    const [hours, minutes] = time.split(':').map(Number);
    let hour24 = hours;
    
    if (period === 'PM' && hours !== 12) {
      hour24 = hours + 12;
    } else if (period === 'AM' && hours === 12) {
      hour24 = 0;
    }
    
    return `${hour24.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:00`;
  };

  // Helper function to convert 24-hour format to 12-hour format
  const convertTo12Hour = (time24: string): { time: string; period: string } => {
    if (!time24) return { time: '', period: 'AM' };
    
    const [hours, minutes] = time24.split(':').map(Number);
    let hour12 = hours;
    let period = 'AM';
    
    if (hours >= 12) {
      period = 'PM';
      if (hours > 12) {
        hour12 = hours - 12;
      }
    } else if (hours === 0) {
      hour12 = 12;
    }
    
    return {
      time: `${hour12.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`,
      period
    };
  };

  const handleUpdateClass = async () => {
    // Validate required fields
    if (!subject || !day || !startTime || !endTime) {
      Alert.alert('Validation Error', 'Please fill in all required fields');
      return;
    }
    
    // Validate time format (HH:MM)
    const timeRegex = /^([0-9]|0[0-9]|1[0-2]):[0-5][0-9]$/;
    if (!timeRegex.test(startTime) || !timeRegex.test(endTime)) {
      Alert.alert('Validation Error', 'Please enter time in HH:MM format (e.g., 09:30, 10:45)');
      return;
    }
    
    // Validate AM/PM periods
    if (!startTimePeriod || !endTimePeriod) {
      Alert.alert('Validation Error', 'Please select AM/PM for both start and end times');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Convert 12-hour format to 24-hour format for storage
      const startTime24 = convertTo24Hour(startTime, startTimePeriod);
      const endTime24 = convertTo24Hour(endTime, endTimePeriod);
      
      // Update class in Supabase
      const { data, error } = await supabase
        .from('classes')
        .update({
          subject,
          day,
          start_time: startTime24,
          end_time: endTime24,
          teacher_name: teacherName || null,
          color: selectedColor,
          level: educationalLevel
        })
        .eq('id', classId)
        .select();

      if (error) {
        console.error('Error updating class:', error);
        Alert.alert('Error', 'Failed to update class. Please try again.');
        return;
      }

      // Show success confirmation
      Alert.alert(
        'Success', 
        'Class updated successfully!', 
        [
          {
            text: 'OK',
            onPress: () => {
              // Navigate back to Timetable with refresh flag
              router.push({
                pathname: '/(tabs)/timetable' as any,
                params: { refresh: 'true' }
              });
            }
          }
        ]
      );
      
    } catch (error) {
      console.error('Error updating class:', error);
      Alert.alert('Error', 'Failed to update class. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    router.push('/(tabs)/timetable');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleCancel}>
          <Ionicons name="arrow-back" size={24} color="#374151" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Class</Text>
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
            <View style={styles.dayInputWrapper}>
              <TouchableOpacity
                style={styles.dayButton}
                onPress={() => setShowDayDropdown(!showDayDropdown)}
              >
                <Text style={styles.dayButtonText}>
                  {day || 'Select day'}
                </Text>
                <Ionicons name="chevron-down" size={16} color="#6b7280" />
              </TouchableOpacity>
              {showDayDropdown && (
                <View style={styles.dayDropdownContainer}>
                  {days.map((d) => (
                    <TouchableOpacity
                      key={d}
                      style={styles.dayDropdownOption}
                      onPress={() => handleDaySelection(d)}
                    >
                      <Text style={styles.dayDropdownOptionText}>{d}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          </View>

          {/* Time Fields */}
          <View style={styles.timeContainer}>
            <View style={styles.timeField}>
              <Text style={styles.fieldLabel}>Start Time</Text>
              <View style={styles.timeInputWrapper}>
                <TextInput
                  style={styles.timeInput}
                  placeholder=""
                  value={startTime}
                  onChangeText={setStartTime}
                />
                <TouchableOpacity
                  style={styles.periodButton}
                  onPress={() => setShowStartDropdown(!showStartDropdown)}
                >
                  <Text style={styles.periodButtonText}>{startTimePeriod}</Text>
                  <Ionicons name="chevron-down" size={16} color="#6b7280" />
                </TouchableOpacity>
                {showStartDropdown && (
                  <View style={styles.dropdownContainer}>
                    {timePeriods.map((period) => (
                      <TouchableOpacity
                        key={period}
                        style={styles.dropdownOption}
                        onPress={() => handlePeriodSelection(period, true)}
                      >
                        <Text style={styles.dropdownOptionText}>{period}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
            </View>
            <View style={styles.timeField}>
              <Text style={styles.fieldLabel}>End Time</Text>
              <View style={styles.timeInputWrapper}>
                <TextInput
                  style={styles.timeInput}
                  placeholder=""
                  value={endTime}
                  onChangeText={setEndTime}
                />
                <TouchableOpacity
                  style={styles.periodButton}
                  onPress={() => setShowEndDropdown(!showEndDropdown)}
                >
                  <Text style={styles.periodButtonText}>{endTimePeriod}</Text>
                  <Ionicons name="chevron-down" size={16} color="#6b7280" />
                </TouchableOpacity>
                {showEndDropdown && (
                  <View style={styles.dropdownContainer}>
                    {timePeriods.map((period) => (
                      <TouchableOpacity
                        key={period}
                        style={styles.dropdownOption}
                        onPress={() => handlePeriodSelection(period, false)}
                      >
                        <Text style={styles.dropdownOptionText}>{period}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
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

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.saveButton, isLoading && styles.disabledButton]} 
              onPress={handleUpdateClass}
              disabled={isLoading}
            >
              <Text style={styles.saveButtonText}>
                {isLoading ? 'Updating...' : 'Update Class'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
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
  textInput: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: 'white',
  },
  levelSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  levelButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  selectedLevelButton: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },
  levelButtonText: {
    color: '#374151',
    fontWeight: '600',
    fontSize: 14,
  },
  selectedLevelButtonText: {
    color: 'white',
  },
  dayInputWrapper: {
    position: 'relative',
  },
  dayButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: 'white',
  },
  dayButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  dayDropdownContainer: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    marginTop: 4,
    zIndex: 1000,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dayDropdownOption: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  dayDropdownOptionText: {
    fontSize: 14,
    color: '#374151',
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  timeField: {
    flex: 0.48,
  },
  timeInputWrapper: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  timeInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: 'white',
  },
  periodButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: 'white',
    minWidth: 60,
  },
  periodButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginRight: 4,
  },
  dropdownContainer: {
    position: 'absolute',
    top: '100%',
    right: 0,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    marginTop: 4,
    zIndex: 1000,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    minWidth: 60,
  },
  dropdownOption: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  dropdownOptionText: {
    fontSize: 14,
    color: '#374151',
    textAlign: 'center',
  },
  colorGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  colorCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedColor: {
    borderColor: '#374151',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  cancelButtonText: {
    color: '#374151',
    fontSize: 16,
    fontWeight: '500',
  },
  saveButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#2563eb',
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#9ca3af',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
}); 