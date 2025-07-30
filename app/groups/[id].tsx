import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, FlatList } from 'react-native';
import { Text, Card, Avatar, Button, Chip } from 'react-native-paper';
import { useLocalSearchParams, router } from 'expo-router';

// Mock group data
const mockGroupDetails = {
  '1': {
    id: '1',
    name: 'Tokyo Adventure',
    description: 'Exploring the best of Tokyo together. Join us for an amazing journey through Japan\'s vibrant capital city.',
    memberCount: 5,
    isAdmin: true,
    members: [
      { id: '1', name: 'John Doe', role: 'admin', avatar: 'JD' },
      { id: '2', name: 'Jane Smith', role: 'member', avatar: 'JS' },
      { id: '3', name: 'Mike Johnson', role: 'member', avatar: 'MJ' },
      { id: '4', name: 'Sarah Wilson', role: 'member', avatar: 'SW' },
      { id: '5', name: 'Tom Brown', role: 'member', avatar: 'TB' },
    ],
    upcomingEvents: [
      { id: '1', title: 'Visit Senso-ji Temple', date: '2024-08-15' },
      { id: '2', title: 'Tokyo Skytree Tour', date: '2024-08-16' },
    ],
  },
  '2': {
    id: '2',
    name: 'Backpacking Europe',
    description: 'Budget-friendly European adventure across multiple countries.',
    memberCount: 8,
    isAdmin: false,
    members: [
      { id: '6', name: 'Alex Garcia', role: 'admin', avatar: 'AG' },
      { id: '7', name: 'Lisa Chen', role: 'member', avatar: 'LC' },
      { id: '8', name: 'David Kim', role: 'member', avatar: 'DK' },
    ],
    upcomingEvents: [
      { id: '3', title: 'Hostel Check-in Prague', date: '2024-09-01' },
    ],
  },
};

export default function GroupDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [group] = useState(mockGroupDetails[id as keyof typeof mockGroupDetails]);

  if (!group) {
    return (
      <View style={styles.container}>
        <Text>Group not found</Text>
      </View>
    );
  }

  const renderMember = ({ item }: { item: typeof group.members[0] }) => (
    <View style={styles.memberItem}>
      <Avatar.Text size={40} label={item.avatar} />
      <View style={styles.memberInfo}>
        <Text variant="bodyMedium">{item.name}</Text>
        {item.role === 'admin' && (
          <Chip style={styles.adminChip} compact>Admin</Chip>
        )}
      </View>
    </View>
  );

  const renderEvent = ({ item }: { item: typeof group.upcomingEvents[0] }) => (
    <Card style={styles.eventCard} onPress={() => router.push(`/events/${item.id}`)}>
      <Card.Content>
        <Text variant="bodyMedium">{item.title}</Text>
        <Text variant="bodySmall" style={styles.eventDate}>{item.date}</Text>
      </Card.Content>
    </Card>
  );

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.groupInfoCard}>
        <Card.Content>
          <View style={styles.groupHeader}>
            <Avatar.Text size={60} label={group.name.charAt(0)} />
            <View style={styles.groupInfo}>
              <Text variant="headlineSmall">{group.name}</Text>
              <Text variant="bodySmall" style={styles.memberCount}>
                {group.memberCount} members
              </Text>
            </View>
          </View>
          <Text variant="bodyMedium" style={styles.description}>
            {group.description}
          </Text>
        </Card.Content>
        <Card.Actions>
          <Button onPress={() => router.push(`/groups/chat/${group.id}`)}>
            Group Chat
          </Button>
          {group.isAdmin && (
            <Button>Manage Group</Button>
          )}
        </Card.Actions>
      </Card>

      <Card style={styles.sectionCard}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Members ({group.members.length})
          </Text>
          <FlatList
            data={group.members}
            renderItem={renderMember}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        </Card.Content>
      </Card>

      <Card style={styles.sectionCard}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Upcoming Events ({group.upcomingEvents.length})
          </Text>
          <FlatList
            data={group.upcomingEvents}
            renderItem={renderEvent}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        </Card.Content>
        <Card.Actions>
          <Button onPress={() => router.push('/events/create')}>
            Create Event
          </Button>
        </Card.Actions>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  groupInfoCard: {
    margin: 16,
    marginBottom: 8,
  },
  groupHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  groupInfo: {
    marginLeft: 16,
    flex: 1,
  },
  memberCount: {
    color: '#666',
    marginTop: 4,
  },
  description: {
    color: '#666',
  },
  sectionCard: {
    margin: 16,
    marginVertical: 8,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  memberItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  memberInfo: {
    marginLeft: 12,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  adminChip: {
    backgroundColor: '#6366f1',
  },
  eventCard: {
    marginBottom: 8,
  },
  eventDate: {
    color: '#666',
    marginTop: 4,
  },
});