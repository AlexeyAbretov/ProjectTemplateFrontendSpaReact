import React, { JSX } from 'react';

import { FullNameStoreType } from '../../types';

import { Heading, Line, Section } from './FullNameModule.FullNameSavedPreview.styled';

interface FullNameSavedPreviewProps {
  fullName: FullNameStoreType['fullName'];
}

export const FullNameSavedPreview: React.FC<FullNameSavedPreviewProps> = ({
  fullName,
}): JSX.Element | null => {
  if (!fullName) {
    return null;
  }

  return (
    <Section>
      <Heading>Сохраненные данные:</Heading>
      <Line>Фамилия: {fullName.lastName}</Line>
      <Line>Имя: {fullName.firstName}</Line>
      {fullName.middleName && <Line>Отчество: {fullName.middleName}</Line>}
    </Section>
  );
};
