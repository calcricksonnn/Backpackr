import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { 
  Card, 
  Title, 
  Paragraph, 
  Button, 
  List,
  Chip,
  FAB,
  Dialog,
  Portal,
  TextInput
} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface Recommendation {
  id: string;
  type: 'hostel' | 'restaurant' | 'activity';
  name: string;
  location: string;
  description: string;
  rating: number;
  reviewCount: number;
  price: string;
  tags: string[];
  author: string;
  date: string;
}

export default function CommunityScreen() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([
    {
      id: '1',
      type: 'hostel',
      name: 'Mad Monkey Hostel',
      location: 'Bangkok, Thailand',
      description: 'Great location in Khao San Road area. Clean rooms, friendly staff, and good social atmosphere.',
      rating: 4.5,
      reviewCount: 127,
      price: '$15-25/night',
      tags: ['social', 'clean', 'central'],
      author: 'TravelMike',
      date: '2024-01-10'
    },
    {
      id: '2',
      type: 'restaurant',
      name: 'Thip Samai Pad Thai',
      location: 'Bangkok, Thailand',
      description: 'Best Pad Thai in Bangkok! Traditional recipe, amazing flavors. Must try the wrapped version.',
      rating: 4.8,
      reviewCount: 89,
      price: '$3-5',
      tags: ['authentic', 'cheap', 'famous'],
      author: 'FoodieAlex',
      date: '2024-01-12'
    },
    {
      id: '3',
      type: 'activity',
      name: 'Wat Pho Temple Visit',
      location: 'Bangkok, Thailand',
      description: 'Beautiful temple with the famous reclining Buddha. Get there early to avoid crowds.',
      rating: 4.6,
      reviewCount: 234,
      price: '$3 entrance',
      tags: ['cultural', 'historic', 'photo-worthy'],
      author: 'CultureSeeker',
      date: '2024-01-14'
    }
  ]);

  const [showRecommendationDialog, setShowRecommendationDialog] = useState(false);
  const [newRecommendation, setNewRecommendation] = useState({
    type: 'restaurant' as const,
    name: '',
    location: '',
    description: '',
    price: '',
    tags: ''
  });

  const [filterType, setFilterType] = useState<string | null>(null);

  const filteredRecommendations = filterType 
    ? recommendations.filter(rec => rec.type === filterType)
    : recommendations;

  const addRecommendation = () => {
    if (newRecommendation.name && newRecommendation.description) {
      const recommendation: Recommendation = {
        id: Date.now().toString(),
        type: newRecommendation.type,
        name: newRecommendation.name,
        location: newRecommendation.location,
        description: newRecommendation.description,
        rating: 0,
        reviewCount: 0,
        price: newRecommendation.price,
        tags: newRecommendation.tags.split(',').map(tag => tag.trim()),
        author: 'You',
        date: new Date().toISOString().split('T')[0]
      };
      setRecommendations([recommendation, ...recommendations]);
      setNewRecommendation({
        type: 'restaurant',
        name: '',
        location: '',
        description: '',
        price: '',
        tags: ''
      });
      setShowRecommendationDialog(false);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'hostel': return 'bed';
      case 'restaurant': return 'food';
      case 'activity': return 'ticket';
      default: return 'map-marker';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'hostel': return '#9C27B0';
      case 'restaurant': return '#FF5722';
      case 'activity': return '#4CAF50';
      default: return '#2196F3';
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <MaterialCommunityIcons
        key={index}
        name={index < Math.floor(rating) ? 'star' : index < rating ? 'star-half' : 'star-outline'}
        size={16}
        color="#FFD700"
        style={styles.star}
      />
    ));
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Card style={styles.headerCard}>
          <Card.Content>
            <Title>Community Recommendations</Title>
            <Paragraph>Discover and share the best spots with fellow backpackers</Paragraph>
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
            selected={filterType === 'hostel'}
            onPress={() => setFilterType('hostel')}
            style={styles.filterChip}
            icon="bed"
          >
            Hostels
          </Chip>
          <Chip
            selected={filterType === 'restaurant'}
            onPress={() => setFilterType('restaurant')}
            style={styles.filterChip}
            icon="food"
          >
            Food
          </Chip>
          <Chip
            selected={filterType === 'activity'}
            onPress={() => setFilterType('activity')}
            style={styles.filterChip}
            icon="ticket"
          >
            Activities
          </Chip>
        </View>

        {/* Recommendations List */}
        {filteredRecommendations.map((recommendation) => (
          <Card key={recommendation.id} style={styles.recommendationCard}>
            <Card.Content>
              <View style={styles.recommendationHeader}>
                <MaterialCommunityIcons 
                  name={getTypeIcon(recommendation.type) as any} 
                  size={24} 
                  color={getTypeColor(recommendation.type)} 
                />
                <View style={styles.recommendationInfo}>
                  <Title style={styles.recommendationName}>{recommendation.name}</Title>
                  <Paragraph style={styles.location}>
                    <MaterialCommunityIcons name="map-marker" size={12} color="#666" />
                    {' '}{recommendation.location}
                  </Paragraph>
                </View>
                <View style={styles.priceContainer}>
                  <Paragraph style={styles.price}>{recommendation.price}</Paragraph>
                </View>
              </View>

              <View style={styles.ratingContainer}>
                <View style={styles.starsContainer}>
                  {renderStars(recommendation.rating)}
                </View>
                <Paragraph style={styles.ratingText}>
                  {recommendation.rating.toFixed(1)} ({recommendation.reviewCount} reviews)
                </Paragraph>
              </View>

              <Paragraph style={styles.description}>{recommendation.description}</Paragraph>

              <View style={styles.tagsContainer}>
                {recommendation.tags.map((tag) => (
                  <Chip key={tag} style={styles.tag} textStyle={styles.tagText}>
                    {tag}
                  </Chip>
                ))}
              </View>

              <View style={styles.authorContainer}>
                <MaterialCommunityIcons name="account" size={16} color="#666" />
                <Paragraph style={styles.authorText}>
                  Recommended by {recommendation.author} on {recommendation.date}
                </Paragraph>
              </View>
            </Card.Content>

            <Card.Actions>
              <Button icon="heart-outline">Like</Button>
              <Button icon="comment-outline">Comment</Button>
              <Button icon="share-variant">Share</Button>
            </Card.Actions>
          </Card>
        ))}

        {/* Community Features */}
        <Card style={styles.featuresCard}>
          <Card.Content>
            <Title>Community Features</Title>
            <List.Item
              title="Map Integration"
              description="View all recommendations on an interactive map"
              left={() => <List.Icon icon="map" />}
            />
            <List.Item
              title="Smart Filtering"
              description="Filter by location, price range, rating, and preferences"
              left={() => <List.Icon icon="filter-variant" />}
            />
            <List.Item
              title="User Profiles"
              description="Follow trusted travelers and see their recommendations"
              left={() => <List.Icon icon="account-star" />}
            />
            <List.Item
              title="Offline Access"
              description="Save recommendations for offline viewing"
              left={() => <List.Icon icon="download" />}
            />
          </Card.Content>
        </Card>
      </ScrollView>

      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => setShowRecommendationDialog(true)}
        label="Recommend"
      />

      {/* Add Recommendation Dialog */}
      <Portal>
        <Dialog visible={showRecommendationDialog} onDismiss={() => setShowRecommendationDialog(false)}>
          <Dialog.Title>Add Recommendation</Dialog.Title>
          <Dialog.Content>
            <View style={styles.typeSelector}>
              {['hostel', 'restaurant', 'activity'].map((type) => (
                <Chip
                  key={type}
                  selected={newRecommendation.type === type}
                  onPress={() => setNewRecommendation({...newRecommendation, type: type as any})}
                  style={styles.typeChip}
                  icon={getTypeIcon(type)}
                >
                  {type}
                </Chip>
              ))}
            </View>
            
            <TextInput
              label="Name"
              value={newRecommendation.name}
              onChangeText={(text) => setNewRecommendation({...newRecommendation, name: text})}
              style={styles.input}
            />
            
            <TextInput
              label="Location"
              value={newRecommendation.location}
              onChangeText={(text) => setNewRecommendation({...newRecommendation, location: text})}
              style={styles.input}
            />
            
            <TextInput
              label="Description"
              value={newRecommendation.description}
              onChangeText={(text) => setNewRecommendation({...newRecommendation, description: text})}
              multiline
              numberOfLines={3}
              style={styles.input}
            />
            
            <TextInput
              label="Price Range"
              value={newRecommendation.price}
              onChangeText={(text) => setNewRecommendation({...newRecommendation, price: text})}
              style={styles.input}
              placeholder="e.g., $10-20/night, $5-10, Free"
            />
            
            <TextInput
              label="Tags (comma separated)"
              value={newRecommendation.tags}
              onChangeText={(text) => setNewRecommendation({...newRecommendation, tags: text})}
              style={styles.input}
              placeholder="e.g., cheap, authentic, clean"
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowRecommendationDialog(false)}>Cancel</Button>
            <Button onPress={addRecommendation}>Add</Button>
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
  filterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  filterChip: {
    marginBottom: 4,
  },
  recommendationCard: {
    marginBottom: 12,
    elevation: 2,
  },
  recommendationHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  recommendationInfo: {
    marginLeft: 12,
    flex: 1,
  },
  recommendationName: {
    fontSize: 16,
    marginBottom: 2,
  },
  location: {
    fontSize: 12,
    color: '#666',
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  price: {
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  starsContainer: {
    flexDirection: 'row',
    marginRight: 8,
  },
  star: {
    marginRight: 1,
  },
  ratingText: {
    fontSize: 12,
    color: '#666',
  },
  description: {
    marginBottom: 12,
    lineHeight: 20,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 12,
  },
  tag: {
    height: 24,
    backgroundColor: '#E3F2FD',
  },
  tagText: {
    fontSize: 10,
    color: '#1976D2',
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  authorText: {
    fontSize: 11,
    color: '#666',
    marginLeft: 4,
  },
  featuresCard: {
    marginTop: 16,
    marginBottom: 80,
  },
  input: {
    marginBottom: 8,
  },
  typeSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  typeChip: {
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