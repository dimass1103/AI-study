# 🦄 Unicorn Catcher Game

A fun mobile game where you play as a cute pink unicorn catching rings and popping balloons!

## Features

- **Cute Pink Unicorn**: A adorable unicorn at the bottom of the screen that you control
- **Colorful Rings**: Catch falling rings on your unicorn's horn (5 points each)
- **Balloons**: Pop balloons falling from clouds (10 points each)
- **Progressive Difficulty**: Objects fall at medium speed in random patterns
- **Scoring System**: Track your high scores
- **Leaderboard**: See top 10 players ranked by score
- **Cross-Platform**: Works on both iOS and Android

## How to Play

1. **Move the unicorn**: Drag your finger across the screen to move the unicorn left/right
2. **Catch rings**: Position the unicorn's horn under falling rings (5 points)
3. **Pop balloons**: Touch balloons with your unicorn to pop them (10 points)
4. **Don't miss!**: Game ends if you miss 5 rings OR 3 balloons

## Scoring

- 💍 Ring caught: **5 points**
- 🎈 Balloon popped: **10 points**
- Ratio: 2 rings for every 1 balloon

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- For iOS: Xcode (Mac only)
- For Android: Android Studio or Expo Go app

### Setup

```bash
# Install dependencies
npm install

# Start the development server
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android
```

## Building for Production

### iOS

```bash
# Build for iOS
eas build --platform ios

# Or build locally
expo build:ios
```

### Android

```bash
# Build for Android
eas build --platform android

# Or build APK
expo build:android -t apk
```

## Game Controls

- **Touch & Drag**: Move unicorn horizontally
- **Pause Button**: Top right corner to pause/resume
- **Name Input**: Enter your name when game ends to save score

## Technical Details

- Built with React Native & Expo
- TypeScript for type safety
- AsyncStorage for local leaderboard persistence
- 60 FPS game loop
- Smooth animations
- Collision detection system

## Project Structure

```
unicorn-catcher/
├── App.tsx                      # Main app entry
├── src/
│   ├── components/
│   │   ├── Unicorn.tsx         # Main character component
│   │   ├── Ring.tsx            # Ring component
│   │   ├── Balloon.tsx         # Balloon component
│   │   ├── Cloud.tsx           # Cloud decoration
│   │   └── ScoreBoard.tsx      # HUD display
│   ├── screens/
│   │   ├── StartScreen.tsx     # Main menu
│   │   ├── GameScreen.tsx      # Main game
│   │   └── LeaderboardScreen.tsx # High scores
│   ├── types/
│   │   └── index.ts           # TypeScript types
│   └── utils/
│       └── gameUtils.ts        # Game logic utilities
└── assets/                     # Game assets
```

## License

MIT

## Created with ❤️

Enjoy catching those rings! 🦄💍🎈
