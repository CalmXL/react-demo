import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import CardItem from './CardItem';
import './serverCard.css';
import { ICard } from '@/types';

export default function ServerCard({
  server,
  info,
}: {
  server: string;
  info: ICard[];
}) {
  const items: ICard[] = [
    { title: '门户服务', icon: 'icon-home', status: 'success' },
    { title: '管理后台', icon: 'icon-manager', status: 'success' },
    { title: '驾驶舱', icon: 'icon-jiashicang', status: 'success' },
    { title: '定时任务服务', icon: 'icon-job', status: 'success' },
    { title: '对外开放服务', icon: 'icon-open', status: 'success' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const isRunningSuccess = () => {
    return info.every((item) => item.status === 'success');
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [items.length]);

  return (
    <div
      className={`bg-white w-[25rem] h-[33rem] rounded-xl shadow-2xl p-4 flex flex-col items-center justify-between opacity-80 ${
        isRunningSuccess() ? 'success-box' : ''
      }`}>
      <motion.h1
        whileHover={{ scale: 1.1 }}
        className=" cursor-pointer text-2xl font-bold">
        节点: {server}
      </motion.h1>
      {/* <CardItem title="系统延迟" icon="icon-yanchi" status="error" />
      <CardItem title="节点状态" icon="icon-node" status="warn" />
      <CardItem title="Keep-alived" icon="icon-k" status="success" />
      <CardItem title="Nginx" icon="icon-nginx" status="success" />
      <CardItem title="Redis" icon="icon-redis" status="success" />
      <CardItem title="达梦数据库" icon="icon-dm" status="success" />

      <motion.div
        key={currentIndex}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}>
        <CardItem
          title={items[currentIndex].title}
          icon={items[currentIndex].icon}
          status={items[currentIndex].status}
        />
      </motion.div> */}

      {info.map((item, index) => (
        <CardItem
          key={index}
          title={item.title}
          icon={item.icon}
          status={item.status}
        />
      ))}
    </div>
  );
}
