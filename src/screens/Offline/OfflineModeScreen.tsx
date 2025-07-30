import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, List, Button } from 'react-native-paper';

export default function OfflineModeScreen() {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Card style={styles.headerCard}>
          <Card.Content>
            <Title>Offline Mode</Title>
            <Paragraph>Download maps and sync data for offline use</Paragraph>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Title>Downloaded Maps</Title>
            <List.Item
              title="Bangkok City Center"
              description="Downloaded • 45 MB • Last updated: 2 days ago"
              left={() => <List.Icon icon="map" />}
              right={() => <Button>Update</Button>}
            />
            <List.Item
              title="Thailand Backpacker Route"
              description="Downloaded • 120 MB • Last updated: 1 week ago"
              left={() => <List.Icon icon="map-marker-path" />}
              right={() => <Button>Update</Button>}
            />
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Title>Offline Features</Title>
            <List.Item
              title="Bluetooth Messaging"
              description="Connect with nearby backpackers via Bluetooth"
              left={() => <List.Icon icon="bluetooth" />}
            />
            <List.Item
              title="Local WiFi Sync"
              description="Share routes and recommendations on local networks"
              left={() => <List.Icon icon="wifi" />}
            />
            <List.Item
              title="Cached Recommendations"
              description="View saved community recommendations offline"
              left={() => <List.Icon icon="download" />}
            />
          </Card.Content>
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  headerCard: {
    marginBottom: 16,
    backgroundColor: '#6200EE',
  },
  card: {
    marginBottom: 12,
    elevation: 2,
  },
});