import React from 'react';
import { View, StyleSheet } from 'react-native';

interface UnicornProps {
  positionX: number;
  positionY: number;
}

const Unicorn: React.FC<UnicornProps> = ({ positionX, positionY }) => {
  return (
    <View style={[styles.container, { left: positionX, top: positionY }]}>
      {/* Tail */}
      <View style={[styles.tail, styles.tail1]} />
      <View style={[styles.tail, styles.tail2]} />
      <View style={[styles.tail, styles.tail3]} />

      {/* Legs */}
      <View style={[styles.leg, styles.legFrontL]} />
      <View style={[styles.leg, styles.legFrontR]} />
      <View style={[styles.leg, styles.legBackL]} />
      <View style={[styles.leg, styles.legBackR]} />

      {/* Hooves */}
      <View style={[styles.hoof, styles.hoofFrontL]} />
      <View style={[styles.hoof, styles.hoofFrontR]} />
      <View style={[styles.hoof, styles.hoofBackL]} />
      <View style={[styles.hoof, styles.hoofBackR]} />

      {/* Main body */}
      <View style={styles.body} />

      {/* Belly highlight */}
      <View style={styles.belly} />

      {/* Neck */}
      <View style={styles.neck} />

      {/* Head */}
      <View style={styles.head} />

      {/* Snout */}
      <View style={styles.snout} />

      {/* Nostril */}
      <View style={styles.nostril} />

      {/* Smile */}
      <View style={styles.smile} />

      {/* Big eye - white */}
      <View style={styles.eyeWhite} />

      {/* Big eye - iris */}
      <View style={styles.iris} />

      {/* Pupil */}
      <View style={styles.pupil} />

      {/* Eye sparkle */}
      <View style={styles.eyeSparkle} />
      <View style={styles.eyeSparkle2} />

      {/* Eyelashes */}
      <View style={[styles.lash, styles.lash1]} />
      <View style={[styles.lash, styles.lash2]} />
      <View style={[styles.lash, styles.lash3]} />

      {/* Eyebrow */}
      <View style={styles.eyebrow} />

      {/* Blush */}
      <View style={styles.blush1} />
      <View style={styles.blush2} />

      {/* Ear */}
      <View style={styles.ear} />
      <View style={styles.earInner} />

      {/* Golden horn */}
      <View style={styles.hornBase} />
      <View style={styles.hornMid} />
      <View style={styles.hornTip} />
      <View style={styles.hornSpiral1} />
      <View style={styles.hornSpiral2} />
      <View style={styles.hornSpiral3} />

      {/* Long flowing mane - top layer */}
      <View style={[styles.mane, styles.mane1]} />
      <View style={[styles.mane, styles.mane2]} />
      <View style={[styles.mane, styles.mane3]} />
      <View style={[styles.mane, styles.mane4]} />
      <View style={[styles.mane, styles.mane5]} />
      <View style={[styles.mane, styles.mane6]} />
      <View style={[styles.mane, styles.mane7]} />

      {/* Mane highlights */}
      <View style={[styles.maneHighlight, styles.maneH1]} />
      <View style={[styles.maneHighlight, styles.maneH2]} />
      <View style={[styles.maneHighlight, styles.maneH3]} />

      {/* Forelock (hair on forehead) */}
      <View style={[styles.forelock, styles.forelock1]} />
      <View style={[styles.forelock, styles.forelock2]} />
      <View style={[styles.forelock, styles.forelock3]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: 130,
    height: 140,
  },

  // === TAIL ===
  tail: {
    position: 'absolute',
    width: 28,
    height: 40,
    borderRadius: 14,
    left: -10,
  },
  tail1: {
    backgroundColor: '#FF69B4',
    top: 55,
    transform: [{ rotate: '-20deg' }],
  },
  tail2: {
    backgroundColor: '#FFB6C1',
    top: 65,
    left: -5,
    transform: [{ rotate: '-5deg' }],
  },
  tail3: {
    backgroundColor: '#FF1493',
    top: 50,
    left: -12,
    width: 22,
    height: 35,
    transform: [{ rotate: '-35deg' }],
  },

  // === LEGS ===
  leg: {
    position: 'absolute',
    width: 14,
    height: 38,
    backgroundColor: '#FFB6C1',
    borderRadius: 7,
    bottom: 0,
  },
  legFrontL: { left: 40 },
  legFrontR: { left: 55 },
  legBackL: { left: 85 },
  legBackR: { left: 100 },

  // === HOOVES ===
  hoof: {
    position: 'absolute',
    width: 14,
    height: 8,
    backgroundColor: '#FF69B4',
    borderRadius: 4,
    bottom: 0,
  },
  hoofFrontL: { left: 40 },
  hoofFrontR: { left: 55 },
  hoofBackL: { left: 85 },
  hoofBackR: { left: 100 },

  // === BODY ===
  body: {
    position: 'absolute',
    width: 85,
    height: 52,
    backgroundColor: '#FFB6C1',
    borderRadius: 26,
    bottom: 32,
    left: 35,
  },

  // Belly highlight
  belly: {
    position: 'absolute',
    width: 60,
    height: 30,
    backgroundColor: '#FFC0CB',
    borderRadius: 15,
    bottom: 35,
    left: 45,
  },

  // === NECK ===
  neck: {
    position: 'absolute',
    width: 30,
    height: 45,
    backgroundColor: '#FFB6C1',
    borderRadius: 15,
    top: 35,
    right: 25,
    transform: [{ rotate: '-15deg' }],
  },

  // === HEAD ===
  head: {
    position: 'absolute',
    width: 52,
    height: 48,
    backgroundColor: '#FFB6C1',
    borderRadius: 26,
    top: 5,
    right: 10,
  },

  // === SNOUT ===
  snout: {
    position: 'absolute',
    width: 30,
    height: 22,
    backgroundColor: '#FFB6C1',
    borderRadius: 15,
    top: 28,
    right: 5,
  },

  // === NOSTRIL ===
  nostril: {
    position: 'absolute',
    width: 5,
    height: 4,
    backgroundColor: '#FF69B4',
    borderRadius: 2.5,
    top: 36,
    right: 8,
  },

  // === SMILE ===
  smile: {
    position: 'absolute',
    width: 12,
    height: 6,
    borderBottomWidth: 2,
    borderBottomColor: '#FF69B4',
    borderRadius: 6,
    top: 40,
    right: 10,
  },

  // === BIG EYE ===
  eyeWhite: {
    position: 'absolute',
    width: 20,
    height: 22,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    top: 14,
    right: 22,
    borderWidth: 1.5,
    borderColor: '#333',
  },

  // Iris
  iris: {
    position: 'absolute',
    width: 14,
    height: 14,
    backgroundColor: '#4A90D9',
    borderRadius: 7,
    top: 18,
    right: 24,
  },

  // Pupil
  pupil: {
    position: 'absolute',
    width: 8,
    height: 9,
    backgroundColor: '#1A1A2E',
    borderRadius: 4,
    top: 20,
    right: 27,
  },

  // Eye sparkle
  eyeSparkle: {
    position: 'absolute',
    width: 4,
    height: 4,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
    top: 18,
    right: 25,
  },
  eyeSparkle2: {
    position: 'absolute',
    width: 2,
    height: 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 1,
    top: 24,
    right: 29,
  },

  // === EYELASHES ===
  lash: {
    position: 'absolute',
    width: 2,
    height: 8,
    backgroundColor: '#333',
    borderRadius: 1,
    top: 8,
  },
  lash1: {
    right: 20,
    transform: [{ rotate: '-25deg' }],
  },
  lash2: {
    right: 26,
    transform: [{ rotate: '0deg' }],
  },
  lash3: {
    right: 32,
    transform: [{ rotate: '25deg' }],
  },

  // === EYEBROW ===
  eyebrow: {
    position: 'absolute',
    width: 16,
    height: 3,
    backgroundColor: '#CC8899',
    borderRadius: 2,
    top: 8,
    right: 24,
  },

  // === BLUSH ===
  blush1: {
    position: 'absolute',
    width: 12,
    height: 7,
    backgroundColor: '#FF69B4',
    borderRadius: 6,
    opacity: 0.4,
    top: 38,
    right: 30,
  },
  blush2: {
    position: 'absolute',
    width: 10,
    height: 6,
    backgroundColor: '#FF69B4',
    borderRadius: 5,
    opacity: 0.3,
    top: 42,
    right: 18,
  },

  // === EAR ===
  ear: {
    position: 'absolute',
    width: 12,
    height: 18,
    backgroundColor: '#FFB6C1',
    borderRadius: '50%',
    top: -5,
    right: 28,
    transform: [{ rotate: '-15deg' }],
  },
  earInner: {
    position: 'absolute',
    width: 6,
    height: 12,
    backgroundColor: '#FF69B4',
    borderRadius: 3,
    top: -1,
    right: 31,
    transform: [{ rotate: '-15deg' }],
  },

  // === GOLDEN HORN ===
  hornBase: {
    position: 'absolute',
    width: 0,
    height: 0,
    borderLeftWidth: 7,
    borderRightWidth: 7,
    borderBottomWidth: 28,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#FFD700',
    top: -22,
    right: 22,
  },
  hornMid: {
    position: 'absolute',
    width: 14,
    height: 20,
    backgroundColor: '#FFD700',
    borderRadius: 3,
    top: -22,
    right: 22,
  },
  hornTip: {
    position: 'absolute',
    width: 0,
    height: 0,
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderBottomWidth: 12,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#FFA500',
    top: -34,
    right: 24,
  },
  hornSpiral1: {
    position: 'absolute',
    width: 10,
    height: 2,
    backgroundColor: '#FFA500',
    borderRadius: 1,
    top: -14,
    right: 24,
  },
  hornSpiral2: {
    position: 'absolute',
    width: 8,
    height: 2,
    backgroundColor: '#FFA500',
    borderRadius: 1,
    top: -8,
    right: 25,
  },
  hornSpiral3: {
    position: 'absolute',
    width: 6,
    height: 2,
    backgroundColor: '#FFA500',
    borderRadius: 1,
    top: -2,
    right: 26,
  },

  // === LONG FLOWING MANE ===
  mane: {
    position: 'absolute',
    borderRadius: 20,
  },
  mane1: {
    width: 35,
    height: 35,
    backgroundColor: '#FF69B4',
    top: 0,
    right: 38,
  },
  mane2: {
    width: 30,
    height: 40,
    backgroundColor: '#FF1493',
    top: 15,
    right: 45,
  },
  mane3: {
    width: 28,
    height: 45,
    backgroundColor: '#DB7093',
    top: 25,
    right: 50,
  },
  mane4: {
    width: 25,
    height: 50,
    backgroundColor: '#FF69B4',
    top: 35,
    right: 55,
  },
  mane5: {
    width: 22,
    height: 40,
    backgroundColor: '#C71585',
    top: 45,
    right: 58,
  },
  mane6: {
    width: 20,
    height: 35,
    backgroundColor: '#FFB6C1',
    top: 55,
    right: 60,
  },
  mane7: {
    width: 18,
    height: 30,
    backgroundColor: '#FF1493',
    top: 65,
    right: 62,
  },

  // Mane highlights
  maneHighlight: {
    position: 'absolute',
    width: 12,
    height: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 6,
  },
  maneH1: {
    top: 5,
    right: 42,
  },
  maneH2: {
    top: 30,
    right: 55,
  },
  maneH3: {
    top: 50,
    right: 60,
  },

  // === FORELOCK ===
  forelock: {
    position: 'absolute',
    borderRadius: 10,
    top: -5,
    right: 15,
  },
  forelock1: {
    width: 18,
    height: 22,
    backgroundColor: '#FF69B4',
  },
  forelock2: {
    width: 15,
    height: 25,
    backgroundColor: '#FF1493',
    right: 20,
  },
  forelock3: {
    width: 12,
    height: 20,
    backgroundColor: '#FFB6C1',
    right: 25,
  },
});

export default Unicorn;
