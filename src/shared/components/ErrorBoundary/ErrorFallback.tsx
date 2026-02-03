import React from 'react';

import {
  ErrorFallbackWrapper,
  ErrorMessage,
  ErrorTitle,
  RetryButton,
} from './ErrorFallback.styled';

export type ErrorFallbackLevel = 'app' | 'page' | 'module';

export interface ErrorFallbackProps {
  error: Error;
  level?: ErrorFallbackLevel;
  onRetry?: () => void;
}

const levelLabels: Record<ErrorFallbackLevel, string> = {
  app: 'Приложение',
  page: 'Страница',
  module: 'Модуль',
};

export const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  level = 'module',
  onRetry,
}) => {
  const label = levelLabels[level];
  return (
    <ErrorFallbackWrapper role="alert">
      <ErrorTitle>Ошибка в {label}</ErrorTitle>
      <ErrorMessage>{error.message}</ErrorMessage>
      {onRetry && (
        <RetryButton type="button" onClick={onRetry}>
          Повторить
        </RetryButton>
      )}
    </ErrorFallbackWrapper>
  );
};
