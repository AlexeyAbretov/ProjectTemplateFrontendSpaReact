import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { FullNameScreen } from '../FullNameModule.FullNameScreen';

const meta = {
  title: 'FullNameModule/Components/FullNameScreen',
  component: FullNameScreen,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FullNameScreen>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Введите ФИО',
    children: <p style={{ margin: 0, textAlign: 'center' }}>Содержимое карточки</p>,
  },
};

export const CustomTitle: Story = {
  args: {
    title: 'Заголовок экрана',
    children: <p style={{ margin: 0 }}>Дочерние элементы передаются через children.</p>,
  },
};
