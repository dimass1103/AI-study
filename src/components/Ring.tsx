import React from 'react';
import { View, StyleSheet } from 'react-native';

interface RingProps {
  x: number;
  y: number;
  size: number;
  color: string;
}

const Ring: React.FC<RingProps> = ({ x, y, size, color }) => {
  return (
    <View
      style={[
        styles.ring,
        {
          left: x,
          top: y,
          width: size,
          height: size,
          borderRadius: size / 2,
          borderColor: color,
          borderWidth: 4,
        },
      ]}
    >
      <View
        style={[
          styles.inner,
          {
            width: size - 8,
            height: size - 8,
            borderRadius: (size - 8) / 2,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  ring: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inner: {
    backgroundColor: 'transparent',
  },
});

export default Ring;
