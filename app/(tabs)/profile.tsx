import React, { useState, useEffect } from 'react';
import { 
  View, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { 
  Card, 
  Title, 
  Paragraph, 
  Button, 
  useTheme,
  Surface,
  Switch,
  List,
  Divider
} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withSpring,
  withSequence,
  withDelay
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

// Mock user data
const userData = {
  name: "Jordan Smith",
  avatar: "👤",
  level: "Adventure Explorer",
  memberSince: "March 2023",
  bio: "Passionate backpacker exploring the world one adventure at a time. Love connecting with fellow travelers and sharing experiences!",
  stats: {
    countries: 15,
    cities: 47,
    days: 234,
    photos: 1847,
    friends: 156,
    posts: 23
  },
  achievements: [
    { id: 1, name: "First Adventure", icon: "flag", color: "#4CAF50", earned: true },
    { id: 2, name: "Mountain Explorer", icon: "mountain", color: "#2196F3", earned: true },
    { id: 3, name: "Beach Lover", icon: "beach", color: "#FF9800", earned: true },
    { id: 4, name: "Culture Seeker", icon: "temple-buddhist", color: "#9C27B0", earned: true },
    { id: 5, name: "Solo Traveler", icon: "account", color: "#607D8B", earned: false },
    { id: 6, name: "World Explorer", icon: "earth", color: "#F44336", earned: false }
  ],
  recentActivities: [
    { id: 1, text: "Completed Himalayas Trek", date: "2 days ago", icon: "check-circle" },
    { id: 2, text: "Added 25 photos to Bali album", date: "1 week ago", icon: "image-multiple" },
    { id: 3, text: "Connected with 3 new travelers", date: "2 weeks ago", icon: "account-plus" },
    { id: 4, text: "Posted about Patagonia adventure", date: "3 weeks ago", icon: "post" }
  ]
};

const StatItem = ({ label, value, icon, color, index }: { label: string; value: string | number; icon: string; color: string; index: number }) => {
  const statScale = useSharedValue(0);

  useEffect(() => {
    statScale.value = withSequence(
      withTiming(0, { duration: 0 }),
      withDelay(600 + index * 100, withSpring(1))
    );
  }, []);

  const statAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: statScale.value }],
  }));

  return (
    <Animated.View style={[styles.statItem, statAnimatedStyle]}>
      <Surface style={styles.statSurface} elevation={3}>
        <MaterialCommunityIcons name={icon as any} size={24} color={color} />
        <Title style={[styles.statValue, { color }]}>{value}</Title>
        <Paragraph style={styles.statLabel}>{label}</Paragraph>
      </Surface>
    </Animated.View>
  );
};

const AchievementItem = ({ achievement, index }: { achievement: any; index: number }) => {
  const achievementScale = useSharedValue(0);

  useEffect(() => {
    achievementScale.value = withDelay(800 + index * 50, withSpring(1));
  }, []);

  const achievementAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: achievementScale.value }],
  }));

  return (
    <Animated.View style={[styles.achievementItem, achievementAnimatedStyle]}>
      <Surface
        style={[
          styles.achievementSurface,
          {
            backgroundColor: achievement.earned ? achievement.color + '20' : '#F5F5F5',
            borderColor: achievement.earned ? achievement.color : '#E0E0E0',
          }
        ]}
        elevation={achievement.earned ? 3 : 1}
      >
        <MaterialCommunityIcons
          name={achievement.icon as any}
          size={20}
          color={achievement.earned ? achievement.color : '#BDBDBD'}
        />
        <Paragraph
          style={[
            styles.achievementText,
            {
              color: achievement.earned ? achievement.color : '#BDBDBD',
              fontWeight: achievement.earned ? 'bold' : 'normal'
            }
          ]}
        >
          {achievement.name}
        </Paragraph>
      </Surface>
    </Animated.View>
  );
};

export default function ProfileScreen() {
  const theme = useTheme();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationSharing, setLocationSharing] = useState(false);
  
  const headerScale = useSharedValue(0);
  const profileOpacity = useSharedValue(0);
  const statsOpacity = useSharedValue(0);

  useEffect(() => {
    headerScale.value = withSpring(1, { damping: 15 });
    profileOpacity.value = withDelay(200, withTiming(1, { duration: 800 }));
    statsOpacity.value = withDelay(400, withTiming(1, { duration: 800 }));
  }, []);

  const headerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: headerScale.value }],
  }));

  const profileAnimatedStyle = useAnimatedStyle(() => ({
    opacity: profileOpacity.value,
  }));

  const statsAnimatedStyle = useAnimatedStyle(() => ({
    opacity: statsOpacity.value,
  }));

  const renderStat = (label: string, value: string | number, icon: string, color: string, index: number) => {
    return <StatItem key={label} label={label} value={value} icon={icon} color={color} index={index} />;
  };

  const renderAchievement = (achievement: any, index: number) => {
    return <AchievementItem key={achievement.id} achievement={achievement} index={index} />;
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Animated.View style={[styles.header, headerAnimatedStyle]}>
        <LinearGradient
          colors={[theme.colors.primary, theme.colors.secondary]}
          style={styles.headerGradient}
        >
          <Title style={styles.headerTitle}>My Profile</Title>
          <Paragraph style={styles.headerSubtitle}>
            Your backpacking journey
          </Paragraph>
        </LinearGradient>
      </Animated.View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Profile Card */}
        <Animated.View style={[styles.profileSection, profileAnimatedStyle]}>
          <Card style={styles.profileCard} elevation={4}>
            <Card.Content style={styles.profileContent}>
              <View style={styles.profileHeader}>
                <Title style={styles.avatar}>{userData.avatar}</Title>
                <View style={styles.profileInfo}>
                  <Title style={styles.name}>{userData.name}</Title>
                  <Paragraph style={styles.level}>{userData.level}</Paragraph>
                  <Paragraph style={styles.memberSince}>
                    Member since {userData.memberSince}
                  </Paragraph>
                </View>
                <TouchableOpacity style={styles.editButton} activeOpacity={0.8}>
                  <MaterialCommunityIcons
                    name="pencil"
                    size={20}
                    color={theme.colors.primary}
                  />
                </TouchableOpacity>
              </View>
              
              <Paragraph style={styles.bio}>{userData.bio}</Paragraph>
              
              <View style={styles.profileActions}>
                <Button
                  mode="contained"
                  style={styles.actionButton}
                  contentStyle={styles.buttonContent}
                  labelStyle={styles.buttonLabel}
                >
                  Edit Profile
                </Button>
                <Button
                  mode="outlined"
                  style={styles.actionButton}
                  contentStyle={styles.buttonContent}
                  labelStyle={styles.buttonLabel}
                >
                  Share Profile
                </Button>
              </View>
            </Card.Content>
          </Card>
        </Animated.View>

        {/* Stats Section */}
        <Animated.View style={[styles.statsSection, statsAnimatedStyle]}>
          <Title style={styles.sectionTitle}>Travel Stats</Title>
          <View style={styles.statsGrid}>
            {renderStat('Countries', userData.stats.countries, 'flag', '#4CAF50', 0)}
            {renderStat('Cities', userData.stats.cities, 'city', '#2196F3', 1)}
            {renderStat('Days', userData.stats.days, 'calendar', '#FF9800', 2)}
            {renderStat('Photos', userData.stats.photos, 'camera', '#9C27B0', 3)}
            {renderStat('Friends', userData.stats.friends, 'account-group', '#F44336', 4)}
            {renderStat('Posts', userData.stats.posts, 'post', '#607D8B', 5)}
          </View>
        </Animated.View>

        {/* Achievements Section */}
        <View style={styles.achievementsSection}>
          <Title style={styles.sectionTitle}>Achievements</Title>
          <View style={styles.achievementsGrid}>
            {userData.achievements.map((achievement, index) => 
              renderAchievement(achievement, index)
            )}
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.activitySection}>
          <Title style={styles.sectionTitle}>Recent Activity</Title>
          <Card style={styles.activityCard} elevation={2}>
            <Card.Content style={styles.activityContent}>
              {userData.recentActivities.map((activity, index) => (
                <View key={activity.id}>
                  <View style={styles.activityItem}>
                    <MaterialCommunityIcons
                      name={activity.icon as any}
                      size={20}
                      color={theme.colors.primary}
                    />
                    <View style={styles.activityText}>
                      <Paragraph style={styles.activityDescription}>
                        {activity.text}
                      </Paragraph>
                      <Paragraph style={styles.activityDate}>
                        {activity.date}
                      </Paragraph>
                    </View>
                  </View>
                  {index < userData.recentActivities.length - 1 && (
                    <Divider style={styles.activityDivider} />
                  )}
                </View>
              ))}
            </Card.Content>
          </Card>
        </View>

        {/* Settings Section */}
        <View style={styles.settingsSection}>
          <Title style={styles.sectionTitle}>Settings</Title>
          <Card style={styles.settingsCard} elevation={2}>
            <Card.Content style={styles.settingsContent}>
              <List.Item
                title="Push Notifications"
                description="Get notified about new messages and updates"
                left={(props) => (
                  <List.Icon {...props} icon="bell" color={theme.colors.primary} />
                )}
                right={() => (
                  <Switch
                    value={notificationsEnabled}
                    onValueChange={setNotificationsEnabled}
                  />
                )}
              />
              <Divider />
              <List.Item
                title="Location Sharing"
                description="Share your location with travel buddies"
                left={(props) => (
                  <List.Icon {...props} icon="map-marker" color={theme.colors.primary} />
                )}
                right={() => (
                  <Switch
                    value={locationSharing}
                    onValueChange={setLocationSharing}
                  />
                )}
              />
              <Divider />
              <List.Item
                title="Privacy Settings"
                description="Manage your privacy preferences"
                left={(props) => (
                  <List.Icon {...props} icon="shield-account" color={theme.colors.primary} />
                )}
                right={(props) => (
                  <List.Icon {...props} icon="chevron-right" />
                )}
                onPress={() => {}}
              />
              <Divider />
              <List.Item
                title="Help & Support"
                description="Get help or contact support"
                left={(props) => (
                  <List.Icon {...props} icon="help-circle" color={theme.colors.primary} />
                )}
                right={(props) => (
                  <List.Icon {...props} icon="chevron-right" />
                )}
                onPress={() => {}}
              />
            </Card.Content>
          </Card>
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>
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
  profileSection: {
    padding: 20,
  },
  profileCard: {
    borderRadius: 16,
  },
  profileContent: {
    padding: 20,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    fontSize: 48,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  level: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  memberSince: {
    fontSize: 12,
    color: '#999',
  },
  editButton: {
    padding: 8,
  },
  bio: {
    fontSize: 14,
    lineHeight: 20,
    color: '#666',
    marginBottom: 20,
  },
  profileActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    borderRadius: 20,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  buttonLabel: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  statsSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statItem: {
    width: (width - 60) / 3,
  },
  statSurface: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 10,
    textAlign: 'center',
    marginTop: 4,
    color: '#666',
  },
  achievementsSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  achievementItem: {
    width: (width - 56) / 3,
  },
  achievementSurface: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
  },
  achievementText: {
    fontSize: 10,
    textAlign: 'center',
    marginTop: 4,
  },
  activitySection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  activityCard: {
    borderRadius: 12,
  },
  activityContent: {
    padding: 16,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  activityText: {
    marginLeft: 16,
    flex: 1,
  },
  activityDescription: {
    fontSize: 14,
    marginBottom: 2,
  },
  activityDate: {
    fontSize: 12,
    color: '#666',
  },
  activityDivider: {
    marginLeft: 36,
  },
  settingsSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  settingsCard: {
    borderRadius: 12,
  },
  settingsContent: {
    padding: 0,
  },
  bottomPadding: {
    height: 20,
  },
});