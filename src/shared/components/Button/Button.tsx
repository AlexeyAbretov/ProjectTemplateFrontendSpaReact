import { ButtonStyled } from './Button.styled';

export const Button: React.FC<{
  title?: string;
  onClick?: () => void;
}> = ({ title, onClick }) => {
  return <ButtonStyled onClick={onClick}>{title || 'Button'}</ButtonStyled>;
};
