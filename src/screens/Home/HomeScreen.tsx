import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Modal } from 'react-native';
import { 
  Card, 
  Title, 
  Paragraph, 
  Button, 
  FAB 
} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

// Import additional screens
import OfflineModeScreen from '../Offline/OfflineModeScreen';
import LanguageAssistanceScreen from '../Language/LanguageAssistanceScreen';
import EcoFriendlyScreen from '../Eco/EcoFriendlyScreen';
import GamificationScreen from '../Gamification/GamificationScreen';
import EventsScreen from '../Events/EventsScreen';
import PackingScreen from '../Packing/PackingScreen';

export default function HomeScreen() {
  const navigation = useNavigation();
  const [selectedQuickAction, setSelectedQuickAction] = useState<string | null>(null);

  const features = [
    {
      id: 'routes',
      title: 'Route Sharing',
      description: 'Share and sync routes with friends',
      icon: 'map-marker-path',
      color: '#4CAF50',
      screen: 'Routes'
    },
    {
      id: 'safety',
      title: 'Travel Safety',
      description: 'SOS button and safety tips',
      icon: 'shield-check',
      color: '#F44336',
      screen: 'Safety'
    },
    {
      id: 'budget',
      title: 'Budget Management',
      description: 'Track expenses and budgets',
      icon: 'wallet',
      color: '#FF9800',
      screen: 'Budget'
    },
    {
      id: 'community',
      title: 'Community',
      description: 'Recommendations and reviews',
      icon: 'account-group',
      color: '#2196F3',
      screen: 'Community'
    }
  ];

  const quickActions = [
    { label: 'Offline Maps', icon: 'download', description: 'Download maps for offline use', component: 'offline' },
    { label: 'Translate', icon: 'translate', description: 'Common backpacking phrases', component: 'language' },
    { label: 'Eco Tips', icon: 'leaf', description: 'Sustainable travel options', component: 'eco' },
    { label: 'Achievements', icon: 'trophy', description: 'Badges and challenges', component: 'gamification' },
    { label: 'Events', icon: 'calendar', description: 'Local events and activities', component: 'events' },
    { label: 'Packing List', icon: 'bag-checked', description: 'Smart packing assistant', component: 'packing' }
  ];

  const handleQuickAction = (component: string) => {
    setSelectedQuickAction(component);
  };

  const renderQuickActionModal = () => {
    if (!selectedQuickAction) return null;

    let Component = null;
    switch (selectedQuickAction) {
      case 'offline':
        Component = OfflineModeScreen;
        break;
      case 'language':
        Component = LanguageAssistanceScreen;
        break;
      case 'eco':
        Component = EcoFriendlyScreen;
        break;
      case 'gamification':
        Component = GamificationScreen;
        break;
      case 'events':
        Component = EventsScreen;
        break;
      case 'packing':
        Component = PackingScreen;
        break;
      default:
        return null;
    }

    return (
      <Modal
        visible={selectedQuickAction !== null}
        animationType="slide"
        onRequestClose={() => setSelectedQuickAction(null)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Button onPress={() => setSelectedQuickAction(null)}>
              ← Back
            </Button>
          </View>
          <Component />
        </View>
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Card style={styles.welcomeCard}>
          <Card.Content>
            <Title>Welcome to Backpackr!</Title>
            <Paragraph>Your ultimate backpacking companion</Paragraph>
          </Card.Content>
        </Card>

        <Title style={styles.sectionTitle}>Main Features</Title>
        
        {features.map((feature) => (
          <Card key={feature.id} style={styles.featureCard}>
            <Card.Content>
              <View style={styles.featureHeader}>
                <MaterialCommunityIcons 
                  name={feature.icon as any} 
                  size={32} 
                  color={feature.color} 
                />
                <View style={styles.featureText}>
                  <Title style={styles.featureTitle}>{feature.title}</Title>
                  <Paragraph>{feature.description}</Paragraph>
                </View>
              </View>
            </Card.Content>
            <Card.Actions>
              <Button onPress={() => navigation.navigate(feature.screen as never)}>
                Open
              </Button>
            </Card.Actions>
          </Card>
        ))}

        <Title style={styles.sectionTitle}>Quick Actions</Title>
        
        <View style={styles.chipContainer}>
          {quickActions.map((action) => (
            <Card 
              key={action.label} 
              style={styles.quickActionCard}
              onPress={() => handleQuickAction(action.component)}
            >
              <Card.Content style={styles.quickActionContent}>
                <MaterialCommunityIcons 
                  name={action.icon as any} 
                  size={24} 
                  color="#6200EE" 
                />
                <View style={styles.quickActionText}>
                  <Paragraph style={styles.quickActionLabel}>{action.label}</Paragraph>
                  <Paragraph style={styles.quickActionDescription}>{action.description}</Paragraph>
                </View>
              </Card.Content>
            </Card>
          ))}
        </View>
      </ScrollView>

      {renderQuickActionModal()}

      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => {}}
        label="New Trip"
      />
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
  welcomeCard: {
    marginBottom: 16,
    backgroundColor: '#6200EE',
  },
  sectionTitle: {
    marginVertical: 16,
    color: '#333',
  },
  featureCard: {
    marginBottom: 12,
    elevation: 2,
  },
  featureHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureText: {
    marginLeft: 16,
    flex: 1,
  },
  featureTitle: {
    fontSize: 18,
    marginBottom: 4,
  },
  chipContainer: {
    flexDirection: 'column',
    gap: 8,
    marginBottom: 80,
  },
  quickActionCard: {
    elevation: 1,
    marginBottom: 8,
  },
  quickActionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  quickActionText: {
    marginLeft: 12,
    flex: 1,
  },
  quickActionLabel: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  quickActionDescription: {
    fontSize: 12,
    color: '#666',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#6200EE',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  modalHeader: {
    backgroundColor: '#6200EE',
    paddingVertical: 8,
    paddingHorizontal: 16,
    paddingTop: 40,
  },
});