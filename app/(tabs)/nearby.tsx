import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView } from 'react-native';
import { Button, Card, Chip, FAB, Portal, Modal, TextInput } from 'react-native-paper';
import MapView, { Marker, Region } from 'react-native-maps';
import * as Location from 'expo-location';

interface Backpacker {
  id: string;
  name: string;
  location: {
    latitude: number;
    longitude: number;
  };
  interests: string[];
  route: string;
  bio: string;
  avatar?: string;
}

// Mock data for nearby backpackers
const mockBackpackers: Backpacker[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    location: { latitude: 37.78825, longitude: -122.4324 },
    interests: ['hiking', 'photography', 'culture'],
    route: 'Europe Circuit',
    bio: 'Love exploring new cultures and taking photos along the way!',
  },
  {
    id: '2',
    name: 'Mike Chen',
    location: { latitude: 37.79825, longitude: -122.4424 },
    interests: ['adventure', 'food', 'nightlife'],
    route: 'Southeast Asia',
    bio: 'Adventure seeker looking for the best local food spots.',
  },
  {
    id: '3',
    name: 'Emma Wilson',
    location: { latitude: 37.77825, longitude: -122.4224 },
    interests: ['culture', 'art', 'museums'],
    route: 'Europe Circuit',
    bio: 'Art enthusiast exploring museums and galleries worldwide.',
  },
];

export default function Nearby() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [region, setRegion] = useState<Region>({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const [backpackers, setBackpackers] = useState<Backpacker[]>(mockBackpackers);
  const [filteredBackpackers, setFilteredBackpackers] = useState<Backpacker[]>(mockBackpackers);
  const [selectedBackpacker, setSelectedBackpacker] = useState<Backpacker | null>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [interestFilter, setInterestFilter] = useState('');
  const [routeFilter, setRouteFilter] = useState('');

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
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    })();
  }, []);

  useEffect(() => {
    // Apply filters
    let filtered = backpackers;
    
    if (interestFilter) {
      filtered = filtered.filter(bp => 
        bp.interests.some(interest => 
          interest.toLowerCase().includes(interestFilter.toLowerCase())
        )
      );
    }
    
    if (routeFilter) {
      filtered = filtered.filter(bp => 
        bp.route.toLowerCase().includes(routeFilter.toLowerCase())
      );
    }
    
    setFilteredBackpackers(filtered);
  }, [interestFilter, routeFilter, backpackers]);

  const handleMarkerPress = (backpacker: Backpacker) => {
    setSelectedBackpacker(backpacker);
    setShowProfile(true);
  };

  const handleConnect = (backpacker: Backpacker) => {
    Alert.alert(
      'Connect Request',
      `Send a connection request to ${backpacker.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Send Request', onPress: () => {
          Alert.alert('Success', 'Connection request sent!');
          setShowProfile(false);
        }},
      ]
    );
  };

  const clearFilters = () => {
    setInterestFilter('');
    setRouteFilter('');
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={setRegion}
        showsUserLocation={true}
        showsMyLocationButton={true}
      >
        {filteredBackpackers.map((backpacker) => (
          <Marker
            key={backpacker.id}
            coordinate={backpacker.location}
            title={backpacker.name}
            description={backpacker.bio}
            onPress={() => handleMarkerPress(backpacker)}
          >
            <View style={styles.markerContainer}>
              <View style={styles.marker} />
            </View>
          </Marker>
        ))}
      </MapView>

      {/* Filter chips */}
      <View style={styles.filtersContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {interestFilter !== '' && (
            <Chip
              mode="outlined"
              onClose={() => setInterestFilter('')}
              style={styles.filterChip}
            >
              Interest: {interestFilter}
            </Chip>
          )}
          {routeFilter !== '' && (
            <Chip
              mode="outlined"
              onClose={() => setRouteFilter('')}
              style={styles.filterChip}
            >
              Route: {routeFilter}
            </Chip>
          )}
        </ScrollView>
      </View>

      {/* Filter FAB */}
      <FAB
        icon="filter-variant"
        style={styles.fab}
        onPress={() => setShowFilters(true)}
      />

      {/* Filter Modal */}
      <Portal>
        <Modal
          visible={showFilters}
          onDismiss={() => setShowFilters(false)}
          contentContainerStyle={styles.modal}
        >
          <Text style={styles.modalTitle}>Filter Backpackers</Text>
          <TextInput
            label="Interest"
            value={interestFilter}
            onChangeText={setInterestFilter}
            style={styles.filterInput}
            placeholder="e.g. hiking, photography, culture"
          />
          <TextInput
            label="Route"
            value={routeFilter}
            onChangeText={setRouteFilter}
            style={styles.filterInput}
            placeholder="e.g. Europe Circuit, Southeast Asia"
          />
          <View style={styles.modalButtons}>
            <Button onPress={clearFilters} style={styles.modalButton}>
              Clear All
            </Button>
            <Button
              mode="contained"
              onPress={() => setShowFilters(false)}
              style={styles.modalButton}
            >
              Apply Filters
            </Button>
          </View>
        </Modal>
      </Portal>

      {/* Profile Modal */}
      <Portal>
        <Modal
          visible={showProfile}
          onDismiss={() => setShowProfile(false)}
          contentContainerStyle={styles.modal}
        >
          {selectedBackpacker && (
            <Card>
              <Card.Title
                title={selectedBackpacker.name}
                subtitle={selectedBackpacker.route}
              />
              <Card.Content>
                <Text style={styles.bio}>{selectedBackpacker.bio}</Text>
                <View style={styles.interestsContainer}>
                  <Text style={styles.interestsLabel}>Interests:</Text>
                  <View style={styles.interestsChips}>
                    {selectedBackpacker.interests.map((interest, index) => (
                      <Chip key={index} style={styles.interestChip} compact>
                        {interest}
                      </Chip>
                    ))}
                  </View>
                </View>
              </Card.Content>
              <Card.Actions>
                <Button onPress={() => setShowProfile(false)}>Close</Button>
                <Button
                  mode="contained"
                  onPress={() => handleConnect(selectedBackpacker)}
                >
                  Connect
                </Button>
              </Card.Actions>
            </Card>
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
  markerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  marker: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#2196F3',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  filtersContainer: {
    position: 'absolute',
    top: 10,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
  },
  filterChip: {
    marginRight: 8,
    backgroundColor: '#ffffff',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#2196F3',
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  filterInput: {
    marginBottom: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 8,
  },
  bio: {
    marginBottom: 16,
    fontSize: 16,
  },
  interestsContainer: {
    marginTop: 8,
  },
  interestsLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  interestsChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  interestChip: {
    marginRight: 8,
    marginBottom: 4,
  },
});