import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, FAB, Card, Button, Chip } from 'react-native-paper';
import { router } from 'expo-router';

// Mock data for events
const mockEvents = [
  {
    id: '1',
    title: 'Visit Senso-ji Temple',
    description: 'Morning visit to the historic temple',
    date: '2024-08-15',
    time: '09:00',
    groupName: 'Tokyo Adventure',
    status: 'upcoming',
  },
  {
    id: '2',
    title: 'Hostel Check-in Prague',
    description: 'Check into our hostel and meet the group',
    date: '2024-09-01',
    time: '15:00',
    groupName: 'Backpacking Europe',
    status: 'upcoming',
  },
  {
    id: '3',
    title: 'Group Hiking in Alps',
    description: 'Day hike in the Swiss Alps',
    date: '2024-07-20',
    time: '07:00',
    groupName: 'Backpacking Europe',
    status: 'completed',
  },
];

export default function EventsScreen() {
  const [events] = useState(mockEvents);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return '#4caf50';
      case 'completed':
        return '#9e9e9e';
      default:
        return '#2196f3';
    }
  };

  const renderEvent = ({ item }: { item: typeof mockEvents[0] }) => (
    <Card style={styles.card} onPress={() => router.push(`/events/${item.id}`)}>
      <Card.Content>
        <View style={styles.eventHeader}>
          <Text variant="titleMedium">{item.title}</Text>
          <Chip 
            style={[styles.statusChip, { backgroundColor: getStatusColor(item.status) }]}
            textStyle={styles.chipText}
          >
            {item.status}
          </Chip>
        </View>
        <Text variant="bodyMedium" style={styles.description}>
          {item.description}
        </Text>
        <Text variant="bodySmall" style={styles.groupName}>
          Group: {item.groupName}
        </Text>
        <Text variant="bodySmall" style={styles.dateTime}>
          {item.date} at {item.time}
        </Text>
      </Card.Content>
      <Card.Actions>
        <Button onPress={() => router.push(`/events/${item.id}`)}>
          View Details
        </Button>
      </Card.Actions>
    </Card>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={events}
        renderItem={renderEvent}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
      
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => router.push('/events/create')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContainer: {
    padding: 16,
  },
  card: {
    marginBottom: 12,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusChip: {
    height: 24,
  },
  chipText: {
    color: 'white',
    fontSize: 12,
  },
  description: {
    color: '#666',
    marginBottom: 8,
  },
  groupName: {
    color: '#888',
    marginBottom: 4,
  },
  dateTime: {
    color: '#6366f1',
    fontWeight: '500',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#6366f1',
  },
});