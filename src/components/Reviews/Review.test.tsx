import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { Review } from './Review.tsx';
import { UserReview} from '../../types/types';
import { dateToMonthWordYear, dateToYearMonthDay } from '../../date.ts';

vi.mock('../Rating/Rating', () => ({
  Rating: () => <div data-testid="rating" />,
}));

vi.mock('../../date', () => ({
  dateToYearMonthDay: vi.fn(),
  dateToMonthWordYear: vi.fn(),
}));

describe('ReviewItem', () => {
  const mockReview: UserReview = {
    id: 1,
    date: '2024-11-26T14:48:00.000Z',
    user: {
      name: 'John Doe',
      avatar: '/path/to/avatar.jpg',
    },
    comment: 'Great place to stay!',
    rating: 4.5,
  };

  it('should render correctly', () => {
    const dateToYearMonthDayMock = dateToYearMonthDay as jest.Mock;
    const dateToMonthWordYearMock = dateToMonthWordYear as jest.Mock;

    dateToYearMonthDayMock.mockReturnValue('2024-11-26');
    dateToMonthWordYearMock.mockReturnValue('November 2024');
    render(<Review key={mockReview.id} {...mockReview} />);

    const avatar = screen.getByAltText('Reviews avatar');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('src', '/path/to/avatar.jpg');
    expect(avatar).toHaveAttribute('width', '54');
    expect(avatar).toHaveAttribute('height', '54');

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Great place to stay!')).toBeInTheDocument();

    const timeElement = screen.getByText('November 2024');
    expect(timeElement).toBeInTheDocument();
    expect(timeElement).toHaveAttribute('dateTime', '2024-11-26');

    expect(screen.getByTestId('rating')).toBeInTheDocument();

    expect(dateToYearMonthDayMock).toHaveBeenCalledWith(new Date('2024-11-26T14:48:00.000Z'));
    expect(dateToMonthWordYearMock).toHaveBeenCalledWith(new Date('2024-11-26T14:48:00.000Z'));
  });
});
