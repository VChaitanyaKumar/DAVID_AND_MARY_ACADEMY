import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const NAVY = '#001F54';

const educationalLevels = [
  { id: 'playgroup', name: 'Play Group' },
  { id: 'prekg', name: 'Pre KG' },
  { id: 'juniorkg', name: 'Junior KG' },
  { id: 'seniorkg', name: 'Senior KG' },
];

export default function ClassAttendance() {
  const router = useRouter();
  const params = useLocalSearchParams<{ initialView?: string }>();
  const [showLevels, setShowLevels] = useState(params.initialView === 'levels');
  const [attendanceMode, setAttendanceMode] = useState<'take' | 'save'>('take');

  const handleLevelSelect = (levelId: string) => {
    const pathname = attendanceMode === 'take' ? '/student-attendance' : '/edit-attendance-list';
    router.push({
      pathname,
      params: { educationalLevel: levelId },
    });
  };

  const handleBackPress = () => {
    if (showLevels) {
      setShowLevels(false);
    } else {
      router.back();
    }
  };

  const renderGridItem = ({ item }: { item: { id: string; name: string } }) => (
    <TouchableOpacity
      style={styles.gridItem}
      onPress={() => handleLevelSelect(item.id)}
    >
      <Text style={styles.gridText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={styles.backArrow}
            onPress={handleBackPress}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="arrow-back" size={28} color={'#111'} />
          </TouchableOpacity>
          <Text style={styles.pageTitle}>Class Attendance</Text>
        </View>

        {showLevels ? (
          <FlatList
            data={educationalLevels}
            renderItem={renderGridItem}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={styles.row}
            scrollEnabled={false}
          />
        ) : (
          <View style={styles.optionsContainer}>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => {
                setAttendanceMode('take');
                setShowLevels(true);
              }}
            >
              <Text style={styles.optionText}>Take Attendance</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => {
                setAttendanceMode('save');
                setShowLevels(true);
              }}
            >
              <Text style={styles.optionText}>Attendance Records</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFF',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 24,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 18,
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  pageTitle: {
    color: '#111',
    fontWeight: 'bold',
    fontSize: 22,
    marginLeft: 16,
  },
  backArrow: {
    padding: 6,
  },
  row: {
    flex: 1,
    justifyContent: 'space-around',
    marginHorizontal: 12,
  },
  gridItem: {
    flex: 1,
    margin: 8,
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingVertical: 24,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    minHeight: 120,
  },
  gridText: {
    color: NAVY,
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
  optionsContainer: {
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  optionButton: {
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    marginBottom: 16,
  },
  optionText: {
    color: NAVY,
    fontWeight: 'bold',
    fontSize: 18,
  },
});
