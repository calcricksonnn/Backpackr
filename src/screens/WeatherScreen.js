import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Card, Title, Paragraph, Button, Chip } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function WeatherScreen() {
  const [currentWeather, setCurrentWeather] = useState({
    location: 'Paris, France',
    temperature: 22,
    condition: 'Partly Cloudy',
    humidity: 65,
    windSpeed: 12,
    icon: 'partly-sunny'
  });

  const forecast = [
    { day: 'Today', high: 24, low: 18, condition: 'Partly Cloudy', icon: 'partly-sunny' },
    { day: 'Tomorrow', high: 26, low: 19, condition: 'Sunny', icon: 'sunny' },
    { day: 'Wednesday', high: 21, low: 15, condition: 'Rainy', icon: 'rainy' },
    { day: 'Thursday', high: 23, low: 17, condition: 'Cloudy', icon: 'cloudy' },
    { day: 'Friday', high: 25, low: 20, condition: 'Sunny', icon: 'sunny' }
  ];

  const alerts = [
    {
      id: 1,
      type: 'warning',
      title: 'Rain Expected',
      message: 'Heavy rain expected Wednesday afternoon. Consider indoor activities.',
      icon: 'warning-outline',
      color: '#FF9800'
    }
  ];

  const ForecastCard = ({ item }) => (
    <Card style={styles.forecastCard}>
      <Card.Content style={styles.forecastContent}>
        <Text style={styles.forecastDay}>{item.day}</Text>
        <Ionicons name={item.icon} size={32} color="#2196F3" />
        <View style={styles.forecastTemp}>
          <Text style={styles.highTemp}>{item.high}°</Text>
          <Text style={styles.lowTemp}>{item.low}°</Text>
        </View>
        <Text style={styles.forecastCondition}>{item.condition}</Text>
      </Card.Content>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Title style={styles.headerTitle}>Weather</Title>
        <Paragraph style={styles.headerSubtitle}>Stay updated with conditions</Paragraph>
      </View>

      <ScrollView style={styles.content}>
        {/* Current Weather */}
        <Card style={styles.currentWeatherCard}>
          <Card.Content>
            <View style={styles.currentWeatherContent}>
              <View style={styles.weatherMain}>
                <Text style={styles.temperature}>{currentWeather.temperature}°C</Text>
                <Text style={styles.condition}>{currentWeather.condition}</Text>
                <Text style={styles.location}>{currentWeather.location}</Text>
              </View>
              <Ionicons name={currentWeather.icon} size={80} color="#2196F3" />
            </View>
            
            <View style={styles.weatherDetails}>
              <View style={styles.detailItem}>
                <Ionicons name="water-outline" size={20} color="#2196F3" />
                <Text style={styles.detailText}>Humidity: {currentWeather.humidity}%</Text>
              </View>
              <View style={styles.detailItem}>
                <Ionicons name="speedometer-outline" size={20} color="#2196F3" />
                <Text style={styles.detailText}>Wind: {currentWeather.windSpeed} km/h</Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Weather Alerts */}
        {alerts.map((alert) => (
          <Card key={alert.id} style={[styles.alertCard, { borderLeftColor: alert.color }]}>
            <Card.Content style={styles.alertContent}>
              <Ionicons name={alert.icon} size={24} color={alert.color} />
              <View style={styles.alertText}>
                <Title style={[styles.alertTitle, { color: alert.color }]}>{alert.title}</Title>
                <Paragraph style={styles.alertMessage}>{alert.message}</Paragraph>
              </View>
            </Card.Content>
          </Card>
        ))}

        {/* 5-Day Forecaset */}
        <Text style={styles.sectionTitle}>5-Day Forecast</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.forecastScroll}>
          {forecast.map((item, index) => (
            <ForecastCard key={index} item={item} />
          ))}
        </ScrollView>

        {/* Travel Recommendations */}
        <Text style={styles.sectionTitle}>Travel Recommendations</Text>
        <Card style={styles.recommendationCard}>
          <Card.Content>
            <Title style={styles.recommendationTitle}>Weather-Based Suggestions</Title>
            <View style={styles.recommendation}>
              <Ionicons name="umbrella" size={20} color="#2196F3" />
              <Text style={styles.recommendationText}>Pack an umbrella for Wednesday</Text>
            </View>
            <View style={styles.recommendation}>
              <Ionicons name="sunny" size={20} color="#FF9800" />
              <Text style={styles.recommendationText}>Perfect weather for outdoor activities tomorrow</Text>
            </View>
            <View style={styles.recommendation}>
              <Ionicons name="shirt" size={20} color="#4CAF50" />
              <Text style={styles.recommendationText}>Light layers recommended for temperature changes</Text>
            </View>
          </Card.Content>
        </Card>
      </ScrollView>
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
    backgroundColor: '#03A9F4',
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
  currentWeatherCard: {
    marginBottom: 16,
    elevation: 4,
  },
  currentWeatherContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  weatherMain: {
    flex: 1,
  },
  temperature: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  condition: {
    fontSize: 18,
    color: '#666',
    marginTop: 4,
  },
  location: {
    fontSize: 14,
    color: '#999',
    marginTop: 2,
  },
  weatherDetails: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
  },
  alertCard: {
    marginBottom: 12,
    elevation: 2,
    borderLeftWidth: 4,
  },
  alertContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  alertText: {
    marginLeft: 12,
    flex: 1,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  alertMessage: {
    fontSize: 14,
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 16,
  },
  forecastScroll: {
    marginBottom: 16,
  },
  forecastCard: {
    width: 120,
    marginRight: 12,
    elevation: 2,
  },
  forecastContent: {
    alignItems: 'center',
    padding: 12,
  },
  forecastDay: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  forecastTemp: {
    alignItems: 'center',
    marginVertical: 8,
  },
  highTemp: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  lowTemp: {
    fontSize: 14,
    color: '#666',
  },
  forecastCondition: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  recommendationCard: {
    elevation: 2,
  },
  recommendationTitle: {
    fontSize: 16,
    marginBottom: 12,
  },
  recommendation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  recommendationText: {
    marginLeft: 12,
    fontSize: 14,
    color: '#666',
  },
});