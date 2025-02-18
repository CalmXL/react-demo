import Nav from './Nav';
import Time from './Time';

export default function Header({ title }: { title: string }) {
  return (
    <div className="bg-gray-800 relative">
      <Nav />
      <h1 className="absolute text-xl font-bold top-1/2 left-1/2 text-white -translate-x-1/2 -translate-y-1/2">
        {title}
      </h1>

      <Time />
      {/* <div className="absolute right-2 top-0 h-[100%] flex items-center cursor-pointer text-white hover:text-gray-200">
        <i className="iconfont icon-shouce text-xl mr-1"></i>
        运维手册
      </div> */}
    </div>
  );
}
