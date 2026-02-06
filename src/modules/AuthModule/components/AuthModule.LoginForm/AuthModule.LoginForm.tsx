import React, { JSX } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { LoginFormInputs, LoginFormSchema } from '../../validation';

import {
  Button,
  ErrorBox,
  ErrorMessage,
  FormContainer,
  FormGroup,
  Input,
  Label,
} from './AuthModule.LoginForm.styled';

interface LoginFormProps {
  onSubmit: (data: LoginFormInputs) => void;
  isLoading: boolean;
  error?: string | null;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  isLoading,
  error,
}): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(LoginFormSchema),
  });

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      {error && <ErrorBox>{error}</ErrorBox>}

      <FormGroup>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="your.email@example.com"
          disabled={isLoading}
          {...register('email')}
        />
        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
      </FormGroup>
      <FormGroup>
        <Label htmlFor="password">Пароль</Label>
        <Input
          id="password"
          type="password"
          placeholder="Введите пароль"
          disabled={isLoading}
          {...register('password')}
        />
        {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
      </FormGroup>
      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Загрузка...' : 'Войти'}
      </Button>
    </FormContainer>
  );
};
