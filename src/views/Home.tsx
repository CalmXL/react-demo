import { motion } from 'motion/react';
import { InfoObject, MonitorData } from '@/types';
import { useEffect, useState } from 'react';

import Logs from '@/components/Log';
import ServerCard from '@/components/ServerCard';
import WarnModal from '@/components/Modal';
import { useAppDispatch, useAppSelector } from '@/store';
import { setWarningsAction } from '@/store/feature/warnings';

export default function Home() {
  // const context = useContext(GlobalContext); // 获取 context

  const data: MonitorData[] = [
    { type: 'Ping', title: '系统延迟', icon: 'icon-yanchi', status: 'NORMAL' },
    { type: 'Linux', title: '节点状态', icon: 'icon-node', status: 'NORMAL' },
    { type: 'Nginx', title: 'Nginx', icon: 'icon-nginx', status: 'NORMAL' },
    { type: 'Redis', title: 'Redis', icon: 'icon-redis', status: 'NORMAL' },
    { type: 'DM8', title: '达梦', icon: 'icon-dm', status: 'NORMAL' },
    {
      type: 'Workbench',
      title: '门户服务',
      icon: 'icon-home',
      status: 'NORMAL',
    },
    {
      type: 'Workmanage',
      title: '管理后台',
      icon: 'icon-manager',
      status: 'NORMAL',
    },
    {
      type: 'Cockpit',
      title: '驾驶舱',
      icon: 'icon-jiashicang',
      status: 'NORMAL',
    },
    {
      type: 'XxlJob',
      title: '定时任务服务',
      icon: 'icon-job',
      status: 'NORMAL',
    },
    {
      type: 'OpenService',
      title: '对外开放服务',
      icon: 'icon-open',
      status: 'NORMAL',
    },
  ];

  const dispatch = useAppDispatch();

  // 从 redux 中获取数据
  const list = useAppSelector((state) => {
    return state.warnings.list;
  });

  const [info, setInfo] = useState<InfoObject | undefined>(undefined);
  const [info2, setInfo2] = useState<InfoObject | undefined>(undefined);
  const [info3, setInfo3] = useState<InfoObject | undefined>(undefined);
  const [warnings, setWarnings] = useState<MonitorData[]>([]);

  // 根据 ip 分离 list
  useEffect(() => {
    list.forEach((item) => {
      const { ip, infos } = item;

      switch (ip) {
        case '10.123.0.190':
          setInfo({
            host: ip,
            monitor: infos,
          });
          break;

        case '10.123.0.191':
          setInfo2({
            host: ip,
            monitor: infos,
          });
          break;

        case '10.123.0.192':
          setInfo3({
            host: ip,
            monitor: infos,
          });
          break;

        default:
          break;
      }
    });
  }, [list]);

  // 统计错误信息进行提示
  useEffect(() => {
    // 确认所有的 warnings
    const warnings: MonitorData[] = [];

    info?.monitor.forEach((item) => {
      if (item.status !== 'NORMAL') {
        warnings.push({
          ...item,
          ip: info.host,
        });
      }
    });

    info2?.monitor.forEach((item) => {
      if (item.status !== 'NORMAL') {
        warnings.push({
          ...item,
          ip: info2.host,
        });
      }
    });

    info3?.monitor.forEach((item) => {
      if (item.status !== 'NORMAL') {
        warnings.push({
          ...item,
          ip: info3.host,
        });
      }
    });

    setWarnings(warnings);
    dispatch(setWarningsAction(warnings));
  }, [dispatch, info, info2, info3]);

  return (
    <>
      <motion.div className="w-full h-full flex-col justify-center items-center mt-2">
        <div className="w-[90%] mx-[5%] flex justify-between">
          <ServerCard
            host={info?.host || '10.123.0.190'}
            monitor={info?.monitor || data}
          />
          <ServerCard
            host={info2?.host || '10.123.0.191'}
            monitor={info2?.monitor || data}
          />
          <ServerCard
            host={info3?.host || '10.123.0.192'}
            monitor={info3?.monitor || data}
          />
        </div>
        <div className="w-[90%] mx-[5%] flex justify-evenly ">
          <Logs />
        </div>
        <WarnModal warnings={warnings} />
      </motion.div>
    </>
  );
}
