import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, List, Button, Chip, FAB } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface Event {
  id: string;
  name: string;
  type: 'cultural' | 'food' | 'music' | 'adventure' | 'social';
  location: string;
  date: string;
  time: string;
  price: string;
  description: string;
  attendees: number;
  isAttending: boolean;
  discount?: string;
}

export default function EventsScreen() {
  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      name: 'Floating Market Tour',
      type: 'cultural',
      location: 'Damnoen Saduak, Thailand',
      date: '2024-01-20',
      time: '6:00 AM',
      price: '$25',
      description: 'Experience traditional Thai floating market with breakfast included',
      attendees: 12,
      isAttending: false,
      discount: '20% off for backpackers'
    },
    {
      id: '2',
      name: 'Street Food Walking Tour',
      type: 'food',
      location: 'Chinatown, Bangkok',
      date: '2024-01-18',
      time: '7:00 PM',
      price: '$15',
      description: 'Taste authentic local dishes with a foodie guide',
      attendees: 8,
      isAttending: true
    },
    {
      id: '3',
      name: 'Full Moon Party Prep',
      type: 'social',
      location: 'Koh Phangan',
      date: '2024-01-22',
      time: '9:00 PM',
      price: 'Free',
      description: 'Meet fellow travelers before the main event',
      attendees: 45,
      isAttending: false,
      discount: 'Free drink included'
    },
    {
      id: '4',
      name: 'Temple Sunrise Photography',
      type: 'cultural',
      location: 'Angkor Wat, Cambodia',
      date: '2024-01-25',
      time: '5:30 AM',
      price: '$40',
      description: 'Capture the perfect sunrise shot with a professional guide',
      attendees: 6,
      isAttending: false
    }
  ]);

  const [filterType, setFilterType] = useState<string | null>(null);

  const filteredEvents = filterType 
    ? events.filter(event => event.type === filterType)
    : events;

  const toggleAttendance = (eventId: string) => {
    setEvents(events.map(event => 
      event.id === eventId 
        ? { ...event, isAttending: !event.isAttending, attendees: event.isAttending ? event.attendees - 1 : event.attendees + 1 }
        : event
    ));
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'cultural': return 'temple-buddhist';
      case 'food': return 'food';
      case 'music': return 'music';
      case 'adventure': return 'hiking';
      case 'social': return 'account-group';
      default: return 'calendar';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'cultural': return '#9C27B0';
      case 'food': return '#FF5722';
      case 'music': return '#E91E63';
      case 'adventure': return '#4CAF50';
      case 'social': return '#2196F3';
      default: return '#FF9800';
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Card style={styles.headerCard}>
          <Card.Content>
            <Title>Local Events & Activities</Title>
            <Paragraph>Discover authentic experiences and connect with locals</Paragraph>
          </Card.Content>
        </Card>

        {/* Filter Chips */}
        <View style={styles.filterContainer}>
          <Chip
            selected={filterType === null}
            onPress={() => setFilterType(null)}
            style={styles.filterChip}
          >
            All
          </Chip>
          <Chip
            selected={filterType === 'cultural'}
            onPress={() => setFilterType('cultural')}
            style={styles.filterChip}
            icon="temple-buddhist"
          >
            Cultural
          </Chip>
          <Chip
            selected={filterType === 'food'}
            onPress={() => setFilterType('food')}
            style={styles.filterChip}
            icon="food"
          >
            Food
          </Chip>
          <Chip
            selected={filterType === 'social'}
            onPress={() => setFilterType('social')}
            style={styles.filterChip}
            icon="account-group"
          >
            Social
          </Chip>
          <Chip
            selected={filterType === 'adventure'}
            onPress={() => setFilterType('adventure')}
            style={styles.filterChip}
            icon="hiking"
          >
            Adventure
          </Chip>
        </View>

        {/* Events List */}
        {filteredEvents.map((event) => (
          <Card key={event.id} style={[
            styles.eventCard,
            event.isAttending && styles.attendingCard
          ]}>
            <Card.Content>
              <View style={styles.eventHeader}>
                <MaterialCommunityIcons 
                  name={getTypeIcon(event.type) as any} 
                  size={28} 
                  color={getTypeColor(event.type)} 
                />
                <View style={styles.eventInfo}>
                  <Title style={styles.eventName}>{event.name}</Title>
                  <View style={styles.eventMeta}>
                    <MaterialCommunityIcons name="map-marker" size={12} color="#666" />
                    <Paragraph style={styles.location}>{event.location}</Paragraph>
                  </View>
                  <View style={styles.eventMeta}>
                    <MaterialCommunityIcons name="clock" size={12} color="#666" />
                    <Paragraph style={styles.dateTime}>
                      {event.date} at {event.time}
                    </Paragraph>
                  </View>
                </View>
                <View style={styles.priceContainer}>
                  <Paragraph style={styles.price}>{event.price}</Paragraph>
                  <Chip 
                    style={[styles.typeChip, { backgroundColor: getTypeColor(event.type) + '20' }]}
                    textStyle={{ color: getTypeColor(event.type) }}
                  >
                    {event.type}
                  </Chip>
                </View>
              </View>

              <Paragraph style={styles.description}>{event.description}</Paragraph>

              {event.discount && (
                <View style={styles.discountContainer}>
                  <MaterialCommunityIcons name="tag" size={16} color="#4CAF50" />
                  <Paragraph style={styles.discountText}>{event.discount}</Paragraph>
                </View>
              )}

              <View style={styles.attendeeContainer}>
                <MaterialCommunityIcons name="account-multiple" size={16} color="#666" />
                <Paragraph style={styles.attendeeText}>
                  {event.attendees} people {event.isAttending ? 'including you' : 'attending'}
                </Paragraph>
              </View>
            </Card.Content>

            <Card.Actions>
              <Button 
                mode={event.isAttending ? "outlined" : "contained"}
                onPress={() => toggleAttendance(event.id)}
                buttonColor={event.isAttending ? undefined : '#6200EE'}
              >
                {event.isAttending ? 'Cancel' : 'Join Event'}
              </Button>
              <Button icon="share-variant">Share</Button>
              <Button icon="map">Directions</Button>
            </Card.Actions>
          </Card>
        ))}

        {/* Partner Offers */}
        <Card style={styles.partnersCard}>
          <Card.Content>
            <Title>Exclusive Partner Offers</Title>
            <List.Item
              title="Hostel World Discount"
              description="10% off bookings when you join 3+ events"
              left={() => <List.Icon icon="bed" />}
              right={() => <Chip style={styles.discountChip}>10% OFF</Chip>}
            />
            <List.Item
              title="Local Restaurant Deals"
              description="Free appetizer at partner restaurants"
              left={() => <List.Icon icon="food" />}
              right={() => <Chip style={styles.discountChip}>FREE</Chip>}
            />
            <List.Item
              title="Transport Vouchers"
              description="Discounted taxi rides for event attendees"
              left={() => <List.Icon icon="car" />}
              right={() => <Chip style={styles.discountChip}>20% OFF</Chip>}
            />
          </Card.Content>
        </Card>

        <Card style={styles.featuresCard}>
          <Card.Content>
            <Title>Event Features</Title>
            <List.Item
              title="Calendar Integration"
              description="Sync events with your device calendar"
              left={() => <List.Icon icon="calendar-sync" />}
            />
            <List.Item
              title="Group Chat"
              description="Connect with other attendees before events"
              left={() => <List.Icon icon="chat-processing" />}
            />
            <List.Item
              title="Local Insights"
              description="Get insider tips from local event organizers"
              left={() => <List.Icon icon="lightbulb" />}
            />
          </Card.Content>
        </Card>
      </ScrollView>

      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => {}}
        label="Create Event"
      />
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
  filterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  filterChip: {
    marginBottom: 4,
  },
  eventCard: {
    marginBottom: 12,
    elevation: 2,
  },
  attendingCard: {
    borderColor: '#4CAF50',
    borderWidth: 2,
  },
  eventHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  eventInfo: {
    marginLeft: 12,
    flex: 1,
  },
  eventName: {
    fontSize: 16,
    marginBottom: 4,
  },
  eventMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  location: {
    fontSize: 11,
    color: '#666',
    marginLeft: 4,
  },
  dateTime: {
    fontSize: 11,
    color: '#666',
    marginLeft: 4,
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  price: {
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 4,
  },
  typeChip: {
    height: 20,
  },
  description: {
    marginBottom: 8,
    lineHeight: 18,
  },
  discountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E8',
    padding: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  discountText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  attendeeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  attendeeText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#666',
  },
  partnersCard: {
    marginTop: 16,
    backgroundColor: '#FFF3E0',
  },
  discountChip: {
    backgroundColor: '#4CAF50',
    height: 24,
  },
  featuresCard: {
    marginTop: 16,
    marginBottom: 80,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#6200EE',
  },
});