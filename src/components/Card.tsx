interface IProps {
  title: string;
  ip?: string;
  content?: string;
  icon: string;
  status: 'WARNING' | 'ERROR' | 'NORMAL';
}

export default function Card({ title, ip, content, icon, status }: IProps) {
  const isError = status === 'ERROR';

  return (
    <div
      className={`w-96 h-48 px-4 border-2 rounded-xl mt-4 mr-4 hover:shadow-xl bg-white shadow-inner ${
        isError
          ? 'border-red-600  shadow-red-500/70'
          : 'border-orange-600 shadow-orange-500/70'
      } `}>
      <div
        className={`leading-5 py-3 font-bold text-xl ${
          isError ? 'text-red-500' : 'text-orange-500'
        } flex justify-between`}>
        <div>
          <i
            className={`iconfont text-2xl ${icon} mr-2 ${
              isError ? 'text-red-500' : 'text-orange-500'
            }`}></i>
          {title} {ip}
        </div>
        <div>
          <i className="iconfont icon-tishi text-2xl mr-2 text-gray-500 cursor-pointer"></i>
        </div>
      </div>
      <hr />
      <div className="text-sm mt-4">{content || `${title} is error`}</div>
    </div>
  );
}
