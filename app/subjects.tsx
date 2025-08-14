import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { supabase } from './supabaseClient';

export default function SubjectsScreen() {
  const { educationalLevel } = useLocalSearchParams();
  const [subjects, setSubjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSubjectsWithNoteCounts = async () => {
    if (!educationalLevel) return;

    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('notes')
        .select('subject')
        .eq('educational_level', educationalLevel as string);

      if (error) {
        throw error;
      }

      const noteCounts: { [key: string]: number } = {};
      data.forEach((note: any) => {
        if (note.subject) {
          noteCounts[note.subject] = (noteCounts[note.subject] || 0) + 1;
        }
      });

      // Assuming you have a predefined list of subjects for each level
      const predefinedSubjects = getSubjectsForLevel(educationalLevel as string);
      
      const subjectsWithCounts = predefinedSubjects.map(subject => ({
        ...subject,
        noteCount: noteCounts[subject.name] || 0,
      }));

      setSubjects(subjectsWithCounts);
    } catch (err: any) {
      console.error('Error fetching subjects:', err);
      setError('Failed to load subjects.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubjectsWithNoteCounts();
  }, [educationalLevel]);

  const getSubjectsForLevel = (level: string) => {
    const subjectsByLevel = {
        playgroup: [
            { id: 'storytime', name: 'Story Time', icon: 'library', color: '#8b5cf6', backgroundColor: '#faf5ff', tagColor: '#e9d5ff' },
            { id: 'artcraft', name: 'Art & Craft', icon: 'brush', color: '#ec4899', backgroundColor: '#fdf2f8', tagColor: '#fce7f3' },
            { id: 'music', name: 'Music & Movement', icon: 'musical-notes', color: '#f59e0b', backgroundColor: '#fffbeb', tagColor: '#fef3c7' },
            { id: 'play', name: 'Play & Learn', icon: 'game-controller', color: '#22c55e', backgroundColor: '#f0fdf4', tagColor: '#dcfce7' }
        ],
        prekg: [
            { id: 'phonics', name: 'Phonics', icon: 'text', color: '#8b5cf6', backgroundColor: '#faf5ff', tagColor: '#e9d5ff' },
            { id: 'counting', name: 'Counting', icon: 'calculator', color: '#3b82f6', backgroundColor: '#eff6ff', tagColor: '#dbeafe' },
            { id: 'shapes', name: 'Shapes & Colors', icon: 'color-palette', color: '#ec4899', backgroundColor: '#fdf2f8', tagColor: '#fce7f3' },
            { id: 'writing', name: 'Letter Writing', icon: 'create', color: '#f97316', backgroundColor: '#fff7ed', tagColor: '#fed7aa' }
        ],
        juniorkg: [
            { id: 'english', name: 'English', icon: 'book', color: '#8b5cf6', backgroundColor: '#faf5ff', tagColor: '#e9d5ff' },
            { id: 'hindi', name: 'Hindi', icon: 'language', color: '#f97316', backgroundColor: '#fff7ed', tagColor: '#fed7aa' },
            { id: 'math', name: 'Mathematics', icon: 'calculator', color: '#3b82f6', backgroundColor: '#eff6ff', tagColor: '#dbeafe' },
            { id: 'environmental', name: 'Environmental Studies', icon: 'earth', color: '#22c55e', backgroundColor: '#f0fdf4', tagColor: '#dcfce7' }
        ],
        seniorkg: [
            { id: 'english_advanced', name: 'English Grammar', icon: 'text', color: '#8b5cf6', backgroundColor: '#faf5ff', tagColor: '#e9d5ff' },
            { id: 'hindi_advanced', name: 'Hindi Grammar', icon: 'language', color: '#f97316', backgroundColor: '#fff7ed', tagColor: '#fed7aa' },
            { id: 'math_advanced', name: 'Advanced Math', icon: 'analytics', color: '#3b82f6', backgroundColor: '#eff6ff', tagColor: '#dbeafe' },
            { id: 'computer', name: 'Computer Basics', icon: 'laptop', color: '#06b6d4', backgroundColor: '#ecfeff', tagColor: '#cffafe' }
        ]
    };
    return subjectsByLevel[level as keyof typeof subjectsByLevel] || [];
  };

  const handleSubjectPress = (subjectName: string) => {
    router.push({
      pathname: '/notes-list',
      params: { educationalLevel, subject: subjectName },
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
          <Text style={styles.headerTitle}>{educationalLevel}</Text>
        </View>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {loading && <Text>Loading...</Text>}
        {error && <Text>{error}</Text>}
        {!loading && !error && subjects.map((subject) => (
          <TouchableOpacity
            key={subject.id}
            style={[styles.subjectCard, { backgroundColor: subject.backgroundColor }]}
            onPress={() => handleSubjectPress(subject.name)}
          >
            <View style={styles.cardContent}>
              <View style={styles.leftSection}>
                <View style={[styles.iconContainer, { backgroundColor: subject.color }]}>
                  <Ionicons name={subject.icon as any} size={24} color="white" />
                </View>
                <View style={styles.textSection}>
                  <Text style={styles.subjectName}>{subject.name}</Text>
                  <View style={[styles.noteCountTag, { backgroundColor: subject.tagColor }]}>
                    <Text style={[styles.noteCountText, { color: subject.color }]}>
                      {subject.noteCount} notes
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.rightSection}>
                <Ionicons name="chevron-forward" size={20} color="#6b7280" />
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.fab} onPress={() => router.push({ pathname: '/add-note', params: { educationalLevel } } as any)}>
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>
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
  subjectCard: {
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  textSection: {
    flex: 1,
  },
  subjectName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 4,
  },
  noteCountTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  noteCountText: {
    fontSize: 12,
    fontWeight: '600',
  },
  rightSection: {
    marginLeft: 16,
  },
  fab: {
    position: 'absolute',
    bottom: 40,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});
