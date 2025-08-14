import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, Linking, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { supabase } from './supabaseClient';

export default function NoteDetailsScreen() {
  const { noteId } = useLocalSearchParams();
  const [note, setNote] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNoteDetails = async () => {
    if (!noteId) return;

    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .eq('id', noteId as string)
        .single();

      if (error) {
        throw error;
      }
      setNote(data);
    } catch (err: any) {
      console.error('Error fetching note details:', err);
      setError('Failed to load note details.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNoteDetails();
  }, [noteId]);

  const handleOpenFile = () => {
    if (note?.attached_file) {
      Linking.openURL(note.attached_file);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#374151" />
        </TouchableOpacity>
        <View style={styles.headerTitleWrapper}>
          <Text style={styles.headerTitle} numberOfLines={1}>{note?.title || 'Note Details'}</Text>
        </View>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {loading && <Text>Loading...</Text>}
        {error && <Text>{error}</Text>}
        {note && (
          <>
            <Text style={styles.noteTitle}>{note.title}</Text>
            <Text style={styles.noteDate}>
              {new Date(note.created_at).toLocaleString()}
            </Text>
            <Text style={styles.noteContent}>{note.content}</Text>
            {note.attached_file && (
              <TouchableOpacity style={styles.attachmentContainer} onPress={handleOpenFile}>
                {note.attached_file.match(/\.(jpeg|jpg|gif|png)$/) != null ? (
                  <Image source={{ uri: note.attached_file }} style={styles.attachmentImage} />
                ) : (
                  <View style={styles.attachmentFile}>
                    <Ionicons name="document-attach" size={24} color="#3b82f6" />
                    <Text style={styles.attachmentText}>View Attachment</Text>
                  </View>
                )}
              </TouchableOpacity>
            )}
          </>
        )}
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
    padding: 8,
    zIndex: 10,
  },
  headerTitleWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 0,
    paddingHorizontal: 60,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#374151',
  },
  headerRight: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  noteTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  noteDate: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 16,
  },
  noteContent: {
    fontSize: 16,
    lineHeight: 24,
    color: '#374151',
  },
  attachmentContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
  },
  attachmentImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  attachmentFile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  attachmentText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#3b82f6',
    fontWeight: '600',
  },
});
