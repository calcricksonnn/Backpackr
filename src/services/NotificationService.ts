import * as Location from 'expo-location';
import { Alert } from 'react-native';

export interface Event {
  id: string;
  title: string;
  description: string;
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  date: Date;
  time: Date;
  creator: string;
  attendees: string[];
  maxAttendees?: number;
  tags: string[];
}

export interface NotificationService {
  scheduleEventNotification: (event: Event, userLocation: Location.LocationObject) => Promise<void>;
  checkNearbyEvents: (events: Event[], userLocation: Location.LocationObject) => Event[];
  requestNotificationPermissions: () => Promise<boolean>;
}

// Calculate distance between two coordinates in kilometers
const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// Check if event is happening soon (within next 24 hours)
const isEventSoon = (eventDate: Date, eventTime: Date): boolean => {
  const now = new Date();
  const eventDateTime = new Date(eventDate);
  eventDateTime.setHours(eventTime.getHours(), eventTime.getMinutes());
  
  const timeDiff = eventDateTime.getTime() - now.getTime();
  const hoursDiff = timeDiff / (1000 * 3600);
  
  return hoursDiff > 0 && hoursDiff <= 24;
};

class NotificationServiceImpl implements NotificationService {
  private readonly NEARBY_DISTANCE_KM = 5; // 5km radius
  private notifiedEvents = new Set<string>();

  async requestNotificationPermissions(): Promise<boolean> {
    try {
      // In a real implementation, you would use expo-notifications
      // For now, we'll just return true as a mock
      return true;
    } catch (error) {
      console.error('Failed to request notification permissions:', error);
      return false;
    }
  }

  async scheduleEventNotification(
    event: Event,
    userLocation: Location.LocationObject
  ): Promise<void> {
    const distance = calculateDistance(
      userLocation.coords.latitude,
      userLocation.coords.longitude,
      event.location.latitude,
      event.location.longitude
    );

    if (distance <= this.NEARBY_DISTANCE_KM && isEventSoon(event.date, event.time)) {
      // Prevent duplicate notifications
      if (this.notifiedEvents.has(event.id)) {
        return;
      }

      this.notifiedEvents.add(event.id);

      // In a real implementation, you would schedule a push notification
      // For now, we'll show an alert as a demonstration
      Alert.alert(
        '🎉 Nearby Event Alert',
        `"${event.title}" is happening soon, just ${distance.toFixed(1)}km away!\n\n📍 ${event.location.address}\n🕐 ${this.formatEventTime(event.date, event.time)}`,
        [
          { text: 'Dismiss', style: 'cancel' },
          { text: 'View Event', onPress: () => this.handleViewEvent(event) },
        ]
      );
    }
  }

  checkNearbyEvents(
    events: Event[],
    userLocation: Location.LocationObject
  ): Event[] {
    return events.filter((event) => {
      const distance = calculateDistance(
        userLocation.coords.latitude,
        userLocation.coords.longitude,
        event.location.latitude,
        event.location.longitude
      );
      return distance <= this.NEARBY_DISTANCE_KM && isEventSoon(event.date, event.time);
    });
  }

  private formatEventTime(date: Date, time: Date): string {
    const eventDate = date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
    const eventTime = time.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
    return `${eventDate} at ${eventTime}`;
  }

  private handleViewEvent(event: Event): void {
    // In a real implementation, this would navigate to the event details
    console.log('Viewing event:', event.title);
  }
}

export const notificationService = new NotificationServiceImpl();

// Hook for checking nearby events periodically
export const useNearbyEventNotifications = (
  events: Event[],
  userLocation: Location.LocationObject | null
) => {
  const checkAndNotify = async () => {
    if (!userLocation || events.length === 0) return;

    const nearbyEvents = notificationService.checkNearbyEvents(events, userLocation);
    
    for (const event of nearbyEvents) {
      await notificationService.scheduleEventNotification(event, userLocation);
    }
  };

  return { checkAndNotify };
};