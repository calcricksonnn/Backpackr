import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { 
  Card, 
  Title, 
  Paragraph, 
  Button, 
  List,
  TextInput,
  FAB,
  Dialog,
  Portal
} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface Route {
  id: string;
  name: string;
  description: string;
  duration: string;
  shared: boolean;
  syncedWith: string[];
}

export default function RouteScreen() {
  const [routes, setRoutes] = useState<Route[]>([
    {
      id: '1',
      name: 'Southeast Asia Trail',
      description: 'Bangkok → Chiang Mai → Hanoi → Ho Chi Minh',
      duration: '3 weeks',
      shared: true,
      syncedWith: ['Alex', 'Sarah']
    },
    {
      id: '2', 
      name: 'European Backpack',
      description: 'Amsterdam → Berlin → Prague → Vienna',
      duration: '2 weeks',
      shared: false,
      syncedWith: []
    }
  ]);

  const [showShareDialog, setShowShareDialog] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  const [shareEmail, setShareEmail] = useState('');

  const shareRoute = (route: Route) => {
    setSelectedRoute(route);
    setShowShareDialog(true);
  };

  const handleShare = () => {
    if (selectedRoute && shareEmail) {
      const updatedRoutes = routes.map(route => {
        if (route.id === selectedRoute.id) {
          return {
            ...route,
            shared: true,
            syncedWith: [...route.syncedWith, shareEmail]
          };
        }
        return route;
      });
      setRoutes(updatedRoutes);
      setShowShareDialog(false);
      setShareEmail('');
    }
  };

  const syncRoute = (routeId: string) => {
    // Simulate syncing with other travelers
    const updatedRoutes = routes.map(route => {
      if (route.id === routeId) {
        return {
          ...route,
          syncedWith: [...route.syncedWith, 'TravelBuddy_' + Math.floor(Math.random() * 1000)]
        };
      }
      return route;
    });
    setRoutes(updatedRoutes);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Card style={styles.headerCard}>
          <Card.Content>
            <Title>Route Sharing & Syncing</Title>
            <Paragraph>Share your routes and sync with fellow backpackers</Paragraph>
          </Card.Content>
        </Card>

        <Title style={styles.sectionTitle}>My Routes</Title>

        {routes.map((route) => (
          <Card key={route.id} style={styles.routeCard}>
            <Card.Content>
              <View style={styles.routeHeader}>
                <MaterialCommunityIcons 
                  name="map-marker-path" 
                  size={24} 
                  color="#6200EE" 
                />
                <View style={styles.routeInfo}>
                  <Title style={styles.routeTitle}>{route.name}</Title>
                  <Paragraph>{route.description}</Paragraph>
                  <Paragraph style={styles.duration}>Duration: {route.duration}</Paragraph>
                </View>
              </View>

              {route.shared && (
                <View style={styles.sharedInfo}>
                  <MaterialCommunityIcons name="share-variant" size={16} color="#4CAF50" />
                  <Paragraph style={styles.sharedText}>
                    Shared with: {route.syncedWith.join(', ')}
                  </Paragraph>
                </View>
              )}
            </Card.Content>

            <Card.Actions>
              <Button onPress={() => shareRoute(route)}>
                {route.shared ? 'Share More' : 'Share'}
              </Button>
              <Button onPress={() => syncRoute(route.id)}>
                Sync Route
              </Button>
            </Card.Actions>
          </Card>
        ))}

        <Card style={styles.featuresCard}>
          <Card.Content>
            <Title>Route Features</Title>
            <List.Item
              title="Real-time Sync"
              description="Routes sync automatically with your travel group"
              left={() => <List.Icon icon="sync" />}
            />
            <List.Item
              title="Smart Matching"
              description="Find travelers going to similar destinations"
              left={() => <List.Icon icon="map-search" />}
            />
            <List.Item
              title="Collaborative Planning"
              description="Plan routes together with shared editing"
              left={() => <List.Icon icon="account-multiple" />}
            />
          </Card.Content>
        </Card>
      </ScrollView>

      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => {}}
        label="New Route"
      />

      <Portal>
        <Dialog visible={showShareDialog} onDismiss={() => setShowShareDialog(false)}>
          <Dialog.Title>Share Route</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Share "{selectedRoute?.name}" with a friend</Paragraph>
            <TextInput
              label="Email or Username"
              value={shareEmail}
              onChangeText={setShareEmail}
              style={styles.input}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowShareDialog(false)}>Cancel</Button>
            <Button onPress={handleShare}>Share</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
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
  sectionTitle: {
    marginVertical: 16,
    color: '#333',
  },
  routeCard: {
    marginBottom: 12,
    elevation: 2,
  },
  routeHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  routeInfo: {
    marginLeft: 12,
    flex: 1,
  },
  routeTitle: {
    fontSize: 16,
    marginBottom: 4,
  },
  duration: {
    color: '#666',
    fontSize: 12,
  },
  sharedInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    padding: 8,
    backgroundColor: '#E8F5E8',
    borderRadius: 4,
  },
  sharedText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#4CAF50',
  },
  featuresCard: {
    marginTop: 16,
    marginBottom: 80,
  },
  input: {
    marginTop: 8,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#6200EE',
  },
});