import { render, screen } from '@testing-library/react';

import { Module2Children1 } from '../module2-children1';

describe('Module2Children1', () => {
  it('renders', () => {
    render(<Module2Children1 />);
    expect(screen.getByText('Module2Children1')).toBeInTheDocument();
  });
});
