import React from 'react';
import { motion } from 'motion/react';
import { Status } from '@/types';

interface ICardItemProps {
  title: string;
  icon: string;
  status: Status | string;
}

const CarItem: React.FC<ICardItemProps> = ({
  title,
  icon,
  status = 'NORMAL',
}) => {
  const statusColor = getStatusColor(status);
  const isDangerous = status === 'ERROR';
  const isWarning = status === 'WARNING' || status === '-1';

  function getStatusColor(status: Status | string) {
    switch (status) {
      case 'NORMAL':
        return 'text-green-500';
      case 'WARNING':
      case '-1':
        return 'text-orange-900';
      case 'ERROR':
        return 'text-red-900';
      default:
        return 'text-green-500';
    }
  }

  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      className={`cursor-pointer border-2 w-[100%] py-2 rounded-lg shadow-lg flex items-center justify-center 
      ${
        isDangerous
          ? 'animate-pulse bg-red-400'
          : isWarning
          ? 'animate-pulse bg-orange-300'
          : 'bg-white'
      } 
      }`}>
      <i className={`iconfont text-2xl ${icon} mr-2 ${statusColor}`}></i>
      <span className={`${statusColor}`}>{title}</span>
      {title === '系统延迟' && (
        <span className={`text-sm ${statusColor}`}>:{status}</span>
      )}
    </motion.div>
  );
};

export default CarItem;
