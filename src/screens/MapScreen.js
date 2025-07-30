import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Text, Card, Title, Button, FAB, Portal, Modal, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker, Polyline, Circle } from 'react-native-maps';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';

export default function MapScreen() {
  const [location, setLocation] = useState(null);
  const [markers, setMarkers] = useState([
    {
      id: 1,
      coordinate: { latitude: 48.8566, longitude: 2.3522 },
      title: 'Eiffel Tower',
      description: 'Highly rated landmark - 4.8★',
      type: 'destination',
      rating: 4.8
    },
    {
      id: 2,
      coordinate: { latitude: 48.8606, longitude: 2.3376 },
      title: 'Louvre Museum',
      description: 'Must-visit museum - 4.6★',
      type: 'destination',
      rating: 4.6
    },
    {
      id: 3,
      coordinate: { latitude: 48.8529, longitude: 2.3499 },
      title: 'Notre-Dame Cathedral',
      description: 'Historic cathedral - 4.5★',
      type: 'destination',
      rating: 4.5
    }
  ]);
  const [routes, setRoutes] = useState([
    {
      id: 1,
      coordinates: [
        { latitude: 48.8566, longitude: 2.3522 },
        { latitude: 48.8606, longitude: 2.3376 },
        { latitude: 48.8529, longitude: 2.3499 }
      ],
      title: 'Paris Highlights Tour',
      color: '#2196F3'
    }
  ]);
  const [showAddMarker, setShowAddMarker] = useState(false);
  const [newMarker, setNewMarker] = useState({
    title: '',
    description: '',
    type: 'destination'
  });
  const [selectedCoordinate, setSelectedCoordinate] = useState(null);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Location permission is required to show your current location');
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    } catch (error) {
      console.log('Error getting location:', error);
      // Default to Paris for demo
      setLocation({
        latitude: 48.8566,
        longitude: 2.3522,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    }
  };

  const handleMapPress = (event) => {
    setSelectedCoordinate(event.nativeEvent.coordinate);
    setShowAddMarker(true);
  };

  const addNewMarker = () => {
    if (!newMarker.title.trim() || !selectedCoordinate) {
      Alert.alert('Error', 'Please provide a title for the marker');
      return;
    }

    const marker = {
      id: markers.length + 1,
      coordinate: selectedCoordinate,
      title: newMarker.title,
      description: newMarker.description,
      type: newMarker.type,
      rating: 0
    };

    setMarkers(prev => [...prev, marker]);
    setNewMarker({ title: '', description: '', type: 'destination' });
    setShowAddMarker(false);
    setSelectedCoordinate(null);
  };

  const getMarkerColor = (type, rating) => {
    if (rating >= 4.5) return '#4CAF50'; // Green for highly rated
    if (rating >= 4.0) return '#FF9800'; // Orange for good rating
    if (rating >= 3.0) return '#FFC107'; // Yellow for average
    return '#F44336'; // Red for poor rating or no rating
  };

  const getMarkerIcon = (type) => {
    switch (type) {
      case 'accommodation': return 'bed';
      case 'food': return 'restaurant';
      case 'activity': return 'bicycle';
      case 'transport': return 'car';
      default: return 'location';
    }
  };

  if (!location) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text>Loading map...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Title style={styles.headerTitle}>Interactive Map</Title>
      </View>

      <MapView
        style={styles.map}
        initialRegion={location}
        showsUserLocation={true}
        showsMyLocationButton={true}
        onPress={handleMapPress}
      >
        {/* Markers for destinations and places */}
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={marker.coordinate}
            title={marker.title}
            description={marker.description}
            pinColor={getMarkerColor(marker.type, marker.rating)}
          />
        ))}

        {/* Routes */}
        {routes.map((route) => (
          <Polyline
            key={route.id}
            coordinates={route.coordinates}
            strokeColor={route.color}
            strokeWidth={3}
            lineDashPattern={[5, 5]}
          />
        ))}

        {/* User location circle */}
        {location && (
          <Circle
            center={{
              latitude: location.latitude,
              longitude: location.longitude
            }}
            radius={1000}
            fillColor="rgba(33, 150, 243, 0.1)"
            strokeColor="rgba(33, 150, 243, 0.5)"
            strokeWidth={2}
          />
        )}
      </MapView>

      {/* Legend */}
      <Card style={styles.legendCard}>
        <Card.Content style={styles.legendContent}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#4CAF50' }]} />
            <Text style={styles.legendText}>Highly Rated (4.5+★)</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#FF9800' }]} />
            <Text style={styles.legendText}>Good Rating (4.0+★)</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#F44336' }]} />
            <Text style={styles.legendText}>New/Unrated</Text>
          </View>
        </Card.Content>
      </Card>

      {/* Action buttons */}
      <View style={styles.actionButtons}>
        <FAB
          icon="plus"
          onPress={() => {
            if (!selectedCoordinate) {
              Alert.alert('Info', 'Tap on the map to add a new location');
            } else {
              setShowAddMarker(true);
            }
          }}
          style={[styles.fab, styles.addFab]}
          size="small"
        />
        <FAB
          icon="map-outline"
          onPress={() => Alert.alert('Feature', 'Route builder coming soon!')}
          style={[styles.fab, styles.routeFab]}
          size="small"
        />
      </View>

      {/* Add Marker Modal */}
      <Portal>
        <Modal
          visible={showAddMarker}
          onDismiss={() => {
            setShowAddMarker(false);
            setSelectedCoordinate(null);
          }}
          contentContainerStyle={styles.modalContainer}
        >
          <Title style={styles.modalTitle}>Add New Location</Title>
          
          <TextInput
            label="Location Name"
            value={newMarker.title}
            onChangeText={(text) => setNewMarker(prev => ({ ...prev, title: text }))}
            style={styles.modalInput}
          />
          
          <TextInput
            label="Description (optional)"
            value={newMarker.description}
            onChangeText={(text) => setNewMarker(prev => ({ ...prev, description: text }))}
            style={styles.modalInput}
            multiline
          />

          <View style={styles.typeButtons}>
            {[
              { type: 'destination', label: 'Destination', icon: 'location' },
              { type: 'accommodation', label: 'Stay', icon: 'bed' },
              { type: 'food', label: 'Food', icon: 'restaurant' },
              { type: 'activity', label: 'Activity', icon: 'bicycle' }
            ].map((item) => (
              <Button
                key={item.type}
                mode={newMarker.type === item.type ? 'contained' : 'outlined'}
                onPress={() => setNewMarker(prev => ({ ...prev, type: item.type }))}
                style={styles.typeButton}
                icon={item.icon}
                compact
              >
                {item.label}
              </Button>
            ))}
          </View>

          <View style={styles.modalActions}>
            <Button
              mode="outlined"
              onPress={() => {
                setShowAddMarker(false);
                setSelectedCoordinate(null);
              }}
              style={styles.modalButton}
            >
              Cancel
            </Button>
            <Button
              mode="contained"
              onPress={addNewMarker}
              style={styles.modalButton}
            >
              Add Location
            </Button>
          </View>
        </Modal>
      </Portal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 16,
    backgroundColor: '#2196F3',
    alignItems: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    flex: 1,
  },
  legendCard: {
    position: 'absolute',
    top: 20,
    left: 16,
    right: 16,
    elevation: 4,
  },
  legendContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 4,
  },
  legendText: {
    fontSize: 10,
    color: '#666',
  },
  actionButtons: {
    position: 'absolute',
    bottom: 20,
    right: 16,
  },
  fab: {
    marginBottom: 8,
  },
  addFab: {
    backgroundColor: '#4CAF50',
  },
  routeFab: {
    backgroundColor: '#FF9800',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 8,
  },
  modalTitle: {
    textAlign: 'center',
    marginBottom: 16,
  },
  modalInput: {
    marginBottom: 12,
    backgroundColor: 'white',
  },
  typeButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  typeButton: {
    margin: 4,
    flex: 1,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 8,
  },
});