import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { fn } from 'storybook/test';

import { FullNameClearErrorButton } from '../FullNameModule.FullNameClearErrorButton';

const meta = {
  title: 'FullNameModule/Components/FullNameClearErrorButton',
  component: FullNameClearErrorButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: { onClear: fn() },
} satisfies Meta<typeof FullNameClearErrorButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Visible: Story = {
  args: {
    visible: true,
  },
};

export const Hidden: Story = {
  args: {
    visible: false,
  },
  render: args => (
    <div>
      <p style={{ marginBottom: 8 }}>
        При <code>visible=false</code> компонент возвращает <code>null</code>:
      </p>
      <FullNameClearErrorButton {...args} />
    </div>
  ),
};
