import React from 'react';

import { FallbackText, FallbackWrapper, Spinner } from './SuspenseFallback.styled';

export const SuspenseFallback: React.FC = () => {
  return (
    <FallbackWrapper>
      <Spinner />
      <FallbackText>Загрузка…</FallbackText>
    </FallbackWrapper>
  );
};
