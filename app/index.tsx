import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Button, Card, Title, Paragraph, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withSequence,
  withDelay
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

export default function Home() {
  const theme = useTheme();
  
  // Animation values
  const logoScale = useSharedValue(0);
  const cardOpacity = useSharedValue(0);
  const cardTranslateY = useSharedValue(50);
  const buttonScale = useSharedValue(0);

  useEffect(() => {
    // Animate logo entrance
    logoScale.value = withSequence(
      withTiming(1.2, { duration: 600 }),
      withTiming(1, { duration: 200 })
    );

    // Animate card entrance
    cardOpacity.value = withDelay(300, withTiming(1, { duration: 800 }));
    cardTranslateY.value = withDelay(300, withTiming(0, { duration: 800 }));

    // Animate button entrance
    buttonScale.value = withDelay(600, withTiming(1, { duration: 400 }));
  }, []);

  const logoAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: logoScale.value }],
  }));

  const cardAnimatedStyle = useAnimatedStyle(() => ({
    opacity: cardOpacity.value,
    transform: [{ translateY: cardTranslateY.value }],
  }));

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }));

  const handleGetStarted = () => {
    router.push('/onboarding');
  };

  const handleExplore = () => {
    router.push('/(tabs)');
  };

  return (
    <LinearGradient
      colors={[theme.colors.primary, theme.colors.secondary]}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          {/* Logo/Title Section */}
          <Animated.View style={[styles.logoContainer, logoAnimatedStyle]}>
            <Title style={styles.logo}>🎒 Backpackr</Title>
            <Paragraph style={styles.subtitle}>
              Your Adventure Companion
            </Paragraph>
          </Animated.View>

          {/* Main Card */}
          <Animated.View style={[styles.cardContainer, cardAnimatedStyle]}>
            <Card style={styles.card} elevation={4}>
              <Card.Content style={styles.cardContent}>
                <Title style={styles.cardTitle}>Welcome to Your Journey</Title>
                <Paragraph style={styles.cardDescription}>
                  Discover amazing destinations, connect with fellow travelers, 
                  and make unforgettable memories on your backpacking adventures.
                </Paragraph>
                
                <View style={styles.featureList}>
                  <View style={styles.feature}>
                    <Title style={styles.featureIcon}>🗺️</Title>
                    <Paragraph style={styles.featureText}>Explore Destinations</Paragraph>
                  </View>
                  <View style={styles.feature}>
                    <Title style={styles.featureIcon}>👥</Title>
                    <Paragraph style={styles.featureText}>Connect with Travelers</Paragraph>
                  </View>
                  <View style={styles.feature}>
                    <Title style={styles.featureIcon}>📱</Title>
                    <Paragraph style={styles.featureText}>Track Your Adventures</Paragraph>
                  </View>
                </View>
              </Card.Content>
            </Card>
          </Animated.View>

          {/* Action Buttons */}
          <Animated.View style={[styles.buttonContainer, buttonAnimatedStyle]}>
            <Button
              mode="contained"
              onPress={handleGetStarted}
              style={[styles.button, styles.primaryButton]}
              contentStyle={styles.buttonContent}
              labelStyle={styles.buttonLabel}
            >
              Get Started
            </Button>
            <Button
              mode="outlined"
              onPress={handleExplore}
              style={[styles.button, styles.secondaryButton]}
              contentStyle={styles.buttonContent}
              labelStyle={[styles.buttonLabel, { color: theme.colors.surface }]}
            >
              Explore Now
            </Button>
          </Animated.View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: height * 0.1,
  },
  logo: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 18,
    color: '#FFFFFF',
    opacity: 0.9,
    marginTop: 8,
    textAlign: 'center',
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    marginVertical: 40,
  },
  card: {
    margin: 16,
    borderRadius: 20,
  },
  cardContent: {
    padding: 24,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  cardDescription: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  featureList: {
    gap: 16,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  featureIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  featureText: {
    fontSize: 16,
    flex: 1,
  },
  buttonContainer: {
    gap: 12,
    marginBottom: 20,
  },
  button: {
    borderRadius: 25,
  },
  primaryButton: {
    backgroundColor: '#FFFFFF',
  },
  secondaryButton: {
    borderColor: '#FFFFFF',
    borderWidth: 2,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});