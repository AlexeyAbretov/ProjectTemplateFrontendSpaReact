import { Component, ErrorInfo, ReactNode } from 'react';

import { ErrorFallback } from './ErrorFallback';

export interface ErrorBoundaryProps {
  children: ReactNode;
  /** Кастомный fallback UI. По умолчанию — ErrorFallback */
  fallback?: ReactNode;
  /** Уровень границы: для отображения в fallback и логах */
  level?: 'app' | 'page' | 'module';
  /** Идентификатор границы */
  componentName?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error Boundary — перехватывает ошибки рендера в дочерних компонентах.
 * Используется на уровне приложения, страницы или модуля.
 * Не ловит: event handlers, async код, SSR, ошибки внутри самой границы.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  static defaultProps: Partial<ErrorBoundaryProps> = {
    level: 'module',
  };

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error(
      `[ErrorBoundary ${this.props.level ?? ''} ${this.props.componentName ?? ''}]`,
      error,
      errorInfo.componentStack,
    );
  }

  render(): ReactNode {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallback !== undefined) {
        return this.props.fallback;
      }
      return (
        <ErrorFallback
          error={this.state.error}
          level={this.props.level ?? 'module'}
          onRetry={() => this.setState({ hasError: false, error: null })}
        />
      );
    }
    return this.props.children;
  }
}
