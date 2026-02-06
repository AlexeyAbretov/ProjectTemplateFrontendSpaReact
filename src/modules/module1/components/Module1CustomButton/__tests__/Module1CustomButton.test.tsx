import { render, screen } from '@testing-library/react';

import { TestComponentWrapper } from '@testUtils';

import { Module1CustomButton } from '../Module1CustomButton';

describe('Module1CustomButton test', () => {
  it('should render', () => {
    const { container } = render(
      <TestComponentWrapper>
        <Module1CustomButton />
      </TestComponentWrapper>,
    );

    expect(screen.getByText('Button')).toHaveStyleRule('color', '#007bff');
    expect(container).toMatchSnapshot();
  });
});
