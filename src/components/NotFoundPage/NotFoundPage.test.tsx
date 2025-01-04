import { render, screen } from '@testing-library/react';
import { withHistory } from '../../shared/providers';
import NotFoundPage from './NotFoundPage';
import { withStore } from '../../shared/providers/with-store';

describe('Component: NotFoundPage', () => {
  it('should render correctly', () => {
    const expectedText = '404 Not Found';
    const expectedLinkText = 'Return to main page';
    //const preparedComponent = withHistory(<NotFoundPage/>);
    const {withStoreComponent} = withStore(<NotFoundPage/>,{});
    const componentWithProviders = withHistory(withStoreComponent);
    //render(preparedComponent);
    render(componentWithProviders);
    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByText(expectedLinkText)).toBeInTheDocument();
  });
});
