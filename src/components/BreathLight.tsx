import React from 'react';

interface BreathLightProps {
  size?: number;
  status: 'success' | 'error' | 'warning' | 'off';
  animation?: 'pulse' | 'ping' | 'bounce' | 'spin';
}

export default function BreathLight({
  size = 30,
  status = 'off',
  animation = 'pulse',
}: BreathLightProps) {
  const getStatusColor = () => {
    switch (status) {
      case 'success':
        return 'bg-green-500';
      case 'error':
        return 'bg-red-500';
      case 'warning':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-300';
    }
  };

  const getAnimation = () => {
    switch (animation) {
      case 'pulse':
        return 'animate-pulse';
      case 'ping':
        return 'animate-ping';
      case 'bounce':
        return 'animate-bounce';
      case 'spin':
        return 'animate-spin';
      default:
        return 'animate-pulse';
    }
  };

  return (
    <div
      className={`
        ${getStatusColor()}
        rounded-full
        ${getAnimation()}
      `}
      style={{
        width: size,
        height: size,
      }}
    />
  );
}
