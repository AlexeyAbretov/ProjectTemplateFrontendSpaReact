import { act, fireEvent, render, screen } from '@testing-library/react';

import { TestComponentWrapper } from '@testUtils';

import { LoginForm } from '../AuthModule.LoginForm';

describe('LoginForm', () => {
  it('submits valid credentials', async () => {
    const onSubmit = jest.fn();

    render(
      <TestComponentWrapper>
        <LoginForm onSubmit={onSubmit} isLoading={false} />
      </TestComponentWrapper>,
    );

    await act(async () => {
      fireEvent.input(screen.getByLabelText('Email'), { target: { value: 'user@example.com' } });
      fireEvent.input(screen.getByLabelText('Пароль'), { target: { value: 'secret12' } });
      fireEvent.click(screen.getByRole('button', { name: 'Войти' }));
    });

    expect(onSubmit.mock.calls[0][0]).toMatchObject({
      email: 'user@example.com',
      password: 'secret12',
    });
  });

  it('shows error from props', () => {
    render(
      <TestComponentWrapper>
        <LoginForm onSubmit={jest.fn()} isLoading={false} error="Неверный пароль" />
      </TestComponentWrapper>,
    );
    expect(screen.getByText('Неверный пароль')).toBeInTheDocument();
  });
});
