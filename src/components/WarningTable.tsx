import React, { ReactNode } from 'react';
import { Table, Tag } from 'antd';

import { IData } from '@/types';

const { Column } = Table;

interface IProps {
  children?: ReactNode;
  data: IData[];
}

const WaringTable: React.FC<IProps> = ({ data }) => (
  <Table<IData> dataSource={data}>
    <Column title="ip" dataIndex="ip" key="ip" />
    <Column title="标题" dataIndex="title" key="title" />

    <Column
      title="状态"
      dataIndex="status"
      key="status"
      render={(status: string) => (
        <>
          {
            <Tag
              color={
                status === 'WARNING'
                  ? 'rgb(249 115 22 / var(--tw-text-opacity, 1))'
                  : 'rgb(239 68 68 / var(--tw-text-opacity, 1))'
              }
              key={status}>
              {status.toUpperCase()}
            </Tag>
          }
        </>
      )}
    />
  </Table>
);

export default WaringTable;
