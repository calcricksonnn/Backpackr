import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Avatar, Card, Button } from 'react-native-paper';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Avatar.Text size={80} label="JD" />
        <Text variant="headlineSmall" style={styles.name}>
          John Doe
        </Text>
        <Text variant="bodyMedium" style={styles.email}>
          john.doe@example.com
        </Text>
      </View>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium">Travel Stats</Text>
          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <Text variant="headlineSmall">3</Text>
              <Text variant="bodySmall">Groups Joined</Text>
            </View>
            <View style={styles.stat}>
              <Text variant="headlineSmall">12</Text>
              <Text variant="bodySmall">Events Attended</Text>
            </View>
            <View style={styles.stat}>
              <Text variant="headlineSmall">8</Text>
              <Text variant="bodySmall">Countries Visited</Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium">Settings</Text>
        </Card.Content>
        <Card.Actions>
          <Button>Edit Profile</Button>
          <Button>Notifications</Button>
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
  profileHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  name: {
    marginTop: 16,
    marginBottom: 4,
  },
  email: {
    color: '#666',
  },
  card: {
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  stat: {
    alignItems: 'center',
  },
});