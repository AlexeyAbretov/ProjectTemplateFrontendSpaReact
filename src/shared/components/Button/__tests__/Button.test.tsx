import { Button } from '../Button';
import { render } from '@testing-library/react';

describe('Button test', () => {
  it('should render', () => {
    const { container } = render(<Button />);

    expect(container).toMatchSnapshot();
  });
});
