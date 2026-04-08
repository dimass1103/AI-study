import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ScoreBoardProps {
  score: number;
  missedRings: number;
  missedBalloons: number;
  maxMissedRings: number;
  maxMissedBalloons: number;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({
  score,
  missedRings,
  missedBalloons,
  maxMissedRings,
  maxMissedBalloons,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreLabel}>Score</Text>
        <Text style={styles.scoreValue}>{score}</Text>
      </View>

      <View style={styles.missedContainer}>
        <View style={styles.missedItem}>
          <Text style={styles.missedLabel}>Rings</Text>
          <View style={styles.indicators}>
            {Array.from({ length: maxMissedRings }).map((_, i) => (
              <View
                key={`ring-${i}`}
                style={[
                  styles.indicator,
                  i < missedRings && styles.indicatorMissed,
                ]}
              />
            ))}
          </View>
        </View>

        <View style={styles.missedItem}>
          <Text style={styles.missedLabel}>Balloons</Text>
          <View style={styles.indicators}>
            {Array.from({ length: maxMissedBalloons }).map((_, i) => (
              <View
                key={`balloon-${i}`}
                style={[
                  styles.indicator,
                  i < missedBalloons && styles.indicatorMissed,
                ]}
              />
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    paddingHorizontal: 15,
    zIndex: 100,
  },
  scoreContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    padding: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  scoreLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  scoreValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FF69B4',
  },
  missedContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    padding: 10,
  },
  missedItem: {
    flex: 1,
    alignItems: 'center',
  },
  missedLabel: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
    marginBottom: 5,
  },
  indicators: {
    flexDirection: 'row',
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 2,
  },
  indicatorMissed: {
    backgroundColor: '#FF6B6B',
  },
});

export default ScoreBoard;
