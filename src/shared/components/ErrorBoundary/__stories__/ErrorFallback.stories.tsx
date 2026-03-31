import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { fn } from 'storybook/test';

import { ErrorFallback } from '../ErrorFallback';

const sampleError = new Error('Пример сообщения об ошибке');

const meta = {
  title: 'Components/ErrorFallback',
  component: ErrorFallback,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    error: sampleError,
    level: 'module' as const,
    onRetry: fn(),
  },
} satisfies Meta<typeof ErrorFallback>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ModuleLevel: Story = {};

export const PageLevel: Story = {
  args: {
    level: 'page',
  },
};

export const AppLevel: Story = {
  args: {
    level: 'app',
  },
};

export const WithoutRetry: Story = {
  args: {
    onRetry: undefined,
  },
};
