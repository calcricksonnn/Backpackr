import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView } from 'react-native';
import { Button, Card, FAB, Portal, Modal, TextInput, Chip } from 'react-native-paper';
import MapView, { Marker, Region } from 'react-native-maps';
import * as Location from 'expo-location';
import { notificationService, useNearbyEventNotifications } from '../../src/services/NotificationService';
import EventChat from '../../src/components/EventChat';

interface Event {
  id: string;
  title: string;
  description: string;
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  date: Date;
  time: Date;
  creator: string;
  attendees: string[];
  maxAttendees?: number;
  tags: string[];
}

// Mock data for events
const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Sunset Hike at Twin Peaks',
    description: 'Join us for a beautiful sunset hike with amazing city views!',
    location: {
      latitude: 37.7544,
      longitude: -122.4477,
      address: 'Twin Peaks, San Francisco, CA',
    },
    date: new Date('2024-02-15'),
    time: new Date('2024-02-15T17:30:00'),
    creator: 'Sarah Johnson',
    attendees: ['Sarah Johnson', 'Mike Chen'],
    maxAttendees: 8,
    tags: ['hiking', 'sunset', 'nature'],
  },
  {
    id: '2',
    title: 'Food Tour in Chinatown',
    description: 'Explore the best dim sum and authentic Chinese cuisine!',
    location: {
      latitude: 37.7941,
      longitude: -122.4078,
      address: 'Chinatown, San Francisco, CA',
    },
    date: new Date('2024-02-16'),
    time: new Date('2024-02-16T12:00:00'),
    creator: 'Emma Wilson',
    attendees: ['Emma Wilson', 'Alex Rodriguez', 'Lisa Park'],
    maxAttendees: 6,
    tags: ['food', 'culture', 'local'],
  },
  {
    id: '3',
    title: 'Photography Walk at Golden Gate',
    description: 'Capture the iconic Golden Gate Bridge from different angles.',
    location: {
      latitude: 37.8199,
      longitude: -122.4783,
      address: 'Golden Gate Bridge, San Francisco, CA',
    },
    date: new Date('2024-02-17'),
    time: new Date('2024-02-17T09:00:00'),
    creator: 'David Kim',
    attendees: ['David Kim'],
    maxAttendees: 10,
    tags: ['photography', 'sightseeing', 'morning'],
  },
];

export default function Events() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [region, setRegion] = useState<Region>({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showEventDetails, setShowEventDetails] = useState(false);
  const [showCreateEvent, setShowCreateEvent] = useState(false);
  const [showEventChat, setShowEventChat] = useState(false);
  
  // New event form state
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    address: '',
    date: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
    time: '12:00',
    maxAttendees: '',
    tags: '',
  });
  const [newEventLocation, setNewEventLocation] = useState<{latitude: number, longitude: number} | null>(null);

  // Initialize notification service
  const { checkAndNotify } = useNearbyEventNotifications(events, location);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });

      // Request notification permissions
      await notificationService.requestNotificationPermissions();
    })();
  }, []);

  // Check for nearby events every 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      checkAndNotify();
    }, 5 * 60 * 1000); // 5 minutes

    // Initial check
    checkAndNotify();

    return () => clearInterval(interval);
  }, [checkAndNotify]);

  const handleMarkerPress = (event: Event) => {
    setSelectedEvent(event);
    setShowEventDetails(true);
  };

  const handleRSVP = (event: Event) => {
    const isAttending = event.attendees.includes('Current User');
    
    if (isAttending) {
      // Remove RSVP
      const updatedEvents = events.map(e => 
        e.id === event.id 
          ? { ...e, attendees: e.attendees.filter(a => a !== 'Current User') }
          : e
      );
      setEvents(updatedEvents);
      Alert.alert('RSVP Cancelled', 'You have cancelled your RSVP for this event.');
    } else {
      // Add RSVP
      if (event.maxAttendees && event.attendees.length >= event.maxAttendees) {
        Alert.alert('Event Full', 'This event has reached maximum capacity.');
        return;
      }
      
      const updatedEvents = events.map(e => 
        e.id === event.id 
          ? { ...e, attendees: [...e.attendees, 'Current User'] }
          : e
      );
      setEvents(updatedEvents);
      Alert.alert('RSVP Confirmed', 'You have successfully RSVP\'d for this event!');
    }
    
    setShowEventDetails(false);
  };

  const handleMapPress = (event: any) => {
    if (showCreateEvent) {
      setNewEventLocation({
        latitude: event.nativeEvent.coordinate.latitude,
        longitude: event.nativeEvent.coordinate.longitude,
      });
    }
  };

  const handleCreateEvent = async () => {
    if (!newEvent.title || !newEvent.description || !newEventLocation) {
      Alert.alert('Missing Information', 'Please fill in all required fields and select a location on the map.');
      return;
    }

    // Get address from coordinates (mock implementation)
    const address = newEvent.address || `${newEventLocation.latitude.toFixed(4)}, ${newEventLocation.longitude.toFixed(4)}`;

    // Create date objects from form inputs
    const eventDate = new Date(newEvent.date);
    const [hours, minutes] = newEvent.time.split(':');
    const eventTime = new Date();
    eventTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);

    const event: Event = {
      id: Date.now().toString(),
      title: newEvent.title,
      description: newEvent.description,
      location: {
        latitude: newEventLocation.latitude,
        longitude: newEventLocation.longitude,
        address: address,
      },
      date: eventDate,
      time: eventTime,
      creator: 'Current User',
      attendees: ['Current User'],
      maxAttendees: newEvent.maxAttendees ? parseInt(newEvent.maxAttendees) : undefined,
      tags: newEvent.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0),
    };

    setEvents([...events, event]);
    setShowCreateEvent(false);
    setNewEvent({
      title: '',
      description: '',
      address: '',
      date: new Date().toISOString().split('T')[0],
      time: '12:00',
      maxAttendees: '',
      tags: '',
    });
    setNewEventLocation(null);
    
    Alert.alert('Event Created', 'Your event has been created successfully!');
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (time: Date) => {
    return time.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={setRegion}
        showsUserLocation={true}
        showsMyLocationButton={true}
        onPress={handleMapPress}
      >
        {events.map((event) => (
          <Marker
            key={event.id}
            coordinate={event.location}
            title={event.title}
            description={event.description}
            onPress={() => handleMarkerPress(event)}
          >
            <View style={styles.eventMarkerContainer}>
              <View style={styles.eventMarker} />
            </View>
          </Marker>
        ))}
        
        {/* Show new event location marker when creating */}
        {showCreateEvent && newEventLocation && (
          <Marker
            coordinate={newEventLocation}
            title="New Event Location"
          >
            <View style={styles.newEventMarkerContainer}>
              <View style={styles.newEventMarker} />
            </View>
          </Marker>
        )}
      </MapView>

      {/* Create Event FAB */}
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => setShowCreateEvent(true)}
        label={showCreateEvent ? "Cancel" : "Create Event"}
      />

      {/* Event Details Modal */}
      <Portal>
        <Modal
          visible={showEventDetails}
          onDismiss={() => setShowEventDetails(false)}
          contentContainerStyle={styles.modal}
        >
          {selectedEvent && (
            <Card>
              <Card.Title
                title={selectedEvent.title}
                subtitle={`by ${selectedEvent.creator}`}
              />
              <Card.Content>
                <Text style={styles.eventDescription}>{selectedEvent.description}</Text>
                
                <View style={styles.eventDetails}>
                  <Text style={styles.detailLabel}>📍 Location:</Text>
                  <Text style={styles.detailText}>{selectedEvent.location.address}</Text>
                  
                  <Text style={styles.detailLabel}>📅 Date:</Text>
                  <Text style={styles.detailText}>{formatDate(selectedEvent.date)}</Text>
                  
                  <Text style={styles.detailLabel}>🕐 Time:</Text>
                  <Text style={styles.detailText}>{formatTime(selectedEvent.time)}</Text>
                  
                  <Text style={styles.detailLabel}>👥 Attendees:</Text>
                  <Text style={styles.detailText}>
                    {selectedEvent.attendees.length}
                    {selectedEvent.maxAttendees ? ` / ${selectedEvent.maxAttendees}` : ''}
                  </Text>
                </View>

                <View style={styles.tagsContainer}>
                  {selectedEvent.tags.map((tag, index) => (
                    <Chip key={index} style={styles.tagChip} compact>
                      {tag}
                    </Chip>
                  ))}
                </View>
              </Card.Content>
              <Card.Actions>
                <Button onPress={() => setShowEventDetails(false)}>Close</Button>
                {selectedEvent.attendees.includes('Current User') && (
                  <Button
                    onPress={() => {
                      setShowEventDetails(false);
                      setShowEventChat(true);
                    }}
                  >
                    Join Chat
                  </Button>
                )}
                <Button
                  mode="contained"
                  onPress={() => handleRSVP(selectedEvent)}
                  style={[
                    styles.rsvpButton,
                    selectedEvent.attendees.includes('Current User') && styles.rsvpButtonAttending
                  ]}
                >
                  {selectedEvent.attendees.includes('Current User') ? 'Cancel RSVP' : 'RSVP'}
                </Button>
              </Card.Actions>
            </Card>
          )}
        </Modal>
      </Portal>

      {/* Create Event Modal */}
      <Portal>
        <Modal
          visible={showCreateEvent}
          onDismiss={() => setShowCreateEvent(false)}
          contentContainerStyle={styles.createModal}
        >
          <ScrollView>
            <Text style={styles.modalTitle}>Create New Event</Text>
            
            <TextInput
              label="Event Title *"
              value={newEvent.title}
              onChangeText={(text) => setNewEvent({...newEvent, title: text})}
              style={styles.input}
            />
            
            <TextInput
              label="Description *"
              value={newEvent.description}
              onChangeText={(text) => setNewEvent({...newEvent, description: text})}
              multiline
              numberOfLines={3}
              style={styles.input}
            />
            
            <TextInput
              label="Address (optional)"
              value={newEvent.address}
              onChangeText={(text) => setNewEvent({...newEvent, address: text})}
              style={styles.input}
            />
            
            <TextInput
              label="Date (YYYY-MM-DD)"
              value={newEvent.date}
              onChangeText={(text) => setNewEvent({...newEvent, date: text})}
              placeholder="2024-02-15"
              style={styles.input}
            />
            
            <TextInput
              label="Time (HH:MM)"
              value={newEvent.time}
              onChangeText={(text) => setNewEvent({...newEvent, time: text})}
              placeholder="14:30"
              style={styles.input}
            />
            
            <TextInput
              label="Max Attendees (optional)"
              value={newEvent.maxAttendees}
              onChangeText={(text) => setNewEvent({...newEvent, maxAttendees: text})}
              keyboardType="numeric"
              style={styles.input}
            />
            
            <TextInput
              label="Tags (comma-separated)"
              value={newEvent.tags}
              onChangeText={(text) => setNewEvent({...newEvent, tags: text})}
              placeholder="e.g. hiking, food, culture"
              style={styles.input}
            />
            
            {newEventLocation ? (
              <Text style={styles.locationText}>
                📍 Location selected: {newEventLocation.latitude.toFixed(4)}, {newEventLocation.longitude.toFixed(4)}
              </Text>
            ) : (
              <Text style={styles.locationInstructions}>
                📍 Tap on the map to select event location
              </Text>
            )}
            
            <View style={styles.createEventButtons}>
              <Button
                onPress={() => setShowCreateEvent(false)}
                style={styles.createEventButton}
              >
                Cancel
              </Button>
              <Button
                mode="contained"
                onPress={handleCreateEvent}
                style={styles.createEventButton}
              >
                Create Event
              </Button>
            </View>
          </ScrollView>
        </Modal>
      </Portal>

      {/* Event Chat Modal */}
      <Portal>
        <Modal
          visible={showEventChat}
          onDismiss={() => setShowEventChat(false)}
          contentContainerStyle={styles.chatModal}
        >
          {selectedEvent && (
            <EventChat
              eventId={selectedEvent.id}
              eventTitle={selectedEvent.title}
              currentUserId="current-user"
              currentUserName="Current User"
            />
          )}
        </Modal>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  eventMarkerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  eventMarker: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FF5722',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  newEventMarkerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  newEventMarker: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#FF5722',
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 8,
    maxHeight: '80%',
  },
  createModal: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 8,
    maxHeight: '90%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  eventDescription: {
    fontSize: 16,
    marginBottom: 16,
  },
  eventDetails: {
    marginBottom: 16,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 8,
  },
  detailText: {
    fontSize: 14,
    marginBottom: 4,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  tagChip: {
    marginRight: 8,
    marginBottom: 4,
  },
  rsvpButton: {
    backgroundColor: '#2196F3',
  },
  rsvpButtonAttending: {
    backgroundColor: '#4CAF50',
  },
  input: {
    marginBottom: 16,
  },
  locationText: {
    fontSize: 14,
    color: '#4CAF50',
    marginBottom: 16,
    textAlign: 'center',
  },
  locationInstructions: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  createEventButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  createEventButton: {
    flex: 1,
    marginHorizontal: 8,
  },
  chatModal: {
    flex: 1,
    margin: 0,
  },
});