import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Platform, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const NAVY = '#001F54';
const LEVELS = ['Play Group', 'Pre KG', 'Junior KG', 'Senior KG'];

export default function AddTaskPage() {
  const router = useRouter();
  const [educationalLevel, setEducationalLevel] = useState(LEVELS[0]);
  const [subject, setSubject] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleSave = () => {
    if (!title.trim()) {
      Alert.alert('Validation', 'Please enter a task title.');
      return;
    }
    Alert.alert('Task Saved', 'Your new task has been saved.');
    // Add your save logic here
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 16 }}>
        <View style={styles.headerRow}>
          <View style={{ flex: 1, position: 'relative', justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity
              style={styles.backArrowAbsolute}
              onPress={() => router.push('/tasks')}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons name="arrow-back" size={28} color={'#111'} />
            </TouchableOpacity>
            <Text style={styles.pageTitle} numberOfLines={1} ellipsizeMode="tail">Add New Task</Text>
          </View>
        </View>
        <View style={styles.formCard}>
          <Text style={styles.label}>Educational Level</Text>
          <View style={styles.levelSelector}>
            {LEVELS.map(level => (
              <TouchableOpacity
                key={level}
                style={[
                  styles.levelButton,
                  educationalLevel === level && styles.selectedLevelButton
                ]}
                onPress={() => setEducationalLevel(level)}
              >
                <Text
                  style={[
                    styles.levelButtonText,
                    educationalLevel === level && styles.selectedLevelButtonText
                  ]}
                >
                  {level}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.label}>Subject</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter subject"
            value={subject}
            onChangeText={setSubject}
          />
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter task title"
            value={title}
            onChangeText={setTitle}
          />
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, { height: 80 }]}
            placeholder="Enter task description"
            value={description}
            onChangeText={setDescription}
            multiline
          />
          <Text style={styles.label}>Due Date</Text>
          <TouchableOpacity style={styles.dateBtn} onPress={() => setShowDate(true)}>
            <Ionicons name="calendar-outline" size={18} color={NAVY} style={{ marginRight: 6 }} />
            <Text style={styles.dateBtnText}>
              {dueDate.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}
            </Text>
          </TouchableOpacity>
          {showDate && (
            <DateTimePicker
              value={dueDate}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={(_, selected) => {
                setShowDate(false);
                if (selected) setDueDate(selected);
              }}
            />
          )}
          <Text style={styles.label}>Status</Text>
          <View style={styles.checkboxRow}>
            <TouchableOpacity
              style={styles.checkbox}
              onPress={() => setCompleted(!completed)}
            >
              <View style={[styles.checkboxBox, completed && styles.checkboxBoxChecked]}>
                {completed && <Ionicons name="checkmark" size={16} color="#fff" />}
              </View>
            </TouchableOpacity>
            <Text style={styles.checkboxLabel}>Mark as completed</Text>
          </View>
          <Text style={styles.label}>Priority</Text>
        </View>
        <View style={styles.infoBox}>
          <Ionicons name="information-circle-outline" size={20} color={NAVY} style={{ marginRight: 8 }} />
          <Text style={styles.infoText}>
            Tasks will be automatically synced across all your devices and added to your timetable.
          </Text>
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.cancelBtn}>
            <Text style={styles.cancelBtnText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
            <Text style={styles.saveBtnText}>+ Save Task</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backArrowAbsolute: {
    position: 'absolute',
    left: 0,
    top: 0,
    padding: 6,
    zIndex: 10,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    marginTop: 8,
    justifyContent: 'center',
  },
  pageTitle: {
    color: '#111',
    fontWeight: 'bold',
    fontSize: 22,
    textAlign: 'center',
    marginVertical: 0,
  },
  formCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  label: {
    color: '#111',
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 6,
    marginTop: 12,
  },
  levelSelector: {
    flexDirection: 'row',
    marginBottom: 12,
    flexWrap: 'wrap',
    gap: 8,
  },
  levelButton: {
    borderWidth: 1,
    borderColor: NAVY,
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 14,
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: '#fff',
  },
  selectedLevelButton: {
    backgroundColor: NAVY,
  },
  levelButtonText: {
    color: NAVY,
    fontWeight: 'bold',
    fontSize: 14,
  },
  selectedLevelButtonText: {
    color: '#fff',
  },
  input: {
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    color: '#111',
    marginBottom: 8,
  },
  dateBtn: {
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  dateBtnText: {
    color: NAVY,
    fontWeight: '600',
    fontSize: 15,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  checkbox: {
    marginRight: 8,
  },
  checkboxBox: {
    width: 22,
    height: 22,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: NAVY,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxBoxChecked: {
    backgroundColor: NAVY,
    borderColor: NAVY,
  },
  checkboxLabel: {
    color: '#111',
    fontSize: 15,
  },
  infoBox: {
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginBottom: 16,
    marginHorizontal: 2,
  },
  infoText: {
    color: '#222',
    fontSize: 14,
    flex: 1,
    flexWrap: 'wrap',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 2,
    marginTop: 8,
  },
  cancelBtn: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: NAVY,
    paddingVertical: 14,
    paddingHorizontal: 24,
    flex: 1,
    marginRight: 8,
    alignItems: 'center',
  },
  cancelBtnText: {
    color: NAVY,
    fontWeight: 'bold',
    fontSize: 16,
  },
  saveBtn: {
    backgroundColor: NAVY,
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 24,
    flex: 1,
    alignItems: 'center',
  },
  saveBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
}); 