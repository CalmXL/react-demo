import ServerCard from '@/components/ServerCard';
import { motion } from 'motion/react';

export default function Home() {
  return (
    <motion.div className="w-full h-full flex justify-evenly items-center mt-2">
      <ServerCard server="10.123.0.190" />
      <ServerCard server="10.123.0.191" />
      <ServerCard server="10.123.0.192" />
    </motion.div>
  );
}
