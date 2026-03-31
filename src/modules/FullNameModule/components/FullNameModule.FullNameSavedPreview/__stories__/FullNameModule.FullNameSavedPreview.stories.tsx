import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { FullNameSavedPreview } from '../FullNameModule.FullNameSavedPreview';

const meta = {
  title: 'FullNameModule/Components/FullNameSavedPreview',
  component: FullNameSavedPreview,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FullNameSavedPreview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithMiddleName: Story = {
  args: {
    fullName: {
      id: '1',
      lastName: 'Иванов',
      firstName: 'Иван',
      middleName: 'Иванович',
    },
  },
};

export const WithoutMiddleName: Story = {
  args: {
    fullName: {
      id: '2',
      lastName: 'Петрова',
      firstName: 'Мария',
    },
  },
};

export const Empty: Story = {
  args: {
    fullName: null,
  },
  render: args => (
    <div>
      <p style={{ marginBottom: 8 }}>
        При <code>fullName=null</code> компонент возвращает <code>null</code>:
      </p>
      <FullNameSavedPreview {...args} />
    </div>
  ),
};
