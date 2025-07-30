import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card, Button } from 'react-native-paper';
import { router } from 'expo-router';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        Welcome to Backpackr
      </Text>
      
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium">Travel Groups</Text>
          <Text variant="bodyMedium" style={styles.description}>
            Create or join travel groups to plan adventures together
          </Text>
        </Card.Content>
        <Card.Actions>
          <Button onPress={() => router.push('/groups')}>
            View Groups
          </Button>
        </Card.Actions>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium">Upcoming Events</Text>
          <Text variant="bodyMedium" style={styles.description}>
            Plan and coordinate events with your travel groups
          </Text>
        </Card.Content>
        <Card.Actions>
          <Button onPress={() => router.push('/events')}>
            View Events
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    textAlign: 'center',
    marginBottom: 24,
    color: '#333',
  },
  card: {
    marginBottom: 16,
  },
  description: {
    marginTop: 8,
    color: '#666',
  },
});