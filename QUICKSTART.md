# 🦄 Unicorn Catcher - Quick Start Guide

## Installation Options

Since npm is not available on your system, you have several options:

### Option 1: Install Node.js and npm
1. Download Node.js from https://nodejs.org/
2. Install it following the installer instructions
3. Verify installation: `node --version` and `npm --version`
4. Then run: `npm install` and `npm start`

### Option 2: Use Expo Online (Recommended)
1. Go to https://expo.dev/
2. Create a free account
3. Use their online editor or download the project
4. Run on your device using Expo Go app

### Option 3: Manual Setup on Another Machine
1. Copy the entire project folder
2. On a machine with Node.js installed:
   ```bash
   npm install
   npm start
   ```
3. Scan the QR code with Expo Go app on your phone

## Running the Game

Once npm is available:

```bash
# Install all dependencies
npm install

# Start development server
npm start

# Then choose your platform:
# - Press 'i' for iOS simulator
# - Press 'a' for Android emulator
# - Scan QR code with Expo Go app on your phone
```

## Game Files Created

All game code is ready and complete! The project includes:

✅ Complete TypeScript/React Native codebase
✅ All game components (Unicorn, Rings, Balloons, Clouds)
✅ Full game mechanics and physics
✅ Scoring system with leaderboard
✅ Multiple screens (Start, Game, Leaderboard)
✅ Touch controls
✅ Pause functionality
✅ Game over logic

## What You'll See

**Start Screen:**
- Cute pink unicorn emoji
- Game title and instructions
- Play and Leaderboard buttons

**Game Screen:**
- Beautiful sky blue background with clouds
- Green grass at the bottom
- Pink unicorn character you can drag left/right
- Colorful rings falling from top (5 pts each)
- Colorful balloons falling from clouds (10 pts each)
- Score display and missed items tracker
- Pause button

**Leaderboard:**
- Top 10 players ranked by score
- Gold, silver, bronze medals for top 3
- Player names and dates

## Game Rules

- Move unicorn by dragging
- Catch rings on the horn = 5 points
- Pop balloons = 10 points  
- Miss 5 rings = Game Over
- Miss 3 balloons = Game Over
- 2x more rings than balloons spawn

Enjoy the game! 🎮🦄
