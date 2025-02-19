import { useState } from 'react';
import { useRoutes } from 'react-router-dom';
import routes from './router';
import { GlobalContext } from './context/globalContext';
import { useAppDispatch } from './store';

import { setInfosActions } from '@/store/feature/warnings';
import Header from '@/components/Header';
import SSEConnection from './utils/eventSource';
import { DefaultData, MonitorData } from './types';

function App() {
  const [data, _] = useState<DefaultData[]>([]);

  const defaultData: DefaultData[] = [
    { key: 'Ping', title: '系统延迟', icon: 'icon-yanchi', value: '0.211' },
    { key: 'Nginx', title: 'Nginx', icon: 'icon-nginx', value: 'NORMAL' },
    { key: 'Redis', title: 'Redis', icon: 'icon-redis', value: 'NORMAL' },
    { key: 'DM8', title: '达梦', icon: 'icon-dm', value: 'NORMAL' },
    {
      key: 'Workbench',
      title: '门户服务',
      icon: 'icon-home',
      value: 'NORMAL',
    },
    {
      key: 'Workmanage',
      title: '管理后台',
      icon: 'icon-manager',
      value: 'NORMAL',
    },
    {
      key: 'Cockpit',
      title: '驾驶舱',
      icon: 'icon-jiashicang',
      value: 'NORMAL',
    },
    {
      key: 'XxlJob',
      title: '定时任务服务',
      icon: 'icon-job',
      value: 'NORMAL',
    },
    {
      key: 'OpenService',
      title: '对外开放服务',
      icon: 'icon-open',
      value: 'NORMAL',
    },
  ];

  const dispatch = useAppDispatch();

  // 请求 sse, 保存到 redux 当中
  // 'http://10.123.0.171:11011/server-monitorstatusMonitor'
  new SSEConnection('http://localhost:3000/sse', {
    eventHandlers: {
      open() {
        console.log('sse Connection success');
      },
      message(event: Event) {
        const messageEvent = event as MessageEvent;
        const { host, monitor } = JSON.parse(messageEvent.data);

        // 处理 monitor
        const newData = defaultData.map((item) => {
          const i: MonitorData = monitor.find(
            (m: MonitorData) => item.key === m.key
          );

          return {
            ...item,
            value: i ? i.value : item.value,
          };
        });

        dispatch(setInfosActions({ host, monitor: newData as DefaultData[] }));
      },
      error() {
        console.log('sse Connection error');
      },
    },
  });

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
