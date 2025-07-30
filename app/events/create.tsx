import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert, Platform } from 'react-native';
import { 
  Text, 
  TextInput, 
  Button, 
  Card,
  Switch,
  HelperText,
  Menu,
  Divider
} from 'react-native-paper';
import { router } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function CreateEventScreen() {
  const [eventTitle, setEventTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [duration, setDuration] = useState('');
  const [maxAttendees, setMaxAttendees] = useState('');
  const [cost, setCost] = useState('');
  const [notes, setNotes] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [loading, setLoading] = useState(false);

  // Date/Time picker states
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  // Group selection
  const [selectedGroup, setSelectedGroup] = useState<string>('');
  const [showGroupMenu, setShowGroupMenu] = useState(false);

  const mockGroups = [
    { id: '1', name: 'Tokyo Adventure' },
    { id: '2', name: 'Backpacking Europe' },
  ];

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleTimeChange = (event: any, selectedTime?: Date) => {
    setShowTimePicker(Platform.OS === 'ios');
    if (selectedTime) {
      setTime(selectedTime);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString();
  };

  const formatTime = (time: Date) => {
    return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleCreateEvent = async () => {
    if (!eventTitle.trim()) {
      Alert.alert('Error', 'Please enter an event title');
      return;
    }

    if (!selectedGroup) {
      Alert.alert('Error', 'Please select a group');
      return;
    }

    if (!description.trim()) {
      Alert.alert('Error', 'Please enter a description');
      return;
    }

    if (!location.trim()) {
      Alert.alert('Error', 'Please enter a location');
      return;
    }

    setLoading(true);
    
    // TODO: Implement actual event creation with Firebase
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        'Success',
        'Event created successfully!',
        [{ text: 'OK', onPress: () => router.back() }]
      );
    }, 2000);
  };

  const renderGroupMenuItem = (group: typeof mockGroups[0]) => (
    <Menu.Item
      key={group.id}
      onPress={() => {
        setSelectedGroup(group.id);
        setShowGroupMenu(false);
      }}
      title={group.name}
    />
  );

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.title}>
            Create New Event
          </Text>

          <TextInput
            label="Event Title *"
            value={eventTitle}
            onChangeText={setEventTitle}
            style={styles.input}
            mode="outlined"
          />

          <View style={styles.groupSelector}>
            <Text variant="bodyMedium" style={styles.label}>
              Select Group *
            </Text>
            <Menu
              visible={showGroupMenu}
              onDismiss={() => setShowGroupMenu(false)}
              anchor={
                <Button
                  mode="outlined"
                  onPress={() => setShowGroupMenu(true)}
                  style={styles.groupButton}
                >
                  {selectedGroup 
                    ? mockGroups.find(g => g.id === selectedGroup)?.name 
                    : 'Select Group'
                  }
                </Button>
              }
            >
              {mockGroups.map(renderGroupMenuItem)}
            </Menu>
          </View>

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
            label="Location *"
            value={location}
            onChangeText={setLocation}
            style={styles.input}
            mode="outlined"
            placeholder="e.g., Senso-ji Temple, Tokyo"
          />

          <View style={styles.dateTimeContainer}>
            <View style={styles.dateTimeField}>
              <Text variant="bodyMedium" style={styles.label}>
                Date *
              </Text>
              <Button
                mode="outlined"
                onPress={() => setShowDatePicker(true)}
                style={styles.dateTimeButton}
              >
                {formatDate(date)}
              </Button>
            </View>

            <View style={styles.dateTimeField}>
              <Text variant="bodyMedium" style={styles.label}>
                Time *
              </Text>
              <Button
                mode="outlined"
                onPress={() => setShowTimePicker(true)}
                style={styles.dateTimeButton}
              >
                {formatTime(time)}
              </Button>
            </View>
          </View>

          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={handleDateChange}
              minimumDate={new Date()}
            />
          )}

          {showTimePicker && (
            <DateTimePicker
              value={time}
              mode="time"
              display="default"
              onChange={handleTimeChange}
            />
          )}

          <TextInput
            label="Duration"
            value={duration}
            onChangeText={setDuration}
            style={styles.input}
            mode="outlined"
            placeholder="e.g., 2 hours"
          />

          <TextInput
            label="Max Attendees"
            value={maxAttendees}
            onChangeText={setMaxAttendees}
            style={styles.input}
            mode="outlined"
            keyboardType="numeric"
            placeholder="Leave empty for unlimited"
          />

          <TextInput
            label="Cost"
            value={cost}
            onChangeText={setCost}
            style={styles.input}
            mode="outlined"
            placeholder="e.g., $15 per person or Free"
          />

          <TextInput
            label="Additional Notes"
            value={notes}
            onChangeText={setNotes}
            style={styles.input}
            mode="outlined"
            multiline
            numberOfLines={3}
            placeholder="Any important information for attendees..."
          />

          <View style={styles.switchRow}>
            <Text variant="bodyLarge">Public Event</Text>
            <Switch value={isPublic} onValueChange={setIsPublic} />
          </View>
          <HelperText type="info">
            Public events are visible to all group members
          </HelperText>

          <Divider style={styles.divider} />

          <View style={styles.quickActions}>
            <Text variant="titleMedium" style={styles.quickActionsTitle}>
              Quick Actions
            </Text>
            <View style={styles.quickActionButtons}>
              <Button
                mode="outlined"
                onPress={() => setEventTitle('Group Meetup')}
                style={styles.quickActionButton}
                compact
              >
                Meetup
              </Button>
              <Button
                mode="outlined"
                onPress={() => setEventTitle('Sightseeing Tour')}
                style={styles.quickActionButton}
                compact
              >
                Tour
              </Button>
              <Button
                mode="outlined"
                onPress={() => setEventTitle('Dining Experience')}
                style={styles.quickActionButton}
                compact
              >
                Dining
              </Button>
            </View>
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
            onPress={handleCreateEvent}
            loading={loading}
            disabled={loading}
            style={styles.createButton}
          >
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
  label: {
    marginBottom: 8,
    fontWeight: '500',
  },
  groupSelector: {
    marginBottom: 16,
  },
  groupButton: {
    justifyContent: 'flex-start',
  },
  dateTimeContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  dateTimeField: {
    flex: 1,
  },
  dateTimeButton: {
    justifyContent: 'flex-start',
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  divider: {
    marginVertical: 16,
  },
  quickActions: {
    marginTop: 8,
  },
  quickActionsTitle: {
    marginBottom: 12,
  },
  quickActionButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  quickActionButton: {
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