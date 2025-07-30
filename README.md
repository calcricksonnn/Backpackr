# Backpackr - Social Travel App

Backpackr is a React Native mobile app that helps backpackers connect with fellow travelers, discover events, and build communities while exploring the world.

## 🌟 Features

### 🗺️ Nearby Backpackers
- **Interactive Map**: View nearby backpackers on an interactive map
- **User Profiles**: Detailed profiles with interests, travel routes, and bios  
- **Smart Filtering**: Filter by interests (hiking, photography, culture) or travel routes
- **Connect**: Send connection requests to fellow travelers
- **Location-Based**: Automatically centers on your current location

### 🎉 Events & Meetups
- **Event Discovery**: Browse events on an interactive map
- **Create Events**: Easily create new events with location, date, time, and details
- **RSVP System**: Join events with attendee limits and capacity management
- **Event Categories**: Tag system for organizing events (hiking, food, nightlife, etc.)
- **Smart Notifications**: Get notified about nearby events happening soon
- **Event Chat**: Join event-specific chat groups with other attendees

### 🔔 Smart Notifications
- **Proximity Alerts**: Notifications for events within 5km of your location
- **Time-Based**: Only notifies about events happening within 24 hours
- **No Spam**: Intelligent duplicate prevention

### 💬 Event Chat Groups
- **Real-time Chat**: Chat with other event attendees
- **User-Friendly**: Clean interface with timestamps and user avatars
- **Auto-Join**: Automatically join chat when you RSVP to an event

## 🛠️ Technical Stack

- **React Native** - Cross-platform mobile development
- **Expo** - Development platform and toolchain
- **TypeScript** - Type safety and better development experience
- **React Native Maps** - Interactive map functionality
- **React Native Paper** - Material Design UI components
- **Firebase** - Backend infrastructure (configured for future use)
- **Expo Location** - GPS and location services

## 📱 App Structure

```
app/
├── (tabs)/
│   ├── index.tsx        # Home screen
│   ├── nearby.tsx       # Nearby backpackers map
│   ├── events.tsx       # Events discovery and creation
│   └── profile.tsx      # User profile
src/
├── components/
│   └── EventChat.tsx    # Event chat functionality
├── services/
│   └── NotificationService.ts  # Smart notifications
└── config/
    └── firebase.ts      # Firebase configuration
```

## 🚀 Getting Started

1. **Install Dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

2. **Start Development Server**
   ```bash
   npx expo start
   ```

3. **Run on Device**
   - Install Expo Go app on your phone
   - Scan the QR code from the terminal
   - Or run `npx expo run:ios` / `npx expo run:android`

## 🎯 Current Implementation

✅ **Completed Features:**
- Interactive maps with custom markers
- User profile system with interests and routes
- Event creation and RSVP system
- Smart filtering and search
- Proximity-based notifications
- Event-specific chat groups
- Material Design UI
- TypeScript integration
- Location services integration

⏳ **Future Enhancements:**
- Firebase backend integration
- User authentication system
- Real-time data synchronization
- Push notifications
- Photo sharing
- Route planning
- User reviews and ratings

## 🔧 Development

The app uses modern React Native development practices:

- **Expo Router** for navigation
- **TypeScript** for type safety
- **React Native Paper** for consistent UI
- **Mock Data** for development and testing
- **Modular Architecture** for scalability

## 📝 Notes

This implementation focuses on the core functionality with mock data. In a production environment, you would integrate with:

- Firebase Firestore for real-time data
- Firebase Authentication for user management
- Expo Notifications for push notifications
- Firebase Storage for photo uploads
- Google Maps API for enhanced location services