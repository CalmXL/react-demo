import { motion } from 'motion/react';
import Card from '@/components/Card';
import { useAppSelector } from '@/store';
import store from '@/store';
import { IData } from '@/types';
import { useEffect, useState } from 'react';

export default function Details() {
  // const warnings = useAppSelector(
  //   (state) => state.warnings
  // ) as unknown as IData[]; // 移到组件顶层
  const [currentValue, setCurrentValue] = useState<IData[]>([]);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const latestWarnings = store.getState().warnings;
      console.log(latestWarnings);

      if (currentValue !== latestWarnings.warnings) {
        setCurrentValue(latestWarnings.warnings); // 使用 setCurrentValue 更新状态
      }
    });

    return () => {
      unsubscribe(); // 清理订阅
    };
  }, [currentValue]); // 依赖于 warnings

  // const infos = [
  //   {
  //     title: 'redis',
  //     ip: '10.123.0.190',
  //     content: 'redis出现错误, 请检查对应服务',
  //     icon: 'icon-redis',
  //   },
  //   {
  //     title: 'DM',
  //     ip: '10.123.0.191',
  //     content: 'mysql出现错误, 请检查对应服务',
  //     icon: 'icon-dm',
  //   },
  // ];

  return (
    <motion.div className="p-5 flex ">
      {currentValue.length > 0 &&
        currentValue.map((item) => {
          return <Card key={item.title} {...item} />;
        })}
    </motion.div>
  );
}
