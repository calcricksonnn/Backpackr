import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Image, Alert } from 'react-native';
import { Text, Card, Title, Paragraph, Button, TextInput, FAB } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';

export default function PhotoBlogScreen() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: 'Amazing Sunset in Bali',
      content: 'Witnessed the most beautiful sunset today at Tanah Lot temple. The colors were absolutely breathtaking!',
      image: 'https://picsum.photos/400/300?random=1',
      location: { latitude: -8.6215, longitude: 115.0869, name: 'Tanah Lot, Bali' },
      author: 'TravelBuddy123',
      timestamp: new Date('2024-01-15'),
      likes: 24,
      comments: 5
    },
    {
      id: 2,
      title: 'Mountain Hiking Adventure',
      content: 'Completed a challenging hike to the summit. The view was worth every step! Perfect weather and amazing trail companions.',
      image: 'https://picsum.photos/400/300?random=2',
      location: { latitude: 46.5197, longitude: 7.4815, name: 'Swiss Alps' },
      author: 'MountainExplorer',
      timestamp: new Date('2024-01-10'),
      likes: 18,
      comments: 3
    }
  ]);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    image: null,
    location: null
  });

  useEffect(() => {
    requestPermissions();
  }, []);

  const requestPermissions = async () => {
    const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
    const { status: mediaStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    const { status: locationStatus } = await Location.requestForegroundPermissionsAsync();
    
    if (cameraStatus !== 'granted' || mediaStatus !== 'granted' || locationStatus !== 'granted') {
      Alert.alert('Permissions Required', 'This app needs camera and location permissions to work properly.');
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setNewPost(prev => ({ ...prev, image: result.assets[0].uri }));
      getCurrentLocation();
    }
  };

  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setNewPost(prev => ({ ...prev, image: result.assets[0].uri }));
      getCurrentLocation();
    }
  };

  const getCurrentLocation = async () => {
    try {
      const location = await Location.getCurrentPositionAsync({});
      const address = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      });
      
      const locationName = address[0] ? 
        `${address[0].city || address[0].region}, ${address[0].country}` : 
        'Unknown Location';

      setNewPost(prev => ({
        ...prev,
        location: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          name: locationName
        }
      }));
    } catch (error) {
      console.log('Error getting location:', error);
    }
  };

  const createPost = () => {
    if (!newPost.title.trim() || !newPost.content.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const post = {
      id: posts.length + 1,
      title: newPost.title,
      content: newPost.content,
      image: newPost.image,
      location: newPost.location,
      author: 'You',
      timestamp: new Date(),
      likes: 0,
      comments: 0
    };

    setPosts(prev => [post, ...prev]);
    setNewPost({ title: '', content: '', image: null, location: null });
    setShowCreatePost(false);
    Alert.alert('Success', 'Your travel story has been shared!');
  };

  const likePost = (postId) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + 1 }
        : post
    ));
  };

  const PostCard = ({ post }) => (
    <Card style={styles.postCard}>
      <Card.Content>
        <View style={styles.postHeader}>
          <View>
            <Title style={styles.postTitle}>{post.title}</Title>
            <Text style={styles.postAuthor}>by {post.author}</Text>
            <Text style={styles.postDate}>
              {post.timestamp.toLocaleDateString()}
            </Text>
          </View>
        </View>
        
        {post.image && (
          <Image source={{ uri: post.image }} style={styles.postImage} />
        )}
        
        <Paragraph style={styles.postContent}>{post.content}</Paragraph>
        
        {post.location && (
          <View style={styles.locationContainer}>
            <Ionicons name="location-outline" size={16} color="#666" />
            <Text style={styles.locationText}>{post.location.name}</Text>
          </View>
        )}
        
        <View style={styles.postActions}>
          <Button
            mode="text"
            icon="heart-outline"
            onPress={() => likePost(post.id)}
            style={styles.actionButton}
          >
            {post.likes}
          </Button>
          <Button
            mode="text"
            icon="comment-outline"
            style={styles.actionButton}
          >
            {post.comments}
          </Button>
          <Button
            mode="text"
            icon="share-outline"
            style={styles.actionButton}
          >
            Share
          </Button>
        </View>
      </Card.Content>
    </Card>
  );

  if (showCreatePost) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Title style={styles.headerTitle}>Create Travel Story</Title>
          <Button
            mode="text"
            onPress={() => setShowCreatePost(false)}
            textColor="white"
          >
            Cancel
          </Button>
        </View>
        
        <ScrollView style={styles.createPostContainer}>
          <TextInput
            label="Story Title"
            value={newPost.title}
            onChangeText={(text) => setNewPost(prev => ({ ...prev, title: text }))}
            style={styles.input}
          />
          
          <TextInput
            label="Tell your story..."
            value={newPost.content}
            onChangeText={(text) => setNewPost(prev => ({ ...prev, content: text }))}
            multiline
            numberOfLines={6}
            style={styles.input}
          />
          
          <View style={styles.imageSection}>
            <Text style={styles.sectionTitle}>Add Photos</Text>
            <View style={styles.imageButtons}>
              <Button
                mode="outlined"
                icon="camera"
                onPress={takePhoto}
                style={styles.imageButton}
              >
                Take Photo
              </Button>
              <Button
                mode="outlined"
                icon="image"
                onPress={pickImage}
                style={styles.imageButton}
              >
                From Gallery
              </Button>
            </View>
            
            {newPost.image && (
              <Image source={{ uri: newPost.image }} style={styles.previewImage} />
            )}
          </View>
          
          {newPost.location && (
            <View style={styles.locationPreview}>
              <Ionicons name="location" size={20} color="#4CAF50" />
              <Text style={styles.locationPreviewText}>{newPost.location.name}</Text>
            </View>
          )}
          
          <Button
            mode="contained"
            onPress={createPost}
            style={styles.publishButton}
            disabled={!newPost.title.trim() || !newPost.content.trim()}
          >
            Publish Story
          </Button>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Title style={styles.headerTitle}>Travel Stories</Title>
        <Paragraph style={styles.headerSubtitle}>Share your adventures</Paragraph>
      </View>
      
      <ScrollView style={styles.postsContainer} showsVerticalScrollIndicator={false}>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </ScrollView>
      
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => setShowCreatePost(true)}
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
    backgroundColor: '#FF9800',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  postsContainer: {
    flex: 1,
    padding: 16,
  },
  postCard: {
    marginBottom: 16,
    elevation: 2,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  postAuthor: {
    fontSize: 14,
    color: '#666',
  },
  postDate: {
    fontSize: 12,
    color: '#999',
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
  },
  postContent: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  locationText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#666',
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 8,
  },
  actionButton: {
    flex: 1,
  },
  createPostContainer: {
    flex: 1,
    padding: 16,
  },
  input: {
    marginBottom: 16,
    backgroundColor: 'white',
  },
  imageSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  imageButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  imageButton: {
    flex: 1,
    marginHorizontal: 8,
  },
  previewImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  locationPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  locationPreviewText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#333',
  },
  publishButton: {
    marginTop: 16,
    marginBottom: 32,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#FF9800',
  },
});