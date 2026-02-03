import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const Header = styled.header`
  flex-shrink: 0;
  padding: 1rem 1.5rem;
  background: #f1f3f5;
  border-bottom: 1px solid #dee2e6;
`;

export const Nav = styled.nav`
  display: flex;
  gap: 1.5rem;
  align-items: center;
`;

export const NavLink = styled(Link)`
  color: ${props => props.theme.color.primary};
  text-decoration: none;
  font-size: 0.9375rem;

  &:hover {
    text-decoration: underline;
  }
`;

export const Main = styled.main`
  flex: 1;
  padding: 1.5rem;
`;

export const Footer = styled.footer`
  flex-shrink: 0;
  padding: 1rem 1.5rem;
  background: #f8f9fa;
  border-top: 1px solid #dee2e6;
  font-size: 0.875rem;
  color: #6c757d;
`;
