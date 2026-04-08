import { Ring, Balloon } from '../types';

export const RING_COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE'];
export const BALLOON_COLORS = ['#FF69B4', '#FF1493', '#FFB6C1', '#FFC0CB', '#DB7093', '#C71585'];
export const RING_POINTS = 5;
export const BALLOON_POINTS = 10;
export const MAX_MISSED_RINGS = 5;
export const MAX_MISSED_BALLOONS = 3;
export const GAME_SPEED = 16; // ~60fps

let nextRingId = 0;
let nextBalloonId = 0;

export const generateRing = (screenWidth: number): Ring => {
  const size = 30 + Math.random() * 30; // 30-60px
  return {
    id: nextRingId++,
    x: Math.random() * (screenWidth - size),
    y: -size,
    size,
    color: RING_COLORS[Math.floor(Math.random() * RING_COLORS.length)],
    speed: 2 + Math.random() * 2, // medium speed
  };
};

export const generateBalloon = (screenWidth: number): Balloon => {
  const size = 35 + Math.random() * 25; // 35-60px
  return {
    id: nextBalloonId++,
    x: Math.random() * (screenWidth - size),
    y: -size,
    size,
    color: BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)],
    speed: 1.5 + Math.random() * 2,
  };
};

export const checkCollision = (
  objX: number,
  objY: number,
  objSize: number,
  unicornX: number,
  unicornY: number,
  hornX: number,
  hornY: number
): boolean => {
  // Check if object is near the unicorn's horn
  const hornDistance = Math.sqrt(
    Math.pow(objX + objSize / 2 - hornX, 2) + Math.pow(objY + objSize / 2 - hornY, 2)
  );
  
  const unicornDistance = Math.sqrt(
    Math.pow(objX + objSize / 2 - unicornX - 50, 2) + Math.pow(objY + objSize / 2 - unicornY, 2)
  );

  return hornDistance < objSize + 20 || unicornDistance < objSize + 40;
};
