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
  ProgressBar
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
  interpolate
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

// Mock trip data
const trips = [
  {
    id: 1,
    destination: "Nepal Trek",
    status: "active",
    progress: 0.6,
    startDate: "2024-08-15",
    endDate: "2024-09-05",
    image: "🏔️",
    color: "#2E7D32",
    days: 21,
    completedDays: 13,
    highlights: ["Everest Base Camp", "Namche Bazaar", "Tengboche Monastery"],
    nextMilestone: "Reach Everest Base Camp"
  },
  {
    id: 2,
    destination: "Bali Adventure",
    status: "completed",
    progress: 1.0,
    startDate: "2024-06-10",
    endDate: "2024-06-24",
    image: "🏝️",
    color: "#FF6F00",
    days: 14,
    completedDays: 14,
    highlights: ["Ubud Rice Terraces", "Mount Batur Sunrise", "Gili Islands"],
    rating: 4.8
  },
  {
    id: 3,
    destination: "Patagonia Trek",
    status: "planned",
    progress: 0,
    startDate: "2024-12-01",
    endDate: "2024-12-18",
    image: "🏞️",
    color: "#1976D2",
    days: 18,
    completedDays: 0,
    highlights: ["Torres del Paine", "Glacier Perito Moreno", "Fitz Roy"],
    preparation: 0.3
  }
];

const stats = [
  { label: "Countries Visited", value: "12", icon: "earth", color: "#2E7D32" },
  { label: "Days Traveled", value: "156", icon: "calendar", color: "#FF6F00" },
  { label: "Adventures", value: "8", icon: "image-filter-hdr", color: "#1976D2" },
  { label: "Photos Taken", value: "2.4k", icon: "camera", color: "#9C27B0" },
];

const StatComponent = ({ item, index }: { item: any; index: number }) => {
  const statScale = useSharedValue(0);

  useEffect(() => {
    statScale.value = withSequence(
      withTiming(0, { duration: 0 }),
      withDelay(500 + index * 100, withSpring(1))
    );
  }, []);

  const statAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: statScale.value }],
  }));

  return (
    <Animated.View style={[styles.statItem, statAnimatedStyle]}>
      <Surface style={styles.statSurface} elevation={3}>
        <MaterialCommunityIcons
          name={item.icon as any}
          size={24}
          color={item.color}
        />
        <Title style={[styles.statValue, { color: item.color }]}>
          {item.value}
        </Title>
        <Paragraph style={styles.statLabel}>{item.label}</Paragraph>
      </Surface>
    </Animated.View>
  );
};

const TripCard = ({ item, index }: { item: any; index: number }) => {
  const theme = useTheme();
  const cardScale = useSharedValue(0);
  const cardOpacity = useSharedValue(0);

  useEffect(() => {
    cardScale.value = withDelay(index * 150, withSpring(1));
    cardOpacity.value = withDelay(index * 150, withTiming(1, { duration: 600 }));
  }, []);

  const cardAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: cardScale.value }],
    opacity: cardOpacity.value,
  }));

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#4CAF50';
      case 'completed': return '#2196F3';
      case 'planned': return '#FF9800';
      default: return theme.colors.primary;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return 'play-circle';
      case 'completed': return 'check-circle';
      case 'planned': return 'clock-outline';
      default: return 'circle';
    }
  };

  return (
    <Animated.View style={[styles.tripCard, cardAnimatedStyle]}>
      <TouchableOpacity activeOpacity={0.9}>
        <Card style={styles.card} elevation={4}>
          <LinearGradient
            colors={[item.color + '15', item.color + '05']}
            style={styles.cardGradient}
          >
            <Card.Content style={styles.cardContent}>
              <View style={styles.cardHeader}>
                <View style={styles.destinationInfo}>
                  <Title style={styles.tripIcon}>{item.image}</Title>
                  <View>
                    <Title style={styles.tripName}>{item.destination}</Title>
                    <View style={styles.statusContainer}>
                      <MaterialCommunityIcons
                        name={getStatusIcon(item.status)}
                        size={16}
                        color={getStatusColor(item.status)}
                      />
                      <Paragraph style={[styles.statusText, { color: getStatusColor(item.status) }]}>
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                      </Paragraph>
                    </View>
                  </View>
                </View>
                
                {item.status === 'completed' && item.rating && (
                  <View style={styles.rating}>
                    <MaterialCommunityIcons name="star" size={16} color="#FFD700" />
                    <Paragraph style={styles.ratingText}>{item.rating}</Paragraph>
                  </View>
                )}
              </View>

              <View style={styles.dateRange}>
                <Paragraph style={styles.dateText}>
                  {new Date(item.startDate).toLocaleDateString()} - {new Date(item.endDate).toLocaleDateString()}
                </Paragraph>
                <Paragraph style={styles.daysText}>
                  {item.days} days
                </Paragraph>
              </View>

              {item.status === 'active' && (
                <View style={styles.progressContainer}>
                  <View style={styles.progressHeader}>
                    <Paragraph style={styles.progressLabel}>Progress</Paragraph>
                    <Paragraph style={styles.progressText}>
                      {item.completedDays}/{item.days} days
                    </Paragraph>
                  </View>
                  <ProgressBar 
                    progress={item.progress} 
                    color={item.color}
                    style={styles.progressBar}
                  />
                  <Paragraph style={styles.nextMilestone}>
                    Next: {item.nextMilestone}
                  </Paragraph>
                </View>
              )}

              {item.status === 'planned' && item.preparation && (
                <View style={styles.progressContainer}>
                  <View style={styles.progressHeader}>
                    <Paragraph style={styles.progressLabel}>Preparation</Paragraph>
                    <Paragraph style={styles.progressText}>
                      {Math.round(item.preparation * 100)}%
                    </Paragraph>
                  </View>
                  <ProgressBar 
                    progress={item.preparation} 
                    color={item.color}
                    style={styles.progressBar}
                  />
                </View>
              )}

              <View style={styles.highlightsContainer}>
                <Paragraph style={styles.highlightsLabel}>Highlights:</Paragraph>
                <View style={styles.highlightsList}>
                  {item.highlights.map((highlight: string, highlightIndex: number) => (
                    <Chip
                      key={highlightIndex}
                      style={styles.highlightChip}
                      textStyle={styles.highlightText}
                    >
                      {highlight}
                    </Chip>
                  ))}
                </View>
              </View>

              {item.status === 'active' && (
                <View style={styles.actionButtons}>
                  <Button
                    mode="contained"
                    style={[styles.actionButton, { backgroundColor: item.color }]}
                    contentStyle={styles.buttonContent}
                    labelStyle={styles.buttonLabel}
                  >
                    View Details
                  </Button>
                  <Button
                    mode="outlined"
                    style={[styles.actionButton, { borderColor: item.color }]}
                    contentStyle={styles.buttonContent}
                    labelStyle={[styles.buttonLabel, { color: item.color }]}
                  >
                    Add Entry
                  </Button>
                </View>
              )}
            </Card.Content>
          </LinearGradient>
        </Card>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default function TripsScreen() {
  const theme = useTheme();
  const [selectedFilter, setSelectedFilter] = useState('all');
  
  const headerScale = useSharedValue(0);
  const statsOpacity = useSharedValue(0);

  useEffect(() => {
    headerScale.value = withSpring(1, { damping: 15 });
    statsOpacity.value = withDelay(300, withTiming(1, { duration: 800 }));
  }, []);

  const headerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: headerScale.value }],
  }));

  const statsAnimatedStyle = useAnimatedStyle(() => ({
    opacity: statsOpacity.value,
  }));

  const filteredTrips = trips.filter(trip => {
    if (selectedFilter === 'all') return true;
    return trip.status === selectedFilter;
  });

  return (
    <View style={styles.container}>
      {/* Header with Stats */}
      <Animated.View style={[styles.header, headerAnimatedStyle]}>
        <LinearGradient
          colors={[theme.colors.primary, theme.colors.secondary]}
          style={styles.headerGradient}
        >
          <Title style={styles.headerTitle}>Your Adventures</Title>
          <Paragraph style={styles.headerSubtitle}>
            Track your journeys and memories
          </Paragraph>
        </LinearGradient>
      </Animated.View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Stats Section */}
        <View style={styles.statsContainer}>
          <View style={styles.statsList}>
            {stats.map((stat, index) => (
              <StatComponent key={stat.label} item={stat} index={index} />
            ))}
          </View>
        </View>

        {/* Filter Tabs */}
        <View style={styles.filterContainer}>
          {['all', 'active', 'planned', 'completed'].map((filter) => (
            <TouchableOpacity
              key={filter}
              onPress={() => setSelectedFilter(filter)}
              activeOpacity={0.8}
            >
              <Chip
                selected={selectedFilter === filter}
                style={[
                  styles.filterChip,
                  selectedFilter === filter && { backgroundColor: theme.colors.primary }
                ]}
                textStyle={[
                  styles.filterText,
                  selectedFilter === filter && { color: '#FFFFFF' }
                ]}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </Chip>
            </TouchableOpacity>
          ))}
        </View>

        {/* Trips List */}
        <View style={styles.tripsContainer}>
          <View style={styles.tripsList}>
            {filteredTrips.map((trip, index) => (
              <TripCard key={trip.id} item={trip} index={index} />
            ))}
          </View>
        </View>
      </ScrollView>

      {/* FAB */}
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => {
          // Add new trip functionality
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
  scrollView: {
    flex: 1,
  },
  statsContainer: {
    paddingVertical: 20,
  },
  statsList: {
    paddingHorizontal: 20,
    gap: 12,
  },
  statItem: {
    width: (width - 60) / 4,
  },
  statSurface: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 10,
    textAlign: 'center',
    marginTop: 4,
    color: '#666',
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 8,
  },
  filterChip: {
    backgroundColor: '#FFFFFF',
  },
  filterText: {
    fontSize: 12,
  },
  tripsContainer: {
    paddingBottom: 100,
  },
  tripsList: {
    paddingHorizontal: 20,
    gap: 16,
  },
  tripCard: {
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
    padding: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  destinationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  tripIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  tripName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
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
  dateRange: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  dateText: {
    fontSize: 14,
    color: '#666',
  },
  daysText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  progressText: {
    fontSize: 14,
    color: '#666',
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    marginBottom: 8,
  },
  nextMilestone: {
    fontSize: 12,
    fontStyle: 'italic',
    color: '#666',
  },
  highlightsContainer: {
    marginBottom: 16,
  },
  highlightsLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  highlightsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  highlightChip: {
    height: 28,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  highlightText: {
    fontSize: 11,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
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