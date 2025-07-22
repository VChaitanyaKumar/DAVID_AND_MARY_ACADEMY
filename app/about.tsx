import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, StatusBar, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

// Import the David & Mary Academy logo
const schoolLogo = require('../assets/images/david-and-mary-logo.png');

export default function AboutScreen() {
  const [expandedSection, setExpandedSection] = useState('');

  const coreValues = [
    {
      id: 'excellence',
      title: 'Excellence',
      icon: 'star',
      color: '#3b82f6',
      description: 'Striving for the highest standards in everything we do'
    },
    {
      id: 'respect',
      title: 'Respect',
      icon: 'heart',
      color: '#ef4444',
      description: 'Valuing diversity and treating everyone with dignity'
    },
    {
      id: 'creativity',
      title: 'Creativity',
      icon: 'bulb',
      color: '#f97316',
      description: 'Encouraging innovative thinking and artistic expression'
    },
    {
      id: 'inclusivity',
      title: 'Inclusivity',
      icon: 'people',
      color: '#22c55e',
      description: 'Creating an environment where every child belongs'
    },
    {
      id: 'joy',
      title: 'Joy',
      icon: 'happy',
      color: '#8b5cf6',
      description: 'Making learning a delightful and engaging experience'
    }
  ];

  const whyChooseUs = [
    {
      id: 'curriculum',
      title: 'Cambridge Curriculum',
      description: 'Internationally recognized education framework',
      icon: 'school',
      color: '#3b82f6'
    },
    {
      id: 'teachers',
      title: 'Expert Teachers',
      description: 'Qualified educators with specialized training',
      icon: 'person',
      color: '#22c55e'
    },
    {
      id: 'ratio',
      title: 'Low Student-Teacher Ratio',
      description: '8:1 ratio for personalized attention',
      icon: 'people-circle',
      color: '#f97316'
    },
    {
      id: 'facilities',
      title: 'Modern Facilities',
      description: 'Purpose-built, tech-enabled learning environment',
      icon: 'home',
      color: '#8b5cf6'
    },
    {
      id: 'safety',
      title: 'Safe Environment',
      description: 'Secure access and CCTV monitoring',
      icon: 'shield-checkmark',
      color: '#ef4444'
    },
    {
      id: 'activities',
      title: 'Enrichment Activities',
      description: 'Music, art, and physical education included',
      icon: 'musical-notes',
      color: '#06b6d4'
    }
  ];

  const schoolHighlights = [
    {
      id: 'established',
      title: 'Established',
      value: 'Premier Preschool',
      icon: 'trophy'
    },
    {
      id: 'ageRange',
      title: 'Age Range',
      value: '2.5 - 6 Years',
      icon: 'calendar'
    },
    {
      id: 'curriculum',
      title: 'Curriculum',
      value: 'Cambridge',
      icon: 'book'
    },
    {
      id: 'location',
      title: 'Location',
      value: 'Electronic City, Bengaluru',
      icon: 'location'
    }
  ];

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? '' : sectionId);
  };

  const handleContactPress = () => {
    // TODO: Navigate to contact page or open contact form
    console.log('Contact us pressed');
  };

  const handleCampusTourPress = () => {
    // TODO: Navigate to campus tour page or open gallery
    console.log('Campus tour pressed');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#374151" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>About Us</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.heroImageContainer}>
            <Image 
              source={schoolLogo} 
              style={styles.schoolLogo}
              resizeMode="contain"
              onError={(error) => console.log('Image loading error:', error)}
            />
          </View>
          <Text style={styles.heroTagline}>Nurturing Excellence, Inspiring Futures</Text>
          <Text style={styles.heroDescription}>
            David & Mary Academy is a premier preschool dedicated to providing a nurturing environment where young minds can flourish and grow. We offer the prestigious Cambridge curriculum for children aged 2.5 to 6 years.
          </Text>
        </View>

        {/* Mission & Vision */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Mission & Vision</Text>
          
          {/* Mission */}
          <TouchableOpacity 
            style={styles.missionCard}
            onPress={() => toggleSection('mission')}
          >
            <View style={styles.missionHeader}>
              <View style={styles.missionIcon}>
                <Ionicons name="compass" size={24} color="#3b82f6" />
              </View>
              <Text style={styles.missionTitle}>Our Mission</Text>
              <Ionicons 
                name={expandedSection === 'mission' ? 'chevron-up' : 'chevron-down'} 
                size={20} 
                color="#6b7280" 
              />
            </View>
            {expandedSection === 'mission' && (
              <Text style={styles.missionText}>
                To provide a safe, nurturing environment where children develop a love for learning through exploration and discovery. We empower students with knowledge, integrity, and compassion.
              </Text>
            )}
          </TouchableOpacity>

          {/* Vision */}
          <TouchableOpacity 
            style={styles.missionCard}
            onPress={() => toggleSection('vision')}
          >
            <View style={styles.missionHeader}>
              <View style={styles.missionIcon}>
                <Ionicons name="eye" size={24} color="#22c55e" />
              </View>
              <Text style={styles.missionTitle}>Our Vision</Text>
              <Ionicons 
                name={expandedSection === 'vision' ? 'chevron-up' : 'chevron-down'} 
                size={20} 
                color="#6b7280" 
              />
            </View>
            {expandedSection === 'vision' && (
              <Text style={styles.missionText}>
                To be recognized as a leading preschool that prepares children to become confident, creative, and compassionate global citizens grounded in strong values and lifelong learning.
              </Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Core Values */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Core Values</Text>
          <View style={styles.valuesContainer}>
            {coreValues.map((value) => (
              <View key={value.id} style={styles.valueCard}>
                <View style={[styles.valueIcon, { backgroundColor: `${value.color}20` }]}>
                  <Ionicons name={value.icon as any} size={24} color={value.color} />
                </View>
                <Text style={styles.valueTitle}>{value.title}</Text>
                <Text style={styles.valueDescription}>{value.description}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Founder Message */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>A Message from Our Founder</Text>
          <View style={styles.founderCard}>
            <View style={styles.founderHeader}>
              <View style={styles.founderImage}>
                <Ionicons name="person" size={40} color="#3b82f6" />
              </View>
              <View style={styles.founderInfo}>
                <Text style={styles.founderName}>David & Mary Academy</Text>
                <Text style={styles.founderTitle}>Premier Preschool</Text>
              </View>
            </View>
            <Text style={styles.founderMessage}>
              "At David & Mary Academy, we believe education goes beyond books. We focus on shaping minds, building character, and preparing our students for tomorrow. Our Cambridge curriculum ensures your child receives a globally recognized education that develops critical thinking and problem-solving skills."
            </Text>
          </View>
        </View>

        {/* Why Choose Us */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Why Choose Us?</Text>
          <View style={styles.featuresContainer}>
            {whyChooseUs.map((feature) => (
              <View key={feature.id} style={styles.featureCard}>
                <View style={[styles.featureIcon, { backgroundColor: `${feature.color}20` }]}>
                  <Ionicons name={feature.icon as any} size={24} color={feature.color} />
                </View>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>{feature.description}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* School Highlights */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>School Highlights</Text>
          <View style={styles.highlightsContainer}>
            {schoolHighlights.map((highlight) => (
              <View key={highlight.id} style={styles.highlightCard}>
                <View style={styles.highlightIcon}>
                  <Ionicons name={highlight.icon as any} size={24} color="#3b82f6" />
                </View>
                <Text style={styles.highlightValue}>{highlight.value}</Text>
                <Text style={styles.highlightTitle}>{highlight.title}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Call to Action */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Get in Touch</Text>
          <View style={styles.ctaContainer}>
            <TouchableOpacity style={styles.ctaButton} onPress={handleCampusTourPress}>
              <Ionicons name="camera" size={20} color="white" />
              <Text style={styles.ctaButtonText}>View Campus Tour</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.ctaButton, styles.ctaButtonSecondary]} onPress={handleContactPress}>
              <Ionicons name="call" size={20} color="#3b82f6" />
              <Text style={[styles.ctaButtonText, { color: '#3b82f6' }]}>Contact Us</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            David & Mary Academy{'\n'}
            327, Hulimangala Main Rd, Neeladri Nagar{'\n'}
            Electronic City Phase 1, Bengaluru, Karnataka 560100{'\n'}
            Phone: +91 8722040606{'\n'}
            Email: principal@davidandmaryacademy.in
          </Text>
          <Text style={styles.appVersion}>App Version 1.0.0</Text>
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
  placeholder: {
    width: 32,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  heroSection: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  heroImageContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  schoolLogo: {
    width: 200,
    height: 200,
    marginBottom: 16,
  },
  heroTagline: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#374151',
    textAlign: 'center',
    marginBottom: 16,
  },
  heroDescription: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 24,
  },
  section: {
    marginTop: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 20,
  },
  missionCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  missionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  missionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#eff6ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  missionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    flex: 1,
  },
  missionText: {
    fontSize: 16,
    color: '#6b7280',
    marginTop: 16,
    lineHeight: 24,
  },
  valuesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  valueCard: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  valueIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  valueTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
    textAlign: 'center',
  },
  valueDescription: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 16,
  },
  founderCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  founderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  founderImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#eff6ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  founderInfo: {
    flex: 1,
  },
  founderName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
  },
  founderTitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  founderMessage: {
    fontSize: 16,
    color: '#6b7280',
    lineHeight: 24,
    fontStyle: 'italic',
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  featureCard: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  featureDescription: {
    fontSize: 12,
    color: '#6b7280',
    lineHeight: 16,
  },
  highlightsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  highlightCard: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  highlightIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#eff6ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  highlightValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
    textAlign: 'center',
  },
  highlightTitle: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
  ctaContainer: {
    gap: 12,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    paddingVertical: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  ctaButtonSecondary: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#3b82f6',
  },
  ctaButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginLeft: 8,
  },
  footer: {
    marginTop: 40,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 16,
  },
  appVersion: {
    fontSize: 12,
    color: '#9ca3af',
  },
}); 