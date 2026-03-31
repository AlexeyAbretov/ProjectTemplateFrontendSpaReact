import React, { JSX } from 'react';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '@useAppDispatch';

import {
  FullNameClearErrorButton,
  FullNameForm,
  FullNameSavedPreview,
  FullNameScreen,
} from '../../components';
import { getFullNameModuleFullNameContainerProps } from '../../selectors';
import { clearError, saveFullName } from '../../store';
import { FullNameFormInputs } from '../../validation';

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
    <FullNameScreen title="Введите ФИО">
      <FullNameForm onSubmit={handleSaveFullName} isLoading={isLoading} error={error} />
      <FullNameClearErrorButton visible={Boolean(error)} onClear={handleClearError} />
      <FullNameSavedPreview fullName={fullName} />
    </FullNameScreen>
  );
};
