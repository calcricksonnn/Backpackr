import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput, Button, Card, Avatar } from 'react-native-paper';

export interface ChatMessage {
  id: string;
  userId: string;
  userName: string;
  message: string;
  timestamp: Date;
  avatar?: string;
}

interface EventChatProps {
  eventId: string;
  eventTitle: string;
  currentUserId: string;
  currentUserName: string;
}

// Mock initial messages for demonstration
const generateMockMessages = (eventId: string): ChatMessage[] => [
  {
    id: '1',
    userId: 'user1',
    userName: 'Sarah Johnson',
    message: 'Hey everyone! Looking forward to this event 🎉',
    timestamp: new Date(Date.now() - 3600000), // 1 hour ago
  },
  {
    id: '2',
    userId: 'user2',
    userName: 'Mike Chen',
    message: 'Same here! Should we meet at the entrance?',
    timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
  },
  {
    id: '3',
    userId: 'user3',
    userName: 'Emma Wilson',
    message: 'I can bring some snacks if anyone wants!',
    timestamp: new Date(Date.now() - 900000), // 15 minutes ago
  },
];

export default function EventChat({ eventId, eventTitle, currentUserId, currentUserName }: EventChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Load initial messages (mock implementation)
    setMessages(generateMockMessages(eventId));
    
    // In a real implementation, you would:
    // 1. Connect to Firebase Firestore
    // 2. Listen to real-time updates
    // 3. Handle user authentication
  }, [eventId]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    setIsLoading(true);
    
    const message: ChatMessage = {
      id: Date.now().toString(),
      userId: currentUserId,
      userName: currentUserName,
      message: newMessage.trim(),
      timestamp: new Date(),
    };

    // Add message to local state (mock implementation)
    setMessages(prev => [...prev, message]);
    setNewMessage('');
    setIsLoading(false);

    // In a real implementation, you would:
    // 1. Send message to Firebase Firestore
    // 2. Handle error states
    // 3. Send push notifications to other participants
  };

  const formatTimestamp = (timestamp: Date): string => {
    const now = new Date();
    const diffMs = now.getTime() - timestamp.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    
    return timestamp.toLocaleDateString();
  };

  const renderMessage = ({ item }: { item: ChatMessage }) => {
    const isCurrentUser = item.userId === currentUserId;
    
    return (
      <View style={[
        styles.messageContainer,
        isCurrentUser ? styles.currentUserMessage : styles.otherUserMessage
      ]}>
        {!isCurrentUser && (
          <Avatar.Text
            size={32}
            label={item.userName.split(' ').map(n => n[0]).join('')}
            style={styles.avatar}
          />
        )}
        <Card style={[
          styles.messageCard,
          isCurrentUser ? styles.currentUserCard : styles.otherUserCard
        ]}>
          <Card.Content style={styles.messageContent}>
            {!isCurrentUser && (
              <Text style={styles.userName}>{item.userName}</Text>
            )}
            <Text style={styles.messageText}>{item.message}</Text>
            <Text style={styles.timestamp}>{formatTimestamp(item.timestamp)}</Text>
          </Card.Content>
        </Card>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.header}>
        <Text style={styles.title}>{eventTitle} Chat</Text>
        <Text style={styles.subtitle}>{messages.length} messages</Text>
      </View>
      
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        style={styles.messagesList}
        contentContainerStyle={styles.messagesContainer}
        showsVerticalScrollIndicator={false}
      />
      
      <View style={styles.inputContainer}>
        <TextInput
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Type a message..."
          style={styles.textInput}
          multiline
          maxLength={500}
          right={
            <TextInput.Icon
              icon="send"
              onPress={sendMessage}
              disabled={isLoading || !newMessage.trim()}
            />
          }
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 16,
    backgroundColor: '#2196F3',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.8,
  },
  messagesList: {
    flex: 1,
  },
  messagesContainer: {
    padding: 16,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'flex-end',
  },
  currentUserMessage: {
    justifyContent: 'flex-end',
  },
  otherUserMessage: {
    justifyContent: 'flex-start',
  },
  avatar: {
    marginRight: 8,
    backgroundColor: '#2196F3',
  },
  messageCard: {
    maxWidth: '80%',
    elevation: 1,
  },
  currentUserCard: {
    backgroundColor: '#2196F3',
  },
  otherUserCard: {
    backgroundColor: '#fff',
  },
  messageContent: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  userName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 4,
  },
  messageText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  timestamp: {
    fontSize: 12,
    color: '#999',
    alignSelf: 'flex-end',
  },
  inputContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  textInput: {
    backgroundColor: '#f9f9f9',
  },
});