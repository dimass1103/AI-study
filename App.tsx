import React, { useState } from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import StartScreen from './src/screens/StartScreen';
import GameScreen from './src/screens/GameScreen';
import LeaderboardScreen from './src/screens/LeaderboardScreen';
import { Screen } from './src/types';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('start');

  const handleStartGame = () => setCurrentScreen('game');

  const handleGameOver = (score: number) => {
    console.log('Game Over! Score:', score);
    setCurrentScreen('start');
  };

  const handleViewLeaderboard = () => setCurrentScreen('leaderboard');

  const handleBack = () => setCurrentScreen('start');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'start':
        return <StartScreen onStartGame={handleStartGame} onViewLeaderboard={handleViewLeaderboard} />;
      case 'game':
        return <GameScreen onGameOver={handleGameOver} />;
      case 'leaderboard':
        return <LeaderboardScreen onBack={handleBack} />;
      default:
        return <StartScreen onStartGame={handleStartGame} onViewLeaderboard={handleViewLeaderboard} />;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {renderScreen()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
