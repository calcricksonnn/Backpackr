import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, FAB, Card, Button, Avatar } from 'react-native-paper';
import { router } from 'expo-router';

// Mock data for now
const mockGroups = [
  {
    id: '1',
    name: 'Tokyo Adventure',
    description: 'Exploring the best of Tokyo together',
    memberCount: 5,
    imageUrl: null,
  },
  {
    id: '2',
    name: 'Backpacking Europe',
    description: 'Budget-friendly European adventure',
    memberCount: 8,
    imageUrl: null,
  },
];

export default function GroupsScreen() {
  const [groups] = useState(mockGroups);

  const renderGroup = ({ item }: { item: typeof mockGroups[0] }) => (
    <Card style={styles.card} onPress={() => router.push(`/groups/${item.id}`)}>
      <Card.Content>
        <View style={styles.groupHeader}>
          <Avatar.Text size={48} label={item.name.charAt(0)} />
          <View style={styles.groupInfo}>
            <Text variant="titleMedium">{item.name}</Text>
            <Text variant="bodySmall" style={styles.description}>
              {item.description}
            </Text>
            <Text variant="bodySmall" style={styles.memberCount}>
              {item.memberCount} members
            </Text>
          </View>
        </View>
      </Card.Content>
      <Card.Actions>
        <Button onPress={() => router.push(`/groups/chat/${item.id}`)}>
          Chat
        </Button>
        <Button onPress={() => router.push(`/groups/${item.id}`)}>
          View
        </Button>
      </Card.Actions>
    </Card>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={groups}
        renderItem={renderGroup}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
      
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => router.push('/groups/create')}
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
  groupHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  groupInfo: {
    marginLeft: 12,
    flex: 1,
  },
  description: {
    color: '#666',
    marginTop: 4,
  },
  memberCount: {
    color: '#888',
    marginTop: 2,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#6366f1',
  },
});