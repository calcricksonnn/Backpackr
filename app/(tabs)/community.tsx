import React, { useState, useEffect } from 'react';
import { 
  View, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  FlatList,
  Dimensions
} from 'react-native';
import { 
  Card, 
  Title, 
  Paragraph, 
  Chip, 
  FAB, 
  useTheme,
  Surface,
  Button,
  Avatar,
  Divider
} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withSpring,
  withDelay,
  interpolate
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

// Mock community data
const posts = [
  {
    id: 1,
    user: {
      name: "Sarah Chen",
      avatar: "👩‍🦰",
      level: "Expert Backpacker",
      location: "Currently in Nepal"
    },
    content: "Just reached Everest Base Camp! The views are absolutely breathtaking. 5 days of trekking through beautiful mountain villages was so worth it. 🏔️",
    images: ["🏔️", "⛰️", "🏕️"],
    likes: 42,
    comments: 8,
    timeAgo: "2 hours ago",
    tags: ["Nepal", "Trekking", "Mountains"]
  },
  {
    id: 2,
    user: {
      name: "Marcus Johnson",
      avatar: "👨‍🦱",
      level: "Adventure Seeker",
      location: "Bali, Indonesia"
    },
    content: "Sunset from Mount Batur was magical! Started the hike at 3:30 AM and it was totally worth the early wake-up call. Meeting so many fellow travelers here! 🌅",
    images: ["🌅", "🏝️"],
    likes: 67,
    comments: 15,
    timeAgo: "5 hours ago",
    tags: ["Bali", "Sunrise", "Hiking"]
  },
  {
    id: 3,
    user: {
      name: "Elena Rodriguez",
      avatar: "👩‍🦳",
      level: "Solo Explorer",
      location: "Patagonia, Chile"
    },
    content: "Day 3 in Torres del Paine and I'm completely in love with this place. The wildlife here is incredible - saw guanacos and condors today! 🦅",
    images: ["🏞️", "🦙", "🦅"],
    likes: 31,
    comments: 6,
    timeAgo: "1 day ago",
    tags: ["Patagonia", "Wildlife", "Nature"]
  }
];

const travelBuddies = [
  {
    id: 1,
    name: "Alex Kim",
    avatar: "👨‍💼",
    location: "Seoul, South Korea",
    nextTrip: "Japan - Cherry Blossom Season",
    interests: ["Photography", "Culture", "Food"],
    rating: 4.9,
    trips: 12
  },
  {
    id: 2,
    name: "Sophie Laurent",
    avatar: "👩‍🎨",
    location: "Paris, France",
    nextTrip: "Southeast Asia Backpacking",
    interests: ["Art", "Adventure", "Budget Travel"],
    rating: 4.8,
    trips: 8
  },
  {
    id: 3,
    name: "Diego Santos",
    avatar: "👨‍🎸",
    location: "Rio de Janeiro, Brazil",
    nextTrip: "Andes Mountain Trek",
    interests: ["Music", "Mountains", "Culture"],
    rating: 4.7,
    trips: 15
  }
];

export default function CommunityScreen() {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState('posts');
  
  const headerScale = useSharedValue(0);
  const contentOpacity = useSharedValue(0);

  useEffect(() => {
    headerScale.value = withSpring(1, { damping: 15 });
    contentOpacity.value = withDelay(200, withTiming(1, { duration: 800 }));
  }, []);

  const headerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: headerScale.value }],
  }));

  const contentAnimatedStyle = useAnimatedStyle(() => ({
    opacity: contentOpacity.value,
  }));

  const renderPost = ({ item, index }: { item: any; index: number }) => {
    const cardScale = useSharedValue(0);
    const cardOpacity = useSharedValue(0);

    useEffect(() => {
      cardScale.value = withDelay(index * 100, withSpring(1));
      cardOpacity.value = withDelay(index * 100, withTiming(1, { duration: 600 }));
    }, []);

    const cardAnimatedStyle = useAnimatedStyle(() => ({
      transform: [{ scale: cardScale.value }],
      opacity: cardOpacity.value,
    }));

    return (
      <Animated.View style={[styles.postCard, cardAnimatedStyle]}>
        <Card style={styles.card} elevation={3}>
          <Card.Content style={styles.cardContent}>
            {/* User Header */}
            <View style={styles.userHeader}>
              <View style={styles.userInfo}>
                <Title style={styles.userAvatar}>{item.user.avatar}</Title>
                <View style={styles.userDetails}>
                  <Title style={styles.userName}>{item.user.name}</Title>
                  <Paragraph style={styles.userLevel}>{item.user.level}</Paragraph>
                  <View style={styles.locationContainer}>
                    <MaterialCommunityIcons 
                      name="map-marker" 
                      size={12} 
                      color={theme.colors.primary} 
                    />
                    <Paragraph style={styles.userLocation}>{item.user.location}</Paragraph>
                  </View>
                </View>
              </View>
              <Paragraph style={styles.timeAgo}>{item.timeAgo}</Paragraph>
            </View>

            {/* Post Content */}
            <Paragraph style={styles.postContent}>{item.content}</Paragraph>

            {/* Images */}
            <View style={styles.imagesContainer}>
              {item.images.map((image: string, imageIndex: number) => (
                <Surface key={imageIndex} style={styles.imageItem} elevation={2}>
                  <Title style={styles.imageEmoji}>{image}</Title>
                </Surface>
              ))}
            </View>

            {/* Tags */}
            <View style={styles.tagsContainer}>
              {item.tags.map((tag: string, tagIndex: number) => (
                <Chip
                  key={tagIndex}
                  style={styles.tagChip}
                  textStyle={styles.tagText}
                >
                  #{tag}
                </Chip>
              ))}
            </View>

            <Divider style={styles.divider} />

            {/* Actions */}
            <View style={styles.actionsContainer}>
              <TouchableOpacity style={styles.actionButton} activeOpacity={0.7}>
                <MaterialCommunityIcons 
                  name="heart-outline" 
                  size={20} 
                  color={theme.colors.primary} 
                />
                <Paragraph style={styles.actionText}>{item.likes}</Paragraph>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton} activeOpacity={0.7}>
                <MaterialCommunityIcons 
                  name="comment-outline" 
                  size={20} 
                  color={theme.colors.primary} 
                />
                <Paragraph style={styles.actionText}>{item.comments}</Paragraph>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton} activeOpacity={0.7}>
                <MaterialCommunityIcons 
                  name="share-outline" 
                  size={20} 
                  color={theme.colors.primary} 
                />
                <Paragraph style={styles.actionText}>Share</Paragraph>
              </TouchableOpacity>
            </View>
          </Card.Content>
        </Card>
      </Animated.View>
    );
  };

  const renderTravelBuddy = ({ item, index }: { item: any; index: number }) => {
    const cardScale = useSharedValue(0);

    useEffect(() => {
      cardScale.value = withDelay(index * 100, withSpring(1));
    }, []);

    const cardAnimatedStyle = useAnimatedStyle(() => ({
      transform: [{ scale: cardScale.value }],
    }));

    return (
      <Animated.View style={[styles.buddyCard, cardAnimatedStyle]}>
        <TouchableOpacity activeOpacity={0.9}>
          <Card style={styles.card} elevation={3}>
            <LinearGradient
              colors={[theme.colors.primary + '10', theme.colors.secondary + '05']}
              style={styles.cardGradient}
            >
              <Card.Content style={styles.buddyContent}>
                <View style={styles.buddyHeader}>
                  <Title style={styles.buddyAvatar}>{item.avatar}</Title>
                  <View style={styles.buddyInfo}>
                    <Title style={styles.buddyName}>{item.name}</Title>
                    <View style={styles.locationContainer}>
                      <MaterialCommunityIcons 
                        name="map-marker" 
                        size={12} 
                        color={theme.colors.primary} 
                      />
                      <Paragraph style={styles.buddyLocation}>{item.location}</Paragraph>
                    </View>
                    <View style={styles.ratingContainer}>
                      <MaterialCommunityIcons name="star" size={14} color="#FFD700" />
                      <Paragraph style={styles.ratingText}>{item.rating}</Paragraph>
                      <Paragraph style={styles.tripsText}>({item.trips} trips)</Paragraph>
                    </View>
                  </View>
                </View>

                <View style={styles.nextTripContainer}>
                  <Paragraph style={styles.nextTripLabel}>Next Adventure:</Paragraph>
                  <Paragraph style={styles.nextTripText}>{item.nextTrip}</Paragraph>
                </View>

                <View style={styles.interestsContainer}>
                  <Paragraph style={styles.interestsLabel}>Interests:</Paragraph>
                  <View style={styles.interestsList}>
                    {item.interests.map((interest: string, interestIndex: number) => (
                      <Chip
                        key={interestIndex}
                        style={styles.interestChip}
                        textStyle={styles.interestText}
                      >
                        {interest}
                      </Chip>
                    ))}
                  </View>
                </View>

                <Button
                  mode="contained"
                  style={styles.connectButton}
                  contentStyle={styles.buttonContent}
                  labelStyle={styles.buttonLabel}
                >
                  Connect
                </Button>
              </Card.Content>
            </LinearGradient>
          </Card>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Animated.View style={[styles.header, headerAnimatedStyle]}>
        <LinearGradient
          colors={[theme.colors.primary, theme.colors.secondary]}
          style={styles.headerGradient}
        >
          <Title style={styles.headerTitle}>Travel Community</Title>
          <Paragraph style={styles.headerSubtitle}>
            Connect, share, and discover together
          </Paragraph>
        </LinearGradient>
      </Animated.View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        {[
          { key: 'posts', label: 'Posts', icon: 'post' },
          { key: 'buddies', label: 'Travel Buddies', icon: 'account-group' }
        ].map((tab) => (
          <TouchableOpacity
            key={tab.key}
            onPress={() => setActiveTab(tab.key)}
            activeOpacity={0.8}
            style={[
              styles.tabButton,
              activeTab === tab.key && { backgroundColor: theme.colors.primaryContainer }
            ]}
          >
            <MaterialCommunityIcons
              name={tab.icon as any}
              size={20}
              color={activeTab === tab.key ? theme.colors.primary : theme.colors.onSurfaceVariant}
            />
            <Paragraph
              style={[
                styles.tabText,
                activeTab === tab.key && { color: theme.colors.primary, fontWeight: 'bold' }
              ]}
            >
              {tab.label}
            </Paragraph>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content */}
      <Animated.View style={[styles.content, contentAnimatedStyle]}>
        {activeTab === 'posts' ? (
          <FlatList
            data={posts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderPost}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.postsList}
          />
        ) : (
          <FlatList
            data={travelBuddies}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderTravelBuddy}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.buddiesList}
          />
        )}
      </Animated.View>

      {/* FAB */}
      <FAB
        icon={activeTab === 'posts' ? 'plus' : 'account-plus'}
        style={styles.fab}
        onPress={() => {
          // Add post or find buddy functionality
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    zIndex: 1,
  },
  headerGradient: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
    textAlign: 'center',
    marginTop: 4,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  tabText: {
    fontSize: 14,
  },
  content: {
    flex: 1,
  },
  postsList: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    paddingBottom: 100,
    gap: 16,
  },
  buddiesList: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    paddingBottom: 100,
    gap: 16,
  },
  postCard: {
    width: '100%',
  },
  buddyCard: {
    width: '100%',
  },
  card: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  cardGradient: {
    flex: 1,
  },
  cardContent: {
    padding: 16,
  },
  buddyContent: {
    padding: 16,
  },
  userHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  userAvatar: {
    fontSize: 32,
    marginRight: 12,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  userLevel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  userLocation: {
    fontSize: 11,
    color: '#666',
  },
  timeAgo: {
    fontSize: 11,
    color: '#999',
  },
  postContent: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  imagesContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  imageItem: {
    width: 60,
    height: 60,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  imageEmoji: {
    fontSize: 24,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 12,
  },
  tagChip: {
    height: 24,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  tagText: {
    fontSize: 10,
  },
  divider: {
    marginVertical: 12,
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: 24,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  actionText: {
    fontSize: 12,
    color: '#666',
  },
  buddyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  buddyAvatar: {
    fontSize: 32,
    marginRight: 12,
  },
  buddyInfo: {
    flex: 1,
  },
  buddyName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  buddyLocation: {
    fontSize: 12,
    color: '#666',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  tripsText: {
    fontSize: 12,
    color: '#666',
  },
  nextTripContainer: {
    marginBottom: 12,
  },
  nextTripLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 2,
  },
  nextTripText: {
    fontSize: 14,
    color: '#666',
  },
  interestsContainer: {
    marginBottom: 16,
  },
  interestsLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 6,
  },
  interestsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  interestChip: {
    height: 24,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  interestText: {
    fontSize: 10,
  },
  connectButton: {
    borderRadius: 20,
  },
  buttonContent: {
    paddingVertical: 6,
  },
  buttonLabel: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#2E7D32',
  },
});