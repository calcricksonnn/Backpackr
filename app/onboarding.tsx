import React, { useState, useRef } from 'react';
import { View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Button, Card, Title, Paragraph, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming,
  withDelay,
  interpolate,
  Extrapolate
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

const onboardingData = [
  {
    id: 1,
    title: "Discover Amazing Destinations",
    description: "Explore hidden gems and popular backpacking spots around the world with our comprehensive destination guides.",
    icon: "🗺️",
    color: "#2E7D32"
  },
  {
    id: 2,
    title: "Connect with Fellow Travelers",
    description: "Meet like-minded adventurers, share experiences, and find travel companions for your next journey.",
    icon: "👥",
    color: "#FF6F00"
  },
  {
    id: 3,
    title: "Track Your Adventures",
    description: "Keep a digital journal of your travels, save memories, and plan your future backpacking adventures.",
    icon: "📱",
    color: "#1976D2"
  }
];

export default function Onboarding() {
  const theme = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const translateX = useSharedValue(0);

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      scrollViewRef.current?.scrollTo({
        x: nextIndex * width,
        animated: true,
      });
      translateX.value = withTiming(-nextIndex * width);
    } else {
      router.replace('/(tabs)');
    }
  };

  const handleSkip = () => {
    router.replace('/(tabs)');
  };

  const handleScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / width);
    setCurrentIndex(index);
    translateX.value = -contentOffsetX;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.skipContainer}>
        <Button
          mode="text"
          onPress={handleSkip}
          labelStyle={styles.skipButton}
        >
          Skip
        </Button>
      </View>

      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={styles.scrollView}
      >
        {onboardingData.map((item, index) => (
          <OnboardingSlide key={item.id} item={item} index={index} />
        ))}
      </ScrollView>

      {/* Page Indicators */}
      <View style={styles.indicatorContainer}>
        {onboardingData.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              {
                backgroundColor: currentIndex === index ? theme.colors.primary : theme.colors.outline,
                width: currentIndex === index ? 20 : 8,
              }
            ]}
          />
        ))}
      </View>

      {/* Next Button */}
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={handleNext}
          style={styles.nextButton}
          contentStyle={styles.buttonContent}
          labelStyle={styles.buttonLabel}
        >
          {currentIndex === onboardingData.length - 1 ? 'Get Started' : 'Next'}
        </Button>
      </View>
    </SafeAreaView>
  );
}

const OnboardingSlide = ({ item, index }: { item: any; index: number }) => {
  const theme = useTheme();
  
  const slideAnimatedStyle = useAnimatedStyle(() => {
    const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
    
    const scale = interpolate(
      -index * width, // Use a simple calculation instead of translateX.value
      inputRange,
      [0.8, 1, 0.8],
      Extrapolate.CLAMP
    );
    
    const opacity = interpolate(
      -index * width, // Use a simple calculation instead of translateX.value
      inputRange,
      [0.5, 1, 0.5],
      Extrapolate.CLAMP
    );

    return {
      transform: [{ scale }],
      opacity,
    };
  });

  return (
    <View style={styles.slide}>
      <LinearGradient
        colors={[item.color + '20', item.color + '05']}
        style={styles.slideGradient}
      >
        <Animated.View style={[styles.slideContent, slideAnimatedStyle]}>
          <View style={styles.iconContainer}>
            <Title style={[styles.icon, { color: item.color }]}>
              {item.icon}
            </Title>
          </View>
          
          <Card style={styles.contentCard} elevation={4}>
            <Card.Content style={styles.cardContent}>
              <Title style={[styles.title, { color: item.color }]}>
                {item.title}
              </Title>
              <Paragraph style={styles.description}>
                {item.description}
              </Paragraph>
            </Card.Content>
          </Card>
        </Animated.View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  skipContainer: {
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  skipButton: {
    fontSize: 16,
    color: '#666',
  },
  scrollView: {
    flex: 1,
  },
  slide: {
    width,
    flex: 1,
  },
  slideGradient: {
    flex: 1,
    padding: 20,
  },
  slideContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 40,
    alignItems: 'center',
  },
  icon: {
    fontSize: 100,
    textAlign: 'center',
  },
  contentCard: {
    width: '100%',
    borderRadius: 20,
  },
  cardContent: {
    padding: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    color: '#666',
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    gap: 8,
  },
  indicator: {
    height: 8,
    borderRadius: 4,
  },
  buttonContainer: {
    paddingHorizontal: 40,
    paddingBottom: 30,
  },
  nextButton: {
    borderRadius: 25,
  },
  buttonContent: {
    paddingVertical: 12,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});