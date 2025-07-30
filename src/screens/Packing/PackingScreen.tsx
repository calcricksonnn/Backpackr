import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, List, Button, Chip, FAB, Dialog, Portal, TextInput } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface PackingItem {
  id: string;
  name: string;
  category: 'clothing' | 'electronics' | 'toiletries' | 'documents' | 'gear' | 'medicine';
  essential: boolean;
  packed: boolean;
  quantity?: number;
  notes?: string;
}

interface Trip {
  destination: string;
  climate: 'tropical' | 'temperate' | 'cold' | 'desert';
  duration: number;
  activities: string[];
}

export default function PackingScreen() {
  const [trip] = useState<Trip>({
    destination: 'Southeast Asia',
    climate: 'tropical',
    duration: 14,
    activities: ['sightseeing', 'beach', 'hiking', 'nightlife']
  });

  const [packingList, setPackingList] = useState<PackingItem[]>([
    // Essential clothing
    { id: '1', name: 'Quick-dry shirts', category: 'clothing', essential: true, packed: false, quantity: 5 },
    { id: '2', name: 'Lightweight pants', category: 'clothing', essential: true, packed: true, quantity: 2 },
    { id: '3', name: 'Swimwear', category: 'clothing', essential: true, packed: false, quantity: 2 },
    { id: '4', name: 'Hiking boots', category: 'clothing', essential: true, packed: false, quantity: 1 },
    
    // Electronics
    { id: '5', name: 'Phone charger', category: 'electronics', essential: true, packed: true, quantity: 1 },
    { id: '6', name: 'Power bank', category: 'electronics', essential: true, packed: false, quantity: 1 },
    { id: '7', name: 'Universal adapter', category: 'electronics', essential: true, packed: false, quantity: 1 },
    
    // Documents
    { id: '8', name: 'Passport', category: 'documents', essential: true, packed: true, quantity: 1 },
    { id: '9', name: 'Travel insurance', category: 'documents', essential: true, packed: true, quantity: 1 },
    { id: '10', name: 'Vaccination certificate', category: 'documents', essential: true, packed: false, quantity: 1 },
    
    // Toiletries
    { id: '11', name: 'Sunscreen SPF 50+', category: 'toiletries', essential: true, packed: false, quantity: 1 },
    { id: '12', name: 'Insect repellent', category: 'toiletries', essential: true, packed: false, quantity: 1 },
    
    // Medicine
    { id: '13', name: 'Anti-diarrheal medication', category: 'medicine', essential: true, packed: false, quantity: 1 },
    { id: '14', name: 'Pain relievers', category: 'medicine', essential: true, packed: true, quantity: 1 },
    
    // Gear
    { id: '15', name: 'Daypack', category: 'gear', essential: true, packed: false, quantity: 1 },
    { id: '16', name: 'Water bottle', category: 'gear', essential: true, packed: false, quantity: 1 },
    { id: '17', name: 'Padlock', category: 'gear', essential: true, packed: true, quantity: 2 }
  ]);

  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newItem, setNewItem] = useState({ name: '', category: 'clothing' as const });

  const togglePacked = (itemId: string) => {
    setPackingList(packingList.map(item => 
      item.id === itemId ? { ...item, packed: !item.packed } : item
    ));
  };

  const addCustomItem = () => {
    if (newItem.name) {
      const item: PackingItem = {
        id: Date.now().toString(),
        name: newItem.name,
        category: newItem.category,
        essential: false,
        packed: false,
        quantity: 1
      };
      setPackingList([...packingList, item]);
      setNewItem({ name: '', category: 'clothing' });
      setShowAddDialog(false);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'clothing': return 'tshirt-crew';
      case 'electronics': return 'cellphone';
      case 'toiletries': return 'toothbrush';
      case 'documents': return 'file-document';
      case 'gear': return 'bag-personal';
      case 'medicine': return 'medical-bag';
      default: return 'package-variant';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'clothing': return '#2196F3';
      case 'electronics': return '#FF9800';
      case 'toiletries': return '#4CAF50';
      case 'documents': return '#F44336';
      case 'gear': return '#9C27B0';
      case 'medicine': return '#E91E63';
      default: return '#666';
    }
  };

  const groupedItems = packingList.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, PackingItem[]>);

  const packingProgress = packingList.filter(item => item.packed).length / packingList.length;
  const essentialProgress = packingList.filter(item => item.essential && item.packed).length / 
                           packingList.filter(item => item.essential).length;

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Card style={styles.headerCard}>
          <Card.Content>
            <Title>Packing Assistant</Title>
            <Paragraph>Smart packing lists tailored to your destination</Paragraph>
          </Card.Content>
        </Card>

        {/* Trip Info */}
        <Card style={styles.tripCard}>
          <Card.Content>
            <Title>Trip Details</Title>
            <View style={styles.tripDetails}>
              <View style={styles.tripItem}>
                <MaterialCommunityIcons name="map-marker" size={20} color="#6200EE" />
                <Paragraph style={styles.tripText}>{trip.destination}</Paragraph>
              </View>
              <View style={styles.tripItem}>
                <MaterialCommunityIcons name="weather-sunny" size={20} color="#FF9800" />
                <Paragraph style={styles.tripText}>{trip.climate} climate</Paragraph>
              </View>
              <View style={styles.tripItem}>
                <MaterialCommunityIcons name="calendar" size={20} color="#4CAF50" />
                <Paragraph style={styles.tripText}>{trip.duration} days</Paragraph>
              </View>
            </View>
            <View style={styles.activitiesContainer}>
              <Paragraph style={styles.activitiesLabel}>Activities:</Paragraph>
              <View style={styles.activityChips}>
                {trip.activities.map((activity) => (
                  <Chip key={activity} style={styles.activityChip}>
                    {activity}
                  </Chip>
                ))}
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Progress */}
        <Card style={styles.progressCard}>
          <Card.Content>
            <Title>Packing Progress</Title>
            <View style={styles.progressItem}>
              <View style={styles.progressHeader}>
                <Paragraph>Overall Progress</Paragraph>
                <Paragraph style={styles.progressPercent}>
                  {Math.round(packingProgress * 100)}%
                </Paragraph>
              </View>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${packingProgress * 100}%` }]} />
              </View>
            </View>
            <View style={styles.progressItem}>
              <View style={styles.progressHeader}>
                <Paragraph>Essential Items</Paragraph>
                <Paragraph style={styles.progressPercent}>
                  {Math.round(essentialProgress * 100)}%
                </Paragraph>
              </View>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${essentialProgress * 100}%`, backgroundColor: '#F44336' }]} />
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Packing Lists by Category */}
        {Object.entries(groupedItems).map(([category, items]) => (
          <Card key={category} style={styles.categoryCard}>
            <Card.Content>
              <View style={styles.categoryHeader}>
                <MaterialCommunityIcons 
                  name={getCategoryIcon(category) as any} 
                  size={24} 
                  color={getCategoryColor(category)} 
                />
                <Title style={styles.categoryTitle}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Title>
                <Chip style={styles.categoryCount}>
                  {items.filter(item => item.packed).length}/{items.length}
                </Chip>
              </View>
              
              {items.map((item) => (
                <List.Item
                  key={item.id}
                  title={item.name}
                  description={item.quantity ? `Quantity: ${item.quantity}` : undefined}
                  left={() => (
                    <View style={styles.itemLeft}>
                      <MaterialCommunityIcons 
                        name={item.packed ? "checkbox-marked" : "checkbox-blank-outline"} 
                        size={24} 
                        color={item.packed ? "#4CAF50" : "#999"} 
                        onPress={() => togglePacked(item.id)}
                      />
                      {item.essential && (
                        <MaterialCommunityIcons 
                          name="star" 
                          size={16} 
                          color="#F44336" 
                          style={styles.essentialStar}
                        />
                      )}
                    </View>
                  )}
                  right={() => item.packed ? (
                    <MaterialCommunityIcons name="check" size={20} color="#4CAF50" />
                  ) : null}
                  onPress={() => togglePacked(item.id)}
                  style={[
                    styles.listItem,
                    item.packed && styles.packedItem
                  ]}
                />
              ))}
            </Card.Content>
          </Card>
        ))}

        {/* Smart Suggestions */}
        <Card style={styles.suggestionsCard}>
          <Card.Content>
            <Title>Smart Suggestions</Title>
            <List.Item
              title="Weather Alert"
              description="Rain expected - consider packing a lightweight raincoat"
              left={() => <List.Icon icon="weather-rainy" />}
              right={() => <Button>Add Item</Button>}
            />
            <List.Item
              title="Local Tip"
              description="Electrical outlets in Thailand use Type A, B, and C plugs"
              left={() => <List.Icon icon="power-plug" />}
            />
            <List.Item
              title="Weight Optimization"
              description="Your pack is estimated to be 12kg - consider lighter alternatives"
              left={() => <List.Icon icon="weight-kilogram" />}
              right={() => <Button>Optimize</Button>}
            />
          </Card.Content>
        </Card>

        <Card style={styles.featuresCard}>
          <Card.Content>
            <Title>Packing Features</Title>
            <List.Item
              title="Weight Calculator"
              description="Track your backpack weight and get optimization tips"
              left={() => <List.Icon icon="scale" />}
            />
            <List.Item
              title="Climate-Smart Lists"
              description="Automatically adjust recommendations based on weather"
              left={() => <List.Icon icon="weather-partly-cloudy" />}
            />
            <List.Item
              title="Community Input"
              description="Get packing tips from travelers who've been there"
              left={() => <List.Icon icon="account-group" />}
            />
          </Card.Content>
        </Card>
      </ScrollView>

      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => setShowAddDialog(true)}
        label="Add Item"
      />

      <Portal>
        <Dialog visible={showAddDialog} onDismiss={() => setShowAddDialog(false)}>
          <Dialog.Title>Add Custom Item</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Item Name"
              value={newItem.name}
              onChangeText={(text) => setNewItem({...newItem, name: text})}
              style={styles.input}
            />
            <View style={styles.categorySelector}>
              {['clothing', 'electronics', 'toiletries', 'documents', 'gear', 'medicine'].map((cat) => (
                <Chip
                  key={cat}
                  selected={newItem.category === cat}
                  onPress={() => setNewItem({...newItem, category: cat as any})}
                  style={styles.selectorChip}
                >
                  {cat}
                </Chip>
              ))}
            </View>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowAddDialog(false)}>Cancel</Button>
            <Button onPress={addCustomItem}>Add</Button>
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
  tripCard: {
    marginBottom: 16,
    elevation: 2,
  },
  tripDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 12,
  },
  tripItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tripText: {
    marginLeft: 6,
    fontSize: 12,
  },
  activitiesContainer: {
    marginTop: 8,
  },
  activitiesLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  activityChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  activityChip: {
    height: 24,
    backgroundColor: '#E3F2FD',
  },
  progressCard: {
    marginBottom: 16,
    elevation: 2,
  },
  progressItem: {
    marginBottom: 12,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  progressPercent: {
    fontWeight: 'bold',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
  },
  categoryCard: {
    marginBottom: 12,
    elevation: 2,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryTitle: {
    marginLeft: 8,
    flex: 1,
    fontSize: 16,
  },
  categoryCount: {
    height: 24,
    backgroundColor: '#E0E0E0',
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  essentialStar: {
    position: 'absolute',
    top: -8,
    right: -8,
  },
  listItem: {
    paddingVertical: 4,
  },
  packedItem: {
    opacity: 0.6,
  },
  suggestionsCard: {
    marginTop: 8,
    backgroundColor: '#FFF3E0',
  },
  featuresCard: {
    marginTop: 16,
    marginBottom: 80,
  },
  input: {
    marginBottom: 12,
  },
  categorySelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  selectorChip: {
    marginBottom: 4,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#6200EE',
  },
});