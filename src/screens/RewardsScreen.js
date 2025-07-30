import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Card, Title, Paragraph, Button, Chip, ProgressBar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function RewardsScreen() {
  const [userPoints, setUserPoints] = useState(1250);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const userLevel = {
    current: 'Explorer',
    next: 'Adventurer',
    progress: 0.75,
    pointsToNext: 250
  };

  const rewards = [
    {
      id: 1,
      title: '20% Off Hotel Booking',
      description: 'Get 20% discount on your next hotel reservation',
      points: 500,
      category: 'accommodation',
      type: 'discount',
      available: true
    },
    {
      id: 2,
      title: 'Free Travel Insurance',
      description: '1-week complimentary travel insurance coverage',
      points: 800,
      category: 'insurance',
      type: 'service',
      available: true
    },
    {
      id: 3,
      title: 'Airport Lounge Access',
      description: 'One-time access to premium airport lounges',
      points: 1200,
      category: 'travel',
      type: 'experience',
      available: true
    },
    {
      id: 4,
      title: 'Local Experience Gift',
      description: 'Complimentary local tour or activity',
      points: 1000,
      category: 'activity',
      type: 'experience',
      available: true
    },
    {
      id: 5,
      title: 'Premium App Features',
      description: '3 months of premium features unlocked',
      points: 600,
      category: 'app',
      type: 'upgrade',
      available: true
    },
    {
      id: 6,
      title: 'Travel Gear Discount',
      description: '30% off backpacks and travel accessories',
      points: 400,
      category: 'gear',
      type: 'discount',
      available: true
    }
  ];

  const categories = [
    { label: 'All', value: 'all' },
    { label: 'Discounts', value: 'discount' },
    { label: 'Experiences', value: 'experience' },
    { label: 'Services', value: 'service' }
  ];

  const pointsHistory = [
    { date: '2024-01-20', action: 'Photo shared', points: +50 },
    { date: '2024-01-18', action: 'Review written', points: +100 },
    { date: '2024-01-15', action: 'Route completed', points: +200 },
    { date: '2024-01-12', action: 'Friend referred', points: +150 },
    { date: '2024-01-10', action: 'Hotel booking discount redeemed', points: -500 }
  ];

  const filteredRewards = selectedCategory === 'all' 
    ? rewards 
    : rewards.filter(reward => reward.type === selectedCategory);

  const redeemReward = (reward) => {
    if (userPoints >= reward.points) {
      setUserPoints(prev => prev - reward.points);
      // Show success message or handle redemption
      alert(`Successfully redeemed: ${reward.title}`);
    } else {
      alert(`You need ${reward.points - userPoints} more points to redeem this reward.`);
    }
  };

  const RewardCard = ({ reward }) => (
    <Card style={styles.rewardCard}>
      <Card.Content>
        <View style={styles.rewardHeader}>
          <View style={styles.rewardInfo}>
            <Title style={styles.rewardTitle}>{reward.title}</Title>
            <Paragraph style={styles.rewardDescription}>{reward.description}</Paragraph>
          </View>
          <View style={styles.rewardPoints}>
            <Text style={styles.pointsText}>{reward.points}</Text>
            <Text style={styles.pointsLabel}>points</Text>
          </View>
        </View>
        <View style={styles.rewardActions}>
          <Chip
            style={[styles.categoryChip, { backgroundColor: getCategoryColor(reward.category) }]}
            textStyle={{ color: 'white', fontSize: 10 }}
          >
            {reward.category}
          </Chip>
          <Button
            mode={userPoints >= reward.points ? 'contained' : 'outlined'}
            onPress={() => redeemReward(reward)}
            disabled={userPoints < reward.points}
            compact
          >
            {userPoints >= reward.points ? 'Redeem' : 'Not enough points'}
          </Button>
        </View>
      </Card.Content>
    </Card>
  );

  const getCategoryColor = (category) => {
    const colors = {
      accommodation: '#2196F3',
      insurance: '#F44336',
      travel: '#FF9800',
      activity: '#4CAF50',
      app: '#9C27B0',
      gear: '#607D8B'
    };
    return colors[category] || '#666';
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Title style={styles.headerTitle}>Rewards</Title>
        <Paragraph style={styles.headerSubtitle}>Earn and redeem points</Paragraph>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Points Balance */}
        <Card style={styles.balanceCard}>
          <Card.Content>
            <View style={styles.balanceHeader}>
              <View style={styles.pointsBalance}>
                <Text style={styles.balanceNumber}>{userPoints}</Text>
                <Text style={styles.balanceLabel}>Backpackr Points</Text>
              </View>
              <Ionicons name="gift" size={40} color="#9C27B0" />
            </View>
            
            <View style={styles.levelInfo}>
              <View style={styles.levelHeader}>
                <Text style={styles.currentLevel}>{userLevel.current}</Text>
                <Text style={styles.nextLevel}>→ {userLevel.next}</Text>
              </View>
              <ProgressBar progress={userLevel.progress} color="#9C27B0" style={styles.progressBar} />
              <Text style={styles.progressText}>
                {userLevel.pointsToNext} points to reach {userLevel.next}
              </Text>
            </View>
          </Card.Content>
        </Card>

        {/* How to Earn Points */}
        <Card style={styles.earnCard}>
          <Card.Content>
            <Title style={styles.cardTitle}>How to Earn Points</Title>
            <View style={styles.earnList}>
              <View style={styles.earnItem}>
                <Ionicons name="camera" size={20} color="#4CAF50" />
                <Text style={styles.earnText}>Share photos: 50 points</Text>
              </View>
              <View style={styles.earnItem}>
                <Ionicons name="star" size={20} color="#FFD700" />
                <Text style={styles.earnText}>Write reviews: 100 points</Text>
              </View>
              <View style={styles.earnItem}>
                <Ionicons name="map" size={20} color="#2196F3" />
                <Text style={styles.earnText}>Complete routes: 200 points</Text>
              </View>
              <View style={styles.earnItem}>
                <Ionicons name="people" size={20} color="#FF9800" />
                <Text style={styles.earnText}>Refer friends: 150 points</Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Filter Categories */}
        <View style={styles.filtersContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map((category) => (
              <Chip
                key={category.value}
                selected={selectedCategory === category.value}
                onPress={() => setSelectedCategory(category.value)}
                style={styles.filterChip}
              >
                {category.label}
              </Chip>
            ))}
          </ScrollView>
        </View>

        {/* Available Rewards */}
        <Text style={styles.sectionTitle}>Available Rewards</Text>
        {filteredRewards.map((reward) => (
          <RewardCard key={reward.id} reward={reward} />
        ))}

        {/* Points History */}
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        <Card style={styles.historyCard}>
          <Card.Content>
            {pointsHistory.map((item, index) => (
              <View key={index} style={styles.historyItem}>
                <View style={styles.historyInfo}>
                  <Text style={styles.historyAction}>{item.action}</Text>
                  <Text style={styles.historyDate}>{item.date}</Text>
                </View>
                <Text style={[
                  styles.historyPoints,
                  { color: item.points > 0 ? '#4CAF50' : '#F44336' }
                ]}>
                  {item.points > 0 ? '+' : ''}{item.points}
                </Text>
              </View>
            ))}
          </Card.Content>
        </Card>
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
    backgroundColor: '#9C27B0',
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
  balanceCard: {
    marginBottom: 16,
    elevation: 2,
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  pointsBalance: {
    flex: 1,
  },
  balanceNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#9C27B0',
  },
  balanceLabel: {
    fontSize: 14,
    color: '#666',
  },
  levelInfo: {
    marginTop: 8,
  },
  levelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  currentLevel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#9C27B0',
  },
  nextLevel: {
    fontSize: 16,
    color: '#666',
    marginLeft: 8,
  },
  progressBar: {
    marginBottom: 4,
  },
  progressText: {
    fontSize: 12,
    color: '#666',
  },
  earnCard: {
    marginBottom: 16,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    marginBottom: 12,
  },
  earnList: {
    marginTop: 8,
  },
  earnItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  earnText: {
    marginLeft: 12,
    fontSize: 14,
    color: '#666',
  },
  filtersContainer: {
    marginBottom: 16,
  },
  filterChip: {
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  rewardCard: {
    marginBottom: 12,
    elevation: 2,
  },
  rewardHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  rewardInfo: {
    flex: 1,
    marginRight: 16,
  },
  rewardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  rewardDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  rewardPoints: {
    alignItems: 'center',
  },
  pointsText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#9C27B0',
  },
  pointsLabel: {
    fontSize: 12,
    color: '#666',
  },
  rewardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryChip: {
    alignSelf: 'flex-start',
  },
  historyCard: {
    elevation: 2,
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  historyInfo: {
    flex: 1,
  },
  historyAction: {
    fontSize: 14,
    fontWeight: '500',
  },
  historyDate: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  historyPoints: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});