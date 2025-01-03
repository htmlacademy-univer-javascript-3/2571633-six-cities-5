import {Spinner} from './';
import { render, screen } from '@testing-library/react';

describe('Component: Spinner', () => {
  it('should render correct', () => {

    render(<Spinner />);
    const spinnerContainer = screen.getByTestId('spinner');
    expect(spinnerContainer).toBeInTheDocument();
  });
});
