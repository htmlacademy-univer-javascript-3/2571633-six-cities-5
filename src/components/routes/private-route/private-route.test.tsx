import { MemoryHistory, createMemoryHistory } from 'history';
import { Route, Routes } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { routesEnum } from '../../../shared/config';
import { withHistory } from '../../../shared/providers';
import { AuthEnum } from '../../../entities/user';
import PrivateRoute from '.';

describe('Component: PrivateRoute', () => {
  let mockHistory: MemoryHistory;

  beforeAll(() => {
    mockHistory = createMemoryHistory();
  });

  beforeEach(() => {
    mockHistory.push(routesEnum.FAVORITES);
  });

  it('should render component for public route, when user not authorized', () => {
    const expectedText = 'public route';
    const notExpectedText = 'private route';
    const preparedComponent = withHistory(
      <Routes>
        <Route path={routesEnum.LOGIN} element={<span>{expectedText}</span>} />
        <Route path={routesEnum.FAVORITES} element={
          <PrivateRoute authState={AuthEnum.NO_AUTHENTICATED}>
            <span>{notExpectedText}</span>
          </PrivateRoute>
        }
        />
      </Routes>,
      mockHistory
    );

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();
  });

  it('should render component for private route, when user authorized', () => {
    const expectedText = 'private route';
    const notExpectedText = 'public route';
    const preparedComponent = withHistory(
      <Routes>
        <Route path={routesEnum.LOGIN} element={<span>{notExpectedText}</span>} />
        <Route path={routesEnum.FAVORITES} element={
          <PrivateRoute authState={AuthEnum.AUTHENTICATED}>
            <span>{expectedText}</span>
          </PrivateRoute>
        }
        />
      </Routes>,
      mockHistory
    );

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();
  });
});
