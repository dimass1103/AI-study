import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import { Player } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface LeaderboardScreenProps {
  onBack: () => void;
}

const LeaderboardScreen: React.FC<LeaderboardScreenProps> = ({ onBack }) => {
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    loadPlayers();
  }, []);

  const loadPlayers = async () => {
    try {
      const json = await AsyncStorage.getItem('@players');
      if (json) setPlayers(JSON.parse(json));
    } catch (e) {
      console.error(e);
    }
  };

  const getRankEmoji = (i: number) => {
    if (i === 0) return '🥇';
    if (i === 1) return '🥈';
    if (i === 2) return '🥉';
    return `#${i + 1}`;
  };

  const renderItem = ({ item, index }: { item: Player; index: number }) => (
    <View style={[styles.row, index < 3 && styles.topRow]}>
      <View style={styles.rankBox}>
        <Text style={styles.rankEmoji}>{getRankEmoji(index)}</Text>
      </View>
      <View style={styles.info}>
        <Text style={[styles.name, index < 3 && styles.topName]}>{item.name}</Text>
        <Text style={styles.date}>{new Date(item.date).toLocaleDateString()}</Text>
      </View>
      <View style={styles.scoreBox}>
        <Text style={[styles.score, index < 3 && styles.topScore]}>{item.score}</Text>
        <Text style={styles.pts}>pts</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.sky} />
      <View style={styles.grass} />

      <View style={styles.header}>
        <Text style={styles.title}>🏆 Leaderboard</Text>
      </View>

      {players.length > 0 ? (
        <FlatList
          data={players}
          renderItem={renderItem}
          keyExtractor={(item, i) => `${item.date}-${i}`}
          style={styles.list}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      ) : (
        <View style={styles.empty}>
          <Text style={styles.emptyEmoji}>🎮</Text>
          <Text style={styles.emptyText}>No scores yet!</Text>
          <Text style={styles.emptySub}>Be the first to play</Text>
        </View>
      )}

      <View style={styles.btnBox}>
        <TouchableOpacity style={styles.backBtn} onPress={onBack}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  sky: { ...StyleSheet.absoluteFillObject, backgroundColor: '#87CEEB' },
  grass: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 100, backgroundColor: '#90EE90' },
  header: { paddingTop: 60, paddingHorizontal: 20, paddingBottom: 20 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#FF69B4', textAlign: 'center' },
  list: { flex: 1, paddingHorizontal: 20 },
  row: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.9)', padding: 15, borderRadius: 15, marginBottom: 10 },
  topRow: { backgroundColor: '#FFF', borderWidth: 2, borderColor: '#FFD700' },
  rankBox: { width: 50, alignItems: 'center' },
  rankEmoji: { fontSize: 28 },
  info: { flex: 1, paddingLeft: 10 },
  name: { fontSize: 18, fontWeight: '600', color: '#333' },
  topName: { fontSize: 20, color: '#FF69B4', fontWeight: 'bold' },
  date: { fontSize: 12, color: '#999', marginTop: 2 },
  scoreBox: { alignItems: 'flex-end' },
  score: { fontSize: 20, fontWeight: 'bold', color: '#666' },
  topScore: { fontSize: 24, color: '#FF69B4' },
  pts: { fontSize: 12, color: '#999' },
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyEmoji: { fontSize: 60, marginBottom: 15 },
  emptyText: { fontSize: 24, fontWeight: 'bold', color: '#FF69B4', marginBottom: 8 },
  emptySub: { fontSize: 16, color: '#666' },
  btnBox: { paddingHorizontal: 20, paddingBottom: 120 },
  backBtn: { backgroundColor: '#FF69B4', paddingVertical: 14, borderRadius: 25, alignItems: 'center' },
  backText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
});

export default LeaderboardScreen;
