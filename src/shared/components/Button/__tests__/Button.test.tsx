import { TestComponentWrapper } from '@testUtils';
import { Button } from '../Button';
import { render, screen } from '@testing-library/react';

describe('Button test', () => {
  it('should render', () => {
    const { container } = render(
      <TestComponentWrapper>
        <Button />
      </TestComponentWrapper>,
    );

    expect(screen.getByText('Button')).toHaveStyleRule('color', 'blue');
    expect(container).toMatchSnapshot();
  });
});
