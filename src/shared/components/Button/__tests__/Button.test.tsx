import { render, screen } from '@testing-library/react';

import { TestComponentWrapper } from '@testUtils';

import { Button } from '../Button';

describe('Button test', () => {
  it('should render', () => {
    const { container } = render(
      <TestComponentWrapper>
        <Button />
      </TestComponentWrapper>,
    );

    expect(screen.getByText('Button')).toHaveStyleRule('color', '#007bff');
    expect(container).toMatchSnapshot();
  });
});
