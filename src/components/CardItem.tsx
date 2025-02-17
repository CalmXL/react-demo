import React from 'react';
import { motion } from 'motion/react';

type Status = 'NORMAL' | 'WARNING' | 'ERROR';

interface ICardItemProps {
  title: string;
  icon: string;
  status: Status;
}

const CarItem: React.FC<ICardItemProps> = ({
  title,
  icon,
  status = 'NORMAL',
}) => {
  const statusColor = getStatusColor(status);
  const isDangerous = status === 'ERROR';

  function getStatusColor(status: Status) {
    switch (status) {
      case 'NORMAL':
        return 'text-green-500';
      case 'WARNING':
        return 'text-orange-500';
      case 'ERROR':
        return 'text-red-500';
      default:
        break;
    }
  }

  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      className={`cursor-pointer border-2 w-[350px] h-[50px] rounded-lg shadow-lg flex items-center justify-center 
      ${isDangerous ? 'animate-pulse bg-red-400' : 'bg-white '}  `}>
      <i className={`iconfont text-2xl ${icon} mr-2 ${statusColor}`}></i>
      <span className={`${isDangerous ? 'text-gray' : statusColor}`}>
        {title}
      </span>
    </motion.div>
  );
};

export default CarItem;
