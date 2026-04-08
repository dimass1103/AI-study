import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

interface StartScreenProps {
  onStartGame: () => void;
  onViewLeaderboard: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStartGame, onViewLeaderboard }) => {
  return (
    <View style={styles.container}>
      <View style={styles.sky} />
      <View style={styles.grass} />

      <View style={styles.titleBox}>
        <Text style={styles.emoji}>🦄</Text>
        <Text style={styles.title}>Unicorn Catcher</Text>
        <Text style={styles.sub}>Catch rings & pop balloons!</Text>
      </View>

      <View style={styles.instructions}>
        <View style={styles.item}>
          <Text style={styles.itemEmoji}>💍</Text>
          <Text style={styles.itemText}>Ring = 5 points</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.itemEmoji}>🎈</Text>
          <Text style={styles.itemText}>Balloon = 10 points</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.itemEmoji}>⚠️</Text>
          <Text style={styles.itemText}>Don't miss 5 rings or 3 balloons!</Text>
        </View>
      </View>

      <View style={styles.btnBox}>
        <TouchableOpacity style={styles.playBtn} onPress={onStartGame}>
          <Text style={styles.playText}>▶ Play</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.lbBtn} onPress={onViewLeaderboard}>
          <Text style={styles.lbText}>🏆 Leaderboard</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  sky: { ...StyleSheet.absoluteFillObject, backgroundColor: '#87CEEB' },
  grass: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 100, backgroundColor: '#90EE90' },
  titleBox: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 80 },
  emoji: { fontSize: 80, marginBottom: 10 },
  title: { fontSize: 36, fontWeight: 'bold', color: '#FF69B4' },
  sub: { fontSize: 18, color: '#666', marginTop: 10, fontWeight: '600' },
  instructions: { paddingHorizontal: 30, marginBottom: 30 },
  item: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, backgroundColor: 'rgba(255,255,255,0.8)', padding: 12, borderRadius: 12 },
  itemEmoji: { fontSize: 24, marginRight: 12 },
  itemText: { fontSize: 16, color: '#333', fontWeight: '500' },
  btnBox: { paddingHorizontal: 30, paddingBottom: 120 },
  playBtn: { backgroundColor: '#FF69B4', paddingVertical: 16, borderRadius: 30, alignItems: 'center', marginBottom: 12 },
  playText: { color: '#FFF', fontSize: 22, fontWeight: 'bold' },
  lbBtn: { backgroundColor: '#FFF', paddingVertical: 16, borderRadius: 30, alignItems: 'center', borderWidth: 2, borderColor: '#FFB6C1' },
  lbText: { color: '#FF69B4', fontSize: 18, fontWeight: 'bold' },
});

export default StartScreen;
