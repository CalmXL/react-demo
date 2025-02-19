import { motion } from 'motion/react';
import Card from '@/components/Card';
import { useAppSelector } from '@/store';
import { useEffect, useState } from 'react';
import { MonitorData } from '@/types';

export default function Details() {
  const [warnings, setWarnings] = useState<MonitorData[]>([]);
  const list = useAppSelector((state) => state.warnings.list);

  console.log(list);

  useEffect(() => {
    // 确认所有的 warnings
    let innerWarnings: MonitorData[] = [];

    list.forEach(({ ip, infos }) => {
      const arr = infos
        .filter((item) => item.status !== 'NORMAL')
        .map((item2) => {
          return {
            ...item2,
            ip,
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
          return <Card key={`${item.ip}${item.title}`} {...item} />;
        })}
      {warnings.length === 0 && (
        <div className="w-full h-full flex justify-center items-center">
          暂无错误
        </div>
      )}
    </motion.div>
  );
}
