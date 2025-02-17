import { motion } from 'motion/react';
import { notification } from 'antd';
import { InfoObject, NotificationType, MonitorData } from '@/types';
import { useEffect, useCallback, useState, useContext } from 'react';

import SSEConnection from '@/utils/eventSource';
import Logs from '@/components/Log';
import ServerCard from '@/components/ServerCard';
import WarnModal from '@/components/Modal';
import { useAppDispatch, useAppSelector } from '@/store';
import { setWarningsActions } from '@/store/feature/warnings';
import { GlobalContext } from '@/context/globalContext';

export default function Home() {
  const context = useContext(GlobalContext);
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

  const { list } = useAppSelector((state) => {
    return state.warnings.list;
  });

  const [info, setInfo] = useState<InfoObject | undefined>(undefined);
  const [info2, setInfo2] = useState<InfoObject | undefined>(undefined);
  const [info3, setInfo3] = useState<InfoObject | undefined>(undefined);
  const [warnings, setWarnings] = useState<MonitorData[]>([]);

  new SSEConnection(
    // 'http://192.168.76.211:12555/msscn/serverStatusSseController/monitor',
    'http://localhost:3000/sse',
    {
      eventHandlers: {
        open() {
          console.log('sse Connection success');
        },
        message(event: Event) {
          const messageEvent = event as MessageEvent;
          const { host, monitor } = JSON.parse(messageEvent.data);

          // 处理 monitor
          const newArr = data.map((item) => {
            const i = monitor.find((m) => m[item.type]);

            return {
              ...item,
              status: i[item.type],
            };
          });

          switch (host) {
            case '10.123.0.190':
              setInfo({
                host,
                monitor: newArr,
              });
              break;
            case '10.123.0.191':
              setInfo2({
                host,
                monitor: newArr,
              });
              break;

            case '10.123.0.192':
              setInfo3({
                host,
                monitor: newArr,
              });
              break;
            default:
              break;
          }

          console.log('10s');

          dispatch(setWarningsActions({ ip: host, infos: monitor }));
        },
        error() {
          console.log('sse Connection error');
        },
      },
    }
  );

  const [api, contextHolder] = notification.useNotification({
    stack: { threshold: 6 },
  });

  const openNotificationWithIcon = useCallback(
    (type: NotificationType, title: string, ip: string) => {
      api[type]({
        message: `IP: ${ip}`,
        description: `${title}出现问题， 请检查。`,
        duration: null,
        placement: 'top',
      });
    },
    [api]
  );

  // 统计错误信息进行提示
  useEffect(() => {
    // 立即执行

    // list.map((item) => {
    //   const { ip, infos } = item;
    // });

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
  }, [info, info2, info3, openNotificationWithIcon]);

  return (
    <>
      {contextHolder}
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
