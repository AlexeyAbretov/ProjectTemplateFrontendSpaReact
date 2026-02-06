import React, { JSX } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { FullNameFormInputs, FullNameFormSchema } from '../../validation';

import {
  Button,
  ErrorBox,
  ErrorMessage,
  FormContainer,
  FormGroup,
  Input,
  Label,
} from './FullNameModule.FullNameForm.styled';

interface FullNameFormProps {
  onSubmit: (data: FullNameFormInputs) => void;
  isLoading: boolean;
  error?: string | null;
}

export const FullNameForm: React.FC<FullNameFormProps> = ({
  onSubmit,
  isLoading,
  error,
}): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FullNameFormInputs>({
    resolver: zodResolver(FullNameFormSchema),
  });

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      {error && <ErrorBox>{error}</ErrorBox>}

      <FormGroup>
        <Label htmlFor="lastName">Фамилия</Label>
        <Input
          id="lastName"
          type="text"
          placeholder="Введите фамилию"
          disabled={isLoading}
          {...register('lastName')}
        />
        {errors.lastName && <ErrorMessage>{errors.lastName.message}</ErrorMessage>}
      </FormGroup>

      <FormGroup>
        <Label htmlFor="firstName">Имя</Label>
        <Input
          id="firstName"
          type="text"
          placeholder="Введите имя"
          disabled={isLoading}
          {...register('firstName')}
        />
        {errors.firstName && <ErrorMessage>{errors.firstName.message}</ErrorMessage>}
      </FormGroup>

      <FormGroup>
        <Label htmlFor="middleName">Отчество</Label>
        <Input
          id="middleName"
          type="text"
          placeholder="Введите отчество (необязательно)"
          disabled={isLoading}
          {...register('middleName')}
        />
        {errors.middleName && <ErrorMessage>{errors.middleName.message}</ErrorMessage>}
      </FormGroup>

      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Загрузка...' : 'Сохранить'}
      </Button>
    </FormContainer>
  );
};
