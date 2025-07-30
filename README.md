# Backpackr - Travel Group Management App

A React Native/Expo app for managing travel groups, group chat, and event coordination.

## Features

### 🏘️ Group Management
- **Create Groups**: Users can create travel groups with descriptions, destinations, and interests
- **Join Groups**: Browse and join existing travel groups
- **Member Management**: View group members, admins, and member roles
- **Group Settings**: Private/public groups with member limits

### 💬 Group Chat
- **Real-time Messaging**: Group chat with real-time message delivery
- **User Avatars**: Messages display user avatars and names
- **Typing Indicators**: See when other users are typing
- **Message History**: Scrollable message history with timestamps
- **Date Separators**: Messages organized by date

### 📅 Event Coordination
- **Create Events**: Plan group events with date, time, location, and details
- **Event Calendar**: Date and time picker for scheduling
- **Attendance Tracking**: Members can RSVP as Going/Maybe/Can't Go
- **Event Details**: Comprehensive event information including cost, notes, and organizer
- **Quick Actions**: Pre-filled event templates for common activities

## Technology Stack

- **Framework**: React Native with Expo
- **Navigation**: Expo Router (file-based routing)
- **UI Library**: React Native Paper (Material Design)
- **Backend**: Firebase Firestore (for real-time features)
- **Authentication**: Firebase Auth
- **Language**: TypeScript
- **State Management**: React Hooks

## Project Structure

```
app/
├── (tabs)/                 # Tab navigation screens
│   ├── index.tsx          # Home screen
│   ├── groups.tsx         # Groups list
│   ├── events.tsx         # Events list  
│   └── profile.tsx        # User profile
├── groups/                # Group management screens
│   ├── [id].tsx          # Group details
│   ├── create.tsx        # Create group
│   └── chat/[id].tsx     # Group chat
└── events/                # Event management screens
    ├── [id].tsx          # Event details
    └── create.tsx        # Create event

src/
├── components/            # Reusable components
├── hooks/                # Custom React hooks
├── lib/                  # Utilities and services
│   ├── firebase.ts       # Firebase configuration
│   └── firestore.ts      # Firestore operations
└── types/                # TypeScript type definitions
```

## Setup Instructions

1. **Install Dependencies**:
   ```bash
   npm install --legacy-peer-deps
   ```

2. **Configure Firebase**:
   - Update `src/lib/firebase.ts` with your Firebase project configuration
   - Enable Firestore Database and Authentication in Firebase Console

3. **Run the App**:
   ```bash
   # For web development
   npm run web
   
   # For iOS simulator  
   npm run ios
   
   # For Android emulator
   npm run android
   ```

4. **Development Tools**:
   ```bash
   # Type checking
   npm run type-check
   
   # Linting
   npm run lint
   ```

## Key Features Implemented

### Group Management
- Group creation with name, description, destination, and interests
- Private/public group settings with member limits
- Group member list with admin/member roles
- Mock data for demonstration purposes

### Real-time Group Chat
- Message interface with user avatars and timestamps
- Date separators for message organization
- Typing indicators (simulated)
- Message input with send functionality
- Responsive chat layout optimized for mobile

### Event Coordination
- Event creation form with date/time pickers
- Event details view with attendance tracking
- RSVP functionality (Going/Maybe/Can't Go)
- Event attendee list with status indicators
- Integration with group context

## Firebase Integration Ready

The app includes Firebase integration setup for:
- **Real-time messaging** via Firestore listeners
- **Group data synchronization** 
- **Event coordination** with real-time updates
- **User authentication** and profile management

To enable real-time features, configure Firebase and replace mock data with actual Firestore operations using the provided service functions in `src/lib/firestore.ts`.

## Contributing

This is a functional prototype demonstrating travel group management features. The app uses mock data for demonstration but includes all the infrastructure needed for real-time Firebase integration.