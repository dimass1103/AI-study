import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  PanResponder,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';
import Unicorn from '../components/Unicorn';
import Ring from '../components/Ring';
import Balloon from '../components/Balloon';
import Cloud from '../components/Cloud';
import ScoreBoard from '../components/ScoreBoard';
import {
  generateRing,
  generateBalloon,
  checkCollision,
  RING_POINTS,
  BALLOON_POINTS,
  MAX_MISSED_RINGS,
  MAX_MISSED_BALLOONS,
} from '../utils/gameUtils';
import { Ring as RingType, Balloon as BalloonType, Player } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const UNICORN_Y = SCREEN_HEIGHT - 180;
const HORN_OFFSET_X = 75;
const HORN_OFFSET_Y = -15;
const CLOUD_Y = 20;

interface GameScreenProps {
  onGameOver: (score: number) => void;
}

const GameScreen: React.FC<GameScreenProps> = ({ onGameOver }) => {
  const [unicornX, setUnicornX] = useState(SCREEN_WIDTH / 2 - 50);
  const [score, setScore] = useState(0);
  const [missedRings, setMissedRings] = useState(0);
  const [missedBalloons, setMissedBalloons] = useState(0);
  const [rings, setRings] = useState<RingType[]>([]);
  const [balloons, setBalloons] = useState<BalloonType[]>([]);
  const [isPaused, setIsPaused] = useState(false);
  const [showNameInput, setShowNameInput] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [isGameOver, setIsGameOver] = useState(false);

  const gameActiveRef = useRef(true);
  const unicornXRef = useRef(unicornX);

  useEffect(() => {
    unicornXRef.current = unicornX;
  }, [unicornX]);

  const hornX = unicornX + HORN_OFFSET_X;
  const hornY = UNICORN_Y + HORN_OFFSET_Y;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_evt, gestureState) => {
        if (!gameActiveRef.current) return;
        const newX = gestureState.moveX - 50;
        setUnicornX(Math.max(0, Math.min(SCREEN_WIDTH - 100, newX)));
      },
    })
  ).current;

  const saveScore = useCallback(async (finalScore: number, name: string) => {
    try {
      const existingPlayersJson = await AsyncStorage.getItem('@players');
      const existingPlayers: Player[] = existingPlayersJson ? JSON.parse(existingPlayersJson) : [];

      const newPlayer: Player = {
        name: name || 'Anonymous',
        score: finalScore,
        date: new Date().toISOString(),
      };

      const updatedPlayers = [...existingPlayers, newPlayer]
        .sort((a, b) => b.score - a.score)
        .slice(0, 10);

      await AsyncStorage.setItem('@players', JSON.stringify(updatedPlayers));
    } catch (error) {
      console.error('Error saving score:', error);
    }
  }, []);

  const endGame = useCallback(() => {
    if (!gameActiveRef.current) return;
    gameActiveRef.current = false;
    setIsGameOver(true);
    setShowNameInput(true);
  }, []);

  const handleNameSubmit = async () => {
    await saveScore(score, playerName);
    setShowNameInput(false);
    onGameOver(score);
  };

  // Spawn rings
  useEffect(() => {
    if (isPaused || !gameActiveRef.current) return;

    const interval = setInterval(() => {
      if (!gameActiveRef.current) return;
      const newRing = generateRing(SCREEN_WIDTH);
      setRings(prev => [...prev, newRing]);
    }, 1500);

    return () => clearInterval(interval);
  }, [isPaused]);

  // Spawn balloons (half as many)
  useEffect(() => {
    if (isPaused || !gameActiveRef.current) return;

    const interval = setInterval(() => {
      if (!gameActiveRef.current) return;
      const newBalloon = generateBalloon(SCREEN_WIDTH);
      setBalloons(prev => [...prev, newBalloon]);
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused]);

  // Game loop
  useEffect(() => {
    if (isPaused || !gameActiveRef.current) return;

    const interval = setInterval(() => {
      if (!gameActiveRef.current) return;

      const currentHornX = unicornXRef.current + HORN_OFFSET_X;
      const currentHornY = UNICORN_Y + HORN_OFFSET_Y;
      const currentUnicornX = unicornXRef.current;

      // Update rings
      setRings(prevRings => {
        const updated: RingType[] = [];
        let missed = 0;

        for (const ring of prevRings) {
          const newY = ring.y + ring.speed;

          if (checkCollision(ring.x, ring.y, ring.size, currentUnicornX, UNICORN_Y, currentHornX, currentHornY)) {
            setScore(s => s + RING_POINTS);
            continue;
          }

          if (newY > SCREEN_HEIGHT) {
            missed++;
            continue;
          }

          updated.push({ ...ring, y: newY });
        }

        if (missed > 0) {
          setMissedRings(prev => {
            const newCount = prev + missed;
            if (newCount >= MAX_MISSED_RINGS) {
              setTimeout(() => endGame(), 0);
            }
            return newCount;
          });
        }

        return updated;
      });

      // Update balloons
      setBalloons(prevBalloons => {
        const updated: BalloonType[] = [];
        let missed = 0;

        for (const balloon of prevBalloons) {
          const newY = balloon.y + balloon.speed;

          if (checkCollision(balloon.x, balloon.y, balloon.size, currentUnicornX, UNICORN_Y, currentHornX, currentHornY)) {
            setScore(s => s + BALLOON_POINTS);
            continue;
          }

          if (newY > SCREEN_HEIGHT) {
            missed++;
            continue;
          }

          updated.push({ ...balloon, y: newY });
        }

        if (missed > 0) {
          setMissedBalloons(prev => {
            const newCount = prev + missed;
            if (newCount >= MAX_MISSED_BALLOONS) {
              setTimeout(() => endGame(), 0);
            }
            return newCount;
          });
        }

        return updated;
      });
    }, 16);

    return () => clearInterval(interval);
  }, [unicornX, isPaused, endGame]);

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      {/* Sky */}
      <View style={styles.sky} />

      {/* Grass */}
      <View style={styles.grass} />

      {/* Clouds */}
      <Cloud x={20} y={CLOUD_Y} width={120} />
      <Cloud x={SCREEN_WIDTH - 170} y={CLOUD_Y + 10} width={150} />
      <Cloud x={SCREEN_WIDTH / 2 - 60} y={CLOUD_Y + 5} width={100} />

      {/* Score */}
      <ScoreBoard
        score={score}
        missedRings={missedRings}
        missedBalloons={missedBalloons}
        maxMissedRings={MAX_MISSED_RINGS}
        maxMissedBalloons={MAX_MISSED_BALLOONS}
      />

      {/* Pause */}
      <TouchableOpacity style={styles.pauseButton} onPress={() => setIsPaused(!isPaused)}>
        <Text style={styles.pauseButtonText}>{isPaused ? '▶' : '❚❚'}</Text>
      </TouchableOpacity>

      {/* Rings */}
      {rings.map(ring => (
        <Ring key={ring.id} x={ring.x} y={ring.y} size={ring.size} color={ring.color} />
      ))}

      {/* Balloons */}
      {balloons.map(balloon => (
        <Balloon key={balloon.id} x={balloon.x} y={balloon.y} size={balloon.size} color={balloon.color} />
      ))}

      {/* Unicorn */}
      <Unicorn positionX={unicornX} positionY={UNICORN_Y} />

      {/* Game Over Modal */}
      <Modal visible={showNameInput} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Game Over!</Text>
            <Text style={styles.modalScore}>Score: {score}</Text>
            <Text style={styles.modalSubtitle}>Enter your name:</Text>
            <TextInput
              style={styles.input}
              value={playerName}
              onChangeText={setPlayerName}
              placeholder="Your name"
              placeholderTextColor="#999"
              maxLength={20}
              autoFocus
            />
            <TouchableOpacity style={styles.submitButton} onPress={handleNameSubmit}>
              <Text style={styles.submitButtonText}>Save & Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sky: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#87CEEB',
  },
  grass: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: '#90EE90',
  },
  pauseButton: {
    position: 'absolute',
    top: 50,
    right: 15,
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 101,
  },
  pauseButtonText: {
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    width: '80%',
  },
  modalTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF69B4',
    marginBottom: 10,
  },
  modalScore: {
    fontSize: 20,
    color: '#333',
    marginBottom: 20,
  },
  modalSubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    borderWidth: 2,
    borderColor: '#FFB6C1',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 15,
    textAlign: 'center',
  },
  submitButton: {
    backgroundColor: '#FF69B4',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },
  submitButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default GameScreen;
