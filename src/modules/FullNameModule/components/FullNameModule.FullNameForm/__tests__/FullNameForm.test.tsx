import { act, fireEvent, render, screen } from '@testing-library/react';

import { TestComponentWrapper } from '@testUtils';

import { FullNameForm } from '../FullNameModule.FullNameForm';

describe('FullNameForm', () => {
  it('submits valid data', async () => {
    const onSubmit = jest.fn();

    render(
      <TestComponentWrapper>
        <FullNameForm onSubmit={onSubmit} isLoading={false} />
      </TestComponentWrapper>,
    );

    await act(async () => {
      fireEvent.input(screen.getByLabelText('Фамилия'), { target: { value: 'Иванов' } });
      fireEvent.input(screen.getByLabelText('Имя'), { target: { value: 'Иван' } });
      fireEvent.click(screen.getByRole('button', { name: 'Сохранить' }));
    });

    expect(onSubmit.mock.calls[0][0]).toMatchObject({
      lastName: 'Иванов',
      firstName: 'Иван',
    });
  });

  it('shows server error', () => {
    render(
      <TestComponentWrapper>
        <FullNameForm onSubmit={jest.fn()} isLoading={false} error="Ошибка" />
      </TestComponentWrapper>,
    );
    expect(screen.getByText('Ошибка')).toBeInTheDocument();
  });

  it('shows loading label', () => {
    render(
      <TestComponentWrapper>
        <FullNameForm onSubmit={jest.fn()} isLoading />
      </TestComponentWrapper>,
    );
    expect(screen.getByRole('button', { name: 'Загрузка...' })).toBeDisabled();
  });
});
