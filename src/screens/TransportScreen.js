import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Card, Title, Paragraph, Button, Chip } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function TransportScreen() {
  const [selectedTransport, setSelectedTransport] = useState('all');

  const transportOptions = [
    {
      id: 1,
      type: 'Bus',
      route: 'Line 96 to Montmartre',
      time: '12 mins',
      cost: '€1.90',
      eco: true,
      icon: 'bus',
      color: '#2196F3'
    },
    {
      id: 2,
      type: 'Metro',
      route: 'Line 1 to Château de Vincennes',
      time: '8 mins',
      cost: '€1.90',
      eco: true,
      icon: 'train',
      color: '#4CAF50'
    },
    {
      id: 3,
      type: 'Bike Share',
      route: 'Vélib station 200m away',
      time: '15 mins',
      cost: '€1.70',
      eco: true,
      icon: 'bicycle',
      color: '#8BC34A'
    },
    {
      id: 4,
      type: 'Taxi',
      route: 'Direct route',
      time: '6 mins',
      cost: '€12.50',
      eco: false,
      icon: 'car',
      color: '#FF9800'
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Title style={styles.headerTitle}>Local Transport</Title>
        <Paragraph style={styles.headerSubtitle}>Find the best way to travel</Paragraph>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Transport Options</Text>
        {transportOptions.map((option) => (
          <Card key={option.id} style={styles.transportCard}>
            <Card.Content>
              <View style={styles.transportHeader}>
                <Ionicons name={option.icon} size={24} color={option.color} />
                <View style={styles.transportInfo}>
                  <Title style={styles.transportType}>{option.type}</Title>
                  <Text style={styles.transportRoute}>{option.route}</Text>
                </View>
                <View style={styles.transportDetails}>
                  <Text style={styles.transportTime}>{option.time}</Text>
                  <Text style={styles.transportCost}>{option.cost}</Text>
                  {option.eco && <Chip icon="leaf" compact>Eco-Friendly</Chip>}
                </View>
              </View>
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
    backgroundColor: '#607D8B',
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  transportCard: {
    marginBottom: 12,
    elevation: 2,
  },
  transportHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transportInfo: {
    flex: 1,
    marginLeft: 12,
  },
  transportType: {
    fontSize: 16,
    fontWeight: '600',
  },
  transportRoute: {
    fontSize: 14,
    color: '#666',
  },
  transportDetails: {
    alignItems: 'flex-end',
  },
  transportTime: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4CAF50',
  },
  transportCost: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
});