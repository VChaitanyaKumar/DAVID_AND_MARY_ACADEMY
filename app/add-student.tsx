import { Ionicons } from '@expo/vector-icons';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { decode } from 'base64-arraybuffer';
import { router, useLocalSearchParams } from 'expo-router';
import { supabase } from './supabaseClient';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardTypeOptions,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

interface FormInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  editable?: boolean;
  maxLength?: number;
}

const FormInput = ({ label, value, onChangeText, placeholder, keyboardType, editable = true, maxLength }: FormInputProps) => {
  const isPhoneInput = keyboardType === 'phone-pad';
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          keyboardType={keyboardType}
          placeholderTextColor="#9ca3af"
          editable={editable}
          maxLength={maxLength}
        />
        {isPhoneInput && value.length === 10 && (
          <Text style={styles.flag}>🇮🇳</Text>
        )}
      </View>
    </View>
  );
};

interface FormSectionProps {
  title: string;
  children: React.ReactNode;
}

const FormSection = ({ title, children }: FormSectionProps) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {children}
  </View>
);

export default function AddStudentScreen() {
  const { level } = useLocalSearchParams<{ level: string }>();
  const [loading, setLoading] = useState(false);
  const [isGenderPickerVisible, setGenderPickerVisible] = useState(false);
  const [isSectionPickerVisible, setSectionPickerVisible] = useState(false);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    rollNumber: '',
    section: '',
    fatherName: '',
    fatherPhoneNumber: '',
    motherName: '',
    motherPhoneNumber: '',
    currentAddress: '',
  });

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setDatePickerVisible(Platform.OS === 'ios');
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split('T')[0]; // YYYY-MM-DD
      handleInputChange('dateOfBirth', formattedDate);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    if (!formData.firstName || !formData.lastName || !formData.rollNumber) {
      Alert.alert('Validation Error', 'Please fill in First Name, Last Name, and Roll Number.');
      return;
    }

    setLoading(true);

    let photoUrl: string | null = null;

    if (image) {
      try {
        const base64 = await FileSystem.readAsStringAsync(image, {
          encoding: FileSystem.EncodingType.Base64,
        });
        const filePath = `${Date.now()}.png`;
        const contentType = 'image/png';

        const { data, error: uploadError } = await supabase.storage
          .from('student-photos')
          .upload(filePath, decode(base64), { contentType });

        if (uploadError) {
          throw uploadError;
        }

        const { data: publicURLData } = supabase.storage
          .from('student-photos')
          .getPublicUrl(data.path);

        const photoUrl = publicURLData.publicUrl;
        await saveStudent(photoUrl);
      } catch (e) {
        console.error('Error uploading image:', e);
        Alert.alert('Upload Error', 'Failed to upload profile photo.');
        setLoading(false);
      }
    } else {
      await saveStudent(null);
    }
  };

  const saveStudent = async (photoUrl: string | null) => {
    const studentData = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      educational_level: level,
      roll_number: formData.rollNumber,
      gender: formData.gender || null,
      date_of_birth: formData.dateOfBirth || null,
      section: formData.section || null,
      father_name: formData.fatherName || null,
      father_phone_number: formData.fatherPhoneNumber || null,
      mother_name: formData.motherName || null,
      mother_phone_number: formData.motherPhoneNumber || null,
      current_address: formData.currentAddress || null,
      photo_url: photoUrl,
    };

    const { error } = await supabase.from('students').insert([studentData]);

    setLoading(false);

    if (error) {
      console.error('Error saving student:', error);
      Alert.alert('Error', 'Failed to save student. Please try again.');
    } else {
      Alert.alert('Success', 'Student added successfully!', [
        { text: 'OK', onPress: () => router.back() },
      ]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#1e3a8a" />
        </TouchableOpacity>
        <Text style={styles.header}>Add Student</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.formContainer}>
          <FormSection title="Academic Details">
            <FormInput label="Educational Level" value={level ?? ''} onChangeText={() => {}} editable={false} />
                        <View style={styles.inputContainer}>
              <Text style={styles.label}>Section</Text>
              <TouchableOpacity
                style={styles.dropdownButton}
                onPress={() => setSectionPickerVisible(!isSectionPickerVisible)}
              >
                <Text style={styles.dropdownButtonText}>
                  {formData.section || 'Select Section'}
                </Text>
                <Ionicons name={isSectionPickerVisible ? 'chevron-up' : 'chevron-down'} size={20} color="#6b7280" />
              </TouchableOpacity>
              {isSectionPickerVisible && (
                <View style={styles.dropdownOptionsContainer}>
                  {['A', 'B', 'C', 'D'].map((option) => (
                    <TouchableOpacity
                      key={option}
                      style={styles.dropdownOption}
                      onPress={() => {
                        handleInputChange('section', option);
                        setSectionPickerVisible(false);
                      }}
                    >
                      <Text style={styles.dropdownOptionText}>{option}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
            <FormInput label="Roll Number" value={formData.rollNumber} onChangeText={(v) => handleInputChange('rollNumber', v)} placeholder="Enter roll number" keyboardType="numeric" />
          </FormSection>

          <FormSection title="Profile Photo">
            <View style={styles.imagePickerContainer}>
              <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
                <Ionicons name="cloud-upload-outline" size={24} color="#1e3a8a" />
                <Text style={styles.uploadButtonText}>Upload Photo</Text>
              </TouchableOpacity>
              {image && <Image source={{ uri: image }} style={styles.profileImagePreview} />}
            </View>
          </FormSection>

          <FormSection title="Personal Details">
            <FormInput label="First Name" value={formData.firstName} onChangeText={(v) => handleInputChange('firstName', v)} placeholder="Enter first name" />
            <FormInput label="Last Name" value={formData.lastName} onChangeText={(v) => handleInputChange('lastName', v)} placeholder="Enter last name" />
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Gender</Text>
              <TouchableOpacity
                style={styles.dropdownButton}
                onPress={() => setGenderPickerVisible(!isGenderPickerVisible)}
              >
                <Text style={styles.dropdownButtonText}>
                  {formData.gender || 'Select Gender'}
                </Text>
                <Ionicons name={isGenderPickerVisible ? 'chevron-up' : 'chevron-down'} size={20} color="#6b7280" />
              </TouchableOpacity>
              {isGenderPickerVisible && (
                <View style={styles.dropdownOptionsContainer}>
                  {['Male', 'Female'].map((option) => (
                    <TouchableOpacity
                      key={option}
                      style={styles.dropdownOption}
                      onPress={() => {
                        handleInputChange('gender', option);
                        setGenderPickerVisible(false);
                      }}
                    >
                      <Text style={styles.dropdownOptionText}>{option}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
                        <View style={styles.inputContainer}>
              <Text style={styles.label}>Date of Birth</Text>
              <TouchableOpacity
                style={styles.dropdownButton}
                onPress={() => setDatePickerVisible(true)}
              >
                <Text style={styles.dropdownButtonText}>
                  {formData.dateOfBirth || 'Select Date'}
                </Text>
                <Ionicons name="calendar" size={20} color="#6b7280" />
              </TouchableOpacity>
              {isDatePickerVisible && (
                <DateTimePicker
                  value={new Date(formData.dateOfBirth || Date.now())}
                  mode="date"
                  display="default"
                  onChange={onDateChange}
                />
              )}
            </View>
          </FormSection>

          <FormSection title="Parent/Guardian Details">
            <FormInput label="Father's Name" value={formData.fatherName} onChangeText={(v) => handleInputChange('fatherName', v)} placeholder="Enter father's name" />
            <FormInput label="Father's Phone" value={formData.fatherPhoneNumber} onChangeText={(v) => handleInputChange('fatherPhoneNumber', v)} placeholder="Enter phone number" keyboardType="phone-pad" maxLength={10} />
            <FormInput label="Mother's Name" value={formData.motherName} onChangeText={(v) => handleInputChange('motherName', v)} placeholder="Enter mother's name" />
            <FormInput label="Mother's Phone" value={formData.motherPhoneNumber} onChangeText={(v) => handleInputChange('motherPhoneNumber', v)} placeholder="Enter phone number" keyboardType="phone-pad" maxLength={10} />
          </FormSection>

          <FormSection title="Contact Details">
            <FormInput label="Current Address" value={formData.currentAddress} onChangeText={(v) => handleInputChange('currentAddress', v)} placeholder="Enter current address" />
          </FormSection>

          <TouchableOpacity style={styles.saveButton} onPress={handleSave} disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.saveButtonText}>Save Student</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
  header: { fontSize: 20, fontWeight: 'bold', color: '#1e3a8a' },
  headerRight: { width: 40 },
  scrollContent: { paddingBottom: 40 },
  formContainer: { padding: 16 },
  section: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  inputContainer: { marginBottom: 12 },
  label: { fontSize: 15, fontWeight: '500', color: '#4b5563', marginBottom: 6 },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
  },
  input: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    color: '#1f2937',
  },
  flag: {
    fontSize: 24,
    paddingHorizontal: 10,
  },
  inputDisabled: {
    backgroundColor: '#e5e7eb',
    color: '#6b7280',
  },
  saveButton: {
    backgroundColor: '#1e3a8a',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  saveButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  dropdownButton: {
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownButtonText: {
    fontSize: 15,
    color: '#1f2937',
  },
  dropdownOptionsContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d1d5db',
    marginTop: 4,
  },
  dropdownOption: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  dropdownOptionText: {
    fontSize: 15,
    color: '#1f2937',
  },
  imagePickerContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eef2ff',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#c7d2fe',
  },
  uploadButtonText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '600',
    color: '#1e3a8a',
  },
  profileImagePreview: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginTop: 16,
    borderWidth: 3,
    borderColor: '#1e3a8a',
  },
});
