import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { supabase } from './supabaseClient';

export default function NotesListScreen() {
  const { educationalLevel, subject } = useLocalSearchParams();
  const [notes, setNotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNotes = async () => {
    if (!educationalLevel || !subject) return;

    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .eq('educational_level', educationalLevel as string)
        .eq('subject', subject as string)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }
      setNotes(data);
    } catch (err: any) {
      console.error('Error fetching notes:', err);
      setError('Failed to load notes.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [educationalLevel, subject]);

  const handleNotePress = (noteId: number) => {
    router.push({
      pathname: '/note-details',
      params: { noteId },
    } as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#374151" />
        </TouchableOpacity>
        <View style={styles.headerTitleWrapper}>
          <Text style={styles.headerTitle}>{subject}</Text>
        </View>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {loading && <Text>Loading...</Text>}
        {error && <Text>{error}</Text>}
        {!loading && !error && notes.map((note) => (
          <TouchableOpacity key={note.id} style={styles.noteCard} onPress={() => handleNotePress(note.id)}>
            <Text style={styles.noteTitle}>{note.title}</Text>
            <Text style={styles.noteDate}>{new Date(note.created_at).toLocaleDateString()}</Text>
            <Text style={styles.noteContent} numberOfLines={2}>{note.content}</Text>
            {note.attached_file && <Ionicons name="attach" size={16} color="#6b7280" style={{ marginTop: 8 }} />}
          </TouchableOpacity>
        ))}
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
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#374151',
    textTransform: 'capitalize',
  },
  headerRight: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  noteCard: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 4,
  },
  noteDate: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 8,
  },
  noteContent: {
    fontSize: 14,
    color: '#4b5563',
  },
});
