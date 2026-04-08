import React from 'react';
import { View, StyleSheet } from 'react-native';

interface CloudProps {
  x: number;
  y: number;
  width?: number;
}

const Cloud: React.FC<CloudProps> = ({ x, y, width = 100 }) => {
  const w = width;
  const h = w * 0.5;

  return (
    <View
      style={[
        styles.container,
        {
          left: x,
          top: y,
          width: w,
          height: h,
        },
      ]}
    >
      <View
        style={[
          styles.circle,
          {
            width: w * 0.5,
            height: w * 0.5,
            top: 0,
            left: w * 0.1,
          },
        ]}
      />
      <View
        style={[
          styles.circle,
          {
            width: w * 0.6,
            height: w * 0.6,
            top: -w * 0.15,
            left: w * 0.3,
          },
        ]}
      />
      <View
        style={[
          styles.circle,
          {
            width: w * 0.4,
            height: w * 0.4,
            top: w * 0.05,
            left: w * 0.55,
          },
        ]}
      />
      <View
        style={[
          styles.base,
          {
            width: w * 0.9,
            height: w * 0.3,
            bottom: 0,
            left: w * 0.05,
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
  circle: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    borderRadius: 100,
    opacity: 0.9,
  },
  base: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    opacity: 0.9,
  },
});

export default Cloud;
