import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDoc, 
  getDocs, 
  query, 
  where,
  orderBy,
  onSnapshot,
  Timestamp
} from 'firebase/firestore';
import { db } from './firebase';
import { Group, Event, Message } from '../types';

// Group operations
export const createGroup = async (groupData: Omit<Group, 'id' | 'createdAt'>) => {
  try {
    const docRef = await addDoc(collection(db, 'groups'), {
      ...groupData,
      createdAt: Timestamp.now(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating group:', error);
    throw error;
  }
};

export const joinGroup = async (groupId: string, userId: string, userData: any) => {
  try {
    const groupRef = doc(db, 'groups', groupId);
    const groupDoc = await getDoc(groupRef);
    
    if (groupDoc.exists()) {
      const currentMembers = groupDoc.data().members || [];
      const updatedMembers = [...currentMembers, { ...userData, joinedAt: Timestamp.now() }];
      
      await updateDoc(groupRef, {
        members: updatedMembers,
        memberCount: updatedMembers.length,
      });
    }
  } catch (error) {
    console.error('Error joining group:', error);
    throw error;
  }
};

export const getUserGroups = (userId: string, callback: (groups: Group[]) => void) => {
  const q = query(
    collection(db, 'groups'),
    where('members', 'array-contains-any', [{ id: userId }]),
    orderBy('createdAt', 'desc')
  );

  return onSnapshot(q, (snapshot) => {
    const groups = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Group[];
    callback(groups);
  });
};

// Event operations
export const createEvent = async (eventData: Omit<Event, 'id' | 'createdAt'>) => {
  try {
    const docRef = await addDoc(collection(db, 'events'), {
      ...eventData,
      createdAt: Timestamp.now(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
};

export const updateEventAttendance = async (eventId: string, userId: string, status: string) => {
  try {
    const eventRef = doc(db, 'events', eventId);
    const eventDoc = await getDoc(eventRef);
    
    if (eventDoc.exists()) {
      const currentAttendees = eventDoc.data().attendees || [];
      const existingAttendeeIndex = currentAttendees.findIndex((a: any) => a.id === userId);
      
      if (existingAttendeeIndex >= 0) {
        currentAttendees[existingAttendeeIndex].status = status;
        currentAttendees[existingAttendeeIndex].responseAt = Timestamp.now();
      } else {
        currentAttendees.push({
          id: userId,
          status,
          responseAt: Timestamp.now(),
        });
      }
      
      await updateDoc(eventRef, {
        attendees: currentAttendees,
      });
    }
  } catch (error) {
    console.error('Error updating event attendance:', error);
    throw error;
  }
};

export const getGroupEvents = (groupId: string, callback: (events: Event[]) => void) => {
  const q = query(
    collection(db, 'events'),
    where('groupId', '==', groupId),
    orderBy('date', 'asc')
  );

  return onSnapshot(q, (snapshot) => {
    const events = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Event[];
    callback(events);
  });
};

// Chat operations
export const sendMessage = async (messageData: Omit<Message, 'id' | 'timestamp'>) => {
  try {
    await addDoc(collection(db, 'messages'), {
      ...messageData,
      timestamp: Timestamp.now(),
    });
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

export const subscribeToGroupMessages = (groupId: string, callback: (messages: Message[]) => void) => {
  const q = query(
    collection(db, 'messages'),
    where('groupId', '==', groupId),
    orderBy('timestamp', 'asc')
  );

  return onSnapshot(q, (snapshot) => {
    const messages = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      timestamp: doc.data().timestamp?.toDate() || new Date(),
    })) as Message[];
    callback(messages);
  });
};