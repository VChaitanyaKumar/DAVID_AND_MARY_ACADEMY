import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { decode } from 'base64-arraybuffer';
import { supabase } from './supabaseClient';

interface FormInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
  maxLength?: number;
  isPhoneNumber?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default',
  maxLength,
  isPhoneNumber = false,
}) => (
  <View style={styles.inputGroup}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
        maxLength={maxLength}
        placeholderTextColor="#9ca3af"
      />
      {isPhoneNumber && value.length === 10 && (
        <Text style={styles.phoneFlag}>🇮🇳</Text>
      )}
    </View>
  </View>
);

export default function EditStudentScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    rollNumber: '',
    gender: '',
    dateOfBirth: '',
    section: '',
    fatherName: '',
    fatherPhoneNumber: '',
    motherName: '',
    motherPhoneNumber: '',
    currentAddress: '',
  });

  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    const fetchStudent = async () => {
      if (!id) return;
      setLoading(true);
      const { data, error } = await supabase
        .from('students')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        Alert.alert('Error', 'Failed to fetch student details.');
        console.error('Error fetching student:', error);
      } else if (data) {
        setFormData({
          firstName: data.first_name || '',
          lastName: data.last_name || '',
          rollNumber: data.roll_number || '',
          gender: data.gender || '',
          dateOfBirth: data.date_of_birth || '',
          section: data.section || '',
          fatherName: data.father_name || '',
          fatherPhoneNumber: data.father_phone_number || '',
          motherName: data.mother_name || '',
          motherPhoneNumber: data.mother_phone_number || '',
          currentAddress: data.current_address || '',
        });
        if (data.photo_url) {
          setImage(data.photo_url);
        }
      }
      setLoading(false);
    };

    fetchStudent();
  }, [id]);

  const handleInputChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setFormData({ ...formData, dateOfBirth: selectedDate.toISOString().split('T')[0] });
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleUpdate = async () => {
    if (!formData.firstName || !formData.lastName || !formData.rollNumber) {
      Alert.alert('Validation Error', 'Please fill in all required fields.');
      return;
    }

    setLoading(true);
    let photoUrl = image;

    if (image && !image.startsWith('http')) {
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

        photoUrl = publicURLData.publicUrl;
        updateStudent(photoUrl);
      } catch (e) {
        console.error('Error uploading image:', e);
        Alert.alert('Upload Error', 'Failed to upload profile photo.');
        setLoading(false);
      }
    } else {
      updateStudent(photoUrl);
    }
  };

  const updateStudent = async (photoUrl: string | null) => {
    const studentData = {
      first_name: formData.firstName,
      last_name: formData.lastName,
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

    const { error } = await supabase.from('students').update(studentData).eq('id', id);

    setLoading(false);

    if (error) {
      console.error('Error updating student:', error);
      Alert.alert('Error', 'Failed to update student. Please try again.');
    } else {
      Alert.alert('Success', 'Student updated successfully!', [
        { text: 'OK', onPress: () => router.back() },
      ]);
    }
  };

  if (loading && !formData.firstName) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1e3a8a" />
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Student</Text>
      </View>

      <ScrollView style={styles.formContainer}>
        <View style={styles.photoSection}>
          <TouchableOpacity onPress={pickImage}>
            <Image
              source={image ? { uri: image } : require('../assets/images/david-and-mary-logo.png')}
              style={styles.avatar}
            />
            <View style={styles.cameraIcon}>
              <Ionicons name="camera" size={20} color="white" />
            </View>
          </TouchableOpacity>
        </View>

        <FormInput
          label="First Name"
          value={formData.firstName}
          onChangeText={(text) => handleInputChange('firstName', text)}
          placeholder="Enter first name"
        />
        <FormInput
          label="Last Name"
          value={formData.lastName}
          onChangeText={(text) => handleInputChange('lastName', text)}
          placeholder="Enter last name"
        />
        <FormInput
          label="Roll Number"
          value={formData.rollNumber}
          onChangeText={(text) => handleInputChange('rollNumber', text)}
          placeholder="Enter roll number"
          keyboardType="numeric"
        />
        <FormInput
          label="Section"
          value={formData.section}
          onChangeText={(text) => handleInputChange('section', text)}
          placeholder="Enter section (e.g., A, B)"
        />

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Gender</Text>
          <View style={styles.genderSelector}>
            {['Male', 'Female', 'Other'].map((gender) => (
              <TouchableOpacity
                key={gender}
                style={[
                  styles.genderOption,
                  formData.gender === gender && styles.genderOptionSelected,
                ]}
                onPress={() => handleInputChange('gender', gender)}
              >
                <Text
                  style={[
                    styles.genderText,
                    formData.gender === gender && styles.genderTextSelected,
                  ]}
                >
                  {gender}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Date of Birth</Text>
          <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePickerInput}>
            <Text style={{ color: formData.dateOfBirth ? '#000' : '#9ca3af' }}>
              {formData.dateOfBirth || 'Select date'}
            </Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={formData.dateOfBirth ? new Date(formData.dateOfBirth) : new Date()}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
        </View>

        <Text style={styles.sectionTitle}>Parents' Information</Text>
        <FormInput
          label="Father's Name"
          value={formData.fatherName}
          onChangeText={(text) => handleInputChange('fatherName', text)}
          placeholder="Enter father's full name"
        />
        <FormInput
          label="Father's Phone Number"
          value={formData.fatherPhoneNumber}
          onChangeText={(text) => handleInputChange('fatherPhoneNumber', text)}
          placeholder="Enter 10-digit mobile number"
          keyboardType="phone-pad"
          maxLength={10}
          isPhoneNumber
        />
        <FormInput
          label="Mother's Name"
          value={formData.motherName}
          onChangeText={(text) => handleInputChange('motherName', text)}
          placeholder="Enter mother's full name"
        />
        <FormInput
          label="Mother's Phone Number"
          value={formData.motherPhoneNumber}
          onChangeText={(text) => handleInputChange('motherPhoneNumber', text)}
          placeholder="Enter 10-digit mobile number"
          keyboardType="phone-pad"
          maxLength={10}
          isPhoneNumber
        />

        <Text style={styles.sectionTitle}>Contact Information</Text>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Current Address</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={formData.currentAddress}
            onChangeText={(text) => handleInputChange('currentAddress', text)}
            placeholder="Enter current address"
            multiline
            numberOfLines={4}
            placeholderTextColor="#9ca3af"
          />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleUpdate} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.saveButtonText}>Update Student</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  header: {
    backgroundColor: '#1e3a8a',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  formContainer: {
    padding: 20,
  },
  photoSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#1e3a8a',
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#1e3a8a',
    borderRadius: 15,
    padding: 5,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 6,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  input: {
    flex: 1,
    height: 48,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  phoneFlag: {
    fontSize: 24,
    marginRight: 10,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
    paddingTop: 12,
  },
  genderSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  genderOption: {
    flex: 1,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  genderOptionSelected: {
    backgroundColor: '#1e3a8a',
    borderColor: '#1e3a8a',
  },
  genderText: {
    fontSize: 16,
    color: '#374151',
  },
  genderTextSelected: {
    color: 'white',
    fontWeight: 'bold',
  },
  datePickerInput: {
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d1d5db',
    height: 48,
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e3a8a',
    marginTop: 16,
    marginBottom: 12,
    borderBottomWidth: 2,
    borderBottomColor: '#1e3a8a',
    paddingBottom: 4,
  },
  saveButton: {
    backgroundColor: '#1e3a8a',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
