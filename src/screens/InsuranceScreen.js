import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Card, Title, Paragraph, Button, Chip } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function InsuranceScreen() {
  const [selectedCoverage, setSelectedCoverage] = useState('basic');

  const insurancePlans = [
    {
      id: 1,
      name: 'Basic Travel Protection',
      price: '€25/week',
      coverage: ['Medical emergencies up to €50k', 'Trip cancellation', 'Lost baggage up to €1k'],
      type: 'basic',
      popular: false
    },
    {
      id: 2,
      name: 'Comprehensive Coverage',
      price: '€45/week',
      coverage: ['Medical emergencies up to €150k', 'Trip cancellation & interruption', 'Lost baggage up to €3k', 'Adventure sports coverage'],
      type: 'comprehensive',
      popular: true
    },
    {
      id: 3,
      name: 'Premium Protection',
      price: '€75/week',
      coverage: ['Medical emergencies up to €500k', 'Trip cancellation & interruption', 'Lost baggage up to €5k', 'Adventure sports coverage', '24/7 concierge service'],
      type: 'premium',
      popular: false
    }
  ];

  const activePolicy = {
    provider: 'TravelGuard Pro',
    plan: 'Comprehensive Coverage',
    policyNumber: 'TG-2024-789456',
    validUntil: '2024-02-15',
    emergencyPhone: '+1-800-HELP-NOW'
  };

  const PlanCard = ({ plan }) => (
    <Card style={[styles.planCard, plan.popular && styles.popularPlan]}>
      <Card.Content>
        {plan.popular && (
          <Chip style={styles.popularChip} textStyle={{ color: 'white' }}>
            Most Popular
          </Chip>
        )}
        <Title style={styles.planName}>{plan.name}</Title>
        <Text style={styles.planPrice}>{plan.price}</Text>
        
        <View style={styles.coverageList}>
          {plan.coverage.map((item, index) => (
            <View key={index} style={styles.coverageItem}>
              <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
              <Text style={styles.coverageText}>{item}</Text>
            </View>
          ))}
        </View>
        
        <Button 
          mode={plan.type === selectedCoverage ? 'contained' : 'outlined'}
          onPress={() => setSelectedCoverage(plan.type)}
          style={styles.selectButton}
        >
          {plan.type === selectedCoverage ? 'Selected' : 'Select Plan'}
        </Button>
      </Card.Content>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Title style={styles.headerTitle}>Travel Insurance</Title>
        <Paragraph style={styles.headerSubtitle}>Protect your journey</Paragraph>
      </View>

      <ScrollView style={styles.content}>
        {/* Active Policy */}
        <Text style={styles.sectionTitle}>Current Policy</Text>
        <Card style={styles.activePolicyCard}>
          <Card.Content>
            <View style={styles.policyHeader}>
              <Ionicons name="shield-checkmark" size={24} color="#4CAF50" />
              <View style={styles.policyInfo}>
                <Title style={styles.policyTitle}>{activePolicy.plan}</Title>
                <Text style={styles.policyProvider}>{activePolicy.provider}</Text>
              </View>
            </View>
            
            <View style={styles.policyDetails}>
              <Text style={styles.policyNumber}>Policy: {activePolicy.policyNumber}</Text>
              <Text style={styles.policyValid}>Valid until: {activePolicy.validUntil}</Text>
              <Text style={styles.emergencyPhone}>Emergency: {activePolicy.emergencyPhone}</Text>
            </View>
            
            <View style={styles.policyActions}>
              <Button mode="outlined" icon="document-text" compact>View Policy</Button>
              <Button mode="contained" icon="call" compact>Emergency Call</Button>
            </View>
          </Card.Content>
        </Card>

        {/* Available Plans */}
        <Text style={styles.sectionTitle}>Upgrade or Change Plan</Text>
        {insurancePlans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} />
        ))}

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <Card style={styles.actionsCard}>
          <Card.Content>
            <View style={styles.actionsList}>
              <Button 
                mode="outlined" 
                icon="file-document-outline"
                style={styles.actionButton}
                onPress={() => {}}
              >
                File Claim
              </Button>
              <Button 
                mode="outlined" 
                icon="medical"
                style={styles.actionButton}
                onPress={() => {}}
              >
                Find Medical Care
              </Button>
              <Button 
                mode="outlined" 
                icon="phone"
                style={styles.actionButton}
                onPress={() => {}}
              >
                24/7 Support
              </Button>
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
    backgroundColor: '#2196F3',
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    marginTop: 8,
  },
  activePolicyCard: {
    marginBottom: 16,
    elevation: 2,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  policyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  policyInfo: {
    marginLeft: 12,
    flex: 1,
  },
  policyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4CAF50',
  },
  policyProvider: {
    fontSize: 14,
    color: '#666',
  },
  policyDetails: {
    marginBottom: 12,
  },
  policyNumber: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  policyValid: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  emergencyPhone: {
    fontSize: 12,
    color: '#F44336',
    fontWeight: '600',
  },
  policyActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  planCard: {
    marginBottom: 16,
    elevation: 2,
  },
  popularPlan: {
    borderWidth: 2,
    borderColor: '#FF9800',
  },
  popularChip: {
    backgroundColor: '#FF9800',
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  planName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  planPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 12,
  },
  coverageList: {
    marginBottom: 16,
  },
  coverageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  coverageText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
  },
  selectButton: {
    marginTop: 8,
  },
  actionsCard: {
    elevation: 2,
  },
  actionsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionButton: {
    width: '48%',
    marginBottom: 8,
  },
});