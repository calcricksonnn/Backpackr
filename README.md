# Backpackr - Your Ultimate Backpacking Companion

Backpackr is a comprehensive React Native mobile application designed specifically for backpackers and budget travelers. The app provides essential tools and features to enhance your backpacking experience, connect with fellow travelers, and help you explore the world safely and sustainably.

## Features

### 🗺️ Route Sharing and Syncing
- Share planned routes with friends and travel groups
- Real-time synchronization with other backpackers
- Collaborative route planning
- Smart matching with travelers going to similar destinations

### 🚨 Travel Safety Features
- **SOS Emergency Button** - One-tap emergency alert with live location sharing
- Emergency contacts management
- Localized safety tips and guidelines for specific destinations
- Real-time safety alerts and updates

### 💰 Budget Management
- Comprehensive expense tracking with categorization
- Daily and trip-wide budget monitoring with progress indicators
- Multi-currency support with automatic conversion
- Visual spending analytics and insights
- Budget alerts and recommendations

### 👥 Community Recommendations
- User-generated recommendations for hostels, restaurants, and activities
- Rating and review system
- Interactive map integration with recommendations
- Filtering by location, price, rating, and preferences
- Save recommendations for offline viewing

### 📱 Offline Mode
- Download maps and itineraries for offline use
- Bluetooth messaging with nearby travelers
- Local WiFi sync capabilities
- Offline access to saved recommendations and routes

### 🌍 Language Assistance
- Common backpacking phrases by region
- Quick translation tool for essential communications
- Regional language tips and cultural insights
- Voice and photo translation capabilities (planned)

### 🌱 Eco-Friendly Travel
- Sustainable transportation options and recommendations
- Carbon footprint tracking and offset options
- Eco-certified accommodation and activity suggestions
- Environmental tips and sustainable travel practices

### 🏆 Gamification & Achievements
- Leveling system with XP rewards
- Badges and achievements for various travel milestones
- Daily and weekly challenges
- Leaderboards and friendly competition
- Progress tracking across multiple categories

### 🎉 Local Events & Activities
- Discover cultural events, festivals, and local activities
- Exclusive discounts from partner businesses
- Event calendar integration
- Group attendance and social features
- Local insights from event organizers

### 🎒 Packing Assistance
- Smart packing lists tailored to destination, weather, and trip length
- Climate-based recommendations
- Weight optimization suggestions
- Community-driven packing tips
- Progress tracking and checklist management

## Technology Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **UI Library**: React Native Paper (Material Design)
- **Navigation**: React Navigation
- **State Management**: React Hooks
- **Maps**: React Native Maps (planned integration)
- **Backend**: Firebase (planned integration)
- **Location Services**: Expo Location

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/calcricksonnn/Backpackr.git
cd Backpackr
```

2. Install dependencies:
```bash
npm install --legacy-peer-deps
```

3. Start the development server:
```bash
npm start
```

4. Run on your preferred platform:
```bash
# iOS Simulator
npm run ios

# Android Emulator
npm run android

# Web Browser
npm run web
```

## Project Structure

```
src/
├── components/          # Reusable UI components
├── navigation/          # Navigation configuration
├── screens/            # Screen components
│   ├── Home/           # Main dashboard
│   ├── Route/          # Route sharing features
│   ├── Safety/         # Safety and emergency features
│   ├── Budget/         # Budget tracking
│   ├── Community/      # Community recommendations
│   ├── Offline/        # Offline functionality
│   ├── Language/       # Language assistance
│   ├── Eco/           # Eco-friendly features
│   ├── Gamification/  # Achievements and challenges
│   ├── Events/        # Local events and activities
│   └── Packing/       # Packing assistance
├── services/          # API and external services
├── utils/            # Utility functions
├── hooks/            # Custom React hooks
└── types/            # TypeScript type definitions
```

## Development Scripts

- `npm start` - Start Expo development server
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS device/simulator
- `npm run web` - Run in web browser
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Roadmap

### Phase 1 (Current)
- [x] Core app structure and navigation
- [x] All 10 major features implemented
- [x] TypeScript integration
- [x] Material Design UI

### Phase 2 (Planned)
- [ ] Firebase backend integration
- [ ] Real-time data synchronization
- [ ] Push notifications
- [ ] Location services integration
- [ ] Map functionality
- [ ] User authentication

### Phase 3 (Future)
- [ ] Social features and messaging
- [ ] Advanced analytics
- [ ] AI-powered recommendations
- [ ] Multi-language support
- [ ] Travel insurance integration
- [ ] Booking integrations

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@backpackr.app or join our community on Discord.

## Acknowledgments

- React Native and Expo teams for the excellent development platform
- React Native Paper for the beautiful Material Design components
- The backpacking community for inspiration and feedback