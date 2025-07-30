import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Alert, Linking } from 'react-native';
import { Text, Card, Title, Paragraph, Button, TextInput, FAB, Divider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';

export default function EmergencyScreen() {
  const [emergencyContacts, setEmergencyContacts] = useState([
    {
      id: 1,
      name: 'Mom',
      phone: '+1-555-0123',
      relationship: 'Mother',
      priority: 1
    },
    {
      id: 2,
      name: 'Emergency Insurance',
      phone: '+1-800-HELP-NOW',
      relationship: 'Travel Insurance',
      priority: 2
    }
  ]);

  const [showAddContact, setShowAddContact] = useState(false);
  const [newContact, setNewContact] = useState({
    name: '',
    phone: '',
    relationship: ''
  });

  const [currentLocation, setCurrentLocation] = useState(null);

  // Emergency numbers by country/region
  const emergencyNumbers = {
    'United States': { police: '911', medical: '911', fire: '911' },
    'United Kingdom': { police: '999', medical: '999', fire: '999' },
    'European Union': { police: '112', medical: '112', fire: '112' },
    'Australia': { police: '000', medical: '000', fire: '000' },
    'Canada': { police: '911', medical: '911', fire: '911' },
    'Japan': { police: '110', medical: '119', fire: '119' },
    'India': { police: '100', medical: '108', fire: '101' },
    'China': { police: '110', medical: '120', fire: '119' },
    'Brazil': { police: '190', medical: '192', fire: '193' },
    'International': { police: '112', medical: '112', fire: '112' }
  };

  const medicalInfo = {
    bloodType: 'O+',
    allergies: ['Peanuts', 'Shellfish'],
    medications: ['Inhaler for Asthma'],
    medicalConditions: ['Asthma'],
    emergencyMedicalContact: 'Dr. Smith - +1-555-0199'
  };

  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Location permission is required for emergency services');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const address = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      });

      setCurrentLocation({
        coords: location.coords,
        address: address[0]
      });

      return { coords: location.coords, address: address[0] };
    } catch (error) {
      console.log('Error getting location:', error);
      Alert.alert('Error', 'Could not get current location');
    }
  };

  const makeEmergencyCall = (number) => {
    Alert.alert(
      'Emergency Call',
      `Are you sure you want to call ${number}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Call',
          style: 'destructive',
          onPress: () => {
            Linking.openURL(`tel:${number}`);
          }
        }
      ]
    );
  };

  const sendLocationSMS = async (contact) => {
    const location = await getCurrentLocation();
    if (!location) return;

    const message = `EMERGENCY: I need help! My location is: ${location.coords.latitude}, ${location.coords.longitude}. Address: ${location.address?.name || 'Unknown'}, ${location.address?.city || ''}, ${location.address?.country || ''}`;
    
    const smsUrl = `sms:${contact.phone}?body=${encodeURIComponent(message)}`;
    
    Alert.alert(
      'Send Emergency Location',
      `Send your location to ${contact.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Send',
          onPress: () => {
            Linking.openURL(smsUrl);
          }
        }
      ]
    );
  };

  const addEmergencyContact = () => {
    if (!newContact.name.trim() || !newContact.phone.trim()) {
      Alert.alert('Error', 'Please fill in name and phone number');
      return;
    }

    const contact = {
      id: emergencyContacts.length + 1,
      name: newContact.name,
      phone: newContact.phone,
      relationship: newContact.relationship || 'Emergency Contact',
      priority: emergencyContacts.length + 1
    };

    setEmergencyContacts(prev => [...prev, contact]);
    setNewContact({ name: '', phone: '', relationship: '' });
    setShowAddContact(false);
  };

  const EmergencyButton = ({ title, icon, color, onPress, subtitle }) => (
    <Card style={[styles.emergencyCard, { borderLeftColor: color }]}>
      <Card.Content style={styles.emergencyCardContent}>
        <View style={styles.emergencyInfo}>
          <Ionicons name={icon} size={32} color={color} />
          <View style={styles.emergencyText}>
            <Title style={[styles.emergencyTitle, { color }]}>{title}</Title>
            {subtitle && <Text style={styles.emergencySubtitle}>{subtitle}</Text>}
          </View>
        </View>
        <Button
          mode="contained"
          onPress={onPress}
          buttonColor={color}
          style={styles.emergencyButton}
        >
          Call
        </Button>
      </Card.Content>
    </Card>
  );

  const ContactCard = ({ contact }) => (
    <Card style={styles.contactCard}>
      <Card.Content>
        <View style={styles.contactHeader}>
          <View style={styles.contactInfo}>
            <Title style={styles.contactName}>{contact.name}</Title>
            <Text style={styles.contactRelationship}>{contact.relationship}</Text>
            <Text style={styles.contactPhone}>{contact.phone}</Text>
          </View>
          <View style={styles.contactActions}>
            <Button
              mode="outlined"
              icon="call"
              onPress={() => makeEmergencyCall(contact.phone)}
              style={styles.contactButton}
              compact
            >
              Call
            </Button>
            <Button
              mode="outlined"
              icon="message"
              onPress={() => sendLocationSMS(contact)}
              style={styles.contactButton}
              compact
            >
              SOS
            </Button>
          </View>
        </View>
      </Card.Content>
    </Card>
  );

  if (showAddContact) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Title style={styles.headerTitle}>Add Emergency Contact</Title>
          <Button
            mode="text"
            onPress={() => setShowAddContact(false)}
            textColor="white"
          >
            Cancel
          </Button>
        </View>
        
        <ScrollView style={styles.addContactContainer}>
          <TextInput
            label="Name *"
            value={newContact.name}
            onChangeText={(text) => setNewContact(prev => ({ ...prev, name: text }))}
            style={styles.input}
          />
          
          <TextInput
            label="Phone Number *"
            value={newContact.phone}
            onChangeText={(text) => setNewContact(prev => ({ ...prev, phone: text }))}
            keyboardType="phone-pad"
            style={styles.input}
          />
          
          <TextInput
            label="Relationship"
            value={newContact.relationship}
            onChangeText={(text) => setNewContact(prev => ({ ...prev, relationship: text }))}
            style={styles.input}
            placeholder="e.g., Mother, Friend, Doctor"
          />
          
          <Button
            mode="contained"
            onPress={addEmergencyContact}
            style={styles.addButton}
            disabled={!newContact.name.trim() || !newContact.phone.trim()}
          >
            Add Contact
          </Button>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Title style={styles.headerTitle}>Emergency</Title>
        <Paragraph style={styles.headerSubtitle}>Get help when you need it</Paragraph>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Quick Emergency Numbers */}
        <Text style={styles.sectionTitle}>Local Emergency Services</Text>
        <EmergencyButton
          title="Police"
          subtitle="Emergency Law Enforcement"
          icon="shield-outline"
          color="#2196F3"
          onPress={() => makeEmergencyCall('112')}
        />
        
        <EmergencyButton
          title="Medical Emergency"
          subtitle="Ambulance & Medical Help"
          icon="medical-outline"
          color="#F44336"
          onPress={() => makeEmergencyCall('112')}
        />
        
        <EmergencyButton
          title="Fire Department"
          subtitle="Fire & Rescue Services"
          icon="flame-outline"
          color="#FF9800"
          onPress={() => makeEmergencyCall('112')}
        />

        <Divider style={styles.divider} />

        {/* Emergency Contacts */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Emergency Contacts</Text>
          <Button
            mode="outlined"
            icon="plus"
            onPress={() => setShowAddContact(true)}
            compact
          >
            Add
          </Button>
        </View>

        {emergencyContacts.map((contact) => (
          <ContactCard key={contact.id} contact={contact} />
        ))}

        <Divider style={styles.divider} />

        {/* Medical Information */}
        <Text style={styles.sectionTitle}>Medical Information</Text>
        <Card style={styles.medicalCard}>
          <Card.Content>
            <View style={styles.medicalInfo}>
              <Text style={styles.medicalLabel}>Blood Type:</Text>
              <Text style={styles.medicalValue}>{medicalInfo.bloodType}</Text>
            </View>
            
            <View style={styles.medicalInfo}>
              <Text style={styles.medicalLabel}>Allergies:</Text>
              <Text style={styles.medicalValue}>{medicalInfo.allergies.join(', ')}</Text>
            </View>
            
            <View style={styles.medicalInfo}>
              <Text style={styles.medicalLabel}>Medications:</Text>
              <Text style={styles.medicalValue}>{medicalInfo.medications.join(', ')}</Text>
            </View>
            
            <View style={styles.medicalInfo}>
              <Text style={styles.medicalLabel}>Conditions:</Text>
              <Text style={styles.medicalValue}>{medicalInfo.medicalConditions.join(', ')}</Text>
            </View>
            
            <View style={styles.medicalInfo}>
              <Text style={styles.medicalLabel}>Emergency Doctor:</Text>
              <Text style={styles.medicalValue}>{medicalInfo.emergencyMedicalContact}</Text>
            </View>
          </Card.Content>
        </Card>

        {/* Location sharing */}
        <Button
          mode="contained"
          icon="location"
          onPress={getCurrentLocation}
          style={styles.locationButton}
          buttonColor="#4CAF50"
        >
          Share Current Location
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
    backgroundColor: '#F44336',
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 8,
  },
  emergencyCard: {
    marginBottom: 12,
    elevation: 2,
    borderLeftWidth: 4,
  },
  emergencyCardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  emergencyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  emergencyText: {
    marginLeft: 16,
    flex: 1,
  },
  emergencyTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  emergencySubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  emergencyButton: {
    minWidth: 80,
  },
  contactCard: {
    marginBottom: 12,
    elevation: 2,
  },
  contactHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 18,
    fontWeight: '600',
  },
  contactRelationship: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  contactPhone: {
    fontSize: 14,
    color: '#2196F3',
    marginTop: 2,
  },
  contactActions: {
    flexDirection: 'row',
    gap: 8,
  },
  contactButton: {
    minWidth: 70,
  },
  divider: {
    marginVertical: 16,
  },
  medicalCard: {
    marginBottom: 16,
    elevation: 2,
  },
  medicalInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  medicalLabel: {
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
  },
  medicalValue: {
    fontSize: 14,
    color: '#666',
    flex: 2,
  },
  locationButton: {
    marginVertical: 16,
  },
  addContactContainer: {
    flex: 1,
    padding: 16,
  },
  input: {
    marginBottom: 16,
    backgroundColor: 'white',
  },
  addButton: {
    marginTop: 16,
  },
});