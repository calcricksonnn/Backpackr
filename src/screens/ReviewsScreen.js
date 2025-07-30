import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import { Text, Card, Title, Paragraph, Button, TextInput, FAB, Chip, Avatar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const StarRating = ({ rating, onRatingChange, editable = false, size = 20 }) => {
  return (
    <View style={styles.starContainer}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Ionicons
          key={star}
          name={star <= rating ? 'star' : 'star-outline'}
          size={size}
          color={star <= rating ? '#FFD700' : '#ccc'}
          onPress={editable ? () => onRatingChange(star) : undefined}
          style={editable ? styles.editableStar : null}
        />
      ))}
    </View>
  );
};

export default function ReviewsScreen() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showWriteReview, setShowWriteReview] = useState(false);
  const [newReview, setNewReview] = useState({
    title: '',
    content: '',
    rating: 5,
    category: 'destination',
    location: ''
  });

  const reviews = [
    {
      id: 1,
      title: 'Amazing Hiking Trail in Switzerland',
      content: 'The Matterhorn trail was absolutely breathtaking! Well-marked paths, stunning views, and excellent facilities. Would definitely recommend for experienced hikers.',
      rating: 5,
      category: 'activity',
      location: 'Zermatt, Switzerland',
      author: 'MountainLover',
      authorAvatar: 'https://picsum.photos/50/50?random=1',
      date: '2024-01-20',
      likes: 23,
      helpful: 18,
      verified: true
    },
    {
      id: 2,
      title: 'Cozy Hostel in Barcelona Center',
      content: 'Perfect location, friendly staff, and clean facilities. The common area is great for meeting other travelers. Only downside is it can get noisy at night.',
      rating: 4,
      category: 'accommodation',
      location: 'Barcelona, Spain',
      author: 'BackpackerSarah',
      authorAvatar: 'https://picsum.photos/50/50?random=2',
      date: '2024-01-18',
      likes: 15,
      helpful: 12,
      verified: true
    },
    {
      id: 3,
      title: 'Disappointing Restaurant Experience',
      content: 'Food was overpriced and mediocre. Service was slow despite not being busy. There are much better local options nearby.',
      rating: 2,
      category: 'food',
      location: 'Paris, France',
      author: 'FoodieExplorer',
      authorAvatar: 'https://picsum.photos/50/50?random=3',
      date: '2024-01-15',
      likes: 8,
      helpful: 5,
      verified: false
    },
    {
      id: 4,
      title: 'Must-Visit Temple Complex',
      content: 'Incredible architecture and rich history. Best visited early morning to avoid crowds. The sunrise view from the main temple is unforgettable!',
      rating: 5,
      category: 'destination',
      location: 'Angkor Wat, Cambodia',
      author: 'CultureSeeker',
      authorAvatar: 'https://picsum.photos/50/50?random=4',
      date: '2024-01-12',
      likes: 31,
      helpful: 28,
      verified: true
    }
  ];

  const categories = [
    { label: 'All', value: 'all', icon: 'list-outline' },
    { label: 'Destinations', value: 'destination', icon: 'location-outline' },
    { label: 'Activities', value: 'activity', icon: 'bicycle-outline' },
    { label: 'Accommodation', value: 'accommodation', icon: 'bed-outline' },
    { label: 'Food', value: 'food', icon: 'restaurant-outline' },
    { label: 'Transport', value: 'transport', icon: 'car-outline' }
  ];

  const filteredReviews = selectedCategory === 'all' 
    ? reviews 
    : reviews.filter(review => review.category === selectedCategory);

  const handleSubmitReview = () => {
    if (!newReview.title.trim() || !newReview.content.trim() || !newReview.location.trim()) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    Alert.alert('Success', 'Your review has been submitted and will help other travelers!');
    setNewReview({
      title: '',
      content: '',
      rating: 5,
      category: 'destination',
      location: ''
    });
    setShowWriteReview(false);
  };

  const ReviewCard = ({ review }) => (
    <Card style={styles.reviewCard}>
      <Card.Content>
        <View style={styles.reviewHeader}>
          <View style={styles.authorInfo}>
            <Avatar.Image 
              source={{ uri: review.authorAvatar }} 
              size={40} 
            />
            <View style={styles.authorDetails}>
              <View style={styles.authorNameRow}>
                <Text style={styles.authorName}>{review.author}</Text>
                {review.verified && (
                  <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
                )}
              </View>
              <Text style={styles.reviewDate}>{review.date}</Text>
            </View>
          </View>
          <StarRating rating={review.rating} />
        </View>
        
        <Title style={styles.reviewTitle}>{review.title}</Title>
        
        <View style={styles.locationChip}>
          <Ionicons name="location-outline" size={12} color="#666" />
          <Text style={styles.locationText}>{review.location}</Text>
        </View>
        
        <Paragraph style={styles.reviewContent}>{review.content}</Paragraph>
        
        <View style={styles.reviewActions}>
          <Button
            mode="text"
            icon="thumb-up-outline"
            compact
            onPress={() => {}}
          >
            {review.likes}
          </Button>
          <Button
            mode="text"
            icon="help-circle-outline"
            compact
            onPress={() => {}}
          >
            Helpful ({review.helpful})
          </Button>
          <Button
            mode="text"
            icon="share-outline"
            compact
            onPress={() => {}}
          >
            Share
          </Button>
        </View>
      </Card.Content>
    </Card>
  );

  if (showWriteReview) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Title style={styles.headerTitle}>Write Review</Title>
          <Button
            mode="text"
            onPress={() => setShowWriteReview(false)}
            textColor="white"
          >
            Cancel
          </Button>
        </View>
        
        <ScrollView style={styles.writeReviewContainer}>
          <TextInput
            label="Review Title *"
            value={newReview.title}
            onChangeText={(text) => setNewReview(prev => ({ ...prev, title: text }))}
            style={styles.input}
          />
          
          <TextInput
            label="Location *"
            value={newReview.location}
            onChangeText={(text) => setNewReview(prev => ({ ...prev, location: text }))}
            style={styles.input}
            placeholder="e.g., Barcelona, Spain"
          />
          
          <View style={styles.categorySection}>
            <Text style={styles.sectionLabel}>Category</Text>
            <View style={styles.categoryChips}>
              {categories.slice(1).map((category) => (
                <Chip
                  key={category.value}
                  selected={newReview.category === category.value}
                  onPress={() => setNewReview(prev => ({ ...prev, category: category.value }))}
                  style={styles.categoryChip}
                  icon={category.icon}
                >
                  {category.label}
                </Chip>
              ))}
            </View>
          </View>
          
          <View style={styles.ratingSection}>
            <Text style={styles.sectionLabel}>Rating</Text>
            <StarRating
              rating={newReview.rating}
              onRatingChange={(rating) => setNewReview(prev => ({ ...prev, rating }))}
              editable
              size={32}
            />
          </View>
          
          <TextInput
            label="Your Experience *"
            value={newReview.content}
            onChangeText={(text) => setNewReview(prev => ({ ...prev, content: text }))}
            multiline
            numberOfLines={6}
            style={styles.input}
            placeholder="Share details about your experience to help other travelers..."
          />
          
          <Button
            mode="contained"
            onPress={handleSubmitReview}
            style={styles.submitButton}
            disabled={!newReview.title.trim() || !newReview.content.trim() || !newReview.location.trim()}
          >
            Submit Review
          </Button>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Title style={styles.headerTitle}>Reviews & Ratings</Title>
        <Paragraph style={styles.headerSubtitle}>Discover and share experiences</Paragraph>
      </View>
      
      <View style={styles.categoriesContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((category) => (
            <Chip
              key={category.value}
              selected={selectedCategory === category.value}
              onPress={() => setSelectedCategory(category.value)}
              style={styles.filterChip}
              icon={category.icon}
            >
              {category.label}
            </Chip>
          ))}
        </ScrollView>
      </View>
      
      <ScrollView style={styles.reviewsContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.statsContainer}>
          <Card style={styles.statsCard}>
            <Card.Content style={styles.statsContent}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{filteredReviews.length}</Text>
                <Text style={styles.statLabel}>Reviews</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>
                  {(filteredReviews.reduce((sum, r) => sum + r.rating, 0) / filteredReviews.length).toFixed(1)}
                </Text>
                <Text style={styles.statLabel}>Avg Rating</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>
                  {filteredReviews.filter(r => r.verified).length}
                </Text>
                <Text style={styles.statLabel}>Verified</Text>
              </View>
            </Card.Content>
          </Card>
        </View>
        
        {filteredReviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </ScrollView>
      
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => setShowWriteReview(true)}
      />
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
    backgroundColor: '#FFD700',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: '#333',
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: '#333',
    fontSize: 14,
    opacity: 0.8,
  },
  categoriesContainer: {
    padding: 16,
    backgroundColor: 'white',
  },
  filterChip: {
    marginRight: 8,
  },
  reviewsContainer: {
    flex: 1,
    padding: 16,
  },
  statsContainer: {
    marginBottom: 16,
  },
  statsCard: {
    elevation: 2,
  },
  statsContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  reviewCard: {
    marginBottom: 16,
    elevation: 2,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  authorDetails: {
    marginLeft: 12,
    flex: 1,
  },
  authorNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorName: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: 4,
  },
  reviewDate: {
    fontSize: 12,
    color: '#666',
  },
  starContainer: {
    flexDirection: 'row',
  },
  editableStar: {
    padding: 2,
  },
  reviewTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  locationChip: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  locationText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#666',
  },
  reviewContent: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  reviewActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 8,
  },
  writeReviewContainer: {
    flex: 1,
    padding: 16,
  },
  input: {
    marginBottom: 16,
    backgroundColor: 'white',
  },
  categorySection: {
    marginBottom: 16,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  categoryChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  categoryChip: {
    marginRight: 8,
    marginBottom: 8,
  },
  ratingSection: {
    marginBottom: 16,
    alignItems: 'center',
  },
  submitButton: {
    marginTop: 16,
    marginBottom: 32,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#FFD700',
  },
});