import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { SuspenseFallback } from '../SuspenseFallback';

const meta = {
  title: 'Components/SuspenseFallback',
  component: SuspenseFallback,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SuspenseFallback>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
