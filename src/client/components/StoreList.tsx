import React, { useEffect, useState } from 'react';
import { Space, Pagination  } from 'antd';
import styled from 'styled-components';

import { getStores } from '../app/api';
import StoreCard from './StoreCard';

const StyledSpace = styled(Space)`
  width: 100%;
`;

interface IStoresProps {
  stores: any[],
}

export default function ({ stores }: IStoresProps) {
  const [totalCount, setTotalCount] = useState(500);
  const [offset, setOffset] = useState(1);
  const [limit, setLimit] = useState(10);


  const handlePageChange = (page: number, pageSize: number) => {
    setOffset(page);
    setLimit(pageSize);
  };

  return (
    <StyledSpace direction="vertical" align="center">
      <Pagination
        current={offset}
        defaultCurrent={1}
        total={totalCount}
        pageSize={limit}
        onChange={handlePageChange}
      />
      {stores.map((store) => (
        <StoreCard key={store.uuid} {...store} />
      ))}
    </StyledSpace>
  );
}
