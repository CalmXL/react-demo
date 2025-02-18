import { MonitorData } from '@/types';
import React from 'react';

export const GlobalContext = React.createContext<MonitorData[] | []>([]);
