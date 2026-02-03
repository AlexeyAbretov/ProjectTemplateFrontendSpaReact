import styled from 'styled-components';

export const ErrorFallbackWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 40vh;
  padding: 2rem;
  text-align: center;
`;

export const ErrorTitle = styled.h2`
  margin: 0 0 0.5rem;
  font-size: 1.25rem;
  color: #c00;
`;

export const ErrorMessage = styled.p`
  margin: 0 0 1rem;
  font-size: 0.875rem;
  color: #6c757d;
  max-width: 32rem;
`;

export const RetryButton = styled.button`
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  color: blue;
  background: transparent;
  border: 1px solid blue;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;
