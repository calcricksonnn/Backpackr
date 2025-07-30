import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Card, Title, Paragraph, Button, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function RouteBuilderScreen() {
  const [routeName, setRouteName] = useState('');
  const [waypoints, setWaypoints] = useState([
    { id: 1, name: 'Eiffel Tower', address: 'Paris, France' },
    { id: 2, name: 'Louvre Museum', address: 'Paris, France' }
  ]);

  const savedRoutes = [
    {
      id: 1,
      name: 'Paris Highlights',
      waypoints: 3,
      distance: '12.5 km',
      duration: '2h 30min',
      likes: 24
    },
    {
      id: 2,
      name: 'Romantic Seine Walk',
      waypoints: 5,
      distance: '8.2 km',
      duration: '3h 15min',
      likes: 18
    }
  ];

  const RouteCard = ({ route }) => (
    <Card style={styles.routeCard}>
      <Card.Content>
        <Title style={styles.routeName}>{route.name}</Title>
        <View style={styles.routeDetails}>
          <Text style={styles.routeInfo}>{route.waypoints} stops • {route.distance} • {route.duration}</Text>
          <Text style={styles.routeLikes}>♥ {route.likes}</Text>
        </View>
        <View style={styles.routeActions}>
          <Button mode="outlined" compact>View</Button>
          <Button mode="contained" compact>Use Route</Button>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Title style={styles.headerTitle}>Route Builder</Title>
        <Paragraph style={styles.headerSubtitle}>Create custom travel routes</Paragraph>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Create New Route</Text>
        <Card style={styles.builderCard}>
          <Card.Content>
            <TextInput
              label="Route Name"
              value={routeName}
              onChangeText={setRouteName}
              style={styles.input}
            />
            
            <Text style={styles.waypointsTitle}>Waypoints</Text>
            {waypoints.map((waypoint, index) => (
              <View key={waypoint.id} style={styles.waypoint}>
                <Ionicons name="location" size={20} color="#FF5722" />
                <View style={styles.waypointInfo}>
                  <Text style={styles.waypointName}>{waypoint.name}</Text>
                  <Text style={styles.waypointAddress}>{waypoint.address}</Text>
                </View>
                <Button mode="text" compact>Remove</Button>
              </View>
            ))}
            
            <Button mode="outlined" icon="plus" onPress={() => {}}>
              Add Waypoint
            </Button>
            
            <Button mode="contained" style={styles.saveButton}>
              Save Route
            </Button>
          </Card.Content>
        </Card>

        <Text style={styles.sectionTitle}>Saved Routes</Text>
        {savedRoutes.map((route) => (
          <RouteCard key={route.id} route={route} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#FF5722',
    alignItems: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: 'white',
    fontSize: 14,
    opacity: 0.9,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    marginTop: 8,
  },
  builderCard: {
    marginBottom: 16,
    elevation: 2,
  },
  input: {
    marginBottom: 16,
    backgroundColor: 'white',
  },
  waypointsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  waypoint: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  waypointInfo: {
    flex: 1,
    marginLeft: 12,
  },
  waypointName: {
    fontSize: 14,
    fontWeight: '500',
  },
  waypointAddress: {
    fontSize: 12,
    color: '#666',
  },
  saveButton: {
    marginTop: 16,
  },
  routeCard: {
    marginBottom: 12,
    elevation: 2,
  },
  routeName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  routeDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  routeInfo: {
    fontSize: 14,
    color: '#666',
  },
  routeLikes: {
    fontSize: 14,
    color: '#F44336',
  },
  routeActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});