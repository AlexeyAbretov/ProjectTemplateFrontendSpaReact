import React, { JSX } from 'react';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '@useAppDispatch';

import { LoginForm } from '../../components';
import { getAuthModuleLoginContainerProps } from '../../selectors';
import { clearError, login } from '../../store/AuthModule.store';
import { LoginFormInputs } from '../../validation';

import {
  CardContainer,
  ClearErrorButton,
  Container,
  Title,
} from './AuthModule.LoginContainer.styled';

export const LoginContainer: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { error, isLoading } = useSelector(getAuthModuleLoginContainerProps);

  const handleLogin = async (data: LoginFormInputs) => {
    await dispatch(login(data));
  };

  const handleClearError = () => {
    dispatch(clearError());
  };

  return (
    <Container>
      <CardContainer>
        <Title>Авторизация</Title>
        <LoginForm onSubmit={handleLogin} isLoading={isLoading} error={error} />
        {error && <ClearErrorButton onClick={handleClearError}>Очистить ошибку</ClearErrorButton>}
      </CardContainer>
    </Container>
  );
};
