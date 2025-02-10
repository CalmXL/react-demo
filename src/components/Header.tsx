import Nav from './Nav';

export default function Header({ title }: { title: string }) {
  return (
    <div className="bg-gray-800">
      <Nav />
      {/* <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-500 via-green-500 to-purple-500 bg-clip-text text-transparent">
        {title}
      </h1> */}
    </div>
  );
}
