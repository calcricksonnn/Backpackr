import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, List, Button, Chip } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function EcoFriendlyScreen() {
  const [selectedTips, setSelectedTips] = useState<string[]>([]);

  const transportOptions = [
    { type: 'Public Transport', carbon: 'Low', cost: '$', description: 'Buses, trains, and metro systems' },
    { type: 'Bicycle Rental', carbon: 'Zero', cost: '$', description: 'Eco-friendly city exploration' },
    { type: 'Walking Tours', carbon: 'Zero', cost: 'Free', description: 'Discover cities on foot' },
    { type: 'Carpooling', carbon: 'Medium', cost: '$$', description: 'Share rides with other travelers' }
  ];

  const ecoTips = [
    {
      category: 'Accommodation',
      tips: [
        'Choose eco-certified hostels and hotels',
        'Reuse towels and sheets',
        'Turn off lights and AC when leaving'
      ]
    },
    {
      category: 'Food & Drink',
      tips: [
        'Eat local and seasonal food',
        'Carry a reusable water bottle',
        'Support local farmers markets'
      ]
    },
    {
      category: 'Activities',
      tips: [
        'Choose nature-based activities',
        'Respect wildlife and habitats',
        'Leave no trace when hiking'
      ]
    }
  ];

  const getCarbonColor = (level: string) => {
    switch (level) {
      case 'Zero': return '#4CAF50';
      case 'Low': return '#8BC34A';
      case 'Medium': return '#FF9800';
      default: return '#F44336';
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Card style={styles.headerCard}>
          <Card.Content>
            <Title>Eco-Friendly Travel</Title>
            <Paragraph>Sustainable travel options and environmental tips</Paragraph>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Title>Green Transportation</Title>
            {transportOptions.map((option, index) => (
              <List.Item
                key={index}
                title={option.type}
                description={option.description}
                left={() => <List.Icon icon="leaf" />}
                right={() => (
                  <View style={styles.transportInfo}>
                    <Chip 
                      style={[styles.carbonChip, { backgroundColor: getCarbonColor(option.carbon) + '20' }]}
                      textStyle={{ color: getCarbonColor(option.carbon) }}
                    >
                      {option.carbon} Carbon
                    </Chip>
                    <Paragraph style={styles.cost}>{option.cost}</Paragraph>
                  </View>
                )}
              />
            ))}
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Title>Carbon Footprint Tracker</Title>
            <View style={styles.carbonStats}>
              <View style={styles.statItem}>
                <MaterialCommunityIcons name="airplane" size={24} color="#FF5722" />
                <Paragraph style={styles.statLabel}>Flights</Paragraph>
                <Paragraph style={styles.statValue}>2.4 tons CO₂</Paragraph>
              </View>
              <View style={styles.statItem}>
                <MaterialCommunityIcons name="car" size={24} color="#FF9800" />
                <Paragraph style={styles.statLabel}>Ground Transport</Paragraph>
                <Paragraph style={styles.statValue}>0.8 tons CO₂</Paragraph>
              </View>
              <View style={styles.statItem}>
                <MaterialCommunityIcons name="home" size={24} color="#4CAF50" />
                <Paragraph style={styles.statLabel}>Accommodation</Paragraph>
                <Paragraph style={styles.statValue}>0.3 tons CO₂</Paragraph>
              </View>
            </View>
            <Button mode="outlined" style={styles.offsetButton}>
              Offset Carbon Footprint
            </Button>
          </Card.Content>
        </Card>

        {ecoTips.map((section, sectionIndex) => (
          <Card key={sectionIndex} style={styles.card}>
            <Card.Content>
              <Title>{section.category} Tips</Title>
              {section.tips.map((tip, tipIndex) => (
                <List.Item
                  key={tipIndex}
                  title={tip}
                  left={() => <List.Icon icon="check-circle" />}
                  onPress={() => {
                    const tipId = `${sectionIndex}-${tipIndex}`;
                    setSelectedTips(prev => 
                      prev.includes(tipId) 
                        ? prev.filter(id => id !== tipId)
                        : [...prev, tipId]
                    );
                  }}
                  right={() => 
                    selectedTips.includes(`${sectionIndex}-${tipIndex}`) ? (
                      <MaterialCommunityIcons name="bookmark" size={20} color="#6200EE" />
                    ) : null
                  }
                />
              ))}
            </Card.Content>
          </Card>
        ))}

        <Card style={styles.featuresCard}>
          <Card.Content>
            <Title>Sustainability Features</Title>
            <List.Item
              title="Eco-Certified Partners"
              description="Discover verified sustainable accommodation and tour operators"
              left={() => <List.Icon icon="certificate" />}
            />
            <List.Item
              title="Local Impact"
              description="Support local communities through responsible tourism"
              left={() => <List.Icon icon="account-heart" />}
            />
            <List.Item
              title="Green Challenges"
              description="Complete eco-friendly travel challenges and earn badges"
              left={() => <List.Icon icon="trophy" />}
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
    backgroundColor: '#4CAF50',
  },
  card: {
    marginBottom: 12,
    elevation: 2,
  },
  transportInfo: {
    alignItems: 'flex-end',
  },
  carbonChip: {
    marginBottom: 4,
    height: 24,
  },
  cost: {
    fontWeight: 'bold',
    fontSize: 12,
  },
  carbonStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 16,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statLabel: {
    fontSize: 10,
    marginTop: 4,
    textAlign: 'center',
  },
  statValue: {
    fontWeight: 'bold',
    fontSize: 12,
    marginTop: 2,
  },
  offsetButton: {
    marginTop: 12,
    borderColor: '#4CAF50',
  },
  featuresCard: {
    marginTop: 8,
    marginBottom: 16,
  },
});