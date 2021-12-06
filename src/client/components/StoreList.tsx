import React, { useEffect, useState } from 'react';
import { Space } from 'antd';

import { getStores } from '../app/api';
import StoreCard from './StoreCard';
import styled from 'styled-components';

const StyledSpace = styled(Space)`
  width: 100%;
`;

export default function () {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    (async () => {
      setStores((await getStores()).data);
    })();
  }, []);

  return (
    <StyledSpace direction="vertical" align="center">
      {stores.map((store) => (
        <StoreCard key={store.uuid} {...store} />
      ))}
    </StyledSpace>
  );
}
