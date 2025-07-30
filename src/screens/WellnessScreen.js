import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Card, Title, Paragraph, Button, Chip } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function WellnessScreen() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const wellnessTips = [
    {
      id: 1,
      category: 'hydration',
      title: 'Stay Hydrated',
      content: 'Drink at least 2-3 liters of water daily, especially in hot climates.',
      icon: 'water',
      color: '#2196F3'
    },
    {
      id: 2,
      category: 'health',
      title: 'Travel Vaccinations',
      content: 'Check required vaccinations for your destination 4-6 weeks before travel.',
      icon: 'medical',
      color: '#F44336'
    },
    {
      id: 3,
      category: 'fitness',
      title: 'Altitude Sickness',
      content: 'Ascend gradually and rest if experiencing symptoms at high altitudes.',
      icon: 'mountain',
      color: '#4CAF50'
    }
  ];

  const nearbyFacilities = [
    {
      id: 1,
      name: 'Fitness Park Central',
      type: 'Gym',
      distance: '0.5 km',
      rating: 4.5,
      price: '€15/day pass'
    },
    {
      id: 2,
      name: 'Yoga Studio Zen',
      type: 'Yoga',
      distance: '0.8 km',
      rating: 4.8,
      price: '€20/class'
    }
  ];

  const categories = [
    { label: 'All', value: 'all' },
    { label: 'Health', value: 'health' },
    { label: 'Fitness', value: 'fitness' },
    { label: 'Hydration', value: 'hydration' }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Title style={styles.headerTitle}>Health & Wellness</Title>
        <Paragraph style={styles.headerSubtitle}>Stay healthy while traveling</Paragraph>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.categoriesContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map((category) => (
              <Chip
                key={category.value}
                selected={selectedCategory === category.value}
                onPress={() => setSelectedCategory(category.value)}
                style={styles.categoryChip}
              >
                {category.label}
              </Chip>
            ))}
          </ScrollView>
        </View>

        <Text style={styles.sectionTitle}>Health Tips</Text>
        {wellnessTips.map((tip) => (
          <Card key={tip.id} style={styles.tipCard}>
            <Card.Content>
              <View style={styles.tipHeader}>
                <Ionicons name={tip.icon} size={24} color={tip.color} />
                <Title style={[styles.tipTitle, { color: tip.color }]}>{tip.title}</Title>
              </View>
              <Paragraph style={styles.tipContent}>{tip.content}</Paragraph>
            </Card.Content>
          </Card>
        ))}

        <Text style={styles.sectionTitle}>Nearby Facilities</Text>
        {nearbyFacilities.map((facility) => (
          <Card key={facility.id} style={styles.facilityCard}>
            <Card.Content>
              <View style={styles.facilityHeader}>
                <View style={styles.facilityInfo}>
                  <Title style={styles.facilityName}>{facility.name}</Title>
                  <Text style={styles.facilityType}>{facility.type} • {facility.distance}</Text>
                  <Text style={styles.facilityPrice}>{facility.price}</Text>
                </View>
                <Text style={styles.facilityRating}>★ {facility.rating}</Text>
              </View>
              <Button mode="outlined" compact>View Details</Button>
            </Card.Content>
          </Card>
        ))}
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
    backgroundColor: '#8BC34A',
    alignItems: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: 'white',
    fontSize: 14,
    opacity: 0.9,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  categoriesContainer: {
    marginBottom: 16,
  },
  categoryChip: {
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    marginTop: 8,
  },
  tipCard: {
    marginBottom: 12,
    elevation: 2,
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  tipTitle: {
    marginLeft: 12,
    fontSize: 16,
    fontWeight: '600',
  },
  tipContent: {
    fontSize: 14,
    lineHeight: 20,
  },
  facilityCard: {
    marginBottom: 12,
    elevation: 2,
  },
  facilityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  facilityInfo: {
    flex: 1,
  },
  facilityName: {
    fontSize: 16,
    fontWeight: '600',
  },
  facilityType: {
    fontSize: 14,
    color: '#666',
  },
  facilityPrice: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '500',
  },
  facilityRating: {
    fontSize: 14,
    color: '#FFD700',
  },
});