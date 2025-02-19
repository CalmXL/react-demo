import { useAppSelector } from '@/store';
import VirtualList from 'rc-virtual-list';
import { useState, useEffect } from 'react';
import { List, Spin } from 'antd';

import { MonitorData, Status, InfoObject, DefaultData } from '@/types';

// const fakeDataUrl =
//   'https://randomuser.me/api/?results=20&inc=name,gender,email,nat,picture&noinfo';
const ContainerHeight = 150;

const Logs: React.FC = () => {
  const list = useAppSelector((state) => state.warnings.list);

  const [loading1, setLoading1] = useState<boolean>(true);
  const [loading2, setLoading2] = useState<boolean>(true);
  const [data1, setData1] = useState<DefaultData[]>([]);
  const [data2, setData2] = useState<DefaultData[]>([]);

  // const appendData = (showMessage = true) => {
  //   fetch(fakeDataUrl)
  //     .then((res) => res.json())
  //     .then((body) => {
  //       setData(data.concat(body.results));
  //       if (showMessage) {
  //         message.success(`${body.results.length} more items loaded!`);
  //       }
  //     });
  // };

  useEffect(() => {
    setLoading1(true); // 设置 loading 为 true
    setLoading2(true); // 设置 loading 为 true
    // appendData(false);
    const corrects: DefaultData[] = [];
    const warnings: DefaultData[] = [];

    list.map(({ host, monitor }: InfoObject) => {
      monitor.map((item) => {
        if (item.value === 'NORMAL') {
          corrects.push({
            host,
            ...item,
          });
        } else {
          warnings.push({
            host,
            ...item,
          });
        }
      });
    });

    setData1(corrects);
    setData2(warnings);
    setLoading1(false);
    setLoading2(false);
  }, [list]);

  const onScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
    // Refer to: https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight#problems_and_solutions
    if (
      Math.abs(
        e.currentTarget.scrollHeight -
          e.currentTarget.scrollTop -
          ContainerHeight
      ) <= 1
    ) {
      // appendData();
    }
  };

  function getStatusColor(status: Status | string) {
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
    <div className="w-[100%] h-[12rem] flex mt-5">
      <List className="flex-1 mr-8 bg-white px-5 py-2 rounded-xl">
        <Spin spinning={loading1}>
          <VirtualList
            data={data1}
            height={ContainerHeight}
            itemHeight={40}
            itemKey={(record) => `${record.host}${record.title}`}
            onScroll={onScroll}>
            {(item: DefaultData) => (
              <List.Item key={`${item.host}${item.title}`}>
                <div className={`${getStatusColor(item.value)}`}>
                  <i className={`iconfont ${item.icon}`}></i>
                  <div>
                    {item.title}-{item.host}
                  </div>
                </div>
                <div className="mr-4">
                  <div>{item.title}</div>
                </div>
              </List.Item>
            )}
          </VirtualList>
        </Spin>
      </List>

      <List className="flex-1 bg-white px-5 py-2 rounded-xl">
        <Spin spinning={loading2}>
          <VirtualList
            data={data2}
            height={ContainerHeight}
            itemHeight={40}
            itemKey={(record) => `${record.host}${record.title}`}
            onScroll={onScroll}>
            {(item: DefaultData) => (
              <List.Item key={`${item.host}${item.title}`}>
                <div className={`${getStatusColor(item.value)}`}>
                  <i className={`iconfont ${item.icon}`}></i>
                  <div>
                    {item.title}-{item.host}
                  </div>
                </div>
                <div className="mr-4">
                  <div>{item.title}</div>
                </div>
              </List.Item>
            )}
          </VirtualList>
        </Spin>
      </List>
    </div>
  );
};

export default Logs;
