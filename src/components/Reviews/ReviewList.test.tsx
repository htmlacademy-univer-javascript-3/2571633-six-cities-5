import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { ReviewList } from './ReviewList.tsx';
import { UserReview} from '../../types/types.ts';

interface UserReviewItemProps {
  comment: string;
}

vi.mock('./Review', () => ({
  Review: ({ comment}: UserReviewItemProps) => (
    <li data-testid="review-item">
      {comment}
    </li>
  ),
}));

describe('ReviewList', () => {
  const mockReviews: UserReview[] = [
    {
      id: 1,
      date: '2023-10-12T14:48:00.000Z',
      user: {
        name: 'John Doe',
        avatar: '/path/to/avatar.jpg',
      },
      comment: 'Great place to stay!',
      rating: 4.5,
    },
    {
      id: 2,
      date: '2023-10-13T14:48:00.000Z',
      user: {
        name: 'Jane Smith',
        avatar: '/path/to/avatar2.jpg',
      },
      comment: 'Very cozy and clean!',
      rating: 5.0,
    },
  ];

  it('should render correctly with reviews', () => {
    render(<ReviewList reviews={mockReviews} />);

    expect(screen.getByText('Reviews ·')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();

    const reviewItems = screen.getAllByTestId('review-item');
    expect(reviewItems).toHaveLength(mockReviews.length);

    expect(screen.getByText('Great place to stay!')).toBeInTheDocument();
    expect(screen.getByText('Very cozy and clean!')).toBeInTheDocument();
  });

  it('should render correctly with no reviews', () => {
    render(<ReviewList reviews={[]} />);

    expect(screen.getByText('Reviews ·')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();

    expect(screen.queryByTestId('review-item')).not.toBeInTheDocument();
  });
});
