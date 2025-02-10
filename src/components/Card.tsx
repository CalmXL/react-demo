interface IProps {
  title: string;
  content: string;
  icon: string;
}

export default function Card({ title, content, icon }: IProps) {
  return (
    <div className="w-96 h-48 px-4 border-2 rounded-xl mr-4 hover:shadow-xl">
      <div className="leading-5 py-3 font-bold text-xl text-red-500">
        <i className={`iconfont text-2xl ${icon} mr-2 text-red-500`}></i>
        {title}
      </div>
      <hr />
      <div className="text-sm mt-4">{content}</div>
    </div>
  );
}
