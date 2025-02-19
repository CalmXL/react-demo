import { motion } from 'motion/react';
import Card from '@/components/Card';
import { useAppSelector } from '@/store';
import { useEffect, useState } from 'react';
import { WarningData } from '@/types';

export default function Details() {
  const [warnings, setWarnings] = useState<WarningData[]>([]);
  const list = useAppSelector((state) => state.warnings.list);

  console.log(list);

  useEffect(() => {
    // 确认所有的 warnings
    let innerWarnings: WarningData[] = [];

    list.forEach(({ host, monitor }) => {
      const arr = monitor
        .filter((item) => item.value !== 'NORMAL')
        .map((item2) => {
          return {
            title: item2.title,
            icon: item2.icon,
            value: item2.value,
            host,
          };
        });

      innerWarnings = innerWarnings.concat(...arr);
    });

    setWarnings(innerWarnings);
  }, [list]);

  return (
    <motion.div className="px-10 h-full flex flex-wrap">
      {warnings.length > 0 &&
        warnings.map((item) => {
          return <Card key={`${item.host}${item.title}`} {...item} />;
        })}
      {warnings.length === 0 && (
        <div className="w-full h-full flex justify-center items-center">
          暂无错误
        </div>
      )}
    </motion.div>
  );
}
