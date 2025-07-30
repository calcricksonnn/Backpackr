import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { 
  Text, 
  Card, 
  Button, 
  Avatar, 
  Chip,
  Divider,
  List
} from 'react-native-paper';
import { useLocalSearchParams, router } from 'expo-router';

// Mock event data
const mockEventDetails = {
  '1': {
    id: '1',
    title: 'Visit Senso-ji Temple',
    description: 'Morning visit to the historic Senso-ji Temple in Asakusa. We\'ll explore the temple grounds, learn about its history, and experience traditional Japanese culture.',
    date: '2024-08-15',
    time: '09:00',
    duration: '3 hours',
    location: 'Senso-ji Temple, Asakusa, Tokyo',
    groupId: '1',
    groupName: 'Tokyo Adventure',
    organizer: 'John Doe',
    status: 'upcoming',
    attendees: [
      { id: '1', name: 'John Doe', status: 'going', avatar: 'JD' },
      { id: '2', name: 'Jane Smith', status: 'going', avatar: 'JS' },
      { id: '3', name: 'Mike Johnson', status: 'maybe', avatar: 'MJ' },
    ],
    maxAttendees: 10,
    cost: '$15 per person',
    notes: 'Please wear comfortable walking shoes. Temple entry is free, but we\'ll have optional paid activities.',
  },
  '2': {
    id: '2',
    title: 'Hostel Check-in Prague',
    description: 'Group check-in to our hostel in Prague and initial meet-up.',
    date: '2024-09-01',
    time: '15:00',
    duration: '2 hours',
    location: 'Hostel One Home, Prague',
    groupId: '2',
    groupName: 'Backpacking Europe',
    organizer: 'Alex Garcia',
    status: 'upcoming',
    attendees: [
      { id: '6', name: 'Alex Garcia', status: 'going', avatar: 'AG' },
      { id: '7', name: 'Lisa Chen', status: 'going', avatar: 'LC' },
    ],
    maxAttendees: 8,
    cost: 'Free',
    notes: 'Bring your passport and booking confirmation.',
  },
};

export default function EventDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [event] = useState(mockEventDetails[id as keyof typeof mockEventDetails]);
  const [userStatus, setUserStatus] = useState<'going' | 'not-going' | 'maybe'>('going');

  if (!event) {
    return (
      <View style={styles.container}>
        <Text>Event not found</Text>
      </View>
    );
  }

  const handleStatusChange = (status: 'going' | 'not-going' | 'maybe') => {
    setUserStatus(status);
    // TODO: Update status in backend
    Alert.alert('Status Updated', `You are now marked as "${status}" for this event.`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'going':
        return '#4caf50';
      case 'maybe':
        return '#ff9800';
      case 'not-going':
        return '#f44336';
      default:
        return '#2196f3';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'going':
        return 'check-circle';
      case 'maybe':
        return 'help-circle';
      case 'not-going':
        return 'close-circle';
      default:
        return 'circle';
    }
  };

  const renderAttendee = (attendee: typeof event.attendees[0]) => (
    <View key={attendee.id} style={styles.attendeeItem}>
      <Avatar.Text size={36} label={attendee.avatar} />
      <View style={styles.attendeeInfo}>
        <Text variant="bodyMedium">{attendee.name}</Text>
        <Chip 
          icon={getStatusIcon(attendee.status)}
          style={[styles.statusChip, { backgroundColor: getStatusColor(attendee.status) }]}
          textStyle={styles.chipText}
          compact
        >
          {attendee.status}
        </Chip>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.eventCard}>
        <Card.Content>
          <Text variant="headlineSmall" style={styles.title}>
            {event.title}
          </Text>
          
          <View style={styles.statusContainer}>
            <Chip 
              style={[styles.eventStatusChip, { backgroundColor: getStatusColor(event.status) }]}
              textStyle={styles.chipText}
            >
              {event.status}
            </Chip>
            <Text variant="bodySmall" style={styles.groupName}>
              {event.groupName}
            </Text>
          </View>

          <Text variant="bodyMedium" style={styles.description}>
            {event.description}
          </Text>
        </Card.Content>
      </Card>

      <Card style={styles.detailsCard}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Event Details
          </Text>
          
          <List.Item
            title="Date & Time"
            description={`${event.date} at ${event.time}`}
            left={(props) => <List.Icon {...props} icon="calendar-clock" />}
          />
          
          <List.Item
            title="Duration"
            description={event.duration}
            left={(props) => <List.Icon {...props} icon="clock-outline" />}
          />
          
          <List.Item
            title="Location"
            description={event.location}
            left={(props) => <List.Icon {...props} icon="map-marker" />}
          />
          
          <List.Item
            title="Organizer"
            description={event.organizer}
            left={(props) => <List.Icon {...props} icon="account-tie" />}
          />
          
          <List.Item
            title="Cost"
            description={event.cost}
            left={(props) => <List.Icon {...props} icon="currency-usd" />}
          />

          {event.notes && (
            <>
              <Divider style={styles.divider} />
              <Text variant="titleSmall" style={styles.notesTitle}>
                Important Notes
              </Text>
              <Text variant="bodyMedium" style={styles.notes}>
                {event.notes}
              </Text>
            </>
          )}
        </Card.Content>
      </Card>

      <Card style={styles.attendanceCard}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Your Attendance
          </Text>
          <View style={styles.statusButtons}>
            <Button
              mode={userStatus === 'going' ? 'contained' : 'outlined'}
              onPress={() => handleStatusChange('going')}
              style={[styles.statusButton, userStatus === 'going' && { backgroundColor: '#4caf50' }]}
              icon="check"
            >
              Going
            </Button>
            <Button
              mode={userStatus === 'maybe' ? 'contained' : 'outlined'}
              onPress={() => handleStatusChange('maybe')}
              style={[styles.statusButton, userStatus === 'maybe' && { backgroundColor: '#ff9800' }]}
              icon="help"
            >
              Maybe
            </Button>
            <Button
              mode={userStatus === 'not-going' ? 'contained' : 'outlined'}
              onPress={() => handleStatusChange('not-going')}
              style={[styles.statusButton, userStatus === 'not-going' && { backgroundColor: '#f44336' }]}
              icon="close"
            >
              Can't Go
            </Button>
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.attendeesCard}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Attendees ({event.attendees.length}/{event.maxAttendees})
          </Text>
          <View style={styles.attendeesList}>
            {event.attendees.map(renderAttendee)}
          </View>
        </Card.Content>
      </Card>

      <View style={styles.actions}>
        <Button 
          mode="outlined" 
          onPress={() => router.push(`/groups/chat/${event.groupId}`)}
          style={styles.actionButton}
        >
          Group Chat
        </Button>
        <Button 
          mode="contained" 
          onPress={() => router.push(`/groups/${event.groupId}`)}
          style={[styles.actionButton, styles.primaryButton]}
        >
          View Group
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  eventCard: {
    margin: 16,
    marginBottom: 8,
  },
  title: {
    marginBottom: 12,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  eventStatusChip: {
    alignSelf: 'flex-start',
  },
  groupName: {
    color: '#666',
  },
  description: {
    color: '#666',
    lineHeight: 20,
  },
  detailsCard: {
    margin: 16,
    marginVertical: 8,
  },
  sectionTitle: {
    marginBottom: 12,
  },
  divider: {
    marginVertical: 16,
  },
  notesTitle: {
    marginBottom: 8,
    fontWeight: '600',
  },
  notes: {
    color: '#666',
    lineHeight: 18,
  },
  attendanceCard: {
    margin: 16,
    marginVertical: 8,
  },
  statusButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  statusButton: {
    flex: 1,
  },
  attendeesCard: {
    margin: 16,
    marginVertical: 8,
  },
  attendeesList: {
    gap: 12,
  },
  attendeeItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  attendeeInfo: {
    marginLeft: 12,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusChip: {
    height: 24,
  },
  chipText: {
    color: 'white',
    fontSize: 12,
  },
  actions: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
  },
  actionButton: {
    flex: 1,
  },
  primaryButton: {
    backgroundColor: '#6366f1',
  },
});