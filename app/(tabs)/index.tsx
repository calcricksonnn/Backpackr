import React, { useState, useEffect } from 'react';
import { 
  View, 
  StyleSheet, 
  ScrollView, 
  Dimensions, 
  RefreshControl,
  TouchableOpacity,
  FlatList
} from 'react-native';
import { 
  Card, 
  Title, 
  Paragraph, 
  Chip, 
  FAB, 
  useTheme, 
  Searchbar,
  Surface,
  Avatar
} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withSpring,
  withSequence,
  withDelay,
  interpolate,
  useAnimatedScrollHandler,
  runOnJS
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

// Mock data for destinations
const destinations = [
  {
    id: 1,
    name: "Himalayas, Nepal",
    description: "Experience breathtaking mountain views and rich cultural heritage",
    image: "🏔️",
    rating: 4.8,
    difficulty: "Hard",
    duration: "14-21 days",
    tags: ["Mountains", "Culture", "Trekking"],
    color: "#2E7D32"
  },
  {
    id: 2,
    name: "Bali, Indonesia",
    description: "Tropical paradise with beautiful beaches and ancient temples",
    image: "🏝️",
    rating: 4.6,
    difficulty: "Easy",
    duration: "7-14 days",
    tags: ["Beach", "Culture", "Relaxation"],
    color: "#FF6F00"
  },
  {
    id: 3,
    name: "Patagonia, Chile",
    description: "Wild landscapes and incredible wildlife in South America",
    image: "🏞️",
    rating: 4.7,
    difficulty: "Medium",
    duration: "10-18 days",
    tags: ["Nature", "Wildlife", "Adventure"],
    color: "#1976D2"
  },
  {
    id: 4,
    name: "Sahara Desert, Morocco",
    description: "Experience the magic of endless sand dunes and starlit nights",
    image: "🏜️",
    rating: 4.5,
    difficulty: "Medium",
    duration: "5-10 days",
    tags: ["Desert", "Culture", "Unique"],
    color: "#F57C00"
  }
];

const categories = [
  { id: 1, name: "Mountains", icon: "mountain", color: "#2E7D32" },
  { id: 2, name: "Beaches", icon: "beach", color: "#1976D2" },
  { id: 3, name: "Cities", icon: "city", color: "#FF6F00" },
  { id: 4, name: "Desert", icon: "weather-sunny", color: "#F57C00" },
  { id: 5, name: "Forest", icon: "tree", color: "#388E3C" },
];

export default function ExploreScreen() {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  
  const scrollY = useSharedValue(0);
  const fabScale = useSharedValue(1);

  useEffect(() => {
    // Animate FAB entrance
    fabScale.value = withSpring(1, { damping: 15 });
  }, []);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [0, 100], [1, 0.8]);
    const translateY = interpolate(scrollY.value, [0, 100], [0, -10]);
    
    return {
      opacity,
      transform: [{ translateY }],
    };
  });

  const fabAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: fabScale.value }],
  }));

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate refresh
    setTimeout(() => setRefreshing(false), 1500);
  };

  const handleCategoryPress = (categoryId: number) => {
    setSelectedCategory(selectedCategory === categoryId ? null : categoryId);
  };

  const renderDestination = ({ item, index }: { item: any; index: number }) => {
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
      <Animated.View style={[styles.destinationCard, cardAnimatedStyle]}>
        <TouchableOpacity activeOpacity={0.9}>
          <Card style={styles.card} elevation={4}>
            <LinearGradient
              colors={[item.color + '20', item.color + '05']}
              style={styles.cardGradient}
            >
              <Card.Content style={styles.cardContent}>
                <View style={styles.cardHeader}>
                  <Title style={styles.destinationIcon}>{item.image}</Title>
                  <View style={styles.rating}>
                    <MaterialCommunityIcons 
                      name="star" 
                      size={16} 
                      color={theme.colors.primary} 
                    />
                    <Paragraph style={styles.ratingText}>{item.rating}</Paragraph>
                  </View>
                </View>
                
                <Title style={styles.destinationName}>{item.name}</Title>
                <Paragraph style={styles.destinationDescription}>
                  {item.description}
                </Paragraph>
                
                <View style={styles.infoRow}>
                  <Chip
                    icon="timer"
                    style={[styles.infoChip, { backgroundColor: theme.colors.surfaceVariant }]}
                    textStyle={styles.chipText}
                  >
                    {item.duration}
                  </Chip>
                  <Chip
                    icon="trending-up"
                    style={[
                      styles.infoChip, 
                      { 
                        backgroundColor: getDifficultyColor(item.difficulty) + '20',
                      }
                    ]}
                    textStyle={[styles.chipText, { color: getDifficultyColor(item.difficulty) }]}
                  >
                    {item.difficulty}
                  </Chip>
                </View>
                
                <View style={styles.tagsContainer}>
                  {item.tags.map((tag: string, tagIndex: number) => (
                    <Chip
                      key={tagIndex}
                      style={styles.tagChip}
                      textStyle={styles.tagText}
                    >
                      {tag}
                    </Chip>
                  ))}
                </View>
              </Card.Content>
            </LinearGradient>
          </Card>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return '#4CAF50';
      case 'Medium': return '#FF9800';
      case 'Hard': return '#F44336';
      default: return theme.colors.primary;
    }
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <Animated.View style={[styles.header, headerAnimatedStyle]}>
        <LinearGradient
          colors={[theme.colors.primary, theme.colors.secondary]}
          style={styles.headerGradient}
        >
          <View style={styles.headerContent}>
            <Title style={styles.headerTitle}>Where to next?</Title>
            <Paragraph style={styles.headerSubtitle}>
              Discover your next backpacking adventure
            </Paragraph>
          </View>
        </LinearGradient>
      </Animated.View>

      <Animated.ScrollView
        style={styles.scrollView}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Searchbar
            placeholder="Search destinations..."
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={styles.searchBar}
          />
        </View>

        {/* Categories */}
        <View style={styles.categoriesContainer}>
          <Title style={styles.sectionTitle}>Explore Categories</Title>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={categories}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.categoriesList}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleCategoryPress(item.id)}
                activeOpacity={0.8}
              >
                <Surface
                  style={[
                    styles.categoryItem,
                    selectedCategory === item.id && {
                      backgroundColor: item.color + '20',
                      borderColor: item.color,
                    }
                  ]}
                  elevation={selectedCategory === item.id ? 4 : 2}
                >
                  <MaterialCommunityIcons
                    name={item.icon as any}
                    size={24}
                    color={selectedCategory === item.id ? item.color : theme.colors.onSurface}
                  />
                  <Paragraph
                    style={[
                      styles.categoryText,
                      selectedCategory === item.id && { color: item.color, fontWeight: 'bold' }
                    ]}
                  >
                    {item.name}
                  </Paragraph>
                </Surface>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* Featured Destinations */}
        <View style={styles.destinationsContainer}>
          <Title style={styles.sectionTitle}>Featured Destinations</Title>
          <FlatList
            data={destinations}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderDestination}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
          />
        </View>
      </Animated.ScrollView>

      {/* Floating Action Button */}
      <Animated.View style={[styles.fabContainer, fabAnimatedStyle]}>
        <FAB
          icon="plus"
          style={styles.fab}
          onPress={() => {
            // Add destination functionality
          }}
        />
      </Animated.View>
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
  },
  headerContent: {
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
  scrollView: {
    flex: 1,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  searchBar: {
    elevation: 2,
  },
  categoriesContainer: {
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  categoriesList: {
    paddingHorizontal: 20,
    gap: 12,
  },
  categoryItem: {
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    minWidth: 80,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  categoryText: {
    fontSize: 12,
    marginTop: 8,
    textAlign: 'center',
  },
  destinationsContainer: {
    paddingVertical: 16,
    paddingBottom: 100,
  },
  destinationCard: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  card: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  cardGradient: {
    flex: 1,
  },
  cardContent: {
    padding: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  destinationIcon: {
    fontSize: 40,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  destinationName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  destinationDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
    color: '#666',
  },
  infoRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  infoChip: {
    height: 32,
  },
  chipText: {
    fontSize: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  tagChip: {
    height: 28,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  tagText: {
    fontSize: 11,
  },
  fabContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  fab: {
    backgroundColor: '#2E7D32',
  },
});