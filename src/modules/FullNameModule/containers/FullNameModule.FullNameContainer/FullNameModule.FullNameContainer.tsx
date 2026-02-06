import React, { JSX } from 'react';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '@useAppDispatch';

import { FullNameForm } from '../../components';
import { getFullNameModuleFullNameContainerProps } from '../../selectors';
import { clearError, saveFullName } from '../../store';
import { FullNameFormInputs } from '../../validation';

import {
  CardContainer,
  ClearErrorButton,
  Container,
  Title,
} from './FullNameModule.FullNameContainer.styled';

export const FullNameContainer: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { error, isLoading, fullName } = useSelector(getFullNameModuleFullNameContainerProps);

  const handleSaveFullName = async (data: FullNameFormInputs) => {
    await dispatch(saveFullName(data));
  };

  const handleClearError = () => {
    dispatch(clearError());
  };

  return (
    <Container>
      <CardContainer>
        <Title>Введите ФИО</Title>
        <FullNameForm onSubmit={handleSaveFullName} isLoading={isLoading} error={error} />
        {error && <ClearErrorButton onClick={handleClearError}>Очистить ошибку</ClearErrorButton>}
        {fullName && (
          <div>
            <h2>Сохраненные данные:</h2>
            <p>Фамилия: {fullName.lastName}</p>
            <p>Имя: {fullName.firstName}</p>
            {fullName.middleName && <p>Отчество: {fullName.middleName}</p>}
          </div>
        )}
      </CardContainer>
    </Container>
  );
};
