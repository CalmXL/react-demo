export type Status = 'NORMAL' | 'WARNING' | 'ERROR';

export type DefaultData =
  | {
      host?: string;
      key: 'Ping';
      title: string;
      icon: string;
      value: string;
    }
  | {
      host?: string;
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
