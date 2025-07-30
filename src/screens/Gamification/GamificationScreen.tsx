import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, List, Button, Chip, ProgressBar } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  progress: number;
  maxProgress: number;
  category: 'exploration' | 'social' | 'eco' | 'budget';
}

interface Challenge {
  id: string;
  name: string;
  description: string;
  reward: string;
  timeLeft: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export default function GamificationScreen() {
  const [achievements] = useState<Achievement[]>([
    {
      id: '1',
      name: 'First Steps',
      description: 'Complete your first trip',
      icon: 'foot-print',
      earned: true,
      progress: 1,
      maxProgress: 1,
      category: 'exploration'
    },
    {
      id: '2',
      name: 'Social Butterfly',
      description: 'Connect with 10 fellow travelers',
      icon: 'account-group',
      earned: false,
      progress: 7,
      maxProgress: 10,
      category: 'social'
    },
    {
      id: '3',
      name: 'Eco Warrior',
      description: 'Complete 5 eco-friendly activities',
      icon: 'leaf',
      earned: false,
      progress: 3,
      maxProgress: 5,
      category: 'eco'
    },
    {
      id: '4',
      name: 'Budget Master',
      description: 'Stay under budget for 7 consecutive days',
      icon: 'wallet',
      earned: false,
      progress: 4,
      maxProgress: 7,
      category: 'budget'
    }
  ]);

  const [challenges] = useState<Challenge[]>([
    {
      id: '1',
      name: 'Try Local Street Food',
      description: 'Eat at 3 different street food vendors',
      reward: '50 XP + Foodie Badge',
      timeLeft: '2 days',
      difficulty: 'easy'
    },
    {
      id: '2',
      name: 'Make a New Friend',
      description: 'Exchange contacts with a fellow backpacker',
      reward: '100 XP + Social Badge',
      timeLeft: '5 days',
      difficulty: 'medium'
    },
    {
      id: '3',
      name: 'Off the Beaten Path',
      description: 'Visit a location not in guidebooks',
      reward: '200 XP + Explorer Badge',
      timeLeft: '1 week',
      difficulty: 'hard'
    }
  ]);

  const [userStats] = useState({
    level: 12,
    totalXP: 2450,
    nextLevelXP: 2800,
    countriesVisited: 8,
    friendsMade: 23,
    badgesEarned: 15
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'exploration': return '#2196F3';
      case 'social': return '#FF5722';
      case 'eco': return '#4CAF50';
      case 'budget': return '#FF9800';
      default: return '#9C27B0';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return '#4CAF50';
      case 'medium': return '#FF9800';
      case 'hard': return '#F44336';
      default: return '#9C27B0';
    }
  };

  const xpProgress = (userStats.totalXP - (userStats.level - 1) * 200) / 200;

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Card style={styles.headerCard}>
          <Card.Content>
            <Title>Gamification & Achievements</Title>
            <Paragraph>Level up your backpacking adventure!</Paragraph>
          </Card.Content>
        </Card>

        {/* User Stats */}
        <Card style={styles.statsCard}>
          <Card.Content>
            <View style={styles.levelContainer}>
              <View style={styles.levelInfo}>
                <Title style={styles.level}>Level {userStats.level}</Title>
                <Paragraph>{userStats.totalXP} / {userStats.nextLevelXP} XP</Paragraph>
              </View>
              <MaterialCommunityIcons name="trophy" size={40} color="#FFD700" />
            </View>
            <ProgressBar 
              progress={xpProgress} 
              color="#6200EE"
              style={styles.xpProgress}
            />
            
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <MaterialCommunityIcons name="earth" size={24} color="#2196F3" />
                <Paragraph style={styles.statNumber}>{userStats.countriesVisited}</Paragraph>
                <Paragraph style={styles.statLabel}>Countries</Paragraph>
              </View>
              <View style={styles.statItem}>
                <MaterialCommunityIcons name="account-heart" size={24} color="#FF5722" />
                <Paragraph style={styles.statNumber}>{userStats.friendsMade}</Paragraph>
                <Paragraph style={styles.statLabel}>Friends</Paragraph>
              </View>
              <View style={styles.statItem}>
                <MaterialCommunityIcons name="medal" size={24} color="#FFD700" />
                <Paragraph style={styles.statNumber}>{userStats.badgesEarned}</Paragraph>
                <Paragraph style={styles.statLabel}>Badges</Paragraph>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Achievements */}
        <Title style={styles.sectionTitle}>Achievements</Title>
        
        {achievements.map((achievement) => (
          <Card key={achievement.id} style={[
            styles.achievementCard,
            achievement.earned && styles.earnedCard
          ]}>
            <Card.Content>
              <View style={styles.achievementHeader}>
                <MaterialCommunityIcons 
                  name={achievement.icon as any} 
                  size={32} 
                  color={achievement.earned ? '#FFD700' : '#999'} 
                />
                <View style={styles.achievementInfo}>
                  <Title style={[
                    styles.achievementName,
                    achievement.earned && styles.earnedText
                  ]}>
                    {achievement.name}
                  </Title>
                  <Paragraph style={styles.achievementDescription}>
                    {achievement.description}
                  </Paragraph>
                  
                  {!achievement.earned && (
                    <View style={styles.progressContainer}>
                      <Paragraph style={styles.progressText}>
                        {achievement.progress} / {achievement.maxProgress}
                      </Paragraph>
                      <ProgressBar 
                        progress={achievement.progress / achievement.maxProgress}
                        color={getCategoryColor(achievement.category)}
                        style={styles.achievementProgress}
                      />
                    </View>
                  )}
                </View>
                <Chip 
                  style={[
                    styles.categoryChip,
                    { backgroundColor: getCategoryColor(achievement.category) + '20' }
                  ]}
                  textStyle={{ color: getCategoryColor(achievement.category) }}
                >
                  {achievement.category}
                </Chip>
              </View>
            </Card.Content>
          </Card>
        ))}

        {/* Active Challenges */}
        <Title style={styles.sectionTitle}>Active Challenges</Title>
        
        {challenges.map((challenge) => (
          <Card key={challenge.id} style={styles.challengeCard}>
            <Card.Content>
              <View style={styles.challengeHeader}>
                <View style={styles.challengeInfo}>
                  <Title style={styles.challengeName}>{challenge.name}</Title>
                  <Paragraph style={styles.challengeDescription}>
                    {challenge.description}
                  </Paragraph>
                  <View style={styles.challengeReward}>
                    <MaterialCommunityIcons name="gift" size={16} color="#4CAF50" />
                    <Paragraph style={styles.rewardText}>{challenge.reward}</Paragraph>
                  </View>
                </View>
                <View style={styles.challengeMeta}>
                  <Chip 
                    style={[
                      styles.difficultyChip,
                      { backgroundColor: getDifficultyColor(challenge.difficulty) + '20' }
                    ]}
                    textStyle={{ color: getDifficultyColor(challenge.difficulty) }}
                  >
                    {challenge.difficulty}
                  </Chip>
                  <Paragraph style={styles.timeLeft}>{challenge.timeLeft}</Paragraph>
                </View>
              </View>
            </Card.Content>
            <Card.Actions>
              <Button>Accept Challenge</Button>
            </Card.Actions>
          </Card>
        ))}

        {/* Leaderboard */}
        <Card style={styles.featuresCard}>
          <Card.Content>
            <Title>Leaderboard & Competition</Title>
            <List.Item
              title="Monthly Travel Group"
              description="You're ranked #3 out of 15 travelers"
              left={() => <List.Icon icon="podium-gold" />}
              right={() => <Chip>1,250 XP</Chip>}
            />
            <List.Item
              title="Eco Challenge"
              description="Join the sustainable travel competition"
              left={() => <List.Icon icon="earth" />}
              right={() => <Button>Join</Button>}
            />
          </Card.Content>
        </Card>
      </ScrollView>
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
  statsCard: {
    marginBottom: 16,
    elevation: 3,
  },
  levelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  levelInfo: {
    flex: 1,
  },
  level: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6200EE',
  },
  xpProgress: {
    height: 8,
    borderRadius: 4,
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 4,
  },
  statLabel: {
    fontSize: 10,
    color: '#666',
  },
  achievementCard: {
    marginBottom: 12,
    elevation: 2,
    opacity: 0.6,
  },
  earnedCard: {
    opacity: 1,
    borderColor: '#FFD700',
    borderWidth: 2,
  },
  achievementHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  achievementInfo: {
    marginLeft: 12,
    flex: 1,
  },
  achievementName: {
    fontSize: 16,
  },
  earnedText: {
    color: '#FFD700',
    fontWeight: 'bold',
  },
  achievementDescription: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  progressContainer: {
    marginTop: 8,
  },
  progressText: {
    fontSize: 10,
    marginBottom: 4,
  },
  achievementProgress: {
    height: 4,
    borderRadius: 2,
  },
  categoryChip: {
    height: 24,
    marginLeft: 8,
  },
  challengeCard: {
    marginBottom: 12,
    elevation: 2,
  },
  challengeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  challengeInfo: {
    flex: 1,
  },
  challengeName: {
    fontSize: 16,
  },
  challengeDescription: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  challengeReward: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  rewardText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  challengeMeta: {
    alignItems: 'flex-end',
  },
  difficultyChip: {
    height: 24,
    marginBottom: 4,
  },
  timeLeft: {
    fontSize: 10,
    color: '#666',
  },
  featuresCard: {
    marginTop: 16,
    marginBottom: 16,
  },
});