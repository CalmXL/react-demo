import React from 'react';

export const GlobalContext = React.createContext<
  | {
      ip: string;
      infos: any[];
    }
  | []
>([]);
