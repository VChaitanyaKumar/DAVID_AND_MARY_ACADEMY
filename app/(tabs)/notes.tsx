import { Ionicons } from '@expo/vector-icons';
import { router, useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { supabase } from '../supabaseClient';

export default function NotesScreen() {
  const [educationalLevels, setEducationalLevels] = useState([
    {
      id: 'playgroup',
      name: 'Play Group',
      icon: 'happy',
      noteCount: 0,
      color: '#ec4899',
      backgroundColor: '#fdf2f8',
      tagColor: '#fce7f3'
    },
    {
      id: 'prekg',
      name: 'Pre KG',
      icon: 'school',
      noteCount: 0,
      color: '#8b5cf6',
      backgroundColor: '#faf5ff',
      tagColor: '#e9d5ff'
    },
    {
      id: 'juniorkg',
      name: 'Junior KG',
      icon: 'library',
      noteCount: 0,
      color: '#3b82f6',
      backgroundColor: '#eff6ff',
      tagColor: '#dbeafe'
    },
    {
      id: 'seniorkg',
      name: 'Senior KG',
      icon: 'graduation',
      noteCount: 0,
      color: '#22c55e',
      backgroundColor: '#f0fdf4',
      tagColor: '#dcfce7'
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNoteCounts = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from('notes')
        .select('educational_level');

      if (error) {
        throw error;
      }

      const counts: { [key: string]: number } = {};
      data.forEach(note => {
        if (note.educational_level) {
          counts[note.educational_level] = (counts[note.educational_level] || 0) + 1;
        }
      });

      setEducationalLevels(prevLevels =>
        prevLevels.map(level => ({
          ...level,
          noteCount: counts[level.id] || 0,
        }))
      );
    } catch (err: any) {
      console.error('Error fetching note counts:', err);
      setError('Failed to load note counts.');
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchNoteCounts();
    }, [])
  );

  const handleLevelPress = (levelId: string, levelName: string) => {
    router.push({
      pathname: '/subjects',
      params: { educationalLevel: levelId, educationalLevelName: levelName },
    } as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.push('/(tabs)/home')}>
          <Ionicons name="arrow-back" size={24} color="#374151" />
        </TouchableOpacity>
        <View style={styles.headerTitleWrapper}>
          <Text style={styles.headerTitle}>Notes</Text>
        </View>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {loading && <Text>Loading...</Text>}
        {error && <Text>{error}</Text>}
        {!loading && !error && educationalLevels.map((level) => (
          <TouchableOpacity
            key={level.id}
            style={[
              styles.subjectCard,
              { backgroundColor: level.backgroundColor }
            ]}
            onPress={() => handleLevelPress(level.id, level.name)}
          >
            <View style={styles.cardContent}>
              <View style={styles.leftSection}>
                <View style={[styles.iconContainer, { backgroundColor: level.color }]}>
                  <Ionicons name={level.icon as any} size={24} color="white" />
                </View>
                <View style={styles.textSection}>
                  <Text style={styles.subjectName}>{level.name}</Text>
                  <View style={[styles.noteCountTag, { backgroundColor: level.tagColor }]}>
                    <Text style={[styles.noteCountText, { color: level.color }]}>
                      {level.noteCount} notes
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
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headerRight: {
    flex: 1,
  },
  backButton: {
    padding: 8,
    zIndex: 10,
    position: 'relative',
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
    textAlign: 'center',
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
    shadowOffset: {
      width: 0,
      height: 2,
    },
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
});
