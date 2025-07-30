import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Card, Title, Paragraph, Button, Avatar, Divider, Switch, List } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const [notifications, setNotifications] = useState(true);
  const [locationSharing, setLocationSharing] = useState(true);
  const [carbonTracking, setCarbonTracking] = useState(true);

  const userStats = {
    tripsCompleted: 12,
    countriesVisited: 8,
    carbonSaved: 2.4,
    reviewsWritten: 23,
    photosShared: 156,
    rewardPoints: 1250
  };

  const achievements = [
    { id: 1, title: 'First Trip', description: 'Completed your first journey', icon: 'airplane', earned: true },
    { id: 2, title: 'Photo Explorer', description: 'Shared 100+ photos', icon: 'camera', earned: true },
    { id: 3, title: 'Eco Warrior', description: 'Saved 2+ tons of CO2', icon: 'leaf', earned: true },
    { id: 4, title: 'Social Butterfly', description: 'Made 50+ connections', icon: 'people', earned: false },
    { id: 5, title: 'Review Master', description: 'Written 20+ reviews', icon: 'star', earned: true },
  ];

  const StatCard = ({ title, value, unit, icon, color }) => (
    <Card style={styles.statCard}>
      <Card.Content style={styles.statContent}>
        <Ionicons name={icon} size={24} color={color} />
        <View style={styles.statText}>
          <Text style={[styles.statValue, { color }]}>{value}</Text>
          <Text style={styles.statUnit}>{unit}</Text>
          <Text style={styles.statTitle}>{title}</Text>
        </View>
      </Card.Content>
    </Card>
  );

  const AchievementCard = ({ achievement }) => (
    <Card style={[styles.achievementCard, !achievement.earned && styles.lockedAchievement]}>
      <Card.Content style={styles.achievementContent}>
        <Ionicons 
          name={achievement.icon} 
          size={28} 
          color={achievement.earned ? '#4CAF50' : '#ccc'} 
        />
        <View style={styles.achievementText}>
          <Text style={[styles.achievementTitle, !achievement.earned && styles.lockedText]}>
            {achievement.title}
          </Text>
          <Text style={[styles.achievementDescription, !achievement.earned && styles.lockedText]}>
            {achievement.description}
          </Text>
        </View>
        {achievement.earned && (
          <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
        )}
      </Card.Content>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Title style={styles.headerTitle}>Profile</Title>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* User Info */}
        <Card style={styles.profileCard}>
          <Card.Content style={styles.profileContent}>
            <Avatar.Image 
              source={{ uri: 'https://picsum.photos/100/100?random=profile' }} 
              size={80} 
            />
            <View style={styles.profileInfo}>
              <Title style={styles.userName}>Alex Chen</Title>
              <Paragraph style={styles.userTitle}>Adventure Seeker</Paragraph>
              <Paragraph style={styles.userLocation}>📍 San Francisco, CA</Paragraph>
              <Text style={styles.memberSince}>Member since Jan 2023</Text>
            </View>
          </Card.Content>
          <Card.Actions>
            <Button mode="outlined" icon="pencil">Edit Profile</Button>
            <Button mode="contained" icon="share">Share Profile</Button>
          </Card.Actions>
        </Card>

        {/* Stats */}
        <Text style={styles.sectionTitle}>Travel Stats</Text>
        <View style={styles.statsContainer}>
          <StatCard
            title="Trips"
            value={userStats.tripsCompleted}
            unit="completed"
            icon="airplane"
            color="#2196F3"
          />
          <StatCard
            title="Countries"
            value={userStats.countriesVisited}
            unit="visited"
            icon="globe-outline"
            color="#4CAF50"
          />
        </View>
        <View style={styles.statsContainer}>
          <StatCard
            title="CO₂ Saved"
            value={userStats.carbonSaved}
            unit="tons"
            icon="leaf"
            color="#8BC34A"
          />
          <StatCard
            title="Reviews"
            value={userStats.reviewsWritten}
            unit="written"
            icon="star"
            color="#FFD700"
          />
        </View>

        <Divider style={styles.divider} />

        {/* Achievements */}
        <Text style={styles.sectionTitle}>Achievements</Text>
        {achievements.map((achievement) => (
          <AchievementCard key={achievement.id} achievement={achievement} />
        ))}

        <Divider style={styles.divider} />

        {/* Rewards */}
        <Card style={styles.rewardsCard}>
          <Card.Content>
            <View style={styles.rewardsHeader}>
              <Ionicons name="gift" size={24} color="#9C27B0" />
              <View style={styles.rewardsInfo}>
                <Title style={styles.rewardsTitle}>Backpackr Points</Title>
                <Text style={styles.rewardsPoints}>{userStats.rewardPoints} points</Text>
              </View>
              <Button mode="outlined" compact>Redeem</Button>
            </View>
            <Paragraph style={styles.rewardsDescription}>
              Earn points by sharing photos, writing reviews, and exploring new destinations!
            </Paragraph>
          </Card.Content>
        </Card>

        <Divider style={styles.divider} />

        {/* Settings */}
        <Text style={styles.sectionTitle}>Settings</Text>
        
        <List.Item
          title="Push Notifications"
          description="Get updates about your trips and community"
          left={() => <List.Icon icon="bell-outline" />}
          right={() => (
            <Switch
              value={notifications}
              onValueChange={setNotifications}
            />
          )}
        />
        
        <List.Item
          title="Location Sharing"
          description="Share your location with emergency contacts"
          left={() => <List.Icon icon="location-outline" />}
          right={() => (
            <Switch
              value={locationSharing}
              onValueChange={setLocationSharing}
            />
          )}
        />
        
        <List.Item
          title="Carbon Tracking"
          description="Monitor your travel environmental impact"
          left={() => <List.Icon icon="leaf-outline" />}
          right={() => (
            <Switch
              value={carbonTracking}
              onValueChange={setCarbonTracking}
            />
          )}
        />

        <List.Item
          title="Account Settings"
          description="Manage your account and privacy"
          left={() => <List.Icon icon="cog-outline" />}
          right={() => <List.Icon icon="chevron-right" />}
          onPress={() => {}}
        />

        <List.Item
          title="Help & Support"
          description="Get help and contact support"
          left={() => <List.Icon icon="help-circle-outline" />}
          right={() => <List.Icon icon="chevron-right" />}
          onPress={() => {}}
        />

        <List.Item
          title="About Backpackr"
          description="App version and information"
          left={() => <List.Icon icon="information-outline" />}
          right={() => <List.Icon icon="chevron-right" />}
          onPress={() => {}}
        />

        {/* Logout */}
        <Button
          mode="outlined"
          icon="logout"
          onPress={() => {}}
          style={styles.logoutButton}
          textColor="#F44336"
        >
          Sign Out
        </Button>
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
    backgroundColor: '#673AB7',
    alignItems: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  profileCard: {
    margin: 16,
    elevation: 2,
  },
  profileContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileInfo: {
    marginLeft: 16,
    flex: 1,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userTitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 2,
  },
  userLocation: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  memberSince: {
    fontSize: 12,
    color: '#999',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 12,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  statCard: {
    flex: 1,
    marginHorizontal: 4,
    elevation: 2,
  },
  statContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  statText: {
    marginLeft: 12,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  statUnit: {
    fontSize: 10,
    color: '#666',
    marginTop: 2,
  },
  statTitle: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  divider: {
    marginVertical: 16,
  },
  achievementCard: {
    marginHorizontal: 16,
    marginBottom: 8,
    elevation: 2,
  },
  lockedAchievement: {
    opacity: 0.6,
  },
  achievementContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  achievementText: {
    marginLeft: 12,
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  achievementDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  lockedText: {
    color: '#999',
  },
  rewardsCard: {
    marginHorizontal: 16,
    elevation: 2,
  },
  rewardsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rewardsInfo: {
    marginLeft: 12,
    flex: 1,
  },
  rewardsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#9C27B0',
  },
  rewardsPoints: {
    fontSize: 14,
    color: '#666',
  },
  rewardsDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  logoutButton: {
    marginHorizontal: 16,
    marginVertical: 16,
    borderColor: '#F44336',
  },
});