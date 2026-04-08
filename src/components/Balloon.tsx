import React from 'react';
import { View, StyleSheet } from 'react-native';

interface BalloonProps {
  x: number;
  y: number;
  size: number;
  color: string;
}

const Balloon: React.FC<BalloonProps> = ({ x, y, size, color }) => {
  return (
    <View
      style={[
        styles.container,
        {
          left: x,
          top: y,
          width: size,
          height: size * 1.2,
        },
      ]}
    >
      {/* Balloon body */}
      <View
        style={[
          styles.balloonBody,
          {
            backgroundColor: color,
            width: size,
            height: size * 1.1,
            borderRadius: size / 2,
          },
        ]}
      >
        {/* Shine effect */}
        <View
          style={[
            styles.shine,
            {
              width: size * 0.16,
              height: size * 0.16,
              top: size * 0.25,
              left: size * 0.25,
            },
          ]}
        />
      </View>
      {/* Balloon knot */}
      <View
        style={[
          styles.knot,
          {
            left: size / 2 - 3,
          },
        ]}
      />
      {/* String */}
      <View
        style={[
          styles.string,
          {
            left: size / 2 - 1,
            top: size * 1.1,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
  },
  balloonBody: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shine: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 100,
  },
  knot: {
    position: 'absolute',
    width: 6,
    height: 6,
    backgroundColor: '#FF69B4',
    borderRadius: 1,
    bottom: -4,
  },
  string: {
    position: 'absolute',
    width: 2,
    height: 20,
    backgroundColor: '#888',
  },
});

export default Balloon;
