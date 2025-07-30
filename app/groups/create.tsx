import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { 
  Text, 
  TextInput, 
  Button, 
  Card, 
  Switch,
  Chip,
  HelperText
} from 'react-native-paper';
import { router } from 'expo-router';

export default function CreateGroupScreen() {
  const [groupName, setGroupName] = useState('');
  const [description, setDescription] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [maxMembers, setMaxMembers] = useState('');
  const [destination, setDestination] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const availableInterests = [
    'Adventure', 'Budget Travel', 'Photography', 'Culture', 
    'Food', 'Nightlife', 'Nature', 'History', 'Art', 'Shopping'
  ];

  const toggleInterest = (interest: string) => {
    setInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleCreateGroup = async () => {
    if (!groupName.trim()) {
      Alert.alert('Error', 'Please enter a group name');
      return;
    }

    if (!description.trim()) {
      Alert.alert('Error', 'Please enter a description');
      return;
    }

    setLoading(true);
    
    // TODO: Implement actual group creation with Firebase
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        'Success',
        'Group created successfully!',
        [{ text: 'OK', onPress: () => router.back() }]
      );
    }, 2000);
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.title}>
            Create New Group
          </Text>

          <TextInput
            label="Group Name *"
            value={groupName}
            onChangeText={setGroupName}
            style={styles.input}
            mode="outlined"
          />

          <TextInput
            label="Description *"
            value={description}
            onChangeText={setDescription}
            style={styles.input}
            mode="outlined"
            multiline
            numberOfLines={3}
          />

          <TextInput
            label="Destination"
            value={destination}
            onChangeText={setDestination}
            style={styles.input}
            mode="outlined"
            placeholder="e.g., Tokyo, Japan"
          />

          <TextInput
            label="Max Members"
            value={maxMembers}
            onChangeText={setMaxMembers}
            style={styles.input}
            mode="outlined"
            keyboardType="numeric"
            placeholder="Leave empty for unlimited"
          />

          <View style={styles.switchRow}>
            <Text variant="bodyLarge">Private Group</Text>
            <Switch value={isPrivate} onValueChange={setIsPrivate} />
          </View>
          <HelperText type="info">
            Private groups require approval to join
          </HelperText>

          <Text variant="titleMedium" style={styles.sectionTitle}>
            Interests (Optional)
          </Text>
          <View style={styles.interestsContainer}>
            {availableInterests.map((interest) => (
              <Chip
                key={interest}
                selected={interests.includes(interest)}
                onPress={() => toggleInterest(interest)}
                style={styles.interestChip}
              >
                {interest}
              </Chip>
            ))}
          </View>
        </Card.Content>

        <Card.Actions style={styles.actions}>
          <Button 
            mode="outlined" 
            onPress={() => router.back()}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button 
            mode="contained" 
            onPress={handleCreateGroup}
            loading={loading}
            disabled={loading}
            style={styles.createButton}
          >
            Create Group
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
  card: {
    margin: 16,
  },
  title: {
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    marginBottom: 16,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    marginTop: 16,
    marginBottom: 12,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  interestChip: {
    marginBottom: 8,
  },
  actions: {
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  createButton: {
    backgroundColor: '#6366f1',
  },
});