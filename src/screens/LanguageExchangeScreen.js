import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Card, Title, Paragraph, Button, TextInput, FAB } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function LanguageExchangeScreen() {
  const [searchLanguage, setSearchLanguage] = useState('');

  const exchangePartners = [
    {
      id: 1,
      name: 'Marie Dubois',
      location: 'Paris, France',
      nativeLanguage: 'French',
      learningLanguage: 'English',
      level: 'Intermediate',
      rating: 4.8,
      isOnline: true
    },
    {
      id: 2,
      name: 'Hans Mueller',
      location: 'Berlin, Germany',
      nativeLanguage: 'German',
      learningLanguage: 'English',
      level: 'Advanced',
      rating: 4.9,
      isOnline: false
    }
  ];

  const PartnerCard = ({ partner }) => (
    <Card style={styles.partnerCard}>
      <Card.Content>
        <View style={styles.partnerHeader}>
          <View style={styles.partnerInfo}>
            <Title style={styles.partnerName}>{partner.name}</Title>
            <Text style={styles.partnerLocation}>{partner.location}</Text>
            <View style={styles.languageInfo}>
              <Text style={styles.languageText}>
                Native: {partner.nativeLanguage} • Learning: {partner.learningLanguage}
              </Text>
            </View>
          </View>
          <View style={styles.partnerStatus}>
            <View style={[styles.statusDot, { backgroundColor: partner.isOnline ? '#4CAF50' : '#ccc' }]} />
            <Text style={styles.rating}>★ {partner.rating}</Text>
          </View>
        </View>
        <View style={styles.partnerActions}>
          <Button mode="outlined" icon="message" compact>Chat</Button>
          <Button mode="contained" icon="video" compact>Video Call</Button>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Title style={styles.headerTitle}>Language Exchange</Title>
        <Paragraph style={styles.headerSubtitle}>Practice with locals and travelers</Paragraph>
      </View>

      <ScrollView style={styles.content}>
        <TextInput
          label="Search by language"
          value={searchLanguage}
          onChangeText={setSearchLanguage}
          style={styles.searchInput}
          left={<TextInput.Icon icon="magnify" />}
        />

        <Text style={styles.sectionTitle}>Available Partners</Text>
        {exchangePartners.map((partner) => (
          <PartnerCard key={partner.id} partner={partner} />
        ))}
      </ScrollView>

      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => {}}
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
    backgroundColor: '#E91E63',
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
  searchInput: {
    marginBottom: 16,
    backgroundColor: 'white',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  partnerCard: {
    marginBottom: 12,
    elevation: 2,
  },
  partnerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  partnerInfo: {
    flex: 1,
  },
  partnerName: {
    fontSize: 16,
    fontWeight: '600',
  },
  partnerLocation: {
    fontSize: 14,
    color: '#666',
  },
  languageInfo: {
    marginTop: 4,
  },
  languageText: {
    fontSize: 12,
    color: '#666',
  },
  partnerStatus: {
    alignItems: 'center',
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginBottom: 4,
  },
  rating: {
    fontSize: 12,
    color: '#FFD700',
  },
  partnerActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#E91E63',
  },
});