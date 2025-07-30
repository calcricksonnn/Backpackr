import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import { Text, Card, Title, Paragraph, Button, TextInput, Chip } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function AIAssistantScreen() {
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      type: 'ai',
      message: 'Hello! I\'m your AI Travel Assistant. How can I help you plan your next adventure?',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    { label: 'Itinerary Planning', icon: 'map-outline', color: '#2196F3' },
    { label: 'Packing Advice', icon: 'bag-outline', color: '#4CAF50' },
    { label: 'Local Tips', icon: 'location-outline', color: '#FF9800' },
    { label: 'Budget Planning', icon: 'card-outline', color: '#9C27B0' },
    { label: 'Safety Tips', icon: 'shield-outline', color: '#F44336' },
  ];

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: chatMessages.length + 1,
      type: 'user',
      message: inputText,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputText, selectedCategory);
      const aiMessage = {
        id: chatMessages.length + 2,
        type: 'ai',
        message: aiResponse,
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, aiMessage]);
    }, 1000);

    setInputText('');
  };

  const generateAIResponse = (input, category) => {
    const responses = {
      'Itinerary Planning': [
        'Based on your preferences, I recommend a 3-day itinerary starting with the city center, then exploring local neighborhoods, and ending with nature activities.',
        'For your trip, consider visiting these must-see attractions: museums in the morning, local markets for lunch, and scenic viewpoints in the evening.',
      ],
      'Packing Advice': [
        'For your destination, pack layers, comfortable walking shoes, and don\'t forget a portable charger and universal adapter.',
        'Essential items: weather-appropriate clothing, first aid kit, copies of important documents, and local currency.',
      ],
      'Local Tips': [
        'Local tip: Try the street food markets, use public transportation for authentic experiences, and learn basic phrases in the local language.',
        'Insider advice: Visit popular attractions early in the morning, respect local customs, and always carry cash for small vendors.',
      ],
      'Budget Planning': [
        'Budget breakdown: Accommodation 40%, Food 25%, Transportation 20%, Activities 15%. Consider hostels and local eateries to save money.',
        'Money-saving tips: Book accommodation in advance, use city passes for attractions, and eat where locals eat.',
      ],
      'Safety Tips': [
        'Safety first: Keep copies of documents, stay in well-lit areas at night, and inform someone of your itinerary.',
        'Travel safely: Research common scams, keep emergency contacts handy, and trust your instincts.',
      ]
    };

    const categoryResponses = responses[category?.label] || [
      'I\'m here to help with your travel planning! Could you be more specific about what you\'d like to know?',
      'Great question! Let me provide some personalized recommendations based on your needs.',
    ];

    return categoryResponses[Math.floor(Math.random() * categoryResponses.length)];
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    const categoryMessage = {
      id: chatMessages.length + 1,
      type: 'user',
      message: `I need help with ${category.label.toLowerCase()}`,
      timestamp: new Date()
    };
    setChatMessages(prev => [...prev, categoryMessage]);

    setTimeout(() => {
      const aiResponse = generateAIResponse('', category);
      const aiMessage = {
        id: chatMessages.length + 2,
        type: 'ai',
        message: aiResponse,
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, aiMessage]);
    }, 500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Title style={styles.headerTitle}>AI Travel Assistant</Title>
        <Paragraph style={styles.headerSubtitle}>Get personalized travel advice</Paragraph>
      </View>

      <View style={styles.categoriesContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((category, index) => (
            <Chip
              key={index}
              icon={() => <Ionicons name={category.icon} size={16} color="white" />}
              onPress={() => handleCategorySelect(category)}
              style={[styles.categoryChip, { backgroundColor: category.color }]}
              textStyle={styles.categoryChipText}
            >
              {category.label}
            </Chip>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={styles.chatContainer} showsVerticalScrollIndicator={false}>
        {chatMessages.map((message) => (
          <View
            key={message.id}
            style={[
              styles.messageContainer,
              message.type === 'user' ? styles.userMessage : styles.aiMessage
            ]}
          >
            <Card style={[
              styles.messageCard,
              message.type === 'user' ? styles.userMessageCard : styles.aiMessageCard
            ]}>
              <Card.Content style={styles.messageContent}>
                <Text style={[
                  styles.messageText,
                  message.type === 'user' ? styles.userMessageText : styles.aiMessageText
                ]}>
                  {message.message}
                </Text>
                <Text style={styles.timestampText}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Text>
              </Card.Content>
            </Card>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Ask me anything about your travel plans..."
          multiline
          right={
            <TextInput.Icon
              icon="send"
              onPress={handleSendMessage}
              style={styles.sendButton}
            />
          }
        />
      </View>
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
    backgroundColor: '#4CAF50',
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
  categoriesContainer: {
    padding: 16,
    backgroundColor: 'white',
  },
  categoryChip: {
    marginRight: 8,
  },
  categoryChipText: {
    color: 'white',
    fontSize: 12,
  },
  chatContainer: {
    flex: 1,
    padding: 16,
  },
  messageContainer: {
    marginBottom: 12,
  },
  userMessage: {
    alignItems: 'flex-end',
  },
  aiMessage: {
    alignItems: 'flex-start',
  },
  messageCard: {
    maxWidth: '80%',
  },
  userMessageCard: {
    backgroundColor: '#2196F3',
  },
  aiMessageCard: {
    backgroundColor: 'white',
  },
  messageContent: {
    padding: 12,
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
  },
  userMessageText: {
    color: 'white',
  },
  aiMessageText: {
    color: '#333',
  },
  timestampText: {
    fontSize: 10,
    opacity: 0.7,
    marginTop: 4,
  },
  inputContainer: {
    padding: 16,
    backgroundColor: 'white',
  },
  textInput: {
    backgroundColor: '#f5f5f5',
  },
  sendButton: {
    marginRight: 8,
  },
});