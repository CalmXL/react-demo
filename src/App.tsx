import { useRoutes } from 'react-router-dom';
import routes from './router';
import Header from '@/components/Header';

import { GlobalContext } from './context/globalContext';

function App() {
  const data: {
    ip: string;
    infos: any[];
  }[] = [
    {
      ip: '10.123.0.1',
      infos: [
        {
          Redis: 'NORMAL',
        },
      ],
    },
  ];

  return (
    // bg-[url('/src/assets/images/bg.png')
    <div className="w-full h-full flex-col  bg-gray-100 ]">
      <Header title="这是一个渐变色的标题" />
      <GlobalContext.Provider value={data}>
        <div>{useRoutes(routes)}</div>
      </GlobalContext.Provider>
    </div>
  );
}

export default App;
