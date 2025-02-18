import { useAppSelector } from '@/store';
import VirtualList from 'rc-virtual-list';
import { useState, useEffect } from 'react';
import { List, Spin } from 'antd';

import { MonitorData, Status } from '@/types';

// const fakeDataUrl =
//   'https://randomuser.me/api/?results=20&inc=name,gender,email,nat,picture&noinfo';
const ContainerHeight = 150;

const Logs: React.FC = () => {
  const list = useAppSelector((state) => state.warnings.list);
  console.log(list);

  const [loading1, setLoading1] = useState<boolean>(true);
  const [loading2, setLoading2] = useState<boolean>(true);
  const [data1, setData1] = useState<MonitorData[]>([]);
  const [data2, setData2] = useState<MonitorData[]>([]);

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
    const corrects: MonitorData[] = [];
    const warnings: MonitorData[] = [];

    list.map(({ ip, infos }) => {
      infos.map((item: MonitorData) => {
        if (item.status === 'NORMAL') {
          corrects.push({
            ip,
            icon: item.icon,
            title: item.title,
            content: item.title,
            status: item.status,
          });
        } else {
          warnings.push({
            ip,
            icon: item.icon,
            title: item.title,
            content: item.title,
            status: item.status,
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

  function getStatusColor(status: Status) {
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
            itemKey={(record) => `${record.ip}${record.title}`}
            onScroll={onScroll}>
            {(item: MonitorData) => (
              <List.Item key={`${item.ip}${item.title}`}>
                <div className={`${getStatusColor(item.status)}`}>
                  <i className={`iconfont ${item.icon}`}></i>
                  <div>
                    {item.title}-{item.ip}
                  </div>
                </div>
                <div className="mr-4">
                  <div>{item.content}</div>
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
            itemKey={(record) => `${record.ip}${record.title}`}
            onScroll={onScroll}>
            {(item: MonitorData) => (
              <List.Item key={`${item.ip}${item.title}`}>
                <div className={`${getStatusColor(item.status)}`}>
                  <i className={`iconfont ${item.icon}`}></i>
                  <div>
                    {item.title}-{item.ip}
                  </div>
                </div>
                <div className="mr-4">
                  <div>{item.content}</div>
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
