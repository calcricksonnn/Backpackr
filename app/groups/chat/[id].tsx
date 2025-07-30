import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  StyleSheet, 
  FlatList, 
  KeyboardAvoidingView, 
  Platform
} from 'react-native';
import { 
  Text, 
  TextInput, 
  Avatar,
  Divider
} from 'react-native-paper';
import { useLocalSearchParams } from 'expo-router';

interface Message {
  id: string;
  text: string;
  userId: string;
  userName: string;
  userAvatar: string;
  timestamp: Date;
  isCurrentUser: boolean;
}

// Mock messages data
const mockMessages: Message[] = [
  {
    id: '1',
    text: 'Hey everyone! Excited for our Tokyo trip!',
    userId: '1',
    userName: 'John Doe',
    userAvatar: 'JD',
    timestamp: new Date('2024-07-29T10:30:00'),
    isCurrentUser: true,
  },
  {
    id: '2',
    text: 'Me too! I\'ve been researching the best ramen places',
    userId: '2',
    userName: 'Jane Smith',
    userAvatar: 'JS',
    timestamp: new Date('2024-07-29T10:32:00'),
    isCurrentUser: false,
  },
  {
    id: '3',
    text: 'Don\'t forget we need to book the group tour for Senso-ji Temple',
    userId: '3',
    userName: 'Mike Johnson',
    userAvatar: 'MJ',
    timestamp: new Date('2024-07-29T10:35:00'),
    isCurrentUser: false,
  },
  {
    id: '4',
    text: 'I can handle the temple booking. What time works for everyone?',
    userId: '1',
    userName: 'John Doe',
    userAvatar: 'JD',
    timestamp: new Date('2024-07-29T10:37:00'),
    isCurrentUser: true,
  },
];

const mockGroupNames: { [key: string]: string } = {
  '1': 'Tokyo Adventure',
  '2': 'Backpacking Europe',
};

export default function GroupChatScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const groupName = mockGroupNames[id as string] || 'Group Chat';

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    if (messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      text: newMessage.trim(),
      userId: '1', // Current user ID
      userName: 'John Doe', // Current user name
      userAvatar: 'JD',
      timestamp: new Date(),
      isCurrentUser: true,
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');

    // TODO: Send message to Firebase/backend
    // simulateResponse();
  };

  // const simulateResponse = () => {
  //   // Simulate typing indicator
  //   setIsTyping(true);
  //   setTimeout(() => {
  //     setIsTyping(false);
  //     const response: Message = {
  //       id: Date.now().toString(),
  //       text: 'Sounds good! I\'ll check my calendar.',
  //       userId: '2',
  //       userName: 'Jane Smith',
  //       userAvatar: 'JS',
  //       timestamp: new Date(),
  //       isCurrentUser: false,
  //     };
  //     setMessages(prev => [...prev, response]);
  //   }, 2000);
  // };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  const renderMessage = ({ item, index }: { item: Message; index: number }) => {
    const previousMessage = index > 0 ? messages[index - 1] : null;
    const showDateSeparator = !previousMessage || 
      formatDate(item.timestamp) !== formatDate(previousMessage.timestamp);
    const showAvatar = !previousMessage || 
      previousMessage.userId !== item.userId ||
      showDateSeparator;

    return (
      <>
        {showDateSeparator && (
          <View style={styles.dateSeparator}>
            <Divider />
            <Text variant="bodySmall" style={styles.dateText}>
              {formatDate(item.timestamp)}
            </Text>
            <Divider />
          </View>
        )}
        <View style={[
          styles.messageContainer,
          item.isCurrentUser ? styles.ownMessage : styles.otherMessage
        ]}>
          {!item.isCurrentUser && showAvatar && (
            <Avatar.Text 
              size={32} 
              label={item.userAvatar} 
              style={styles.avatar}
            />
          )}
          {!item.isCurrentUser && !showAvatar && (
            <View style={styles.avatarPlaceholder} />
          )}
          <View style={[
            styles.messageBubble,
            item.isCurrentUser ? styles.ownBubble : styles.otherBubble
          ]}>
            {!item.isCurrentUser && showAvatar && (
              <Text variant="bodySmall" style={styles.userName}>
                {item.userName}
              </Text>
            )}
            <Text variant="bodyMedium" style={[
              styles.messageText,
              item.isCurrentUser ? styles.ownText : styles.otherText
            ]}>
              {item.text}
            </Text>
            <Text variant="bodySmall" style={[
              styles.timestamp,
              item.isCurrentUser ? styles.ownTimestamp : styles.otherTimestamp
            ]}>
              {formatTime(item.timestamp)}
            </Text>
          </View>
        </View>
      </>
    );
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        style={styles.messagesList}
        contentContainerStyle={styles.messagesContainer}
        showsVerticalScrollIndicator={false}
      />
      
      {isTyping && (
        <View style={styles.typingIndicator}>
          <Text variant="bodySmall" style={styles.typingText}>
            Someone is typing...
          </Text>
        </View>
      )}

      <View style={styles.inputContainer}>
        <TextInput
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder={`Message ${groupName}...`}
          style={styles.textInput}
          mode="outlined"
          multiline
          maxLength={500}
          right={
            <TextInput.Icon 
              icon="send" 
              onPress={sendMessage}
              disabled={!newMessage.trim()}
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
  messagesList: {
    flex: 1,
  },
  messagesContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  dateSeparator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  dateText: {
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 12,
    color: '#666',
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  ownMessage: {
    justifyContent: 'flex-end',
  },
  otherMessage: {
    justifyContent: 'flex-start',
  },
  avatar: {
    marginRight: 8,
    marginTop: 8,
  },
  avatarPlaceholder: {
    width: 40,
  },
  messageBubble: {
    maxWidth: '75%',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
  },
  ownBubble: {
    backgroundColor: '#6366f1',
    borderBottomRightRadius: 4,
  },
  otherBubble: {
    backgroundColor: 'white',
    borderBottomLeftRadius: 4,
  },
  userName: {
    fontWeight: '600',
    marginBottom: 2,
    color: '#333',
  },
  messageText: {
    marginBottom: 4,
  },
  ownText: {
    color: 'white',
  },
  otherText: {
    color: '#333',
  },
  timestamp: {
    fontSize: 11,
  },
  ownTimestamp: {
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'right',
  },
  otherTimestamp: {
    color: '#666',
  },
  typingIndicator: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  typingText: {
    fontStyle: 'italic',
    color: '#666',
  },
  inputContainer: {
    padding: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  textInput: {
    maxHeight: 100,
  },
});