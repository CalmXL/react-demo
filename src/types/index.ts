export type Status = 'NORMAL' | 'WARNING' | 'ERROR';

export interface ICard {
  type: string;
  title: string;
  icon: string;
  status: Status;
}

export interface IInfo {
  infos: ICard[];
  servers: ICard[];
}

export interface IData {
  type?: string;
  title: string;
  icon: string;
  status: string;
  ip?: string;
}

// export interface MonitorData extends IData {
//   content?: string;
//   status: Status; // 添加状态类型
// }

export type DefaultData =
  | {
      key: 'Ping';
      title: string;
      icon: string;
      value: string;
    }
  | {
      key: Exclude<string, 'Ping'>;
      title: string;
      icon: string;
      value: Status;
    };

export type MonitorData =
  | {
      key: 'Ping';
      value: string;
    }
  | {
      key: Exclude<string, 'Ping'>;
      value: Status;
    };
export interface InfoObject {
  host: string;
  monitor: DefaultData[];
}

export interface WarningData extends Omit<DefaultData, 'key'> {
  host: string;
}
