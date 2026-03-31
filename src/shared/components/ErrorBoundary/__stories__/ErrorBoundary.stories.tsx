import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { ErrorBoundary } from '../ErrorBoundary';

/** Падает при рендере — для демонстрации границы. */
function ThrowOnRender({ message = 'Ошибка в дочернем компоненте' }: { message?: string }) {
  throw new Error(message);
}

const meta = {
  title: 'Components/ErrorBoundary',
  component: ErrorBoundary,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ErrorBoundary>;

export default meta;
type Story = StoryObj<typeof meta>;

export const RendersChildren: Story = {
  render: () => (
    <ErrorBoundary level="module">
      <p>Контент без ошибок</p>
    </ErrorBoundary>
  ),
};

export const CatchesModuleError: Story = {
  render: () => (
    <ErrorBoundary level="module" componentName="DemoModule">
      <ThrowOnRender />
    </ErrorBoundary>
  ),
};

export const CatchesPageError: Story = {
  render: () => (
    <ErrorBoundary level="page">
      <ThrowOnRender message="Сбой на уровне страницы" />
    </ErrorBoundary>
  ),
};

export const CustomFallback: Story = {
  render: () => (
    <ErrorBoundary fallback={<p role="alert">Кастомный fallback вместо ErrorFallback</p>}>
      <ThrowOnRender />
    </ErrorBoundary>
  ),
};
