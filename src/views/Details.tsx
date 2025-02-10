import Card from '@/components/Card';

export default function Details() {
  const infos = [
    {
      title: 'redis',
      content: 'redis出现错误, 请检查对应服务',
      icon: 'icon-redis',
    },
    {
      title: 'DM',
      content: 'mysql出现错误, 请检查对应服务',
      icon: 'icon-dm',
    },
  ];

  return (
    <div className="p-5 flex">
      {infos.map((item) => {
        return <Card {...item} />;
      })}
    </div>
  );
}
