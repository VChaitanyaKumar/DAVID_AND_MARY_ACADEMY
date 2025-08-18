import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const educationalLevels = [
  {
    name: 'Play Group',
    icon: 'school' as const,
    color: '#f9b949',
    backgroundColor: '#fff8eb',
    subtitle: 'No tasks',
  },
  {
    name: 'Pre KG',
    icon: 'school' as const,
    color: '#4a89f3',
    backgroundColor: '#eaf2ff',
    subtitle: 'No tasks',
  },
  {
    name: 'Junior KG',
    icon: 'school' as const,
    color: '#34c759',
    backgroundColor: '#eafff2',
    subtitle: 'No tasks',
  },
  {
    name: 'Senior KG',
    icon: 'school' as const,
    color: '#af52de',
    backgroundColor: '#f6eaff',
    subtitle: 'No tasks',
  },
];

export default function ClassDirectoryScreen() {
  const handleLevelPress = (levelName: string) => {
    router.push({ 
      pathname: '/student-list',
      params: { level: levelName },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => router.push('/(tabs)/home')} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#1e3a8a" />
        </TouchableOpacity>
        <Text style={styles.header}>Student Directory</Text>
        <View style={styles.headerRight} />
      </View>
      <FlatList
        data={educationalLevels}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.levelCard} onPress={() => handleLevelPress(item.name)}>
            <View style={[styles.iconContainer, { backgroundColor: item.backgroundColor }]}>
              <Ionicons name={item.icon} size={24} color={item.color} />
            </View>
            <View style={styles.levelInfo}>
              <Text style={styles.levelName}>{item.name}</Text>
              <Text style={styles.levelSubtitle}>{item.subtitle}</Text>
            </View>
            <Ionicons name="chevron-forward" size={22} color="#d1d5db" />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa', padding: 16 },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    backgroundColor: '#f8f9fa',
  },
  backButton: {
    padding: 8,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1e3a8a',
  },
  headerRight: {
    width: 40,
  },
  levelCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  levelInfo: {
    flex: 1,
  },
  levelName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  levelSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
  },
}); 