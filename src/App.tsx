import { useState } from 'react';
import { useRoutes } from 'react-router-dom';
import routes from './router';
import { GlobalContext } from './context/globalContext';
import { useAppDispatch } from './store';

import { setInfosActions } from '@/store/feature/warnings';
import Header from '@/components/Header';
import SSEConnection from './utils/eventSource';
import { MonitorData } from './types';

function App() {
  const [data, _] = useState<MonitorData[]>([]);

  const defaultData: MonitorData[] = [
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

  // 请求 sse, 保存到 redux 当中
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
          const newData = defaultData.map((item) => {
            const i = monitor.find(
              (m: { [key: string]: string }) => m[item.type!]
            );

            return {
              ...item,
              status: i?.[item.type!],
            };
          });

          // setData(newData);
          dispatch(setInfosActions({ ip: host, infos: newData }));
        },
        error() {
          console.log('sse Connection error');
        },
      },
    }
  );

  return (
    <div className="w-[100%] min-h-screen flex-col bg-gray-100">
      <Header title="工作台集群监控" />
      <GlobalContext.Provider value={data}>
        <div>{useRoutes(routes)}</div>
      </GlobalContext.Provider>
    </div>
  );
}

export default App;
