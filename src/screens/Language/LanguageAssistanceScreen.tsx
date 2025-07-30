import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, List, Button, TextInput, Chip } from 'react-native-paper';

export default function LanguageAssistanceScreen() {
  const [translatedText, setTranslatedText] = useState('');

  const commonPhrases = [
    { english: 'Hello', thai: 'สวัสดี (Sa-wat-dee)', category: 'greetings' },
    { english: 'Thank you', thai: 'ขอบคุณ (Khob-khun)', category: 'greetings' },
    { english: 'How much?', thai: 'เท่าไหร่ (Tao-rai)', category: 'shopping' },
    { english: 'Where is...?', thai: 'อยู่ที่ไหน (Yu-tee-nai)', category: 'directions' },
    { english: 'I need help', thai: 'ช่วยด้วย (Chuay-duay)', category: 'emergency' },
    { english: 'Bathroom', thai: 'ห้องน้ำ (Hong-nam)', category: 'basic' }
  ];

  const tips = [
    { region: 'Southeast Asia', tip: 'Learning basic numbers 1-10 will help with bargaining' },
    { region: 'Europe', tip: 'English is widely spoken, but locals appreciate effort in their language' },
    { region: 'South America', tip: 'Spanish basics will help in most countries except Brazil (Portuguese)' }
  ];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Card style={styles.headerCard}>
          <Card.Content>
            <Title>Language Assistance</Title>
            <Paragraph>Translation tools and common phrases for backpackers</Paragraph>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Title>Quick Translator</Title>
            <TextInput
              label="Enter text to translate"
              value={translatedText}
              onChangeText={setTranslatedText}
              style={styles.input}
            />
            <Button mode="contained" style={styles.translateButton}>
              Translate to Local Language
            </Button>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Title>Common Backpacking Phrases - Thailand</Title>
            {commonPhrases.map((phrase, index) => (
              <List.Item
                key={index}
                title={phrase.english}
                description={phrase.thai}
                left={() => <List.Icon icon="translate" />}
                right={() => (
                  <Chip style={styles.categoryChip}>
                    {phrase.category}
                  </Chip>
                )}
              />
            ))}
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Title>Regional Language Tips</Title>
            {tips.map((tip, index) => (
              <List.Item
                key={index}
                title={tip.region}
                description={tip.tip}
                left={() => <List.Icon icon="lightbulb" />}
              />
            ))}
          </Card.Content>
        </Card>

        <Card style={styles.featuresCard}>
          <Card.Content>
            <Title>Language Features</Title>
            <List.Item
              title="Voice Translation"
              description="Speak to translate in real-time"
              left={() => <List.Icon icon="microphone" />}
            />
            <List.Item
              title="Photo Translation"
              description="Point camera at text to translate signs and menus"
              left={() => <List.Icon icon="camera" />}
            />
            <List.Item
              title="Offline Dictionary"
              description="Download language packs for offline use"
              left={() => <List.Icon icon="book-open" />}
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
  card: {
    marginBottom: 12,
    elevation: 2,
  },
  input: {
    marginBottom: 12,
  },
  translateButton: {
    backgroundColor: '#6200EE',
  },
  categoryChip: {
    backgroundColor: '#E3F2FD',
  },
  featuresCard: {
    marginTop: 16,
    marginBottom: 16,
  },
});