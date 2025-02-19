import { memo } from 'react';
import { motion } from 'motion/react';
import { Carousel } from 'antd';
import CardItem from './CardItem';
import './serverCard.css';
import { InfoObject } from '@/types';

function ServerCard({ host, monitor }: InfoObject) {
  const isRunningSuccess = () => {
    return [...monitor].every((item) => {
      if (item.key !== 'Ping') {
        return item.value === 'NORMAL';
      } else {
        return item.value !== '-1';
      }
    });
  };

  // monitor 进行数据分离
  const servers = [
    'Cockpit',
    'Workbench',
    'Workmanage',
    'OpenService',
    'XxlJob',
  ];
  const info1 = monitor.filter((item) => !servers.includes(item.key!));
  const info2 = monitor.filter((item) => servers.includes(item.key!));

  return (
    <div
      className={`bg-white w-[25rem] h-[25rem] rounded-xl shadow-2xl p-4 flex flex-col items-center justify-between opacity-80 ${
        isRunningSuccess() ? 'success-box' : ''
      }`}>
      <motion.h1
        whileHover={{ scale: 1.1 }}
        className=" cursor-pointer text-2xl font-bold">
        节点: {host}
      </motion.h1>

      {info1.map((item) => (
        <CardItem
          key={item.icon}
          title={item.title}
          icon={item.icon}
          status={item.value}
        />
      ))}

      <div className="w-[100%]">
        <Carousel
          autoplay
          speed={1000}
          dots={false}
          draggable={true}
          effect="fade">
          {info2.map((item2) => (
            <CardItem
              key={item2.icon}
              title={item2.title}
              icon={item2.icon}
              status={item2.value}
            />
          ))}
        </Carousel>
      </div>
    </div>
  );
}

export default memo(ServerCard);
