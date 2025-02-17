import { memo } from 'react';
import { motion } from 'motion/react';
import { Carousel } from 'antd';
import CardItem from './CardItem';
import './serverCard.css';
import { InfoObject } from '@/types';

function ServerCard({ host, monitor }: InfoObject) {
  const isRunningSuccess = () => {
    return [...monitor].every((item) => item.status === 'NORMAL');
  };

  // monitor 进行数据分离
  const servers = [
    'Cockpit',
    'Workbench',
    'Workmanage',
    'OpenService',
    'XxlJob',
  ];
  const info1 = monitor.filter((item) => !servers.includes(item.type));
  const info2 = monitor.filter((item) => servers.includes(item.type));

  console.log(info1, info2);

  return (
    <div
      className={`bg-white w-[25rem] h-[33rem] rounded-xl shadow-2xl p-4 flex flex-col items-center justify-between opacity-80 ${
        isRunningSuccess() ? 'success-box' : ''
      }`}>
      <motion.h1
        whileHover={{ scale: 1.1 }}
        className=" cursor-pointer text-2xl font-bold">
        节点: {host}
      </motion.h1>

      {info1.map((item, index) => (
        <CardItem
          key={index}
          title={item.title}
          icon={item.icon}
          status={item.status}
        />
      ))}

      <div className="w-[350px]">
        <Carousel autoplay fade dots={false}>
          {info2.map((item2) => (
            <CardItem
              key={item2.icon}
              title={item2.title}
              icon={item2.icon}
              status={item2.status}
            />
          ))}
        </Carousel>
      </div>
    </div>
  );
}

export default memo(ServerCard);
