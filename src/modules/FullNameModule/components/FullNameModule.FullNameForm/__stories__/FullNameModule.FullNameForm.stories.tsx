import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { fn } from 'storybook/test';

import { FullNameForm } from '../FullNameModule.FullNameForm';

const meta = {
  title: 'FullNameModule/Components/FullNameForm',
  component: FullNameForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    onSubmit: fn(),
    isLoading: false,
    error: null,
  },
} satisfies Meta<typeof FullNameForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
};

export const WithServerError: Story = {
  args: {
    error: 'Не удалось сохранить данные. Попробуйте позже.',
  },
};
