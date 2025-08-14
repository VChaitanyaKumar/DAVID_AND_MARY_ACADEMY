import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Alert,
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

export default function AddNoteScreen() {
  const { educationalLevel, educationalLevelName } = useLocalSearchParams();
  const [title, setTitle] = useState('');
  const [noteText, setNoteText] = useState('');
  const [attachedFile, setAttachedFile] = useState<any | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  useEffect(() => {
    if (educationalLevel) {
      setSubjects(getSubjectsForLevel(educationalLevel as string));
    }
  }, [educationalLevel]);

  const getSubjectsForLevel = (level: string) => {
    const subjectsByLevel = {
        playgroup: [
            { id: 'storytime', name: 'Story Time' },
            { id: 'artcraft', name: 'Art & Craft' },
            { id: 'music', name: 'Music & Movement' },
            { id: 'play', name: 'Play & Learn' }
        ],
        prekg: [
            { id: 'phonics', name: 'Phonics' },
            { id: 'counting', name: 'Counting' },
            { id: 'shapes', name: 'Shapes & Colors' },
            { id: 'writing', name: 'Letter Writing' }
        ],
        juniorkg: [
            { id: 'english', name: 'English' },
            { id: 'hindi', name: 'Hindi' },
            { id: 'math', name: 'Mathematics' },
            { id: 'environmental', name: 'Environmental Studies' }
        ],
        seniorkg: [
            { id: 'english_advanced', name: 'English Grammar' },
            { id: 'hindi_advanced', name: 'Hindi Grammar' },
            { id: 'math_advanced', name: 'Advanced Math' },
            { id: 'computer', name: 'Computer Basics' }
        ]
    };
    return subjectsByLevel[level as keyof typeof subjectsByLevel] || [];
  };

  const handleSaveNote = async () => {
    if (!title.trim()) {
      Alert.alert('Validation', 'Please enter a note title.');
      return;
    }
    if (!selectedSubject) {
      Alert.alert('Validation', 'Please select a subject.');
      return;
    }

    setIsSubmitting(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      let fileUrl = null;
      if (attachedFile) {
        const fileName = `${user.id}/${Date.now()}-${attachedFile.name}`;
        const fileBody = await fetch(attachedFile.uri).then(res => res.blob());
        const { error: uploadError } = await supabase.storage
          .from('notes')
          .upload(fileName, fileBody, {
            cacheControl: '3600',
            upsert: false,
          });

        if (uploadError) {
          throw uploadError;
        }

        const { data: urlData } = supabase.storage.from('notes').getPublicUrl(fileName);
        fileUrl = urlData.publicUrl;
      }

      const { error } = await supabase.from('notes').insert([
        {
          educational_level: educationalLevelName,
          subject: selectedSubject,
          title,
          content: noteText,
          attached_file: fileUrl,
          user_id: user.id,
        },
      ]).select();

      if (error) {
        throw error;
      }

      Alert.alert('Note Saved!', 'Your new note has been saved successfully.');
      router.back();

    } catch (error: any) {
      console.error('Error saving note:', error);
      Alert.alert('Error', `Failed to save note: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDiscard = () => {
    router.back();
  };

  const handleAttachFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'image/*'],
        copyToCacheDirectory: true,
      });

      if (result.canceled === false) {
        setAttachedFile(result.assets[0]);
      }
    } catch (error) {
      console.log('Error picking document:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#374151" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add New Note</Text>
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveNote} disabled={isSubmitting}>
          <Ionicons name="checkmark" size={24} color="#3b82f6" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Educational Level</Text>
          <View style={styles.levelSelector}>
            <View
              key={educationalLevel as string}
              style={[styles.levelButton, styles.selectedLevelButton]}
            >
              <Text style={[styles.levelButtonText, styles.selectedLevelButtonText]}>
                {educationalLevel}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Subject</Text>
          <View style={styles.subjectSelector}>
            {subjects.map((s) => (
              <TouchableOpacity
                key={s.id}
                style={[
                  styles.subjectButton,
                  selectedSubject === s.name && styles.selectedSubjectButton,
                ]}
                onPress={() => setSelectedSubject(s.name)}
              >
                <Text
                  style={[
                    styles.subjectButtonText,
                    selectedSubject === s.name && styles.selectedSubjectButtonText,
                  ]}
                >
                  {s.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Newton's Laws Summary"
            placeholderTextColor="#9ca3af"
            value={title}
            onChangeText={setTitle}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Note</Text>
          <TextInput
            style={[styles.textInput, styles.textArea]}
            placeholder="Enter your note here..."
            placeholderTextColor="#9ca3af"
            value={noteText}
            onChangeText={setNoteText}
            multiline
            numberOfLines={8}
            textAlignVertical="top"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Attach file</Text>
          <TouchableOpacity style={styles.attachArea} onPress={handleAttachFile}>
            {attachedFile ? (
              <View style={styles.attachedFile}>
                <Ionicons name="document" size={24} color="#3b82f6" />
                <Text style={styles.attachedFileName}>{attachedFile.name}</Text>
              </View>
            ) : (
              <View style={styles.attachPlaceholder}>
                <Ionicons name="attach" size={32} color="#9ca3af" />
                <TouchableOpacity style={styles.attachButton} onPress={handleAttachFile}>
                  <Ionicons name="arrow-up" size={16} color="#6b7280" />
                  <Text style={styles.attachButtonText}>Add PDF / Image</Text>
                </TouchableOpacity>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.saveNoteButton} onPress={handleSaveNote} disabled={isSubmitting}>
            <Text style={styles.saveNoteButtonText}>Save Note</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.discardButton} onPress={handleDiscard}>
            <Text style={styles.discardButtonText}>Discard</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  subjectSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  subjectButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d1d5db',
    backgroundColor: 'white',
  },
  selectedSubjectButton: {
    backgroundColor: '#1e3a8a',
    borderColor: '#1e3a8a',
  },
  subjectButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
  },
  selectedSubjectButtonText: {
    color: 'white',
  },
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
    height: 120,
    textAlignVertical: 'top',
  },
  attachArea: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    backgroundColor: 'white',
    minHeight: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  attachPlaceholder: {
    alignItems: 'center',
    padding: 20,
  },
  attachButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 6,
    backgroundColor: 'white',
  },
  attachButtonText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  attachedFile: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  attachedFileName: {
    marginLeft: 8,
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  buttonContainer: {
    marginBottom: 40,
  },
  saveNoteButton: {
    backgroundColor: '#1e3a8a',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 12,
  },
  saveNoteButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  discardButton: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  discardButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
});
