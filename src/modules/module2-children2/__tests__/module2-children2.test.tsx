import { render, screen } from '@testing-library/react';

import { Module2Children2 } from '../module2-children2';

describe('Module2Children2', () => {
  it('renders', () => {
    render(<Module2Children2 />);
    expect(screen.getByText('Module2Children2')).toBeInTheDocument();
  });
});
