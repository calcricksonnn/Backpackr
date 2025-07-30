import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import { 
  Card, 
  Title, 
  Paragraph, 
  Button, 
  List,
  Chip,
  FAB,
  Dialog,
  Portal,
  TextInput
} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface SafetyTip {
  id: string;
  location: string;
  category: 'health' | 'crime' | 'transport' | 'general';
  tip: string;
}

interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  email: string;
}

export default function SafetyScreen() {
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>([
    { id: '1', name: 'John Doe', phone: '+1-555-0123', email: 'john@email.com' },
    { id: '2', name: 'Jane Smith', phone: '+1-555-0456', email: 'jane@email.com' }
  ]);

  const [safetyTips] = useState<SafetyTip[]>([
    {
      id: '1',
      location: 'Bangkok, Thailand',
      category: 'transport',
      tip: 'Always use meter taxis or official ride-sharing apps. Avoid tuk-tuks near tourist areas.'
    },
    {
      id: '2', 
      location: 'Barcelona, Spain',
      category: 'crime',
      tip: 'Be extra cautious of pickpockets on Las Ramblas and in metro stations.'
    },
    {
      id: '3',
      location: 'Delhi, India',
      category: 'health',
      tip: 'Drink only bottled water and avoid street food for the first few days.'
    }
  ]);

  const [showContactDialog, setShowContactDialog] = useState(false);
  const [newContact, setNewContact] = useState({ name: '', phone: '', email: '' });
  const [sosActive, setSosActive] = useState(false);

  const activateSOS = () => {
    Alert.alert(
      'SOS Activated',
      'Emergency alert sent to your contacts with your current location.',
      [
        {
          text: 'Cancel SOS',
          onPress: () => setSosActive(false),
          style: 'cancel'
        },
        {
          text: 'Keep Active',
          onPress: () => setSosActive(true)
        }
      ]
    );
  };

  const addEmergencyContact = () => {
    if (newContact.name && newContact.phone) {
      const contact: EmergencyContact = {
        id: Date.now().toString(),
        ...newContact
      };
      setEmergencyContacts([...emergencyContacts, contact]);
      setNewContact({ name: '', phone: '', email: '' });
      setShowContactDialog(false);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'health': return 'medical-bag';
      case 'crime': return 'shield-alert';
      case 'transport': return 'car';
      default: return 'information';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'health': return '#4CAF50';
      case 'crime': return '#F44336';
      case 'transport': return '#2196F3';
      default: return '#FF9800';
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Card style={styles.headerCard}>
          <Card.Content>
            <Title>Travel Safety</Title>
            <Paragraph>Emergency features and safety tips for your journey</Paragraph>
          </Card.Content>
        </Card>

        {/* SOS Section */}
        <Card style={[styles.sosCard, sosActive && styles.sosActive]}>
          <Card.Content>
            <View style={styles.sosHeader}>
              <MaterialCommunityIcons 
                name="alert-octagon" 
                size={32} 
                color={sosActive ? '#fff' : '#F44336'} 
              />
              <View style={styles.sosInfo}>
                <Title style={[styles.sosTitle, sosActive && styles.sosActiveText]}>
                  Emergency SOS
                </Title>
                <Paragraph style={sosActive && styles.sosActiveText}>
                  {sosActive ? 'SOS ACTIVE - Location sharing enabled' : 'Tap to activate emergency alert'}
                </Paragraph>
              </View>
            </View>
          </Card.Content>
          <Card.Actions>
            <Button 
              mode={sosActive ? "outlined" : "contained"}
              buttonColor={sosActive ? undefined : '#F44336'}
              textColor={sosActive ? '#F44336' : 'white'}
              onPress={activateSOS}
            >
              {sosActive ? 'Deactivate SOS' : 'Activate SOS'}
            </Button>
          </Card.Actions>
        </Card>

        {/* Emergency Contacts */}
        <Title style={styles.sectionTitle}>Emergency Contacts</Title>
        
        {emergencyContacts.map((contact) => (
          <Card key={contact.id} style={styles.contactCard}>
            <Card.Content>
              <View style={styles.contactHeader}>
                <MaterialCommunityIcons name="account" size={24} color="#6200EE" />
                <View style={styles.contactInfo}>
                  <Title style={styles.contactName}>{contact.name}</Title>
                  <Paragraph>{contact.phone}</Paragraph>
                  {contact.email && <Paragraph style={styles.contactEmail}>{contact.email}</Paragraph>}
                </View>
              </View>
            </Card.Content>
          </Card>
        ))}

        {/* Safety Tips */}
        <Title style={styles.sectionTitle}>Local Safety Tips</Title>
        
        {safetyTips.map((tip) => (
          <Card key={tip.id} style={styles.tipCard}>
            <Card.Content>
              <View style={styles.tipHeader}>
                <MaterialCommunityIcons 
                  name={getCategoryIcon(tip.category) as any} 
                  size={24} 
                  color={getCategoryColor(tip.category)} 
                />
                <View style={styles.tipInfo}>
                  <View style={styles.tipLocationRow}>
                    <Title style={styles.tipLocation}>{tip.location}</Title>
                    <Chip 
                      style={[styles.categoryChip, { backgroundColor: getCategoryColor(tip.category) + '20' }]}
                      textStyle={{ color: getCategoryColor(tip.category) }}
                    >
                      {tip.category}
                    </Chip>
                  </View>
                  <Paragraph style={styles.tipText}>{tip.tip}</Paragraph>
                </View>
              </View>
            </Card.Content>
          </Card>
        ))}

        {/* Safety Features */}
        <Card style={styles.featuresCard}>
          <Card.Content>
            <Title>Safety Features</Title>
            <List.Item
              title="Live Location Sharing"
              description="Share your real-time location with emergency contacts"
              left={() => <List.Icon icon="crosshairs-gps" />}
            />
            <List.Item
              title="Destination Alerts"
              description="Get safety updates for your current and planned destinations"
              left={() => <List.Icon icon="bell-alert" />}
            />
            <List.Item
              title="Emergency Services"
              description="Quick access to local emergency numbers and embassies"
              left={() => <List.Icon icon="phone-in-talk" />}
            />
          </Card.Content>
        </Card>
      </ScrollView>

      <FAB
        style={styles.fab}
        icon="account-plus"
        onPress={() => setShowContactDialog(true)}
        label="Add Contact"
      />

      <Portal>
        <Dialog visible={showContactDialog} onDismiss={() => setShowContactDialog(false)}>
          <Dialog.Title>Add Emergency Contact</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Name"
              value={newContact.name}
              onChangeText={(text) => setNewContact({...newContact, name: text})}
              style={styles.input}
            />
            <TextInput
              label="Phone Number"
              value={newContact.phone}
              onChangeText={(text) => setNewContact({...newContact, phone: text})}
              style={styles.input}
            />
            <TextInput
              label="Email (optional)"
              value={newContact.email}
              onChangeText={(text) => setNewContact({...newContact, email: text})}
              style={styles.input}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowContactDialog(false)}>Cancel</Button>
            <Button onPress={addEmergencyContact}>Add</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  headerCard: {
    marginBottom: 16,
    backgroundColor: '#6200EE',
  },
  sectionTitle: {
    marginVertical: 16,
    color: '#333',
  },
  sosCard: {
    marginBottom: 16,
    elevation: 4,
    borderWidth: 2,
    borderColor: '#F44336',
  },
  sosActive: {
    backgroundColor: '#F44336',
  },
  sosHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sosInfo: {
    marginLeft: 12,
    flex: 1,
  },
  sosTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sosActiveText: {
    color: 'white',
  },
  contactCard: {
    marginBottom: 8,
    elevation: 1,
  },
  contactHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactInfo: {
    marginLeft: 12,
    flex: 1,
  },
  contactName: {
    fontSize: 16,
  },
  contactEmail: {
    fontSize: 12,
    color: '#666',
  },
  tipCard: {
    marginBottom: 12,
    elevation: 2,
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  tipInfo: {
    marginLeft: 12,
    flex: 1,
  },
  tipLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  tipLocation: {
    fontSize: 16,
    flex: 1,
  },
  categoryChip: {
    height: 24,
  },
  tipText: {
    marginTop: 4,
  },
  featuresCard: {
    marginTop: 16,
    marginBottom: 80,
  },
  input: {
    marginBottom: 8,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#6200EE',
  },
});