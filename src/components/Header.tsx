import Nav from './Nav';

export default function Header({ title }: { title: string }) {
  return (
    <div className="bg-gray-800 relative">
      <Nav />
      <div className="absolute right-2 top-0 h-[100%] flex items-center cursor-pointer text-white hover:text-gray-200">
        <i className="iconfont icon-shouce text-xl mr-1"></i>
        运维手册
      </div>
    </div>
  );
}
