import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Card, Title, Paragraph, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const FeatureCard = ({ title, description, icon, onPress, color = '#2196F3' }) => (
  <Card style={styles.card} onPress={onPress}>
    <Card.Content style={styles.cardContent}>
      <View style={styles.cardHeader}>
        <Ionicons name={icon} size={24} color={color} />
        <Title style={[styles.cardTitle, { color }]}>{title}</Title>
      </View>
      <Paragraph style={styles.cardDescription}>{description}</Paragraph>
    </Card.Content>
  </Card>
);

export default function HomeScreen() {
  const navigation = useNavigation();

  const features = [
    {
      title: 'AI Travel Assistant',
      description: 'Get personalized travel recommendations and packing advice',
      icon: 'chatbubbles-outline',
      screen: 'AI Assistant',
      color: '#4CAF50'
    },
    {
      title: 'Photo & Travel Blogs',
      description: 'Share your travel memories and stories with the community',
      icon: 'camera-outline',
      screen: 'PhotoBlog',
      color: '#FF9800'
    },
    {
      title: 'Carbon Footprint Tracker',
      description: 'Monitor your environmental impact and find eco-friendly alternatives',
      icon: 'leaf-outline',
      screen: 'CarbonTracker',
      color: '#4CAF50'
    },
    {
      title: 'Trip Reviews & Ratings',
      description: 'Read and write reviews for destinations and activities',
      icon: 'star-outline',
      screen: 'Reviews',
      color: '#FFD700'
    },
    {
      title: 'Rewards Program',
      description: 'Earn points and redeem rewards for your travel activities',
      icon: 'gift-outline',
      screen: 'Rewards',
      color: '#9C27B0'
    },
    {
      title: 'Travel Insurance',
      description: 'Get insurance quotes and manage your travel coverage',
      icon: 'shield-checkmark-outline',
      screen: 'Insurance',
      color: '#2196F3'
    },
    {
      title: 'Weather Alerts',
      description: 'Stay updated with real-time weather for your destinations',
      icon: 'partly-sunny-outline',
      screen: 'Weather',
      color: '#03A9F4'
    },
    {
      title: 'Local Transport',
      description: 'Find the best transportation options for your journey',
      icon: 'bus-outline',
      screen: 'Transport',
      color: '#607D8B'
    },
    {
      title: 'Language Exchange',
      description: 'Connect with locals and practice new languages',
      icon: 'people-outline',
      screen: 'LanguageExchange',
      color: '#E91E63'
    },
    {
      title: 'Health & Wellness',
      description: 'Travel health tips and find wellness centers nearby',
      icon: 'fitness-outline',
      screen: 'Wellness',
      color: '#8BC34A'
    },
    {
      title: 'Custom Route Builder',
      description: 'Create and customize your perfect travel routes',
      icon: 'map-outline',
      screen: 'RouteBuilder',
      color: '#FF5722'
    },
    {
      title: 'Emergency Contacts',
      description: 'Quick access to emergency services and your contacts',
      icon: 'call-outline',
      screen: 'Emergency',
      color: '#F44336'
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Title style={styles.headerTitle}>Backpackr</Title>
        <Paragraph style={styles.headerSubtitle}>Your Ultimate Travel Companion</Paragraph>
      </View>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.featuresContainer}>
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              color={feature.color}
              onPress={() => navigation.navigate(feature.screen)}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#2196F3',
    alignItems: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: 'white',
    fontSize: 16,
    opacity: 0.9,
  },
  scrollView: {
    flex: 1,
  },
  featuresContainer: {
    padding: 16,
  },
  card: {
    marginBottom: 12,
    elevation: 2,
  },
  cardContent: {
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    marginLeft: 12,
    fontSize: 18,
    fontWeight: '600',
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});