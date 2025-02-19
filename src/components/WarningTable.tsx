import React, { ReactNode } from 'react';
import { Table, Tag } from 'antd';

import { WarningData } from '@/types';

const { Column } = Table;

interface IProps {
  children?: ReactNode;
  data: WarningData[];
}

const WaringTable: React.FC<IProps> = ({ data }) => (
  <Table<WarningData>
    dataSource={data}
    rowKey={(record) => record.host + record.title}>
    <Column title="IP" dataIndex="host" key="host" />
    <Column title="标题" dataIndex="title" key="title" />

    <Column
      title="状态"
      dataIndex="value"
      key="value"
      render={(value: string) => (
        <>
          {
            <Tag
              color={
                value === 'WARNING'
                  ? 'rgb(249 115 22 / var(--tw-text-opacity, 1))'
                  : 'rgb(239 68 68 / var(--tw-text-opacity, 1))'
              }>
              {value.toUpperCase()}
            </Tag>
          }
        </>
      )}
    />
  </Table>
);

export default WaringTable;
