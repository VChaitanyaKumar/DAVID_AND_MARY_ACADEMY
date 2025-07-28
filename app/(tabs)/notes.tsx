import { Ionicons } from '@expo/vector-icons';
import { router, useFocusEffect } from 'expo-router';
import React, { useRef, useState } from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function NotesScreen() {
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const scrollRef = useRef<ScrollView>(null);

  useFocusEffect(
    React.useCallback(() => {
      setSelectedLevel(null);
      setSelectedSubject(null);
      // Scroll to top when tab is focused
      if (scrollRef.current) {
        scrollRef.current.scrollTo({ y: 0, animated: false });
      }
    }, [])
  );

  const educationalLevels = [
    {
      id: 'playgroup',
      name: 'Play Group',
      icon: 'happy',
      noteCount: 8,
      color: '#ec4899',
      backgroundColor: '#fdf2f8',
      tagColor: '#fce7f3'
    },
    {
      id: 'prekg',
      name: 'Pre KG',
      icon: 'school',
      noteCount: 12,
      color: '#8b5cf6',
      backgroundColor: '#faf5ff',
      tagColor: '#e9d5ff'
    },
    {
      id: 'juniorkg',
      name: 'Junior KG',
      icon: 'library',
      noteCount: 15,
      color: '#3b82f6',
      backgroundColor: '#eff6ff',
      tagColor: '#dbeafe'
    },
    {
      id: 'seniorkg',
      name: 'Senior KG',
      icon: 'graduation',
      noteCount: 18,
      color: '#22c55e',
      backgroundColor: '#f0fdf4',
      tagColor: '#dcfce7'
    }
  ];

  const subjectsByLevel = {
    playgroup: [
      {
        id: 'storytime',
        name: 'Story Time',
        icon: 'library',
        noteCount: 3,
        color: '#8b5cf6',
        backgroundColor: '#faf5ff',
        tagColor: '#e9d5ff'
      },
      {
        id: 'artcraft',
        name: 'Art & Craft',
        icon: 'brush',
        noteCount: 2,
        color: '#ec4899',
        backgroundColor: '#fdf2f8',
        tagColor: '#fce7f3'
      },
      {
        id: 'music',
        name: 'Music & Movement',
        icon: 'musical-notes',
        noteCount: 2,
        color: '#f59e0b',
        backgroundColor: '#fffbeb',
        tagColor: '#fef3c7'
      },
      {
        id: 'play',
        name: 'Play & Learn',
        icon: 'game-controller',
        noteCount: 1,
        color: '#22c55e',
        backgroundColor: '#f0fdf4',
        tagColor: '#dcfce7'
      }
    ],
    prekg: [
      {
        id: 'phonics',
        name: 'Phonics',
        icon: 'text',
        noteCount: 4,
        color: '#8b5cf6',
        backgroundColor: '#faf5ff',
        tagColor: '#e9d5ff'
      },
      {
        id: 'counting',
        name: 'Counting',
        icon: 'calculator',
        noteCount: 3,
        color: '#3b82f6',
        backgroundColor: '#eff6ff',
        tagColor: '#dbeafe'
      },
      {
        id: 'shapes',
        name: 'Shapes & Colors',
        icon: 'color-palette',
        noteCount: 2,
        color: '#ec4899',
        backgroundColor: '#fdf2f8',
        tagColor: '#fce7f3'
      },
      {
        id: 'writing',
        name: 'Letter Writing',
        icon: 'create',
        noteCount: 3,
        color: '#f97316',
        backgroundColor: '#fff7ed',
        tagColor: '#fed7aa'
      }
    ],
    juniorkg: [
      {
        id: 'english',
        name: 'English',
        icon: 'book',
        noteCount: 5,
        color: '#8b5cf6',
        backgroundColor: '#faf5ff',
        tagColor: '#e9d5ff'
      },
      {
        id: 'hindi',
        name: 'Hindi',
        icon: 'language',
        noteCount: 4,
        color: '#f97316',
        backgroundColor: '#fff7ed',
        tagColor: '#fed7aa'
      },
      {
        id: 'math',
        name: 'Mathematics',
        icon: 'calculator',
        noteCount: 3,
        color: '#3b82f6',
        backgroundColor: '#eff6ff',
        tagColor: '#dbeafe'
      },
      {
        id: 'environmental',
        name: 'Environmental Studies',
        icon: 'earth',
        noteCount: 3,
        color: '#22c55e',
        backgroundColor: '#f0fdf4',
        tagColor: '#dcfce7'
      }
    ],
    seniorkg: [
      {
        id: 'english_advanced',
        name: 'English Grammar',
        icon: 'text',
        noteCount: 6,
        color: '#8b5cf6',
        backgroundColor: '#faf5ff',
        tagColor: '#e9d5ff'
      },
      {
        id: 'hindi_advanced',
        name: 'Hindi Grammar',
        icon: 'language',
        noteCount: 5,
        color: '#f97316',
        backgroundColor: '#fff7ed',
        tagColor: '#fed7aa'
      },
      {
        id: 'math_advanced',
        name: 'Advanced Math',
        icon: 'analytics',
        noteCount: 4,
        color: '#3b82f6',
        backgroundColor: '#eff6ff',
        tagColor: '#dbeafe'
      },
      {
        id: 'computer',
        name: 'Computer Basics',
        icon: 'laptop',
        noteCount: 3,
        color: '#06b6d4',
        backgroundColor: '#ecfeff',
        tagColor: '#cffafe'
      }
    ]
  };

  const notesBySubject = {
    storytime: [
      { id: 1, title: 'The Three Little Pigs', date: 'March 15, 2024', content: 'Story about three little pigs and their houses...' },
      { id: 2, title: 'Goldilocks and the Three Bears', date: 'March 14, 2024', content: 'Adventure of Goldilocks in the bears\' house...' },
      { id: 3, title: 'Little Red Riding Hood', date: 'March 13, 2024', content: 'Story of a little girl and the big bad wolf...' }
    ],
    artcraft: [
      { id: 1, title: 'Finger Painting Techniques', date: 'March 15, 2024', content: 'Basic finger painting methods for young children...' },
      { id: 2, title: 'Paper Craft Ideas', date: 'March 14, 2024', content: 'Simple paper craft projects for Play Group...' }
    ],
    music: [
      { id: 1, title: 'Nursery Rhymes Collection', date: 'March 15, 2024', content: 'Popular nursery rhymes for young children...' },
      { id: 2, title: 'Movement Activities', date: 'March 14, 2024', content: 'Fun movement activities with music...' }
    ],
    play: [
      { id: 1, title: 'Building Blocks Activities', date: 'March 15, 2024', content: 'Educational activities using building blocks...' }
    ],
    phonics: [
      { id: 1, title: 'Letter A Sound', date: 'March 15, 2024', content: 'Teaching the sound of letter A...' },
      { id: 2, title: 'Letter B Sound', date: 'March 14, 2024', content: 'Teaching the sound of letter B...' },
      { id: 3, title: 'Letter C Sound', date: 'March 13, 2024', content: 'Teaching the sound of letter C...' },
      { id: 4, title: 'Letter D Sound', date: 'March 12, 2024', content: 'Teaching the sound of letter D...' }
    ],
    counting: [
      { id: 1, title: 'Numbers 1-5', date: 'March 15, 2024', content: 'Teaching numbers from 1 to 5...' },
      { id: 2, title: 'Numbers 6-10', date: 'March 14, 2024', content: 'Teaching numbers from 6 to 10...' },
      { id: 3, title: 'Counting Objects', date: 'March 13, 2024', content: 'Counting objects in daily life...' }
    ],
    shapes: [
      { id: 1, title: 'Basic Shapes', date: 'March 15, 2024', content: 'Teaching circle, square, triangle...' },
      { id: 2, title: 'Color Recognition', date: 'March 14, 2024', content: 'Learning primary colors...' }
    ],
    writing: [
      { id: 1, title: 'Letter A Writing', date: 'March 15, 2024', content: 'How to write letter A...' },
      { id: 2, title: 'Letter B Writing', date: 'March 14, 2024', content: 'How to write letter B...' },
      { id: 3, title: 'Letter C Writing', date: 'March 13, 2024', content: 'How to write letter C...' }
    ],
    english: [
      { id: 1, title: 'Simple Words Reading', date: 'March 15, 2024', content: 'Reading simple three-letter words...' },
      { id: 2, title: 'Basic Sentences', date: 'March 14, 2024', content: 'Forming basic sentences...' },
      { id: 3, title: 'Vocabulary Building', date: 'March 13, 2024', content: 'Building vocabulary through pictures...' },
      { id: 4, title: 'Story Reading', date: 'March 12, 2024', content: 'Reading simple stories...' },
      { id: 5, title: 'Writing Practice', date: 'March 11, 2024', content: 'Writing simple words and sentences...' }
    ],
    hindi: [
      { id: 1, title: 'Hindi Varnamala', date: 'March 15, 2024', content: 'Learning Hindi alphabet...' },
      { id: 2, title: 'Simple Hindi Words', date: 'March 14, 2024', content: 'Reading simple Hindi words...' },
      { id: 3, title: 'Hindi Numbers', date: 'March 13, 2024', content: 'Learning Hindi numbers 1-10...' },
      { id: 4, title: 'Hindi Writing', date: 'March 12, 2024', content: 'Writing Hindi letters...' }
    ],
    math: [
      { id: 1, title: 'Addition Basics', date: 'March 15, 2024', content: 'Simple addition with objects...' },
      { id: 2, title: 'Number Recognition', date: 'March 14, 2024', content: 'Recognizing numbers 1-20...' },
      { id: 3, title: 'Counting by 2s', date: 'March 13, 2024', content: 'Learning to count by 2s...' }
    ],
    environmental: [
      { id: 1, title: 'Plants and Trees', date: 'March 15, 2024', content: 'Learning about different plants...' },
      { id: 2, title: 'Animals Around Us', date: 'March 14, 2024', content: 'Common animals in our environment...' },
      { id: 3, title: 'Seasons', date: 'March 13, 2024', content: 'Understanding different seasons...' }
    ],
    english_advanced: [
      { id: 1, title: 'Parts of Speech', date: 'March 15, 2024', content: 'Introduction to nouns, verbs, adjectives...' },
      { id: 2, title: 'Simple Present Tense', date: 'March 14, 2024', content: 'Using simple present tense...' },
      { id: 3, title: 'Punctuation Marks', date: 'March 13, 2024', content: 'Using periods, commas, question marks...' },
      { id: 4, title: 'Story Writing', date: 'March 12, 2024', content: 'Writing simple stories...' },
      { id: 5, title: 'Reading Comprehension', date: 'March 11, 2024', content: 'Understanding what we read...' },
      { id: 6, title: 'Vocabulary Enhancement', date: 'March 10, 2024', content: 'Learning new words and meanings...' }
    ],
    hindi_advanced: [
      { id: 1, title: 'Hindi Grammar Rules', date: 'March 15, 2024', content: 'Basic Hindi grammar concepts...' },
      { id: 2, title: 'Hindi Sentences', date: 'March 14, 2024', content: 'Forming Hindi sentences...' },
      { id: 3, title: 'Hindi Story Reading', date: 'March 13, 2024', content: 'Reading Hindi stories...' },
      { id: 4, title: 'Hindi Essay Writing', date: 'March 12, 2024', content: 'Writing simple Hindi essays...' },
      { id: 5, title: 'Hindi Vocabulary', date: 'March 11, 2024', content: 'Building Hindi vocabulary...' }
    ],
    math_advanced: [
      { id: 1, title: 'Addition and Subtraction', date: 'March 15, 2024', content: 'Solving addition and subtraction problems...' },
      { id: 2, title: 'Number Patterns', date: 'March 14, 2024', content: 'Understanding number patterns...' },
      { id: 3, title: 'Mental Math', date: 'March 13, 2024', content: 'Quick mental calculations...' },
      { id: 4, title: 'Problem Solving', date: 'March 12, 2024', content: 'Solving simple word problems...' }
    ],
    computer: [
      { id: 1, title: 'Computer Parts', date: 'March 15, 2024', content: 'Learning about computer components...' },
      { id: 2, title: 'Mouse and Keyboard', date: 'March 14, 2024', content: 'Using mouse and keyboard...' },
      { id: 3, title: 'Basic Drawing', date: 'March 13, 2024', content: 'Drawing on computer...' }
    ]
  };

  const handleLevelPress = (levelId: string) => {
    setSelectedLevel(selectedLevel === levelId ? null : levelId);
    setSelectedSubject(null);
  };

  const handleSubjectPress = (subjectId: string) => {
    setSelectedSubject(selectedSubject === subjectId ? null : subjectId);
  };

  const handleAddNote = () => {
    router.push('/add-note' as any);
  };

  const handleBackToLevels = () => {
    setSelectedLevel(null);
    setSelectedSubject(null);
  };

  const handleBackToSubjects = () => {
    setSelectedSubject(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      
      {/* Header */}
      <View style={styles.header}>
        {selectedLevel === null ? (
          <TouchableOpacity style={styles.backButton} onPress={() => router.push('/(tabs)/home')}>
            <Ionicons name="arrow-back" size={24} color="#374151" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.backButton} onPress={() => setSelectedLevel(null)}>
              <Ionicons name="arrow-back" size={24} color="#374151" />
            </TouchableOpacity>
          )}
        <View style={styles.headerTitleWrapper}>
          <Text style={styles.headerTitle}>Notes</Text>
        </View>
        <View style={styles.headerRight} />
      </View>

      {/* Content */}
      <ScrollView ref={scrollRef} style={styles.content} showsVerticalScrollIndicator={false}>
        {!selectedLevel && !selectedSubject && (
          // Show Educational Levels
          educationalLevels.map((level) => (
            <TouchableOpacity
              key={level.id}
              style={[
                styles.subjectCard,
                { backgroundColor: level.backgroundColor }
              ]}
              onPress={() => handleLevelPress(level.id)}
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
          ))
        )}

        {selectedLevel && !selectedSubject && (
          // Show Subjects for selected level
          subjectsByLevel[selectedLevel as keyof typeof subjectsByLevel]?.map((subject) => (
            <TouchableOpacity
              key={subject.id}
              style={[
                styles.subjectCard,
                { backgroundColor: subject.backgroundColor }
              ]}
              onPress={() => handleSubjectPress(subject.id)}
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
          ))
        )}

        {selectedSubject && (
          // Show Notes for selected subject
          notesBySubject[selectedSubject as keyof typeof notesBySubject]?.map((note) => (
            <View key={note.id} style={styles.noteCard}>
              <Text style={styles.noteTitle}>{note.title}</Text>
              <Text style={styles.noteDate}>{note.date}</Text>
              <Text style={styles.noteContent}>{note.content}</Text>
            </View>
          ))
        )}
      </ScrollView>

      {/* Floating Action Button */}
      {selectedLevel && !selectedSubject && (
        <TouchableOpacity style={styles.fab} onPress={() => router.push({ pathname: '/add-note' as any, params: { educationalLevel: selectedLevel } })}>
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      )}
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
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
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
  expandedContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
  },
  expandedText: {
    fontSize: 14,
    color: '#6b7280',
    fontStyle: 'italic',
  },
  noteCard: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
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