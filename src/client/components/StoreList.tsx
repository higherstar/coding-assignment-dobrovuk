import React from 'react';
import { Space, Pagination  } from 'antd';
import styled from 'styled-components';

import StoreCard from './StoreCard';
import { IPagination } from '../interface/filter.interface';

const StyledSpace = styled(Space)`
  width: 100%;
`;

interface IStoresProps {
  stores: any[];
  pagination: IPagination;
  totalCount: number;
  onChangePagination: (value: IPagination) => void;
}

export default function ({
  stores,
  pagination,
  onChangePagination,
  totalCount,
}: IStoresProps) {
  const handlePageChange = (page: number, pageSize: number) => {
    onChangePagination({ offset: page, limit: pageSize });
  };

  return (
    <StyledSpace direction="vertical" align="center">
      <Pagination
        current={pagination.offset}
        defaultCurrent={1}
        total={totalCount}
        pageSize={pagination.limit}
        onChange={handlePageChange}
      />
      {stores.map((store) => (
        <StoreCard key={store.uuid} {...store} />
      ))}
    </StyledSpace>
  );
}
