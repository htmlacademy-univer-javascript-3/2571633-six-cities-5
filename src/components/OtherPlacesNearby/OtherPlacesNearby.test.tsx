import { render, screen } from '@testing-library/react';
import { OtherPlacesNearby } from './OtherPlacesNearby';


describe('OtherPlacesNearby', () => {
  it('should render correctly', () => {

    render(<OtherPlacesNearby />);

    const otherplacenearyElement = screen.getByText('Other places in the neighbourhood');
    expect(otherplacenearyElement).toBeInTheDocument();
  });
});
