import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Card, Title, Paragraph, Button, TextInput, SegmentedButtons, ProgressBar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { VictoryChart, VictoryBar, VictoryPie, VictoryArea, VictoryTheme } from 'victory-native';

export default function CarbonTrackerScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [newTrip, setNewTrip] = useState({
    distance: '',
    transport: 'flight',
    accommodation: 'hotel'
  });

  const carbonData = {
    month: {
      total: 2.8,
      breakdown: [
        { category: 'Flights', amount: 1.8, percentage: 64 },
        { category: 'Hotels', amount: 0.6, percentage: 21 },
        { category: 'Transport', amount: 0.3, percentage: 11 },
        { category: 'Food', amount: 0.1, percentage: 4 }
      ],
      history: [
        { month: 'Jan', emissions: 1.2 },
        { month: 'Feb', emissions: 0.8 },
        { month: 'Mar', emissions: 2.1 },
        { month: 'Apr', emissions: 1.5 },
        { month: 'May', emissions: 2.8 },
      ]
    },
    year: {
      total: 18.5,
      breakdown: [
        { category: 'Flights', amount: 12.2, percentage: 66 },
        { category: 'Hotels', amount: 3.8, percentage: 21 },
        { category: 'Transport', amount: 1.8, percentage: 10 },
        { category: 'Food', amount: 0.7, percentage: 4 }
      ]
    }
  };

  const currentData = carbonData[selectedPeriod];
  const averageEmissions = selectedPeriod === 'month' ? 3.2 : 22.0;
  const isAboveAverage = currentData.total > averageEmissions;

  const calculateTripEmissions = () => {
    const distance = parseFloat(newTrip.distance) || 0;
    let emissionFactor;
    
    switch (newTrip.transport) {
      case 'flight':
        emissionFactor = 0.255; // kg CO2 per km
        break;
      case 'car':
        emissionFactor = 0.12;
        break;
      case 'train':
        emissionFactor = 0.041;
        break;
      case 'bus':
        emissionFactor = 0.089;
        break;
      default:
        emissionFactor = 0.1;
    }
    
    const accommodationFactor = newTrip.accommodation === 'hotel' ? 1.2 : 0.8;
    return (distance * emissionFactor * accommodationFactor).toFixed(2);
  };

  const getEcoAlternatives = () => {
    const alternatives = [
      {
        title: 'Choose Train Over Flight',
        description: 'Trains emit 84% less CO2 than flights for medium distances',
        impact: '-1.2 kg CO2',
        icon: 'train-outline'
      },
      {
        title: 'Stay in Eco-Friendly Hotels',
        description: 'Green certified accommodations reduce emissions by 30%',
        impact: '-0.4 kg CO2',
        icon: 'leaf-outline'
      },
      {
        title: 'Use Public Transport',
        description: 'Local buses and metros are much more efficient than taxis',
        impact: '-0.2 kg CO2',
        icon: 'bus-outline'
      },
      {
        title: 'Offset Your Carbon',
        description: 'Support verified carbon offset projects',
        impact: 'Neutral',
        icon: 'planet-outline'
      }
    ];
    return alternatives;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Title style={styles.headerTitle}>Carbon Tracker</Title>
        <Paragraph style={styles.headerSubtitle}>Monitor your travel footprint</Paragraph>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Period Selection */}
        <Card style={styles.card}>
          <Card.Content>
            <SegmentedButtons
              value={selectedPeriod}
              onValueChange={setSelectedPeriod}
              buttons={[
                { value: 'month', label: 'This Month' },
                { value: 'year', label: 'This Year' }
              ]}
            />
          </Card.Content>
        </Card>

        {/* Total Emissions */}
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.totalEmissionsContainer}>
              <View style={styles.emissionsDisplay}>
                <Text style={styles.emissionsNumber}>{currentData.total}</Text>
                <Text style={styles.emissionsUnit}>tons CO₂</Text>
              </View>
              <View style={styles.comparisonContainer}>
                <Text style={[
                  styles.comparisonText,
                  { color: isAboveAverage ? '#F44336' : '#4CAF50' }
                ]}>
                  {isAboveAverage ? 'Above' : 'Below'} average
                </Text>
                <Text style={styles.averageText}>
                  Average: {averageEmissions} tons CO₂
                </Text>
                <ProgressBar
                  progress={currentData.total / (averageEmissions * 1.5)}
                  color={isAboveAverage ? '#F44336' : '#4CAF50'}
                  style={styles.progressBar}
                />
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Emissions Breakdown */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>Emissions Breakdown</Title>
            <View style={styles.breakdownContainer}>
              {currentData.breakdown.map((item, index) => (
                <View key={index} style={styles.breakdownItem}>
                  <View style={styles.breakdownInfo}>
                    <Text style={styles.breakdownCategory}>{item.category}</Text>
                    <Text style={styles.breakdownAmount}>{item.amount} tons CO₂</Text>
                  </View>
                  <Text style={styles.breakdownPercentage}>{item.percentage}%</Text>
                </View>
              ))}
            </View>
          </Card.Content>
        </Card>

        {/* Monthly History Chart */}
        {selectedPeriod === 'month' && (
          <Card style={styles.card}>
            <Card.Content>
              <Title style={styles.cardTitle}>Monthly Trend</Title>
              <VictoryChart
                theme={VictoryTheme.material}
                height={200}
                padding={{ left: 50, top: 20, right: 20, bottom: 50 }}
              >
                <VictoryArea
                  data={currentData.history}
                  x="month"
                  y="emissions"
                  style={{
                    data: { fill: "#4CAF50", fillOpacity: 0.3, stroke: "#4CAF50", strokeWidth: 2 }
                  }}
                />
              </VictoryChart>
            </Card.Content>
          </Card>
        )}

        {/* Trip Calculator */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>Trip Carbon Calculator</Title>
            <TextInput
              label="Distance (km)"
              value={newTrip.distance}
              onChangeText={(text) => setNewTrip(prev => ({ ...prev, distance: text }))}
              keyboardType="numeric"
              style={styles.input}
            />
            
            <SegmentedButtons
              value={newTrip.transport}
              onValueChange={(value) => setNewTrip(prev => ({ ...prev, transport: value }))}
              buttons={[
                { value: 'flight', label: 'Flight' },
                { value: 'car', label: 'Car' },
                { value: 'train', label: 'Train' },
                { value: 'bus', label: 'Bus' }
              ]}
              style={styles.segmentedButton}
            />

            <SegmentedButtons
              value={newTrip.accommodation}
              onValueChange={(value) => setNewTrip(prev => ({ ...prev, accommodation: value }))}
              buttons={[
                { value: 'hotel', label: 'Hotel' },
                { value: 'hostel', label: 'Hostel/Eco' }
              ]}
              style={styles.segmentedButton}
            />

            {newTrip.distance && (
              <View style={styles.calculatorResult}>
                <Text style={styles.calculatorLabel}>Estimated Emissions:</Text>
                <Text style={styles.calculatorValue}>
                  {calculateTripEmissions()} kg CO₂
                </Text>
              </View>
            )}
          </Card.Content>
        </Card>

        {/* Eco-Friendly Alternatives */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>Eco-Friendly Tips</Title>
            {getEcoAlternatives().map((alternative, index) => (
              <View key={index} style={styles.alternativeItem}>
                <Ionicons name={alternative.icon} size={24} color="#4CAF50" />
                <View style={styles.alternativeContent}>
                  <Text style={styles.alternativeTitle}>{alternative.title}</Text>
                  <Text style={styles.alternativeDescription}>{alternative.description}</Text>
                  <Text style={styles.alternativeImpact}>Impact: {alternative.impact}</Text>
                </View>
              </View>
            ))}
          </Card.Content>
        </Card>

        {/* Offset Button */}
        <Button
          mode="contained"
          icon="leaf"
          onPress={() => {}}
          style={styles.offsetButton}
          buttonColor="#4CAF50"
        >
          Offset My Carbon Footprint
        </Button>
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
  content: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginBottom: 16,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    marginBottom: 12,
  },
  totalEmissionsContainer: {
    alignItems: 'center',
  },
  emissionsDisplay: {
    alignItems: 'center',
    marginBottom: 16,
  },
  emissionsNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  emissionsUnit: {
    fontSize: 16,
    color: '#666',
  },
  comparisonContainer: {
    alignItems: 'center',
    width: '100%',
  },
  comparisonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  averageText: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  progressBar: {
    width: '100%',
    marginTop: 8,
  },
  breakdownContainer: {
    marginTop: 8,
  },
  breakdownItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  breakdownInfo: {
    flex: 1,
  },
  breakdownCategory: {
    fontSize: 16,
    fontWeight: '500',
  },
  breakdownAmount: {
    fontSize: 14,
    color: '#666',
  },
  breakdownPercentage: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  input: {
    marginBottom: 12,
    backgroundColor: 'white',
  },
  segmentedButton: {
    marginBottom: 12,
  },
  calculatorResult: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#E8F5E8',
    borderRadius: 8,
    alignItems: 'center',
  },
  calculatorLabel: {
    fontSize: 14,
    color: '#666',
  },
  calculatorValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginTop: 4,
  },
  alternativeItem: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  alternativeContent: {
    flex: 1,
    marginLeft: 12,
  },
  alternativeTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  alternativeDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  alternativeImpact: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '500',
  },
  offsetButton: {
    marginVertical: 16,
  },
});