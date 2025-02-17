export interface ICard {
  type: string;
  title: string;
  icon: string;
  status: 'WARNING' | 'ERROR' | 'NORMAL';
}

export interface IInfo {
  infos: ICard[];
  servers: ICard[];
}

export type NotificationType = 'success' | 'info' | 'warning' | 'error';
export interface IData {
  type: string;
  title: string;
  icon: string;
  status: string;
  ip?: string;
}

export interface MonitorData extends IData {
  [key: string]: string | undefined; // 监控项的名称和状态
  status: 'WARNING' | 'ERROR' | 'NORMAL'; // 添加状态类型
}

export interface InfoObject {
  host: string;
  monitor: MonitorData[];
}
