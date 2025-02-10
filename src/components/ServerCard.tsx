import CardItem from './CardItem';
import { motion } from 'motion/react';

export default function ServerCard({ server }: { server: string }) {
  return (
    <div className="bg-white w-[400px] h-[800px] rounded-xl shadow-2xl p-4 flex flex-col items-center justify-between opacity-80">
      <motion.h1
        whileHover={{ scale: 1.1 }}
        className=" cursor-pointer text-2xl font-bold">
        节点: {server}
      </motion.h1>
      <CardItem title="系统延迟" icon="icon-yanchi" status="error" />
      <CardItem title="节点状态" icon="icon-node" status="warn" />
      <CardItem title="Keep-alived" icon="icon-k" status="success" />
      <CardItem title="Nginx" icon="icon-nginx" status="success" />
      <CardItem title="Redis" icon="icon-redis" status="success" />
      <CardItem title="达梦数据库" icon="icon-dm" status="success" />
      <CardItem title="门户服务" icon="icon-home" status="success" />
      <CardItem title="管理后台" icon="icon-manager" status="success" />
      <CardItem title="驾驶舱" icon="icon-jiashicang" status="success" />
      <CardItem title="定时任务服务" icon="icon-job" status="success" />
      <CardItem title="对外开放服务" icon="icon-open" status="success" />
    </div>
  );
}
