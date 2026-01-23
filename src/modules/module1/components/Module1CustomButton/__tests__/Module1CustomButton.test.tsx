import { TestComponentWrapper } from '@testUtils';
import { Module1CustomButton } from '../Module1CustomButton';
import { render, screen } from '@testing-library/react';

describe('Module1CustomButton test', () => {
  it('should render', () => {
    const { container } = render(
      <TestComponentWrapper>
        <Module1CustomButton />
      </TestComponentWrapper>,
    );

    expect(screen.getByText('Button')).toHaveStyleRule('color', 'blue');
    expect(container).toMatchSnapshot();
  });
});
