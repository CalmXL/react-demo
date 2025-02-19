import { WarningData } from '@/types';

export default function Card({ title, icon, value, host }: WarningData) {
  const isError = value === 'ERROR';

  return (
    <div
      className={`w-80 h-48 px-4 border-2 rounded-xl mt-4 mr-12 hover:shadow-xl bg-white shadow-inner ${
        isError ? 'border-red-600  shadow-red-500/70' : 'border-orange-500 '
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
          {title} {host}
        </div>
        <div>
          <i className="iconfont icon-tishi text-2xl mr-2 text-gray-500 cursor-pointer"></i>
        </div>
      </div>
      <hr />
      <div className="text-sm mt-4">{`${title} is error`}</div>
    </div>
  );
}
