import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useFocusEffect } from 'expo-router';

export default function TimetableScreen() {
  const [selectedDay, setSelectedDay] = useState('Mon');
  const [selectedLevel, setSelectedLevel] = useState('Play Group');
  const [showLevels, setShowLevels] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      setShowLevels(true);
      setSelectedDay('Mon');
      setSelectedLevel('Play Group');
    }, [])
  );

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const educationalLevels = ['Play Group', 'Pre KG', 'Junior KG', 'Senior KG'];
  
  const getClassColor = (className: string) => {
    const classColorMap: { [key: string]: string } = {
      'Play Group': '#f59e0b', // Orange
      'Pre KG': '#3b82f6',     // Blue
      'Junior KG': '#22c55e',  // Green
      'Senior KG': '#8b5cf6',  // Purple
    };
    return classColorMap[className] || '#6b7280';
  };
  
  const weeklySchedule = {
    'Play Group': {
      Mon: [
    {
      id: 1,
          subject: 'Story Time',
          time: '09:00 - 09:30',
          location: 'Story Corner',
          tag: 'Language',
          tagColor: '#8b5cf6',
          backgroundColor: '#faf5ff',
        },
        {
          id: 2,
          subject: 'Play & Learn',
          time: '09:30 - 10:00',
          location: 'Play Area',
          tag: 'Activity',
          tagColor: '#22c55e',
          backgroundColor: '#f0fdf4',
        },
        {
          id: 3,
          subject: 'Snack Time',
          time: '10:00 - 10:15',
          location: 'Dining Area',
          tag: 'Break',
          tagColor: '#f59e0b',
          backgroundColor: '#fffbeb',
        },
        {
          id: 4,
          subject: 'Music & Movement',
          time: '10:15 - 10:45',
          location: 'Activity Room',
          tag: 'Creative',
          tagColor: '#ec4899',
          backgroundColor: '#fdf2f8',
        },
        {
          id: 5,
          subject: 'Art & Craft',
          time: '10:45 - 11:15',
          location: 'Art Corner',
          tag: 'Creative',
          tagColor: '#ec4899',
          backgroundColor: '#fdf2f8',
        },
      ],
      Tue: [
        {
          id: 6,
          subject: 'Rhymes & Songs',
          time: '09:00 - 09:30',
          location: 'Music Room',
          tag: 'Language',
          tagColor: '#8b5cf6',
          backgroundColor: '#faf5ff',
        },
        {
          id: 7,
          subject: 'Building Blocks',
          time: '09:30 - 10:00',
          location: 'Play Area',
          tag: 'Activity',
          tagColor: '#22c55e',
          backgroundColor: '#f0fdf4',
        },
        {
          id: 8,
          subject: 'Snack Time',
          time: '10:00 - 10:15',
          location: 'Dining Area',
          tag: 'Break',
          tagColor: '#f59e0b',
          backgroundColor: '#fffbeb',
        },
        {
          id: 9,
          subject: 'Outdoor Play',
          time: '10:15 - 10:45',
          location: 'Garden',
          tag: 'Physical',
          tagColor: '#ef4444',
          backgroundColor: '#fef2f2',
        },
        {
          id: 10,
          subject: 'Coloring Time',
          time: '10:45 - 11:15',
          location: 'Art Corner',
          tag: 'Creative',
          tagColor: '#ec4899',
          backgroundColor: '#fdf2f8',
        },
      ],
      Wed: [
        {
          id: 11,
          subject: 'Picture Talk',
          time: '09:00 - 09:30',
          location: 'Story Corner',
          tag: 'Language',
          tagColor: '#8b5cf6',
          backgroundColor: '#faf5ff',
        },
        {
          id: 12,
          subject: 'Puzzle Time',
          time: '09:30 - 10:00',
          location: 'Play Area',
          tag: 'Activity',
          tagColor: '#22c55e',
          backgroundColor: '#f0fdf4',
        },
        {
          id: 13,
          subject: 'Snack Time',
          time: '10:00 - 10:15',
          location: 'Dining Area',
          tag: 'Break',
          tagColor: '#f59e0b',
          backgroundColor: '#fffbeb',
        },
        {
          id: 14,
          subject: 'Dance & Movement',
          time: '10:15 - 10:45',
          location: 'Activity Room',
          tag: 'Creative',
          tagColor: '#ec4899',
          backgroundColor: '#fdf2f8',
        },
        {
          id: 15,
          subject: 'Clay Modeling',
          time: '10:45 - 11:15',
          location: 'Art Corner',
          tag: 'Creative',
          tagColor: '#ec4899',
          backgroundColor: '#fdf2f8',
        },
      ],
      Thu: [
        {
          id: 16,
          subject: 'Alphabet Fun',
          time: '09:00 - 09:30',
          location: 'Learning Corner',
          tag: 'Language',
          tagColor: '#8b5cf6',
          backgroundColor: '#faf5ff',
        },
        {
          id: 17,
          subject: 'Toy Time',
          time: '09:30 - 10:00',
          location: 'Play Area',
          tag: 'Activity',
          tagColor: '#22c55e',
          backgroundColor: '#f0fdf4',
        },
        {
          id: 18,
          subject: 'Snack Time',
          time: '10:00 - 10:15',
          location: 'Dining Area',
          tag: 'Break',
          tagColor: '#f59e0b',
          backgroundColor: '#fffbeb',
        },
        {
          id: 19,
          subject: 'Indoor Games',
          time: '10:15 - 10:45',
          location: 'Activity Room',
          tag: 'Physical',
          tagColor: '#ef4444',
          backgroundColor: '#fef2f2',
        },
        {
          id: 20,
          subject: 'Paper Craft',
          time: '10:45 - 11:15',
          location: 'Art Corner',
          tag: 'Creative',
          tagColor: '#ec4899',
          backgroundColor: '#fdf2f8',
        },
      ],
      Fri: [
        {
          id: 21,
          subject: 'Number Fun',
          time: '09:00 - 09:30',
          location: 'Learning Corner',
          tag: 'Math',
          tagColor: '#3b82f6',
          backgroundColor: '#eff6ff',
        },
        {
          id: 22,
          subject: 'Sand Play',
          time: '09:30 - 10:00',
          location: 'Sand Pit',
          tag: 'Activity',
          tagColor: '#22c55e',
          backgroundColor: '#f0fdf4',
        },
        {
          id: 23,
          subject: 'Snack Time',
          time: '10:00 - 10:15',
          location: 'Dining Area',
          tag: 'Break',
          tagColor: '#f59e0b',
          backgroundColor: '#fffbeb',
        },
        {
          id: 24,
          subject: 'Water Play',
          time: '10:15 - 10:45',
          location: 'Water Area',
          tag: 'Activity',
          tagColor: '#22c55e',
          backgroundColor: '#f0fdf4',
        },
        {
          id: 25,
          subject: 'Drawing Time',
          time: '10:45 - 11:15',
          location: 'Art Corner',
          tag: 'Creative',
          tagColor: '#ec4899',
          backgroundColor: '#fdf2f8',
        },
      ],
      Sat: [
        {
          id: 26,
          subject: 'Show & Tell',
          time: '09:00 - 09:30',
          location: 'Story Corner',
          tag: 'Language',
          tagColor: '#8b5cf6',
          backgroundColor: '#faf5ff',
        },
        {
          id: 27,
          subject: 'Free Play',
          time: '09:30 - 10:00',
          location: 'Play Area',
          tag: 'Activity',
          tagColor: '#22c55e',
          backgroundColor: '#f0fdf4',
        },
        {
          id: 28,
          subject: 'Snack Time',
          time: '10:00 - 10:15',
          location: 'Dining Area',
          tag: 'Break',
          tagColor: '#f59e0b',
          backgroundColor: '#fffbeb',
        },
        {
          id: 29,
          subject: 'Rhythm & Beats',
          time: '10:15 - 10:45',
          location: 'Music Room',
          tag: 'Creative',
          tagColor: '#ec4899',
          backgroundColor: '#fdf2f8',
        },
      ],
    },
    'Pre KG': {
      Mon: [
        {
          id: 30,
          subject: 'Phonics Introduction',
          time: '09:00 - 09:30',
          location: 'Learning Corner',
          tag: 'Language',
          tagColor: '#8b5cf6',
          backgroundColor: '#faf5ff',
        },
        {
          id: 31,
          subject: 'Counting Numbers',
          time: '09:30 - 10:00',
          location: 'Math Corner',
          tag: 'Math',
          tagColor: '#3b82f6',
          backgroundColor: '#eff6ff',
        },
        {
          id: 32,
          subject: 'Snack Time',
          time: '10:00 - 10:15',
          location: 'Dining Area',
          tag: 'Break',
          tagColor: '#f59e0b',
          backgroundColor: '#fffbeb',
        },
        {
          id: 33,
          subject: 'Physical Activities',
          time: '10:15 - 10:45',
          location: 'Activity Room',
          tag: 'Physical',
          tagColor: '#ef4444',
          backgroundColor: '#fef2f2',
        },
        {
          id: 34,
          subject: 'Creative Art',
          time: '10:45 - 11:15',
          location: 'Art Corner',
          tag: 'Creative',
          tagColor: '#ec4899',
          backgroundColor: '#fdf2f8',
        },
      ],
      Tue: [
        {
          id: 35,
          subject: 'Story Reading',
          time: '09:00 - 09:30',
          location: 'Story Corner',
          tag: 'Language',
          tagColor: '#8b5cf6',
          backgroundColor: '#faf5ff',
        },
        {
          id: 36,
          subject: 'Shape Recognition',
          time: '09:30 - 10:00',
          location: 'Math Corner',
          tag: 'Math',
          tagColor: '#3b82f6',
          backgroundColor: '#eff6ff',
        },
        {
          id: 37,
          subject: 'Snack Time',
          time: '10:00 - 10:15',
          location: 'Dining Area',
          tag: 'Break',
          tagColor: '#f59e0b',
          backgroundColor: '#fffbeb',
        },
        {
          id: 38,
          subject: 'Outdoor Games',
          time: '10:15 - 10:45',
          location: 'Garden',
          tag: 'Physical',
          tagColor: '#ef4444',
          backgroundColor: '#fef2f2',
        },
        {
          id: 39,
          subject: 'Craft Work',
          time: '10:45 - 11:15',
          location: 'Art Corner',
          tag: 'Creative',
          tagColor: '#ec4899',
          backgroundColor: '#fdf2f8',
        },
      ],
      Wed: [
        {
          id: 40,
          subject: 'Rhymes & Songs',
          time: '09:00 - 09:30',
          location: 'Music Room',
          tag: 'Language',
          tagColor: '#8b5cf6',
          backgroundColor: '#faf5ff',
        },
        {
          id: 41,
          subject: 'Color Recognition',
          time: '09:30 - 10:00',
          location: 'Learning Corner',
          tag: 'Activity',
          tagColor: '#22c55e',
          backgroundColor: '#f0fdf4',
        },
        {
          id: 42,
          subject: 'Snack Time',
          time: '10:00 - 10:15',
          location: 'Dining Area',
          tag: 'Break',
          tagColor: '#f59e0b',
          backgroundColor: '#fffbeb',
        },
        {
          id: 43,
          subject: 'Dance Class',
          time: '10:15 - 10:45',
          location: 'Activity Room',
          tag: 'Creative',
          tagColor: '#ec4899',
          backgroundColor: '#fdf2f8',
        },
        {
          id: 44,
          subject: 'Painting',
          time: '10:45 - 11:15',
          location: 'Art Corner',
          tag: 'Creative',
          tagColor: '#ec4899',
          backgroundColor: '#fdf2f8',
        },
      ],
      Thu: [
        {
          id: 45,
          subject: 'Letter Writing',
          time: '09:00 - 09:30',
          location: 'Learning Corner',
          tag: 'Language',
          tagColor: '#8b5cf6',
          backgroundColor: '#faf5ff',
        },
        {
          id: 46,
          subject: 'Number Writing',
          time: '09:30 - 10:00',
          location: 'Math Corner',
          tag: 'Math',
          tagColor: '#3b82f6',
          backgroundColor: '#eff6ff',
        },
        {
          id: 47,
          subject: 'Snack Time',
          time: '10:00 - 10:15',
          location: 'Dining Area',
          tag: 'Break',
          tagColor: '#f59e0b',
          backgroundColor: '#fffbeb',
        },
        {
          id: 48,
          subject: 'Indoor Sports',
          time: '10:15 - 10:45',
          location: 'Activity Room',
          tag: 'Physical',
          tagColor: '#ef4444',
          backgroundColor: '#fef2f2',
        },
        {
          id: 49,
          subject: 'Clay Work',
          time: '10:45 - 11:15',
          location: 'Art Corner',
          tag: 'Creative',
          tagColor: '#ec4899',
          backgroundColor: '#fdf2f8',
        },
      ],
      Fri: [
        {
          id: 50,
          subject: 'Word Building',
          time: '09:00 - 09:30',
          location: 'Learning Corner',
          tag: 'Language',
          tagColor: '#8b5cf6',
          backgroundColor: '#faf5ff',
        },
        {
          id: 51,
          subject: 'Simple Addition',
          time: '09:30 - 10:00',
          location: 'Math Corner',
          tag: 'Math',
          tagColor: '#3b82f6',
          backgroundColor: '#eff6ff',
        },
        {
          id: 52,
          subject: 'Snack Time',
          time: '10:00 - 10:15',
          location: 'Dining Area',
          tag: 'Break',
          tagColor: '#f59e0b',
          backgroundColor: '#fffbeb',
        },
        {
          id: 53,
          subject: 'Yoga for Kids',
          time: '10:15 - 10:45',
          location: 'Activity Room',
          tag: 'Physical',
          tagColor: '#ef4444',
          backgroundColor: '#fef2f2',
        },
        {
          id: 54,
          subject: 'Paper Craft',
          time: '10:45 - 11:15',
          location: 'Art Corner',
          tag: 'Creative',
          tagColor: '#ec4899',
          backgroundColor: '#fdf2f8',
        },
      ],
      Sat: [
        {
          id: 55,
          subject: 'Show & Tell',
          time: '09:00 - 09:30',
          location: 'Story Corner',
          tag: 'Language',
          tagColor: '#8b5cf6',
          backgroundColor: '#faf5ff',
        },
        {
          id: 56,
          subject: 'Puzzle Solving',
          time: '09:30 - 10:00',
          location: 'Learning Corner',
          tag: 'Activity',
          tagColor: '#22c55e',
          backgroundColor: '#f0fdf4',
        },
        {
          id: 57,
          subject: 'Snack Time',
          time: '10:00 - 10:15',
          location: 'Dining Area',
          tag: 'Break',
          tagColor: '#f59e0b',
          backgroundColor: '#fffbeb',
        },
        {
          id: 58,
          subject: 'Music & Movement',
          time: '10:15 - 10:45',
          location: 'Music Room',
          tag: 'Creative',
          tagColor: '#ec4899',
          backgroundColor: '#fdf2f8',
        },
      ],
    },
    'Junior KG': {
      Mon: [
        {
          id: 59,
          subject: 'English Reading',
          time: '09:00 - 09:30',
          location: 'Learning Corner',
          tag: 'Language',
          tagColor: '#8b5cf6',
          backgroundColor: '#faf5ff',
        },
        {
          id: 60,
      subject: 'Mathematics',
          time: '09:30 - 10:00',
          location: 'Math Corner',
          tag: 'Math',
      tagColor: '#3b82f6',
      backgroundColor: '#eff6ff',
    },
    {
          id: 61,
          subject: 'Snack Time',
          time: '10:00 - 10:15',
          location: 'Dining Area',
          tag: 'Break',
          tagColor: '#f59e0b',
          backgroundColor: '#fffbeb',
        },
        {
          id: 62,
          subject: 'Physical Education',
          time: '10:15 - 10:45',
          location: 'Activity Room',
          tag: 'Physical',
          tagColor: '#ef4444',
          backgroundColor: '#fef2f2',
        },
        {
          id: 63,
          subject: 'Art & Craft',
          time: '10:45 - 11:15',
          location: 'Art Corner',
          tag: 'Creative',
          tagColor: '#ec4899',
          backgroundColor: '#fdf2f8',
        },
      ],
      Tue: [
        {
          id: 64,
          subject: 'Hindi Reading',
          time: '09:00 - 09:30',
          location: 'Learning Corner',
          tag: 'Language',
          tagColor: '#8b5cf6',
          backgroundColor: '#faf5ff',
        },
        {
          id: 65,
          subject: 'Environmental Studies',
          time: '09:30 - 10:00',
          location: 'Science Corner',
      tag: 'Science',
      tagColor: '#22c55e',
      backgroundColor: '#f0fdf4',
    },
    {
          id: 66,
          subject: 'Snack Time',
          time: '10:00 - 10:15',
          location: 'Dining Area',
      tag: 'Break',
      tagColor: '#f59e0b',
      backgroundColor: '#fffbeb',
    },
    {
          id: 67,
          subject: 'Outdoor Activities',
          time: '10:15 - 10:45',
          location: 'Garden',
          tag: 'Physical',
          tagColor: '#ef4444',
          backgroundColor: '#fef2f2',
        },
        {
          id: 68,
          subject: 'Drawing & Painting',
          time: '10:45 - 11:15',
          location: 'Art Corner',
      tag: 'Creative',
          tagColor: '#ec4899',
          backgroundColor: '#fdf2f8',
        },
      ],
      Wed: [
        {
          id: 69,
          subject: 'English Writing',
          time: '09:00 - 09:30',
          location: 'Learning Corner',
          tag: 'Language',
      tagColor: '#8b5cf6',
      backgroundColor: '#faf5ff',
    },
        {
          id: 70,
          subject: 'Number Work',
          time: '09:30 - 10:00',
          location: 'Math Corner',
          tag: 'Math',
          tagColor: '#3b82f6',
          backgroundColor: '#eff6ff',
        },
        {
          id: 71,
          subject: 'Snack Time',
          time: '10:00 - 10:15',
          location: 'Dining Area',
          tag: 'Break',
          tagColor: '#f59e0b',
          backgroundColor: '#fffbeb',
        },
        {
          id: 72,
          subject: 'Dance & Music',
          time: '10:15 - 10:45',
          location: 'Music Room',
          tag: 'Creative',
          tagColor: '#ec4899',
          backgroundColor: '#fdf2f8',
        },
        {
          id: 73,
          subject: 'Clay Modeling',
          time: '10:45 - 11:15',
          location: 'Art Corner',
          tag: 'Creative',
          tagColor: '#ec4899',
          backgroundColor: '#fdf2f8',
        },
      ],
      Thu: [
        {
          id: 74,
          subject: 'Hindi Writing',
          time: '09:00 - 09:30',
          location: 'Learning Corner',
          tag: 'Language',
          tagColor: '#8b5cf6',
          backgroundColor: '#faf5ff',
        },
        {
          id: 75,
          subject: 'General Knowledge',
          time: '09:30 - 10:00',
          location: 'Learning Corner',
          tag: 'Knowledge',
          tagColor: '#06b6d4',
          backgroundColor: '#ecfeff',
        },
        {
          id: 76,
          subject: 'Snack Time',
          time: '10:00 - 10:15',
          location: 'Dining Area',
          tag: 'Break',
          tagColor: '#f59e0b',
          backgroundColor: '#fffbeb',
        },
        {
          id: 77,
          subject: 'Indoor Games',
          time: '10:15 - 10:45',
          location: 'Activity Room',
          tag: 'Physical',
          tagColor: '#ef4444',
          backgroundColor: '#fef2f2',
        },
        {
          id: 78,
          subject: 'Paper Craft',
          time: '10:45 - 11:15',
          location: 'Art Corner',
          tag: 'Creative',
          tagColor: '#ec4899',
          backgroundColor: '#fdf2f8',
        },
      ],
      Fri: [
        {
          id: 79,
          subject: 'Story Time',
          time: '09:00 - 09:30',
          location: 'Story Corner',
          tag: 'Language',
          tagColor: '#8b5cf6',
          backgroundColor: '#faf5ff',
        },
        {
          id: 80,
          subject: 'Mental Math',
          time: '09:30 - 10:00',
          location: 'Math Corner',
          tag: 'Math',
          tagColor: '#3b82f6',
          backgroundColor: '#eff6ff',
        },
        {
          id: 81,
          subject: 'Snack Time',
          time: '10:00 - 10:15',
          location: 'Dining Area',
          tag: 'Break',
          tagColor: '#f59e0b',
          backgroundColor: '#fffbeb',
        },
        {
          id: 82,
          subject: 'Yoga & Exercise',
          time: '10:15 - 10:45',
          location: 'Activity Room',
          tag: 'Physical',
          tagColor: '#ef4444',
          backgroundColor: '#fef2f2',
        },
        {
          id: 83,
          subject: 'Creative Art',
          time: '10:45 - 11:15',
          location: 'Art Corner',
          tag: 'Creative',
          tagColor: '#ec4899',
          backgroundColor: '#fdf2f8',
        },
      ],
      Sat: [
        {
          id: 84,
          subject: 'Rhymes & Songs',
          time: '09:00 - 09:30',
          location: 'Music Room',
          tag: 'Language',
          tagColor: '#8b5cf6',
          backgroundColor: '#faf5ff',
        },
        {
          id: 85,
          subject: 'Activity Time',
          time: '09:30 - 10:00',
          location: 'Learning Corner',
          tag: 'Activity',
          tagColor: '#22c55e',
          backgroundColor: '#f0fdf4',
        },
        {
          id: 86,
          subject: 'Snack Time',
          time: '10:00 - 10:15',
          location: 'Dining Area',
          tag: 'Break',
          tagColor: '#f59e0b',
          backgroundColor: '#fffbeb',
        },
        {
          id: 87,
          subject: 'Free Play',
          time: '10:15 - 10:45',
          location: 'Play Area',
          tag: 'Activity',
          tagColor: '#22c55e',
          backgroundColor: '#f0fdf4',
        },
      ],
    },
    'Senior KG': {
      Mon: [
        {
          id: 88,
          subject: 'English Grammar',
          time: '09:00 - 09:30',
          location: 'Learning Corner',
          tag: 'Language',
          tagColor: '#8b5cf6',
          backgroundColor: '#faf5ff',
        },
        {
          id: 89,
          subject: 'Advanced Math',
          time: '09:30 - 10:00',
          location: 'Math Corner',
          tag: 'Math',
          tagColor: '#3b82f6',
          backgroundColor: '#eff6ff',
        },
        {
          id: 90,
          subject: 'Snack Time',
          time: '10:00 - 10:15',
          location: 'Dining Area',
          tag: 'Break',
          tagColor: '#f59e0b',
          backgroundColor: '#fffbeb',
        },
        {
          id: 91,
          subject: 'Physical Training',
          time: '10:15 - 10:45',
          location: 'Activity Room',
          tag: 'Physical',
          tagColor: '#ef4444',
          backgroundColor: '#fef2f2',
        },
        {
          id: 92,
          subject: 'Advanced Art',
          time: '10:45 - 11:15',
          location: 'Art Corner',
          tag: 'Creative',
          tagColor: '#ec4899',
          backgroundColor: '#fdf2f8',
        },
      ],
      Tue: [
        {
          id: 93,
          subject: 'Hindi Grammar',
          time: '09:00 - 09:30',
          location: 'Learning Corner',
          tag: 'Language',
          tagColor: '#8b5cf6',
          backgroundColor: '#faf5ff',
        },
        {
          id: 94,
          subject: 'Science Activities',
          time: '09:30 - 10:00',
          location: 'Science Corner',
          tag: 'Science',
          tagColor: '#22c55e',
          backgroundColor: '#f0fdf4',
        },
        {
          id: 95,
          subject: 'Snack Time',
          time: '10:00 - 10:15',
          location: 'Dining Area',
          tag: 'Break',
          tagColor: '#f59e0b',
          backgroundColor: '#fffbeb',
        },
        {
          id: 96,
          subject: 'Sports Activities',
          time: '10:15 - 10:45',
          location: 'Garden',
          tag: 'Physical',
          tagColor: '#ef4444',
          backgroundColor: '#fef2f2',
        },
        {
          id: 97,
          subject: 'Craft & Design',
          time: '10:45 - 11:15',
          location: 'Art Corner',
          tag: 'Creative',
          tagColor: '#ec4899',
          backgroundColor: '#fdf2f8',
        },
      ],
      Wed: [
        {
          id: 98,
          subject: 'English Composition',
          time: '09:00 - 09:30',
          location: 'Learning Corner',
          tag: 'Language',
          tagColor: '#8b5cf6',
          backgroundColor: '#faf5ff',
        },
        {
          id: 99,
          subject: 'Problem Solving',
          time: '09:30 - 10:00',
          location: 'Math Corner',
          tag: 'Math',
          tagColor: '#3b82f6',
          backgroundColor: '#eff6ff',
        },
        {
          id: 100,
          subject: 'Snack Time',
          time: '10:00 - 10:15',
          location: 'Dining Area',
          tag: 'Break',
          tagColor: '#f59e0b',
          backgroundColor: '#fffbeb',
        },
        {
          id: 101,
          subject: 'Music & Dance',
          time: '10:15 - 10:45',
          location: 'Music Room',
          tag: 'Creative',
          tagColor: '#ec4899',
          backgroundColor: '#fdf2f8',
        },
        {
          id: 102,
          subject: 'Advanced Craft',
          time: '10:45 - 11:15',
          location: 'Art Corner',
          tag: 'Creative',
          tagColor: '#ec4899',
          backgroundColor: '#fdf2f8',
        },
      ],
      Thu: [
        {
          id: 103,
          subject: 'Hindi Composition',
          time: '09:00 - 09:30',
          location: 'Learning Corner',
          tag: 'Language',
          tagColor: '#8b5cf6',
          backgroundColor: '#faf5ff',
        },
        {
          id: 104,
          subject: 'Computer Basics',
          time: '09:30 - 10:00',
          location: 'Computer Lab',
          tag: 'Technology',
          tagColor: '#06b6d4',
          backgroundColor: '#ecfeff',
        },
        {
          id: 105,
          subject: 'Snack Time',
          time: '10:00 - 10:15',
          location: 'Dining Area',
          tag: 'Break',
          tagColor: '#f59e0b',
          backgroundColor: '#fffbeb',
        },
        {
          id: 106,
          subject: 'Indoor Sports',
          time: '10:15 - 10:45',
          location: 'Activity Room',
          tag: 'Physical',
          tagColor: '#ef4444',
          backgroundColor: '#fef2f2',
        },
        {
          id: 107,
          subject: 'Creative Design',
          time: '10:45 - 11:15',
          location: 'Art Corner',
          tag: 'Creative',
          tagColor: '#ec4899',
          backgroundColor: '#fdf2f8',
        },
      ],
      Fri: [
        {
          id: 108,
          subject: 'Story Writing',
          time: '09:00 - 09:30',
          location: 'Learning Corner',
          tag: 'Language',
          tagColor: '#8b5cf6',
          backgroundColor: '#faf5ff',
        },
        {
          id: 109,
          subject: 'Mental Arithmetic',
          time: '09:30 - 10:00',
          location: 'Math Corner',
          tag: 'Math',
          tagColor: '#3b82f6',
          backgroundColor: '#eff6ff',
        },
        {
          id: 110,
          subject: 'Snack Time',
          time: '10:00 - 10:15',
          location: 'Dining Area',
          tag: 'Break',
          tagColor: '#f59e0b',
          backgroundColor: '#fffbeb',
        },
        {
          id: 111,
          subject: 'Yoga & Meditation',
          time: '10:15 - 10:45',
          location: 'Activity Room',
          tag: 'Physical',
          tagColor: '#ef4444',
          backgroundColor: '#fef2f2',
        },
        {
          id: 112,
          subject: 'Art Exhibition',
          time: '10:45 - 11:15',
          location: 'Art Corner',
          tag: 'Creative',
          tagColor: '#ec4899',
          backgroundColor: '#fdf2f8',
        },
      ],
      Sat: [
        {
          id: 113,
          subject: 'Public Speaking',
          time: '09:00 - 09:30',
          location: 'Learning Corner',
          tag: 'Language',
          tagColor: '#8b5cf6',
          backgroundColor: '#faf5ff',
        },
        {
          id: 114,
          subject: 'Quiz Time',
          time: '09:30 - 10:00',
          location: 'Learning Corner',
          tag: 'Knowledge',
          tagColor: '#06b6d4',
          backgroundColor: '#ecfeff',
        },
        {
          id: 115,
          subject: 'Snack Time',
          time: '10:00 - 10:15',
          location: 'Dining Area',
          tag: 'Break',
          tagColor: '#f59e0b',
          backgroundColor: '#fffbeb',
        },
        {
          id: 116,
          subject: 'Cultural Activities',
          time: '10:15 - 10:45',
          location: 'Activity Room',
          tag: 'Creative',
          tagColor: '#ec4899',
          backgroundColor: '#fdf2f8',
        },
      ],
    },
  };

  const getDayName = (day: string) => {
    const dayNames = {
      'Mon': 'Monday',
      'Tue': 'Tuesday', 
      'Wed': 'Wednesday',
      'Thu': 'Thursday',
      'Fri': 'Friday',
      'Sat': 'Saturday'
    };
    return dayNames[day as keyof typeof dayNames] || day;
  };

  const getCurrentClasses = () => {
    const levelSchedule = weeklySchedule[selectedLevel as keyof typeof weeklySchedule];
    if (levelSchedule && levelSchedule[selectedDay as keyof typeof levelSchedule]) {
      return levelSchedule[selectedDay as keyof typeof levelSchedule];
    }
    return [];
  };

  const handleAddClass = () => {
    // Navigate to add class page with selected educational level
    router.push({
      pathname: '/add-class' as any,
      params: { educationalLevel: selectedLevel }
    });
  };

  const handleLevelSelect = (level: string) => {
    setSelectedLevel(level);
    setShowLevels(false);
  };

  const handleBackToLevels = () => {
    setShowLevels(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      
      {/* Header */}
      <View style={styles.header}>
        {showLevels ? (
          <TouchableOpacity style={styles.backButton} onPress={() => router.push('/(tabs)/home')}>
            <Ionicons name="arrow-back" size={24} color="#374151" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.backButton} onPress={handleBackToLevels}>
            <Ionicons name="arrow-back" size={24} color="#374151" />
          </TouchableOpacity>
        )}
        <View style={styles.headerTitleWrapper}>
          <Text style={styles.headerTitle} numberOfLines={1} ellipsizeMode="tail">
            {showLevels ? 'Timetable' : selectedLevel}
          </Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.settingsButton}>
            <Ionicons name="settings" size={24} color="#374151" />
          </TouchableOpacity>
        </View>
      </View>

      {showLevels ? (
        // Show Educational Levels
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {educationalLevels.map((level) => (
            <TouchableOpacity
              key={level}
              style={styles.levelCard}
              onPress={() => handleLevelSelect(level)}
            >
              <View style={styles.levelCardContent}>
                <View style={styles.levelCardLeft}>
                  <View style={[styles.levelIconContainer, { backgroundColor: getClassColor(level) }]}>
                    <Ionicons name="school" size={24} color="white" />
                  </View>
                  <View style={styles.levelCardText}>
                    <Text style={styles.levelCardTitle}>{level}</Text>
                    <Text style={styles.levelCardSubtitle}>View timetable</Text>
                  </View>
                </View>
                {/* Removed the chevron-forward arrow icon here */}
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (
        // Show Specific Timetable
        <>
      {/* Day Selector */}
      <View style={styles.daySelector}>
        {days.map((day) => (
          <TouchableOpacity
            key={day}
            style={[
              styles.dayButton,
              selectedDay === day && styles.selectedDayButton
            ]}
            onPress={() => setSelectedDay(day)}
          >
            <Text style={[
              styles.dayText,
              selectedDay === day && styles.selectedDayText
            ]}>
              {day}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Date and Info */}
      <View style={styles.dateSection}>
            <Text style={styles.dateTitle}>{getDayName(selectedDay)}, March 15</Text>
            <Text style={styles.classCount}>{getCurrentClasses().length} classes today</Text>
      </View>

      {/* Class Cards */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {getCurrentClasses().map((classItem) => (
          <View key={classItem.id} style={[styles.classCard, { backgroundColor: classItem.backgroundColor }]}>
            <View style={styles.classHeader}>
              <Text style={styles.subjectText}>{classItem.subject}</Text>
              <View style={[styles.tag, { backgroundColor: classItem.tagColor }]}>
                <Text style={styles.tagText}>{classItem.tag}</Text>
              </View>
            </View>
            
            <View style={styles.classDetails}>
              <View style={styles.detailRow}>
                <Ionicons name="time" size={16} color="#6b7280" />
                <Text style={styles.detailText}>{classItem.time}</Text>
              </View>
              <View style={styles.detailRow}>
                <Ionicons name="location" size={16} color="#6b7280" />
                <Text style={styles.detailText}>{classItem.location}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
        </>
      )}

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab} onPress={handleAddClass}>
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>
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
    alignItems: 'flex-end',
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
  settingsButton: {
    padding: 8,
  },
  levelSelector: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  levelButton: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    flex: 1,
    marginHorizontal: 1,
    alignItems: 'center',
  },
  selectedLevelButton: {
    backgroundColor: '#1e3a8a',
    borderColor: '#1e3a8a',
  },
  levelText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#6b7280',
    textAlign: 'center',
  },
  selectedLevelText: {
    color: 'white',
  },
  daySelector: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dayButton: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 6,
    marginHorizontal: 2,
    borderRadius: 16,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedDayButton: {
    backgroundColor: '#1e3a8a',
    borderColor: '#1e3a8a',
  },
  dayText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#6b7280',
  },
  selectedDayText: {
    color: 'white',
  },
  dateSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  dateTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 4,
  },
  classCount: {
    fontSize: 16,
    color: '#6b7280',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  classCard: {
    padding: 20,
    borderRadius: 16,
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
  classHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  subjectText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#374151',
    flex: 1,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'white',
  },
  classDetails: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 16,
    color: '#6b7280',
    marginLeft: 8,
  },
  levelCard: {
    backgroundColor: 'white',
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
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  levelCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  levelCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  levelIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  levelCardText: {
    flex: 1,
  },
  levelCardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 2,
  },
  levelCardSubtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  fab: {
    position: 'absolute',
    bottom: 40,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#1e3a8a',
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
}); 