import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

export default function AddNoteScreen() {
  const params = useLocalSearchParams();
  const routeEducationalLevel = params?.educationalLevel as string || 'Play Group';
  const [subject, setSubject] = useState('');
  const [title, setTitle] = useState('');
  const [noteText, setNoteText] = useState('');
  const [attachedFile, setAttachedFile] = useState<string | null>(null);

  const educationalLevels = ['Play Group', 'Pre KG', 'Junior KG', 'Senior KG'];

  const handleSaveNote = () => {
    // TODO: Save note logic
    console.log('Saving note:', { 
      educationalLevel: routeEducationalLevel, 
      subject, 
      title, 
      noteText, 
      attachedFile 
    });
    router.back();
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
        setAttachedFile(result.assets[0].name);
      }
    } catch (error) {
      console.log('Error picking document:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#374151" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add New Note</Text>
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveNote}>
          <Ionicons name="checkmark" size={24} color="#3b82f6" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Educational Level */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Educational Level</Text>
          <View style={styles.levelSelector}>
            <View
              key={routeEducationalLevel}
              style={[styles.levelButton, styles.selectedLevelButton]}
            >
              <Text style={[styles.levelButtonText, styles.selectedLevelButtonText]}>
                {routeEducationalLevel}
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

        {/* Title */}
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

        {/* Note */}
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

        {/* Attach File */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Attach file</Text>
          <TouchableOpacity style={styles.attachArea} onPress={handleAttachFile}>
            {attachedFile ? (
              <View style={styles.attachedFile}>
                <Ionicons name="document" size={24} color="#3b82f6" />
                <Text style={styles.attachedFileName}>{attachedFile}</Text>
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

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.saveNoteButton} onPress={handleSaveNote}>
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