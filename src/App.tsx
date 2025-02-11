import { useRoutes } from 'react-router-dom';
import routes from './router';
import Header from '@/components/Header';

function App() {
  return (
    // bg-[url('/src/assets/images/bg.png')
    <div className="w-full h-full flex-col  bg-gray-100 ]">
      <Header title="这是一个渐变色的标题" />
      <div>{useRoutes(routes)}</div>
    </div>
  );
}

export default App;
