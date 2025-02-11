import React from 'react';
import { motion } from 'motion/react';

type Status = 'success' | 'warn' | 'error';

interface ICardItemProps {
  title: string;
  icon: string;
  status: Status;
}

const CarItem: React.FC<ICardItemProps> = ({
  title,
  icon,
  status = 'success',
}) => {
  const statusColor = getStatusColor(status);
  const isDangerous = status === 'error';

  function getStatusColor(status: Status) {
    switch (status) {
      case 'success':
        return 'text-green-500';
      case 'warn':
        return 'text-orange-500';
      case 'error':
        return 'text-red-500';
      default:
        break;
    }
  }

  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      className={`cursor-pointer border-2 w-[350px] h-[50px] rounded-lg shadow-lg flex items-center justify-center bg-white 
      ${isDangerous ? 'animate-pulse bg-red-300' : ''}  `}>
      <i className={`iconfont text-2xl ${icon} mr-2 ${statusColor}`}></i>
      <span className={`${isDangerous ? 'text-gray' : statusColor}`}>
        {title}
      </span>
    </motion.div>
  );
};

export default CarItem;
