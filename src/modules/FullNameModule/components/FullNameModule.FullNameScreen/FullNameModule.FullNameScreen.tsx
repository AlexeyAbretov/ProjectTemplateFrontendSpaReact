import React, { JSX } from 'react';

import { CardContainer, Container, Title } from './FullNameModule.FullNameScreen.styled';

interface FullNameScreenProps {
  title: string;
  children: React.ReactNode;
}

export const FullNameScreen: React.FC<FullNameScreenProps> = ({ title, children }): JSX.Element => (
  <Container>
    <CardContainer>
      <Title>{title}</Title>
      {children}
    </CardContainer>
  </Container>
);
