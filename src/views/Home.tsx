import Logs from '@/components/Log';
import ServerCard from '@/components/ServerCard';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { ICard } from '@/types';

export default function Home() {
  const navigate = useNavigate();

  // <CardItem title="系统延迟" icon="icon-yanchi" status="error" />
  // <CardItem title="节点状态" icon="icon-node" status="warn" />
  // <CardItem title="Keep-alived" icon="icon-k" status="success" />
  // <CardItem title="Nginx" icon="icon-nginx" status="success" />
  // <CardItem title="Redis" icon="icon-redis" status="success" />
  // <CardItem title="达梦数据库" icon="icon-dm" status="success" />
  const info1: ICard[] = [
    { title: '系统延迟', icon: 'icon-yanchi', status: 'success' },
    { title: '节点状态', icon: 'icon-node', status: 'error' },
    { title: 'Keep-alived', icon: 'icon-k', status: 'success' },
    { title: 'Nginx', icon: 'icon-nginx', status: 'success' },
    { title: 'Redis', icon: 'icon-redis', status: 'success' },
    { title: '达梦数据库', icon: 'icon-dm', status: 'success' },
    // { title: '门户服务', icon: 'icon-home', status: 'success' },
    // { title: '管理后台', icon: 'icon-manager', status: 'success' },
    // { title: '驾驶舱', icon: 'icon-jiashicang', status: 'success' },
    // { title: '定时任务服务', icon: 'icon-job', status: 'success' },
    // { title: '对外开放服务', icon: 'icon-open', status: 'success' },
  ];

  const info2: ICard[] = [
    { title: '系统延迟', icon: 'icon-yanchi', status: 'success' },
    { title: '节点状态', icon: 'icon-node', status: 'success' },
    { title: 'Keep-alived', icon: 'icon-k', status: 'success' },
    { title: 'Nginx', icon: 'icon-nginx', status: 'success' },
    { title: 'Redis', icon: 'icon-redis', status: 'success' },
    { title: '达梦数据库', icon: 'icon-dm', status: 'success' },
    // { title: '门户服务', icon: 'icon-home', status: 'success' },
    // { title: '管理后台', icon: 'icon-manager', status: 'success' },
    // { title: '驾驶舱', icon: 'icon-jiashicang', status: 'success' },
    // { title: '定时任务服务', icon: 'icon-job', status: 'success' },
    // { title: '对外开放服务', icon: 'icon-open', status: 'success' },
  ];

  const info3: ICard[] = [
    { title: '系统延迟', icon: 'icon-yanchi', status: 'success' },
    { title: '节点状态', icon: 'icon-node', status: 'success' },
    { title: 'Keep-alived', icon: 'icon-k', status: 'success' },
    { title: 'Nginx', icon: 'icon-nginx', status: 'success' },
    { title: 'Redis', icon: 'icon-redis', status: 'success' },
    { title: '达梦数据库', icon: 'icon-dm', status: 'success' },
    // { title: '门户服务', icon: 'icon-home', status: 'success' },
    // { title: '管理后台', icon: 'icon-manager', status: 'success' },
    // { title: '驾驶舱', icon: 'icon-jiashicang', status: 'success' },
    // { title: '定时任务服务', icon: 'icon-job', status: 'success' },
    // { title: '对外开放服务', icon: 'icon-open', status: 'success' },
  ];

  // sse 接口返回对应数据, 如果数据存在问题则跳转到详情页路由

  // setTimeout(() => {
  //   navigate('/details');
  // }, 10000);

  return (
    <motion.div className="w-full h-full flex-col justify-center items-center mt-2">
      <div className="w-[90%] mx-[5%] flex justify-between">
        <ServerCard server="10.123.0.190" info={info1} />
        <ServerCard server="10.123.0.191" info={info2} />
        <ServerCard server="10.123.0.192" info={info3} />
      </div>

      <div className="w-[90%] mx-[5%] flex justify-evenly ">
        <Logs />
      </div>
    </motion.div>
  );
}
